/**
 * Read-side queries for the admin panel (server-only).
 *
 * Status rules (never guessed — derived only from data the server actually received):
 *  - ONLINE  : session not ended AND last heartbeat within `leftAfterSeconds`
 *  - ACTIVE  : online AND tab visible AND interaction within `idleAfterSeconds`
 *  - IDLE    : online but not active
 *  - LEFT    : session ended, or no heartbeat for `leftAfterSeconds`
 *  - RETURNING: visitor had an earlier session
 */
import "server-only";
import { ensureSchema, getSettings, sql } from "@/lib/db";

export const PAGE_SIZE = 25;
export const TZ = "Asia/Karachi";

type Row = Record<string, unknown>;
const q = async <T = Row>(text: string, params: unknown[] = []): Promise<T[]> =>
  (await sql().query(text, params)) as unknown as T[];

/** Tiny positional-parameter builder for dynamic filters. */
function params() {
  const list: unknown[] = [];
  return { list, p: (v: unknown) => { list.push(v); return `$${list.length}`; } };
}

const iso = (v: unknown): string | null => (v ? new Date(v as string).toISOString() : null);

/* ───────────────────────── Date ranges ───────────────────────── */

export type RangeKey = "today" | "yesterday" | "7d" | "30d" | "custom";
export type DateRange = { key: RangeKey; from: Date; to: Date; label: string; bucket: "hour" | "day"; fromStr?: string; toStr?: string };

const DAY = 86_400_000;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Start of "today" in Pakistan time. */
export function karachiDayStart(offsetDays = 0): Date {
  const d = new Date().toLocaleDateString("en-CA", { timeZone: TZ }); // YYYY-MM-DD
  return new Date(new Date(`${d}T00:00:00+05:00`).getTime() + offsetDays * DAY);
}

export function resolveRange(range?: string, from?: string, to?: string): DateRange {
  const now = new Date();
  const today = karachiDayStart();
  let r: DateRange;
  switch (range) {
    case "yesterday":
      r = { key: "yesterday", from: new Date(today.getTime() - DAY), to: today, label: "Yesterday", bucket: "hour" };
      break;
    case "7d":
      r = { key: "7d", from: new Date(today.getTime() - 6 * DAY), to: now, label: "Last 7 days", bucket: "day" };
      break;
    case "30d":
      r = { key: "30d", from: new Date(today.getTime() - 29 * DAY), to: now, label: "Last 30 days", bucket: "day" };
      break;
    case "custom": {
      if (from && to && DATE_RE.test(from) && DATE_RE.test(to)) {
        let f = new Date(`${from}T00:00:00+05:00`);
        let t = new Date(new Date(`${to}T00:00:00+05:00`).getTime() + DAY);
        if (!isNaN(f.getTime()) && !isNaN(t.getTime())) {
          if (t <= f) [f, t] = [new Date(t.getTime() - DAY), new Date(f.getTime() + DAY)];
          if (t.getTime() - f.getTime() > 366 * DAY) f = new Date(t.getTime() - 366 * DAY);
          r = { key: "custom", from: f, to: t, label: `${from} → ${to}`, bucket: t.getTime() - f.getTime() <= 2 * DAY ? "hour" : "day", fromStr: from, toStr: to };
          break;
        }
      }
      r = { key: "today", from: today, to: now, label: "Today", bucket: "hour" };
      break;
    }
    default:
      r = { key: "today", from: today, to: now, label: "Today", bucket: "hour" };
  }
  return r;
}

/* ───────────────────────── Shared SQL fragments ───────────────────────── */

const convStatusSql = (alias = "c") => `
  CASE
    WHEN ${alias}.handoff THEN 'human_handoff'
    WHEN EXISTS (SELECT 1 FROM leads l WHERE l.conversation_id = ${alias}.id) THEN 'lead'
    WHEN ${alias}.last_message_at > now() - interval '10 minutes' THEN 'active'
    WHEN EXISTS (SELECT 1 FROM messages m WHERE m.conversation_id = ${alias}.id AND m.role = 'assistant') THEN 'completed'
    ELSE 'abandoned'
  END`;

export const CONVERSATION_STATUSES = ["active", "completed", "abandoned", "human_handoff", "lead"] as const;
export const LEAD_STATUSES = ["new", "contacted", "qualified", "converted", "lost"] as const;

/* ───────────────────────── Live snapshot ───────────────────────── */

export type LiveSession = {
  session_id: string;
  visitor_id: string;
  short_id: string;
  status: "active" | "idle";
  is_returning: boolean;
  session_count: number;
  current_path: string | null;
  current_title: string | null;
  landing_path: string | null;
  started_at: string;
  last_heartbeat_at: string;
  last_interaction_at: string;
  pageviews: number;
  chat_opened: boolean;
  chat_messages: number;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  source: string;
  country: string | null;
  city: string | null;
  name: string | null;
  email: string | null;
  has_lead: boolean;
};

