import { NextRequest, NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin-auth";
import { getAnalytics, resolveRange } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

/** GET /api/admin/analytics?range=today|yesterday|7d|30d|custom&from=YYYY-MM-DD&to=YYYY-MM-DD */
export async function GET(req: NextRequest) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sp = req.nextUrl.searchParams;
  const range = resolveRange(sp.get("range") ?? undefined, sp.get("from") ?? undefined, sp.get("to") ?? undefined);
  try {
    const data = await getAnalytics(range);
    return NextResponse.json({ range: { key: range.key, label: range.label, from: range.from, to: range.to }, ...data }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("admin analytics: failed", err);
    return NextResponse.json({ error: "Database temporarily unavailable" }, { status: 503 });
  }
}
