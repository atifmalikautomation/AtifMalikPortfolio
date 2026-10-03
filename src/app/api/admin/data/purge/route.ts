import { NextRequest, NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin-auth";
import { ensureSchema, sql } from "@/lib/db";
import { applyRetention, sweepLeftSessions } from "@/lib/tracking";

/**
 * Data deletion tools (Settings → Privacy & data).
 *  - scope "retention": delete everything older than the configured retention period now
 *  - scope "tracking":  delete ALL visitor tracking data (events, page views, sessions,
 *                       visitors without chats/leads). Chats and leads are kept.
 *  - scope "everything": delete all tracking, conversations and leads.
 * Destructive scopes require { confirm: "DELETE" }.
 */
export async function POST(req: NextRequest) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { scope?: unknown; confirm?: unknown } | null;
  const scope = body?.scope;
  await ensureSchema();
  const db = sql();

  if (scope === "retention") {
    await sweepLeftSessions();
    const { deleted } = await applyRetention();
    return NextResponse.json({ ok: true, deleted });
  }
  if (body?.confirm !== "DELETE") return NextResponse.json({ error: 'Type "DELETE" to confirm' }, { status: 400 });

  if (scope === "tracking") {
    await db`DELETE FROM visitor_events`;
    await db`DELETE FROM page_views`;
    await db`DELETE FROM sessions`;
    await db`
      DELETE FROM visitors v
      WHERE NOT EXISTS (SELECT 1 FROM conversations c WHERE c.visitor_id = v.id)
        AND NOT EXISTS (SELECT 1 FROM leads l WHERE l.visitor_id = v.id)`;
    return NextResponse.json({ ok: true });
  }
  if (scope === "everything") {
    await db`DELETE FROM leads`;
    await db`DELETE FROM conversations`;
    await db`DELETE FROM visitor_events`;
    await db`DELETE FROM page_views`;
    await db`DELETE FROM sessions`;
    await db`DELETE FROM visitors`;
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Unknown scope" }, { status: 400 });
}