export type LeftSession = {
  session_id: string;
  visitor_id: string;
  short_id: string;
  exit_path: string | null;
  left_at: string;
  duration_s: number;
  pageviews: number;
  chat_messages: number;
  source: string;
  device_type: string | null;
  country: string | null;
};

export type LiveEvent = {
  id: number;
  type: string;
  path: string | null;
  created_at: string;
  visitor_id: string | null;
  short_id: string | null;
  metadata: Record<string, unknown>;
};

export type LiveSnapshot = {
  now: string;
  settings: { leftAfterSeconds: number; idleAfterSeconds: number };
  counts: { online: number; active: number; idle: number; visitorsToday: number; sessionsToday: number; chatsToday: number; leadsToday: number };
  online: LiveSession[];
  recentlyLeft: LeftSession[];
  returningToday: LeftSession[];
  events: LiveEvent[];
  maxEventId: number;
};

const FEED_TYPES = [
  "VISITOR_ENTERED", "VISITOR_RETURNED", "PAGE_VIEW", "CHATBOT_OPENED", "CHATBOT_MESSAGE",
  "CHATBOT_RESPONSE", "LEAD_CREATED", "CONTACT_FORM_SUBMITTED", "VISITOR_LEFT", "VISITOR_IDLE",
];

export async function getLiveSnapshot(): Promise<LiveSnapshot> {
  await ensureSchema();
  const { leftAfterSeconds, idleAfterSeconds } = await getSettings();
  const dayStart = karachiDayStart().toISOString();

  const [online, recentlyLeft, returningToday, counts, events, maxId] = await Promise.all([
    q<LiveSession & { is_active: boolean }>(`
      SELECT s.id AS session_id, s.visitor_id, v.short_id, s.is_returning, v.session_count,
        s.current_path, s.current_title, s.landing_path, s.started_at, s.last_heartbeat_at, s.last_interaction_at,
        s.pageviews, s.chat_opened, s.chat_messages, s.device_type, s.browser, s.os, s.source, s.country, s.city,
        v.name, v.email,
        (s.visible AND s.last_interaction_at > now() - ($2 * interval '1 second')) AS is_active,
        EXISTS (SELECT 1 FROM leads l WHERE l.visitor_id = s.visitor_id) AS has_lead
      FROM sessions s JOIN visitors v ON v.id = s.visitor_id
      WHERE s.ended_at IS NULL AND s.last_heartbeat_at > now() - ($1 * interval '1 second')
      ORDER BY s.started_at DESC LIMIT 200`, [leftAfterSeconds, idleAfterSeconds]),
    q<LeftSession>(`
      SELECT s.id AS session_id, s.visitor_id, v.short_id, COALESCE(s.exit_path, s.current_path) AS exit_path,
        COALESCE(s.ended_at, s.last_heartbeat_at) AS left_at,
        EXTRACT(EPOCH FROM (COALESCE(s.ended_at, s.last_heartbeat_at) - s.started_at))::int AS duration_s,
        s.pageviews, s.chat_messages, s.source, s.device_type, s.country
      FROM sessions s JOIN visitors v ON v.id = s.visitor_id
      WHERE NOT (s.ended_at IS NULL AND s.last_heartbeat_at > now() - ($1 * interval '1 second'))
        AND COALESCE(s.ended_at, s.last_heartbeat_at) > now() - interval '30 minutes'
      ORDER BY left_at DESC LIMIT 30`, [leftAfterSeconds]),
    q<LeftSession>(`
      SELECT s.id AS session_id, s.visitor_id, v.short_id, s.current_path AS exit_path,
        COALESCE(s.ended_at, s.last_heartbeat_at) AS left_at,
        EXTRACT(EPOCH FROM (COALESCE(s.ended_at, s.last_heartbeat_at) - s.started_at))::int AS duration_s,
        s.pageviews, s.chat_messages, s.source, s.device_type, s.country
      FROM sessions s JOIN visitors v ON v.id = s.visitor_id
      WHERE s.is_returning AND s.started_at >= $1
      ORDER BY s.started_at DESC LIMIT 20`, [dayStart]),
    q<{ visitors_today: number; sessions_today: number; chats_today: number; leads_today: number }>(`
      SELECT
        (SELECT count(DISTINCT visitor_id)::int FROM sessions WHERE started_at >= $1) AS visitors_today,
        (SELECT count(*)::int FROM sessions WHERE started_at >= $1) AS sessions_today,
        (SELECT count(*)::int FROM conversations WHERE message_count > 0 AND created_at >= $1) AS chats_today,
        (SELECT count(*)::int FROM leads WHERE created_at >= $1) AS leads_today`, [dayStart]),
    q<LiveEvent>(`
      SELECT e.id::int AS id, e.type, e.path, e.created_at, e.visitor_id, v.short_id, e.metadata
      FROM visitor_events e LEFT JOIN visitors v ON v.id = e.visitor_id
      WHERE e.type = ANY($1::text[])
      ORDER BY e.id DESC LIMIT 40`, [FEED_TYPES]),
    q<{ max: number | null }>(`SELECT max(id)::int AS max FROM visitor_events`),
  ]);

  const onlineRows: LiveSession[] = online.map(({ is_active, ...s }) => ({
    ...s,
    status: is_active ? "active" : "idle",
    started_at: iso(s.started_at)!,
    last_heartbeat_at: iso(s.last_heartbeat_at)!,
    last_interaction_at: iso(s.last_interaction_at)!,
  }));
  const fixLeft = (r: LeftSession): LeftSession => ({ ...r, left_at: iso(r.left_at)! });
  const c = counts[0];

  return {
    now: new Date().toISOString(),
    settings: { leftAfterSeconds, idleAfterSeconds },
    counts: {
      online: onlineRows.length,
      active: onlineRows.filter((s) => s.status === "active").length,
      idle: onlineRows.filter((s) => s.status === "idle").length,
      visitorsToday: c?.visitors_today ?? 0,
      sessionsToday: c?.sessions_today ?? 0,
      chatsToday: c?.chats_today ?? 0,
      leadsToday: c?.leads_today ?? 0,
    },
    online: onlineRows,
    recentlyLeft: recentlyLeft.map(fixLeft),
    returningToday: returningToday.map(fixLeft),
    events: events.map((e) => ({ ...e, created_at: iso(e.created_at)! })),
    maxEventId: maxId[0]?.max ?? 0,
  };
}

