import { NextResponse, type NextRequest } from "next/server";
import { readSessionToken, SESSION_COOKIE } from "@/lib/admin-session";

/**
 * Authentication gate for the admin panel (Next.js 16 "proxy", formerly middleware).
 * Every route handler / page also re-checks the session (defense in depth).
 */
const CANONICAL_HOST = "atifmalik.me";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host") || "";

  // Redirect non-canonical hosts to canonical
  // TODO: Remove .vercel.app exception once DNS points atifmalik.me to Vercel
  if (
    host &&
    host !== CANONICAL_HOST &&
    host !== `www.${CANONICAL_HOST}` &&
    !host.startsWith("localhost") &&
    !host.endsWith(".vercel.app")
  ) {
    const url = new URL(req.url);
    url.host = CANONICAL_HOST;
    url.protocol = "https:";
    const response = NextResponse.redirect(url, 301);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  // Redirect www to apex
  if (host === `www.${CANONICAL_HOST}`) {
    const url = new URL(req.url);
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 301);
  }

  // Public admin routes — no auth needed
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // Protected admin routes — require valid session
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    const session = await readSessionToken(token);
    if (!session) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Canonical host redirect (all pages)
    "/((?!_next/static|_next/image|favicon.ico|icon-|images/|videos/|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|mp4|txt|xml|json)).*)",
  ],
};
