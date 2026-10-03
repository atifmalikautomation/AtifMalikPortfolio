import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin-auth";
import { getLiveSnapshot } from "@/lib/admin-data";
import { sweepLeftSessions } from "@/lib/tracking";

export const dynamic = "force-dynamic";

/** One-off live snapshot (polling fallback for the SSE stream). */
export async function GET() {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await sweepLeftSessions();
    return NextResponse.json(await getLiveSnapshot(), { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("admin live: failed", err);
    return NextResponse.json({ error: "Database temporarily unavailable" }, { status: 503 });
  }
}
