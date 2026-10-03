/**
 * Chatbot + lead logging.
 *
 * Links every conversation to the anonymous visitor/session (when tracking is
 * allowed), stores each message, emits CHATBOT_* / LEAD_* events and detects
 * leads (email or phone shared voluntarily in the join form or in a message).
 *
 * All functions are "fire-and-forget safe": they never throw, so a database
 * problem can never break the visitor's chat experience.
 */
import "server-only";
import { ensureSchema, isDbConfigured, sql } from "@/lib/db";
import { isUuid, geoFromHeaders } from "@/lib/request-info";
import { logEvent } from "@/lib/tracking";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_IN_TEXT = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const PHONE_IN_TEXT = /(?:\+|00)?\d[\d\s().-]{8,16}\d/;

export const isValidConversationId = isUuid;

export type VisitorInfo = { name?: string; email?: string; source?: string; referrer?: string };
export type TrackingIds = { visitorId?: string; sessionId?: string; page?: string };
export type RequestMeta = { country?: string | null; city?: string | null; userAgent?: string };

export function requestMeta(headers: Headers): RequestMeta {
  const geo = geoFromHeaders(headers);
  return { country: geo.country, city: geo.city, userAgent: headers.get("user-agent")?.slice(0, 300) || undefined };
}

const clean = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);
const validId = (v: unknown) => (isUuid(v) ? v : null);

/** Create/refresh a conversation; turns a visitor who shared an email into a lead. */
export async function upsertConversation(id: string, visitor: VisitorInfo, meta: RequestMeta, ids: TrackingIds = {}): Promise<void> {
  if (!isDbConfigured() || !isUuid(id)) return;
  try {
    await ensureSchema();
    const db = sql();
    const name = clean(visitor.name, 80);
    const emailRaw = clean(visitor.email, 200);
    const email = emailRaw && EMAIL_RE.test(emailRaw) ? emailRaw.toLowerCase() : null;
    const vid = validId(ids.visitorId);
    const sid = validId(ids.sessionId);
    const page = clean(ids.page, 300);

    const rows = (await db`
      INSERT INTO conversations (id, visitor_id, session_id, visitor_name, visitor_email, source, page, country, city, user_agent, referrer)
      VALUES (${id}, (SELECT id FROM visitors WHERE id = ${vid}), (SELECT id FROM sessions WHERE id = ${sid}),
              ${name}, ${email}, ${clean(visitor.source, 40) ?? "chat"}, ${page}, ${meta.country ?? null}, ${meta.city ?? null},
              ${meta.userAgent ?? null}, ${clean(visitor.referrer, 300)})
      ON CONFLICT (id) DO UPDATE SET
        visitor_name  = COALESCE(EXCLUDED.visitor_name, conversations.visitor_name),
        visitor_email = COALESCE(EXCLUDED.visitor_email, conversations.visitor_email),
        visitor_id    = COALESCE(conversations.visitor_id, EXCLUDED.visitor_id),
        session_id    = COALESCE(conversations.session_id, EXCLUDED.session_id)
      RETURNING (xmax = 0) AS inserted, visitor_id, session_id`) as { inserted: boolean; visitor_id: string | null; session_id: string | null }[];
    const conv = rows[0];

    if (conv?.visitor_id && (name || email)) {
      await db`
        UPDATE visitors SET name = COALESCE(${name}, name), email = COALESCE(${email}, email) WHERE id = ${conv.visitor_id}`;
    }
    if (conv?.session_id) await db`UPDATE sessions SET chat_opened = true WHERE id = ${conv.session_id}`;
    if (conv?.inserted) {
      await logEvent("CHATBOT_OPENED", { visitorId: conv.visitor_id, sessionId: conv.session_id, path: page ?? "/chat", meta: { conversationId: id, where: "chat_page" } });
    }
    if (email) await upsertChatLead(id, { name, email }, conv?.visitor_id ?? null, conv?.session_id ?? null);
  } catch (err) {
    console.error("chat-log: upsertConversation failed", err);
  }
}

/** One lead per conversation; merges new details in. Emits LEAD_CREATED / LEAD_UPDATED. */
async function upsertChatLead(
  conversationId: string,
  data: { name?: string | null; email?: string | null; phone?: string | null; message?: string | null },
  visitorId: string | null,
  sessionId: string | null
) {
  const db = sql();
  const rows = (await db`
    INSERT INTO leads (name, email, phone, message, source, visitor_id, conversation_id)
    VALUES (${data.name ?? null}, ${data.email ?? null}, ${data.phone ?? null}, ${data.message ?? null}, 'chat',
            (SELECT id FROM visitors WHERE id = ${visitorId}), ${conversationId})
    ON CONFLICT (conversation_id) DO UPDATE SET
      name  = COALESCE(leads.name, EXCLUDED.name),
      email = COALESCE(leads.email, EXCLUDED.email),
      phone = COALESCE(leads.phone, EXCLUDED.phone),
      message = COALESCE(leads.message, EXCLUDED.message),
      updated_at = now()
    RETURNING id, (xmax = 0) AS inserted`) as { id: number; inserted: boolean }[];
  const lead = rows[0];
  if (lead) {
    await logEvent(lead.inserted ? "LEAD_CREATED" : "LEAD_UPDATED", {
      visitorId,
      sessionId,
      path: "/chat",
      meta: { leadId: lead.id, conversationId, source: "chat", email: data.email ? true : undefined, phone: data.phone ? true : undefined },
    });
  }
}

