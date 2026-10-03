/**
 * Visitor tracking engine.
 *
 * The browser (VisitorTracker) sends batched events + heartbeats to /api/track.
 * This module turns them into visitors / sessions / page_views rows and an
 * append-only visitor_events log. "LEFT" is never guessed by the client: a
 * session is closed by `sweepLeftSessions()` only after no heartbeat has been
 * received for `leftAfterSeconds` (configurable in Settings).
 */
import "server-only";
import { ensureSchema, getSettings, isDbConfigured, sql } from "@/lib/db";
import { geoFromHeaders, isUuid, parseUA, trafficSource } from "@/lib/request-info";

/** All event types. Add new ones here; the log is schemaless (JSONB metadata). */
export const EVENT_TYPES = [
  "VISITOR_ENTERED",
  "VISITOR_RETURNED",
  "SESSION_STARTED",
  "SESSION_RESUMED",
  "SESSION_ENDED",
  "PAGE_VIEW",
  "PAGE_EXIT",
  "VISITOR_IDLE",
  "VISITOR_ACTIVE",
  "VISITOR_LEFT",
  "CHATBOT_OPENED",
  "CHATBOT_MESSAGE",
  "CHATBOT_RESPONSE",
  "LEAD_CREATED",
  "LEAD_UPDATED",
  "CONTACT_FORM_SUBMITTED",
] as const;
export type EventType = (typeof EVENT_TYPES)[number];

/** Event types the browser is allowed to send (others are server-generated). */
const CLIENT_EVENTS = new Set(["page_view", "page_exit", "heartbeat", "idle", "active", "chatbot_opened"]);

export type TrackPayload = {
  v: string; // visitor id
  s: string; // session id
  events: { t: string; p?: string; ti?: string; m?: Record<string, unknown> }[];
  hb?: { vis?: boolean; ia?: number }; // visible, ms since last interaction
  ctx?: {
    ref?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    landing?: string;
    screen?: string;
    lang?: string;
  };
};

const str = (v: unknown, max: number): string | null =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

const cleanPath = (v: unknown): string | null => {
  const p = str(v, 300);
  return p && p.startsWith("/") ? p : null;
};

export function shortId(uuid: string): string {
  return uuid.replace(/-/g, "").slice(0, 6).toUpperCase();
}

export async function logEvent(
  type: EventType,
  opts: { visitorId?: string | null; sessionId?: string | null; path?: string | null; meta?: Record<string, unknown>; at?: string }
): Promise<void> {
  if (!isDbConfigured()) return;
  try {
    await ensureSchema();
    const v = opts.visitorId && isUuid(opts.visitorId) ? opts.visitorId : null;
    const s = opts.sessionId && isUuid(opts.sessionId) ? opts.sessionId : null;
    // Sub-selects keep foreign keys valid even if the visitor/session row doesn't exist (e.g. tracking opted out)
    await sql()`
      INSERT INTO visitor_events (visitor_id, session_id, type, path, metadata, created_at)
      VALUES ((SELECT id FROM visitors WHERE id = ${v}), (SELECT id FROM sessions WHERE id = ${s}),
              ${type}, ${opts.path ?? null}, ${JSON.stringify(opts.meta ?? {})}::jsonb, COALESCE(${opts.at ?? null}::timestamptz, now()))`;
  } catch (err) {
    console.error("tracking: logEvent failed", type, err);
  }
}

