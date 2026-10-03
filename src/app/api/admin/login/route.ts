import { NextRequest, NextResponse } from "next/server";
import {
  authenticate,
  clearLoginAttempts,
  createSessionToken,
  loginRateLimited,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (loginRateLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.slice(0, 200) : "";
  const password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  try {
    const user = await authenticate(email, password);
    if (!user) return NextResponse.json({ error: "Wrong email or password." }, { status: 401 });

    clearLoginAttempts(ip);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, createSessionToken(user.id, user.email), sessionCookieOptions);
    return res;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json({ error: "Login is temporarily unavailable." }, { status: 500 });
  }
}
