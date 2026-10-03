import { NextRequest, NextResponse, after } from "next/server";
import { isValidConversationId, requestMeta, upsertConversation } from "@/lib/chat-log";
import { clientIp, makeRateLimiter } from "@/lib/request-info";

/**
 * Called once when a visitor joins the chat (name + email form).
 * Registers the conversation (linked to the anonymous visitor/session) and the
 * lead right away, so details are captured even if the visitor leaves without
 * sending a message.
 */
const limited = makeRateLimiter(10, 60_000);

export async function POST(req: NextRequest) {
  if (limited(clientIp(req.headers))) return NextResponse.json({ ok: false }, { status: 429 });

  let body: {
    conversationId?: unknown;
    visitorId?: unknown;
    sessionId?: unknown;
    visitor?: { name?: unknown; email?: unknown; referrer?: unknown };
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!isValidConversationId(body.conversationId)) return NextResponse.json({ ok: false }, { status: 400 });

  const conversationId = body.conversationId;
  const str = (v: unknown) => (typeof v === "string" ? v : undefined);
  const visitor = { name: str(body.visitor?.name), email: str(body.visitor?.email), referrer: str(body.visitor?.referrer), source: "chat" };
  const ids = { visitorId: str(body.visitorId), sessionId: str(body.sessionId), page: "/chat" };
  const meta = requestMeta(req.headers);
  after(() => upsertConversation(conversationId, visitor, meta, ids));
  return NextResponse.json({ ok: true });
}