/* ───────────────────────── Visitors ───────────────────────── */

export type VisitorListRow = {
  id: string;
  short_id: string;
  first_seen_at: string;
  last_seen_at: string;
  session_count: number;
  pageview_count: number;
  first_source: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  country: string | null;
  city: string | null;
  name: string | null;
  email: string | null;
  current_path: string | null;
  live_status: "active" | "idle" | "left";
  conv_count: number;
  lead_status: string | null;
};

export type VisitorFilters = {
  q?: string;
  status?: string; // online | active | idle | offline
  device?: string;
  source?: string;
  chat?: string; // yes | no
  lead?: string; // yes | no | <lead status>
  type?: string; // new | returning
  path?: string;
  range?: string;
  from?: string;
  to?: string;
  page?: number;
};

export async function listVisitors(f: VisitorFilters) {
  await ensureSchema();
  const { leftAfterSeconds, idleAfterSeconds } = await getSettings();
  const page = Math.max(1, f.page ?? 1);
  const { list, p } = params();
  const left = p(leftAfterSeconds);
  const idle = p(idleAfterSeconds);

  const where: string[] = [];
  if (f.q?.trim()) {
    const like = p(`%${f.q.trim()}%`);
    where.push(`(x.short_id ILIKE ${like} OR x.id::text ILIKE ${like} OR x.email ILIKE ${like} OR x.name ILIKE ${like}
      OR EXISTS (SELECT 1 FROM conversations c WHERE c.visitor_id = x.id AND c.id::text ILIKE ${like}))`);
  }
  if (f.status === "online") where.push(`x.live_status IN ('active','idle')`);
  else if (f.status === "active" || f.status === "idle") where.push(`x.live_status = ${p(f.status)}`);
  else if (f.status === "offline") where.push(`x.live_status = 'left'`);
  if (f.device && ["mobile", "tablet", "desktop"].includes(f.device)) where.push(`x.device_type = ${p(f.device)}`);
  if (f.source?.trim()) where.push(`x.first_source ILIKE ${p(f.source.trim())}`);
  if (f.chat === "yes") where.push(`x.conv_count > 0`);
  else if (f.chat === "no") where.push(`x.conv_count = 0`);
  if (f.lead === "yes") where.push(`x.lead_status IS NOT NULL`);
  else if (f.lead === "no") where.push(`x.lead_status IS NULL`);
  else if (f.lead && (LEAD_STATUSES as readonly string[]).includes(f.lead)) where.push(`x.lead_status = ${p(f.lead)}`);
  if (f.type === "new") where.push(`x.session_count <= 1`);
  else if (f.type === "returning") where.push(`x.session_count > 1`);
  if (f.path?.trim()) where.push(`EXISTS (SELECT 1 FROM page_views pv WHERE pv.visitor_id = x.id AND pv.path ILIKE ${p(`%${f.path.trim()}%`)})`);
  if (f.range) {
    const r = resolveRange(f.range, f.from, f.to);
    where.push(`x.last_seen_at >= ${p(r.from.toISOString())} AND x.first_seen_at < ${p(r.to.toISOString())}`);
  }

  const base = `
    SELECT * FROM (
      SELECT v.id, v.short_id, v.first_seen_at, v.last_seen_at, v.session_count, v.pageview_count, v.first_source,
        v.device_type, v.browser, v.os, v.country, v.city, v.name, v.email,
        ls.current_path,
        CASE
          WHEN ls.ended_at IS NULL AND ls.last_heartbeat_at > now() - (${left} * interval '1 second') THEN
            CASE WHEN ls.visible AND ls.last_interaction_at > now() - (${idle} * interval '1 second') THEN 'active' ELSE 'idle' END
          ELSE 'left'
        END AS live_status,
        (SELECT count(*)::int FROM conversations c WHERE c.visitor_id = v.id AND c.message_count > 0) AS conv_count,
        (SELECT l.status FROM leads l WHERE l.visitor_id = v.id ORDER BY l.created_at DESC LIMIT 1) AS lead_status
      FROM visitors v
      LEFT JOIN LATERAL (
        SELECT s.current_path, s.ended_at, s.last_heartbeat_at, s.last_interaction_at, s.visible
        FROM sessions s WHERE s.visitor_id = v.id ORDER BY s.started_at DESC LIMIT 1
      ) ls ON true
    ) x
    ${where.length ? `WHERE ${where.join(" AND ")}` : ""}`;

  const countParams = [...list];
  const lim = p(PAGE_SIZE);
  const off = p((page - 1) * PAGE_SIZE);
  const [rows, total] = await Promise.all([
    q<VisitorListRow>(`${base} ORDER BY (x.live_status <> 'left') DESC, x.last_seen_at DESC LIMIT ${lim} OFFSET ${off}`, list),
    q<{ total: number }>(`SELECT count(*)::int AS total FROM (${base}) t`, countParams),
  ]);
  const t = total[0]?.total ?? 0;
  return { rows, total: t, page, pages: Math.max(1, Math.ceil(t / PAGE_SIZE)) };
}

