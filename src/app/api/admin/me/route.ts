import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/** Lightweight session check used by the live connection to detect expired logins. */
export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ email: admin.email, exp: admin.exp }, { headers: { "Cache-Control": "no-store" } });
}
