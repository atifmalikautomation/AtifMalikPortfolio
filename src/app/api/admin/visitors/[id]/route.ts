import { NextRequest, NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin-auth";
import { getVisitorProfile } from "@/lib/admin-data";
import { ensureSchema, sql } from "@/lib/db";
import { isUuid } from "@/lib/request-info";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const profile = await getVisitorProfile(id);
  if (!profile) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(profile, { headers: { "Cache-Control": "no-store" } });
}

/**
 * Permanently delete everything about a visitor (privacy request):
 * sessions, page views, events, conversations + messages (cascade) and their leads.
 */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  await ensureSchema();
  const db = sql();
  await db`DELETE FROM leads WHERE visitor_id = ${id} OR conversation_id IN (SELECT id FROM conversations WHERE visitor_id = ${id})`;
  const rows = await db`DELETE FROM visitors WHERE id = ${id} RETURNING id`;
  if (!rows.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
