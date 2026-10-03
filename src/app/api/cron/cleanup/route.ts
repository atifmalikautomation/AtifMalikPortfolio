import { NextRequest, NextResponse } from "next/server";
import { isDbConfigured } from "@/lib/db";
import { applyRetention, sweepLeftSessions } from "@/lib/tracking";

export const dynamic = "force-dynamic";

/**
 * Daily maintenance (Vercel Cron, see vercel.json): closes stale sessions and
 * applies the data-retention policy. Vercel sends `Authorization: Bearer $CRON_SECRET`.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured()) return NextResponse.json({ ok: true, skipped: "no database" });
  try {
    const closed = await sweepLeftSessions();
    const { deleted } = await applyRetention();
    return NextResponse.json({ ok: true, closed, deleted });
  } catch (err) {
    console.error("cron cleanup failed", err);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}