/** Main ingest. Returns false for invalid payloads. Never throws. */
export async function ingest(payload: TrackPayload, headers: Headers): Promise<boolean> {
  if (!isDbConfigured()) return true;
  if (!isUuid(payload?.v) || !isUuid(payload?.s) || !Array.isArray(payload.events)) return false;
  const visitorId = payload.v;
  const sessionId = payload.s;
  const events = payload.events.filter((e) => e && CLIENT_EVENTS.has(e.t)).slice(0, 20);
  const visible = payload.hb?.vis !== false;
  const interactedAgoMs = Math.max(0, Math.min(Number(payload.hb?.ia) || 0, 24 * 3600_000));

  try {
    await ensureSchema();
    const db = sql();

    // ── Fast path: known open session → one UPDATE (most requests are heartbeats) ──
    const touched = (await db`
      WITH prev AS (SELECT ended_at FROM sessions WHERE id = ${sessionId} AND visitor_id = ${visitorId})
      UPDATE sessions SET
        last_heartbeat_at = now(),
        visible = ${visible},
        last_interaction_at = GREATEST(last_interaction_at, now() - (${interactedAgoMs} * interval '1 millisecond')),
        ended_at = NULL
      WHERE id = ${sessionId} AND visitor_id = ${visitorId}
      RETURNING (SELECT ended_at FROM prev) AS was_ended, current_path`) as { was_ended: string | null; current_path: string | null }[];

    if (!touched.length) {
      await startSession(visitorId, sessionId, payload, headers, visible);
    } else if (touched[0].was_ended) {
      await logEvent("SESSION_RESUMED", { visitorId, sessionId, path: touched[0].current_path });
    }

    await db`UPDATE visitors SET last_seen_at = now() WHERE id = ${visitorId}`;

    for (const e of events) {
      const path = cleanPath(e.p);
      switch (e.t) {
        case "page_view": {
          if (!path) break;
          const title = str(e.ti, 200);
          await closeOpenPageView(sessionId);
          await db`INSERT INTO page_views (session_id, visitor_id, path, title) VALUES (${sessionId}, ${visitorId}, ${path}, ${title})`;
          await db`
            UPDATE sessions SET current_path = ${path}, current_title = ${title}, exit_path = ${path},
              pageviews = pageviews + 1, last_interaction_at = now()
            WHERE id = ${sessionId}`;
          await db`UPDATE visitors SET pageview_count = pageview_count + 1 WHERE id = ${visitorId}`;
          await logEvent("PAGE_VIEW", { visitorId, sessionId, path, meta: title ? { title } : {} });
          break;
        }
        case "page_exit": {
          const duration = await closeOpenPageView(sessionId);
          await db`UPDATE sessions SET visible = false WHERE id = ${sessionId}`;
          await logEvent("PAGE_EXIT", { visitorId, sessionId, path, meta: duration != null ? { durationMs: duration } : {} });
          break;
        }
        case "idle":
          await logEvent("VISITOR_IDLE", { visitorId, sessionId, path });
          break;
        case "active":
          await logEvent("VISITOR_ACTIVE", { visitorId, sessionId, path });
          break;
        case "chatbot_opened": {
          await db`UPDATE sessions SET chat_opened = true WHERE id = ${sessionId}`;
          const where = str(e.m?.where, 30);
          await logEvent("CHATBOT_OPENED", { visitorId, sessionId, path, meta: where ? { where } : {} });
          break;
        }
        // "heartbeat" needs no extra work beyond the session touch above
      }
    }

    // Opportunistically close stale sessions so "LEFT" stays accurate even with no admin open
    if (Math.random() < 0.1) await sweepLeftSessions();
    return true;
  } catch (err) {
    console.error("tracking: ingest failed", err);
    return true; // don't make the browser retry-storm on DB errors
  }
}

async function startSession(visitorId: string, sessionId: string, payload: TrackPayload, headers: Headers, visible: boolean) {
  const db = sql();
  const ua = headers.get("user-agent");
  const { deviceType, browser, os } = parseUA(ua);
  const geo = geoFromHeaders(headers);
  const ctx = payload.ctx ?? {};
  const utmSource = str(ctx.utm_source, 80);
  const host = headers.get("host");
  const { source, referrerHost } = trafficSource({ referrer: str(ctx.ref, 500), utmSource, siteHost: host });
  const landing = cleanPath(ctx.landing) ?? cleanPath(payload.events.find((e) => e.t === "page_view")?.p);
  const referrer = referrerHost ? str(ctx.ref, 500) : null;

  // Visitor: create or detect returning
  const v = (await db`
    INSERT INTO visitors (id, short_id, first_source, first_referrer, first_landing, country, region, city, device_type, browser, os)
    VALUES (${visitorId}, ${shortId(visitorId)}, ${source}, ${referrer}, ${landing}, ${geo.country}, ${geo.region}, ${geo.city},
            ${deviceType}, ${browser}, ${os})
    ON CONFLICT (id) DO UPDATE SET
      last_seen_at = now(),
      country = COALESCE(EXCLUDED.country, visitors.country),
      region = COALESCE(EXCLUDED.region, visitors.region),
      city = COALESCE(EXCLUDED.city, visitors.city),
      device_type = EXCLUDED.device_type, browser = EXCLUDED.browser, os = EXCLUDED.os
    RETURNING session_count`) as { session_count: number }[];
  const isReturning = (v[0]?.session_count ?? 0) > 0;

  const inserted = (await db`
    INSERT INTO sessions (id, visitor_id, landing_path, current_path, exit_path, referrer, source, utm_source, utm_medium, utm_campaign,
                          device_type, browser, os, screen, language, country, region, city, is_returning, visible)
    VALUES (${sessionId}, ${visitorId}, ${landing}, ${landing}, ${landing}, ${referrer}, ${source}, ${utmSource},
            ${str(ctx.utm_medium, 80)}, ${str(ctx.utm_campaign, 120)}, ${deviceType}, ${browser}, ${os},
            ${str(ctx.screen, 20)}, ${str(ctx.lang, 20)}, ${geo.country}, ${geo.region}, ${geo.city}, ${isReturning}, ${visible})
    ON CONFLICT (id) DO NOTHING
    RETURNING id`) as { id: string }[];
  if (!inserted.length) return; // session id belongs to someone else / race: ignore

  await db`UPDATE visitors SET session_count = session_count + 1 WHERE id = ${visitorId}`;
  const meta = { source, referrer: referrerHost, device: deviceType, browser, os, country: geo.country, city: geo.city, utm_campaign: str(ctx.utm_campaign, 120) };
  await logEvent("SESSION_STARTED", { visitorId, sessionId, path: landing, meta });
  await logEvent(isReturning ? "VISITOR_RETURNED" : "VISITOR_ENTERED", { visitorId, sessionId, path: landing, meta });
}