export async function logMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string,
  extra: { model?: string; latencyMs?: number; isVoice?: boolean; page?: string } = {}
): Promise<void> {
  if (!isDbConfigured() || !isUuid(conversationId) || !content.trim()) return;
  try {
    await ensureSchema();
    const db = sql();
    await db`
      INSERT INTO messages (conversation_id, role, content, model, latency_ms, is_voice, page)
      VALUES (${conversationId}, ${role}, ${content.slice(0, 8000)}, ${extra.model ?? null},
              ${extra.latencyMs ?? null}, ${extra.isVoice ?? false}, ${clean(extra.page, 300)})`;
    const conv = (await db`
      UPDATE conversations SET message_count = message_count + 1, last_message_at = now()
      WHERE id = ${conversationId}
      RETURNING visitor_id, session_id, visitor_name, visitor_email`) as {
      visitor_id: string | null;
      session_id: string | null;
      visitor_name: string | null;
      visitor_email: string | null;
    }[];
    const c = conv[0];
    if (!c) return;

    if (role === "user" && c.session_id) await db`UPDATE sessions SET chat_messages = chat_messages + 1 WHERE id = ${c.session_id}`;

    await logEvent(role === "user" ? "CHATBOT_MESSAGE" : "CHATBOT_RESPONSE", {
      visitorId: c.visitor_id,
      sessionId: c.session_id,
      path: clean(extra.page, 300) ?? "/chat",
      meta: {
        conversationId,
        preview: content.slice(0, 140),
        ...(extra.isVoice ? { voice: true } : {}),
        ...(role === "assistant" && extra.latencyMs != null ? { latencyMs: extra.latencyMs, model: extra.model } : {}),
      },
    });

    // Lead detection: visitor shares an email/phone in the conversation
    if (role === "user") {
      const email = content.match(EMAIL_IN_TEXT)?.[0]?.toLowerCase() ?? null;
      const phoneRaw = content.match(PHONE_IN_TEXT)?.[0] ?? null;
      const phone = phoneRaw && phoneRaw.replace(/\D/g, "").length >= 9 ? phoneRaw.trim() : null;
      if (email || phone) {
        await upsertChatLead(
          conversationId,
          { name: c.visitor_name, email: email ?? c.visitor_email, phone, message: content.slice(0, 1000) },
          c.visitor_id,
          c.session_id
        );
        if (c.visitor_id && email) await db`UPDATE visitors SET email = COALESCE(email, ${email}) WHERE id = ${c.visitor_id}`;
      }
    }
  } catch (err) {
    console.error("chat-log: logMessage failed", err);
  }
}

/** Save a contact-form submission as a lead. Returns false if it couldn't be stored. */
export async function saveContactLead(
  lead: { name: string; email: string; phone?: string; service?: string; business?: string; message?: string; source?: string },
  ids: TrackingIds = {}
): Promise<boolean> {
  if (!isDbConfigured()) return false;
  try {
    await ensureSchema();
    const db = sql();
    const vid = validId(ids.visitorId);
    const email = clean(lead.email, 200)?.toLowerCase() ?? null;
    const name = clean(lead.name, 120);
    const rows = (await db`
      INSERT INTO leads (name, email, phone, company, service, message, source, visitor_id)
      VALUES (${name}, ${email}, ${clean(lead.phone, 40)}, ${clean(lead.business, 200)}, ${clean(lead.service, 120)},
              ${clean(lead.message, 5000)}, ${clean(lead.source, 40) ?? "contact-form"}, (SELECT id FROM visitors WHERE id = ${vid}))
      RETURNING id, visitor_id`) as { id: number; visitor_id: string | null }[];
    if (rows[0]?.visitor_id) {
      await db`UPDATE visitors SET name = COALESCE(name, ${name}), email = COALESCE(email, ${email}) WHERE id = ${rows[0].visitor_id}`;
    }
    await logEvent("CONTACT_FORM_SUBMITTED", { visitorId: vid, sessionId: ids.sessionId, path: "/contact", meta: { leadId: rows[0]?.id } });
    await logEvent("LEAD_CREATED", { visitorId: vid, sessionId: ids.sessionId, path: "/contact", meta: { leadId: rows[0]?.id, source: "contact-form" } });
    return true;
  } catch (err) {
    console.error("chat-log: saveContactLead failed", err);
    return false;
  }
}
