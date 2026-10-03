import { NextRequest, NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin-auth";
import { listConversations } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

/** GET /api/admin/conversations?q=&status=&range=&from=&to=&page= */
export async function GET(req: NextRequest) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sp = Object.fromEntries(req.nextUrl.searchParams);
  const data = await listConversations({ ...sp, page: Number(sp.page) || 1 });
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}
