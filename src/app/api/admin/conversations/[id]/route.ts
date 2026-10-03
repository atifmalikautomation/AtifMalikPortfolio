import { NextRequest, NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin-auth";
import { getConversation } from "@/lib/admin-data";
import { ensureSchema, sql } from "@/lib/db";
import { isValidConversationId } from "@/lib/chat-log";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!isValidConversationId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const data = await getConversation(id);
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

/** Flag / unflag a conversation for human handoff. */
export async function PATCH(req: NextRequest, { params }: Ctx) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!isValidConversationId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const body = (await req.json().catch(() => null)) as { handoff?: unknown } | null;
  if (typeof body?.handoff !== "boolean") return NextResponse.json({ error: "handoff (boolean) required" }, { status: 400 });
  await ensureSchema();
  const rows = await sql()`UPDATE conversations SET handoff = ${body.handoff} WHERE id = ${id} RETURNING id, handoff`;
  if (!rows.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, conversation: rows[0] });
}

/** Permanently delete a conversation and its messages (e.g. on a visitor's privacy request). */
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!isValidConversationId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  await ensureSchema();
  await sql()`DELETE FROM conversations WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
