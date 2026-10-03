import { NextRequest, NextResponse } from "next/server";
import { changePassword, getAdmin, loginRateLimited } from "@/lib/admin-auth";
import { clientIp } from "@/lib/request-info";

/** Change the signed-in admin's password. */
export async function POST(req: NextRequest) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (loginRateLimited(`pw:${admin.uid}:${clientIp(req.headers)}`)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }
  const body = (await req.json().catch(() => null)) as { current?: unknown; next?: unknown } | null;
  if (typeof body?.current !== "string" || typeof body?.next !== "string" || body.next.length > 200) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const result = await changePassword(admin.uid, body.current, body.next);
  if (result === "weak") return NextResponse.json({ error: "New password must be at least 10 characters" }, { status: 400 });
  if (result === "wrong") return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