/** Distinct values for filter dropdowns. */
export async function visitorFilterOptions() {
  await ensureSchema();
  const sources = await q<{ source: string }>(`
    SELECT first_source AS source FROM visitors WHERE first_source IS NOT NULL
    GROUP BY first_source ORDER BY count(*) DESC LIMIT 30`);
  return { sources: sources.map((s) => s.source) };
}

export type VisitorRow = {
  id: string;
  short_id: string;
  first_seen_at: string;
  last_seen_at: string;
  session_count: number;
  pageview_count: number;
  first_source: string | null;
  first_referrer: string | null;
  first_landing: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  name: string | null;
  email: string | null;
};

export type SessionRow = {
  id: string;
  started_at: string;
  last_heartbeat_at: string;
  ended_at: string | null;
  live_status: "active" | "idle" | "left";
  current_path: string | null;
  landing_path: string | null;
  exit_path: string | null;
  referrer: string | null;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  screen: string | null;
  language: string | null;
  country: string | null;
  city: string | null;
  pageviews: number;
  is_returning: boolean;
  chat_opened: boolean;
  chat_messages: number;
  duration_s: number;
};

export type EventRow = {
  id: number;
  session_id: string | null;
  type: string;
  path: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

export async function getVisitorProfile(id: string) {
  await ensureSchema();
  const { leftAfterSeconds, idleAfterSeconds } = await getSettings();
  const v = await q<VisitorRow>(`SELECT * FROM visitors WHERE id = $1`, [id]);
  if (!v[0]) return null;

  const [sessions, events, conversations, leads] = await Promise.all([
    q<SessionRow>(`
      SELECT s.*,
        CASE
          WHEN s.ended_at IS NULL AND s.last_heartbeat_at > now() - ($2 * interval '1 second') THEN
            CASE WHEN s.visible AND s.last_interaction_at > now() - ($3 * interval '1 second') THEN 'active' ELSE 'idle' END
          ELSE 'left'
        END AS live_status,
        EXTRACT(EPOCH FROM (COALESCE(s.ended_at, s.last_heartbeat_at) - s.started_at))::int AS duration_s
      FROM sessions s WHERE s.visitor_id = $1 ORDER BY s.started_at DESC LIMIT 50`, [id, leftAfterSeconds, idleAfterSeconds]),
    q<EventRow>(`
      SELECT id::int AS id, session_id, type, path, metadata, created_at
      FROM (SELECT * FROM visitor_events WHERE visitor_id = $1 ORDER BY created_at DESC, id DESC LIMIT 400) e
      ORDER BY created_at ASC, id ASC`, [id]),
    q<ConversationRow>(`
      SELECT c.*, v.short_id, ${convStatusSql()} AS status,
        (SELECT content FROM messages m WHERE m.conversation_id = c.id AND m.role = 'user' ORDER BY m.created_at ASC LIMIT 1) AS preview
      FROM conversations c LEFT JOIN visitors v ON v.id = c.visitor_id
      WHERE c.visitor_id = $1 ORDER BY c.created_at DESC`, [id]),
    q<LeadRow>(`SELECT l.*, NULL AS short_id FROM leads l WHERE l.visitor_id = $1 ORDER BY l.created_at DESC`, [id]),
  ]);

  const totalDuration = sessions.reduce((a, s) => a + Math.max(0, s.duration_s || 0), 0);
  return {
    visitor: v[0],
    status: sessions[0]?.live_status ?? "left",
    sessions,
    events,
    conversations,
    leads,
    totals: { sessions: v[0].session_count, pageviews: v[0].pageview_count, durationS: totalDuration, conversations: conversations.filter((c) => c.message_count > 0).length },
  };
}

/* ───────────────────────── Conversations ───────────────────────── */

export type ConversationRow = {
  id: string;
  visitor_id: string | null;
  session_id: string | null;
  short_id: string | null;
  visitor_name: string | null;
  visitor_email: string | null;
  source: string;
  page: string | null;
  country: string | null;
  city: string | null;
  user_agent: string | null;
  referrer: string | null;
  handoff: boolean;
  message_count: number;
  created_at: string;
  last_message_at: string;
  status: (typeof CONVERSATION_STATUSES)[number];
  preview: string | null;
};

export type MessageRow = {
  id: number;
  role: "user" | "assistant";
  content: string;
  model: string | null;
  latency_ms: number | null;
  is_voice: boolean;
  page: string | null;
  created_at: string;
};

export type LeadRow = {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string | null;
  source: string;
  status: (typeof LEAD_STATUSES)[number];
  notes: string | null;
  visitor_id: string | null;
  conversation_id: string | null;
  short_id: string | null;
  created_at: string;
  updated_at: string;
};

export async function listConversations(f: { q?: string; status?: string; range?: string; from?: string; to?: string; page?: number }) {
  await ensureSchema();
  const page = Math.max(1, f.page ?? 1);
  const { list, p } = params();
  const where: string[] = [];
  if (f.q?.trim()) {
    const like = p(`%${f.q.trim()}%`);
    where.push(`(x.visitor_name ILIKE ${like} OR x.visitor_email ILIKE ${like} OR x.id::text ILIKE ${like} OR x.short_id ILIKE ${like}
      OR EXISTS (SELECT 1 FROM messages m WHERE m.conversation_id = x.id AND m.content ILIKE ${like}))`);
  }
  if (f.status && (CONVERSATION_STATUSES as readonly string[]).includes(f.status)) where.push(`x.status = ${p(f.status)}`);
  if (f.range) {
    const r = resolveRange(f.range, f.from, f.to);
    where.push(`x.created_at >= ${p(r.from.toISOString())} AND x.created_at < ${p(r.to.toISOString())}`);
  }
  const base = `
    SELECT * FROM (
      SELECT c.*, v.short_id, ${convStatusSql()} AS status,
        (SELECT content FROM messages m WHERE m.conversation_id = c.id AND m.role = 'user' ORDER BY m.created_at ASC LIMIT 1) AS preview
      FROM conversations c LEFT JOIN visitors v ON v.id = c.visitor_id
    ) x ${where.length ? `WHERE ${where.join(" AND ")}` : ""}`;
  const countParams = [...list];
  const lim = p(PAGE_SIZE);
  const off = p((page - 1) * PAGE_SIZE);
  const [rows, total] = await Promise.all([
    q<ConversationRow>(`${base} ORDER BY x.last_message_at DESC LIMIT ${lim} OFFSET ${off}`, list),
    q<{ total: number }>(`SELECT count(*)::int AS total FROM (${base}) t`, countParams),
  ]);
  const t = total[0]?.total ?? 0;
  return { rows, total: t, page, pages: Math.max(1, Math.ceil(t / PAGE_SIZE)) };
}

export async function getConversation(id: string) {
  await ensureSchema();
  const conv = await q<ConversationRow>(`
    SELECT c.*, v.short_id, ${convStatusSql()} AS status, NULL AS preview
    FROM conversations c LEFT JOIN visitors v ON v.id = c.visitor_id WHERE c.id = $1`, [id]);
  if (!conv[0]) return null;
  const [messages, lead] = await Promise.all([
    q<MessageRow>(`
      SELECT id::int AS id, role, content, model, latency_ms, is_voice, page, created_at
      FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC, id ASC`, [id]),
    q<LeadRow>(`SELECT l.*, NULL AS short_id FROM leads l WHERE l.conversation_id = $1 LIMIT 1`, [id]),
  ]);
  return { conversation: conv[0], messages, lead: lead[0] ?? null };
}

/* ───────────────────────── Leads ───────────────────────── */

export async function listLeads(f: { status?: string; source?: string; q?: string; range?: string; from?: string; to?: string; page?: number }) {
  await ensureSchema();
  const page = Math.max(1, f.page ?? 1);
  const { list, p } = params();
  const where: string[] = [];
  if (f.status && (LEAD_STATUSES as readonly string[]).includes(f.status)) where.push(`l.status = ${p(f.status)}`);
  if (f.source === "chat" || f.source === "contact-form") where.push(`l.source = ${p(f.source)}`);
  if (f.q?.trim()) {
    const like = p(`%${f.q.trim()}%`);
    where.push(`(l.name ILIKE ${like} OR l.email ILIKE ${like} OR l.phone ILIKE ${like} OR l.company ILIKE ${like}
      OR l.service ILIKE ${like} OR l.message ILIKE ${like} OR v.short_id ILIKE ${like} OR l.conversation_id::text ILIKE ${like})`);
  }
  if (f.range) {
    const r = resolveRange(f.range, f.from, f.to);
    where.push(`l.created_at >= ${p(r.from.toISOString())} AND l.created_at < ${p(r.to.toISOString())}`);
  }
  const from = `FROM leads l LEFT JOIN visitors v ON v.id = l.visitor_id ${where.length ? `WHERE ${where.join(" AND ")}` : ""}`;
  const countParams = [...list];
  const lim = p(PAGE_SIZE);
  const off = p((page - 1) * PAGE_SIZE);
  const [rows, total] = await Promise.all([
    q<LeadRow>(`SELECT l.*, v.short_id ${from} ORDER BY l.created_at DESC LIMIT ${lim} OFFSET ${off}`, list),
    q<{ total: number }>(`SELECT count(*)::int AS total ${from}`, countParams),
  ]);
  const t = total[0]?.total ?? 0;
  return { rows, total: t, page, pages: Math.max(1, Math.ceil(t / PAGE_SIZE)) };
}

export async function allLeads() {
  await ensureSchema();
  return q<LeadRow>(`SELECT l.*, v.short_id FROM leads l LEFT JOIN visitors v ON v.id = l.visitor_id ORDER BY l.created_at DESC LIMIT 10000`);
}

/* ───────────────────────── Dashboard ───────────────────────── */

export async function dashboardData() {
  await ensureSchema();
  const dayStart = karachiDayStart().toISOString();
  const weekStart = karachiDayStart(-6).toISOString();

  const [totals, daily, topPages, sources, recentLeads, recentConvs] = await Promise.all([
    q<{ conversions_30d: number; leads_total: number; new_leads: number; avg_latency_ms: number | null; visitors_7d: number }>(`
      SELECT
        (SELECT count(*)::int FROM leads WHERE status = 'converted' AND updated_at > now() - interval '30 days') AS conversions_30d,
        (SELECT count(*)::int FROM leads) AS leads_total,
        (SELECT count(*)::int FROM leads WHERE status = 'new') AS new_leads,
        (SELECT round(avg(latency_ms))::int FROM messages WHERE role = 'assistant' AND created_at > now() - interval '7 days') AS avg_latency_ms,
        (SELECT count(DISTINCT visitor_id)::int FROM sessions WHERE started_at >= $1) AS visitors_7d`, [weekStart]),
    q<{ day: string; visitors: number; chats: number; leads: number }>(`
      WITH days AS (
        SELECT d::date AS d FROM generate_series((now() AT TIME ZONE '${TZ}')::date - 13, (now() AT TIME ZONE '${TZ}')::date, interval '1 day') d
      )
      SELECT to_char(days.d, 'YYYY-MM-DD') AS day,
        COALESCE(sv.n, 0)::int AS visitors, COALESCE(cv.n, 0)::int AS chats, COALESCE(lv.n, 0)::int AS leads
      FROM days
      LEFT JOIN (SELECT (started_at AT TIME ZONE '${TZ}')::date AS d, count(DISTINCT visitor_id) n FROM sessions
                 WHERE started_at > now() - interval '15 days' GROUP BY 1) sv ON sv.d = days.d
      LEFT JOIN (SELECT (created_at AT TIME ZONE '${TZ}')::date AS d, count(*) n FROM conversations
                 WHERE message_count > 0 AND created_at > now() - interval '15 days' GROUP BY 1) cv ON cv.d = days.d
      LEFT JOIN (SELECT (created_at AT TIME ZONE '${TZ}')::date AS d, count(*) n FROM leads
                 WHERE created_at > now() - interval '15 days' GROUP BY 1) lv ON lv.d = days.d
      ORDER BY days.d`),
    q<{ path: string; views: number; uniques: number }>(`
      SELECT path, count(*)::int AS views, count(DISTINCT visitor_id)::int AS uniques
      FROM page_views WHERE entered_at >= $1 GROUP BY path ORDER BY views DESC LIMIT 6`, [dayStart]),
    q<{ source: string; visitors: number }>(`
      SELECT source, count(DISTINCT visitor_id)::int AS visitors
      FROM sessions WHERE started_at >= $1 GROUP BY source ORDER BY visitors DESC LIMIT 6`, [weekStart]),
    q<LeadRow>(`SELECT l.*, v.short_id FROM leads l LEFT JOIN visitors v ON v.id = l.visitor_id ORDER BY l.created_at DESC LIMIT 5`),
    q<ConversationRow>(`
      SELECT c.*, v.short_id, ${convStatusSql()} AS status,
        (SELECT content FROM messages m WHERE m.conversation_id = c.id AND m.role = 'user' ORDER BY m.created_at ASC LIMIT 1) AS preview
      FROM conversations c LEFT JOIN visitors v ON v.id = c.visitor_id
      WHERE c.message_count > 0 ORDER BY c.last_message_at DESC LIMIT 6`),
  ]);
  return { totals: totals[0], daily, topPages, sources, recentLeads, recentConvs };
}

/* ───────────────────────── Analytics ───────────────────────── */

export async function getAnalytics(range: DateRange) {
  await ensureSchema();
  const { leftAfterSeconds } = await getSettings();
  const a = [range.from.toISOString(), range.to.toISOString()];
  const unit = range.bucket;

  const [totals, pages, entry, exit, active, srcSessions, srcLeads, campaigns, trend, devices, browsers, countries] = await Promise.all([
    q<{ visitors: number; sessions: number; new_visitors: number; pageviews: number; avg_session_s: number | null; chats: number; leads: number; bounce: number }>(`
      SELECT
        (SELECT count(DISTINCT visitor_id)::int FROM sessions WHERE started_at >= $1 AND started_at < $2) AS visitors,
        (SELECT count(*)::int FROM sessions WHERE started_at >= $1 AND started_at < $2) AS sessions,
        (SELECT count(*)::int FROM visitors WHERE first_seen_at >= $1 AND first_seen_at < $2) AS new_visitors,
        (SELECT count(*)::int FROM page_views WHERE entered_at >= $1 AND entered_at < $2) AS pageviews,
        (SELECT round(avg(EXTRACT(EPOCH FROM (COALESCE(ended_at, last_heartbeat_at) - started_at))))::int
           FROM sessions WHERE started_at >= $1 AND started_at < $2) AS avg_session_s,
        (SELECT count(*)::int FROM conversations WHERE message_count > 0 AND created_at >= $1 AND created_at < $2) AS chats,
        (SELECT count(*)::int FROM leads WHERE created_at >= $1 AND created_at < $2) AS leads,
        (SELECT count(*)::int FROM sessions WHERE started_at >= $1 AND started_at < $2 AND pageviews <= 1) AS bounce`, a),
    q<{ path: string; views: number; uniques: number; avg_ms: number | null }>(`
      SELECT path, count(*)::int AS views, count(DISTINCT visitor_id)::int AS uniques, round(avg(duration_ms))::int AS avg_ms
      FROM page_views WHERE entered_at >= $1 AND entered_at < $2
      GROUP BY path ORDER BY views DESC LIMIT 25`, a),
    q<{ path: string; sessions: number }>(`
      SELECT COALESCE(landing_path, '(unknown)') AS path, count(*)::int AS sessions
      FROM sessions WHERE started_at >= $1 AND started_at < $2 GROUP BY 1 ORDER BY sessions DESC LIMIT 10`, a),
    q<{ path: string; sessions: number }>(`
      SELECT COALESCE(exit_path, current_path, '(unknown)') AS path, count(*)::int AS sessions
      FROM sessions WHERE started_at >= $1 AND started_at < $2 AND ended_at IS NOT NULL GROUP BY 1 ORDER BY sessions DESC LIMIT 10`, a),
    q<{ path: string; visitors: number }>(`
      SELECT COALESCE(current_path, '(unknown)') AS path, count(*)::int AS visitors
      FROM sessions WHERE ended_at IS NULL AND last_heartbeat_at > now() - ($1 * interval '1 second')
      GROUP BY 1 ORDER BY visitors DESC LIMIT 10`, [leftAfterSeconds]),
    q<{ source: string; visitors: number; sessions: number; chats: number }>(`
      SELECT s.source, count(DISTINCT s.visitor_id)::int AS visitors, count(*)::int AS sessions,
        (SELECT count(*)::int FROM conversations c JOIN sessions s2 ON s2.id = c.session_id
          WHERE s2.source = s.source AND c.message_count > 0 AND c.created_at >= $1 AND c.created_at < $2) AS chats
      FROM sessions s WHERE s.started_at >= $1 AND s.started_at < $2
      GROUP BY s.source ORDER BY visitors DESC LIMIT 20`, a),
    q<{ source: string; leads: number }>(`
      SELECT COALESCE(s.source, v.first_source, 'Unknown') AS source, count(*)::int AS leads
      FROM leads l
      LEFT JOIN conversations c ON c.id = l.conversation_id
      LEFT JOIN sessions s ON s.id = c.session_id
      LEFT JOIN visitors v ON v.id = l.visitor_id
      WHERE l.created_at >= $1 AND l.created_at < $2 GROUP BY 1`, a),
    q<{ utm_source: string | null; utm_medium: string | null; utm_campaign: string; visitors: number; sessions: number }>(`
      SELECT utm_source, utm_medium, utm_campaign, count(DISTINCT visitor_id)::int AS visitors, count(*)::int AS sessions
      FROM sessions WHERE started_at >= $1 AND started_at < $2 AND utm_campaign IS NOT NULL
      GROUP BY 1, 2, 3 ORDER BY visitors DESC LIMIT 15`, a),
    q<{ bucket: string; visitors: number; pageviews: number; chats: number }>(`
      WITH b AS (
        SELECT generate_series(date_trunc('${unit}', $1::timestamptz AT TIME ZONE '${TZ}'),
                               date_trunc('${unit}', ($2::timestamptz - interval '1 second') AT TIME ZONE '${TZ}'),
                               interval '1 ${unit}') AS t
      )
      SELECT to_char(b.t, '${unit === "hour" ? "YYYY-MM-DD HH24:00" : "YYYY-MM-DD"}') AS bucket,
        COALESCE(sv.n, 0)::int AS visitors, COALESCE(pv.n, 0)::int AS pageviews, COALESCE(cv.n, 0)::int AS chats
      FROM b
      LEFT JOIN (SELECT date_trunc('${unit}', started_at AT TIME ZONE '${TZ}') t, count(DISTINCT visitor_id) n
                 FROM sessions WHERE started_at >= $1 AND started_at < $2 GROUP BY 1) sv ON sv.t = b.t
      LEFT JOIN (SELECT date_trunc('${unit}', entered_at AT TIME ZONE '${TZ}') t, count(*) n
                 FROM page_views WHERE entered_at >= $1 AND entered_at < $2 GROUP BY 1) pv ON pv.t = b.t
      LEFT JOIN (SELECT date_trunc('${unit}', created_at AT TIME ZONE '${TZ}') t, count(*) n
                 FROM conversations WHERE message_count > 0 AND created_at >= $1 AND created_at < $2 GROUP BY 1) cv ON cv.t = b.t
      ORDER BY b.t`, a),
    q<{ label: string; n: number }>(`
      SELECT COALESCE(device_type, 'unknown') AS label, count(DISTINCT visitor_id)::int AS n
      FROM sessions WHERE started_at >= $1 AND started_at < $2 GROUP BY 1 ORDER BY n DESC`, a),
    q<{ label: string; n: number }>(`
      SELECT COALESCE(browser, 'Unknown') || ' · ' || COALESCE(os, 'Unknown') AS label, count(DISTINCT visitor_id)::int AS n
      FROM sessions WHERE started_at >= $1 AND started_at < $2 GROUP BY 1 ORDER BY n DESC LIMIT 8`, a),
    q<{ label: string; n: number }>(`
      SELECT COALESCE(country, '??') AS label, count(DISTINCT visitor_id)::int AS n
      FROM sessions WHERE started_at >= $1 AND started_at < $2 GROUP BY 1 ORDER BY n DESC LIMIT 10`, a),
  ]);

  const leadMap = new Map(srcLeads.map((l) => [l.source, l.leads]));
  const sources = srcSessions.map((s) => ({ ...s, leads: leadMap.get(s.source) ?? 0 }));
  for (const [source, leads] of leadMap) if (!sources.some((s) => s.source === source)) sources.push({ source, visitors: 0, sessions: 0, chats: 0, leads });

  return { totals: totals[0], pages, entry, exit, active, sources, campaigns, trend, devices, browsers, countries };
}
