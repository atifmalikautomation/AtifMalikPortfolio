import { NextRequest, NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin-auth";
import { ensureSchema, sql } from "@/lib/db";

const STATUSES = ["new", "contacted", "qualified", "converted", "lost"];

/** Update a lead's status and/or notes. */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  let body: { status?: unknown; notes?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const status = typeof body.status === "string" && STATUSES.includes(body.status) ? body.status : null;
  const notes = typeof body.notes === "string" ? body.notes.slice(0, 5000) : null;
  if (!status && notes === null) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  await ensureSchema();
  const rows = await sql()`
    UPDATE leads SET
      status = COALESCE(${status}, status),
      notes = CASE WHEN ${notes !== null} THEN ${notes} ELSE notes END,
      updated_at = now()
    WHERE id = ${id} RETURNING id, status, notes`;
  if (!rows.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, lead: rows[0] });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  await ensureSchema();
  await sql()`DELETE FROM leads WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
