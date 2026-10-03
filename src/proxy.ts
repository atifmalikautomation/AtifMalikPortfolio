import { NextResponse, type NextRequest } from "next/server";
import { readSessionToken, SESSION_COOKIE } from "@/lib/admin-session";

/**
 * Authentication gate for the admin panel (Next.js 16 "proxy", formerly middleware).
 * Every route handler / page also re-checks the session (defense in depth).
 */
export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