/** Close the session's open page view. Returns its duration in ms (or null). */
async function closeOpenPageView(sessionId: string): Promise<number | null> {
  const rows = (await sql()`
    UPDATE page_views SET left_at = now(),
      duration_ms = LEAST(EXTRACT(EPOCH FROM (now() - entered_at)) * 1000, 3600000)::int
    WHERE id = (SELECT id FROM page_views WHERE session_id = ${sessionId} AND left_at IS NULL ORDER BY entered_at DESC LIMIT 1)
    RETURNING duration_ms`) as { duration_ms: number }[];
  // Any older dangling rows (e.g. lost beacons) get closed without a duration
  await sql()`UPDATE page_views SET left_at = entered_at WHERE session_id = ${sessionId} AND left_at IS NULL AND entered_at < now() - interval '2 hours'`;
  return rows[0]?.duration_ms ?? null;
}

/**
 * Close sessions with no heartbeat for `leftAfterSeconds`.
 * "Left at" is the time of the last heartbeat actually received.
 */
export async function sweepLeftSessions(): Promise<number> {
  if (!isDbConfigured()) return 0;
  try {
    await ensureSchema();
    const { leftAfterSeconds } = await getSettings();
    const db = sql();
    const closed = (await db`
      UPDATE sessions SET ended_at = last_heartbeat_at, visible = false
      WHERE ended_at IS NULL AND last_heartbeat_at < now() - (${leftAfterSeconds} * interval '1 second')
      RETURNING id, visitor_id, current_path, started_at, last_heartbeat_at,
        EXTRACT(EPOCH FROM (last_heartbeat_at - started_at))::int AS duration_s`) as {
      id: string;
      visitor_id: string;
      current_path: string | null;
      last_heartbeat_at: string;
      duration_s: number;
    }[];
    for (const s of closed) {
      await db`
        UPDATE page_views SET left_at = ${s.last_heartbeat_at},
          duration_ms = GREATEST(0, LEAST(EXTRACT(EPOCH FROM (${s.last_heartbeat_at}::timestamptz - entered_at)) * 1000, 3600000))::int
        WHERE session_id = ${s.id} AND left_at IS NULL`;
      const at = new Date(s.last_heartbeat_at).toISOString();
      await logEvent("VISITOR_LEFT", { visitorId: s.visitor_id, sessionId: s.id, path: s.current_path, at, meta: { durationS: s.duration_s } });
      await logEvent("SESSION_ENDED", { visitorId: s.visitor_id, sessionId: s.id, path: s.current_path, at, meta: { durationS: s.duration_s } });
    }
    return closed.length;
  } catch (err) {
    console.error("tracking: sweep failed", err);
    return 0;
  }
}

/** Delete data older than the retention period (run daily by cron). */
export async function applyRetention(): Promise<{ deleted: number }> {
  await ensureSchema();
  const { retentionDays } = await getSettings();
  if (!retentionDays || retentionDays <= 0) return { deleted: 0 };
  const db = sql();
  const cutoff = `${retentionDays} days`;
  const ev = await db`DELETE FROM visitor_events WHERE created_at < now() - ${cutoff}::interval RETURNING 1`;
  const conv = await db`DELETE FROM conversations WHERE last_message_at < now() - ${cutoff}::interval RETURNING 1`;
  const sess = await db`DELETE FROM sessions WHERE COALESCE(ended_at, last_heartbeat_at) < now() - ${cutoff}::interval RETURNING 1`;
  // Visitors with nothing left and not seen within retention
  const vis = await db`
    DELETE FROM visitors v WHERE v.last_seen_at < now() - ${cutoff}::interval
      AND NOT EXISTS (SELECT 1 FROM leads l WHERE l.visitor_id = v.id) RETURNING 1`;
  return { deleted: ev.length + conv.length + sess.length + vis.length };
}
