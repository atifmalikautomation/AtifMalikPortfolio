import { NextResponse, type NextRequest } from "next/server";
import { readSessionToken, SESSION_COOKIE } from "@/lib/admin-session";

/**
 * Authentication gate for the admin panel (Next.js 16 "proxy", formerly middleware).
 * Every route handler / page also re-checks the session (defense in depth).
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublic = pathname === "/admin/login" || pathname === "/api/admin/login";
  if (isPublic) return NextResponse.next();

  const session = readSessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (session) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  const res = NextResponse.redirect(url);
  // Clear an expired/invalid cookie so the login page doesn't loop
  if (req.cookies.get(SESSION_COOKIE)) res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
