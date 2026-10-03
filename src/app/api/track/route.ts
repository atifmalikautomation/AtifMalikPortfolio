import { NextRequest, NextResponse } from "next/server";
import { ingest, type TrackPayload } from "@/lib/tracking";
import { clientIp, isBot, makeRateLimiter } from "@/lib/request-info";

/**
 * Public tracking endpoint used by <VisitorTracker/>.
 * Accepts JSON from fetch() or navigator.sendBeacon() (any content type).
 * Always answers 204 quickly; bots and malformed payloads are ignored.
 */
const limited = makeRateLimiter(240, 60_000); // per IP per minute
const MAX_BODY = 16 * 1024;

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent");
  if (isBot(ua)) return new NextResponse(null, { status: 204 });
  if (limited(clientIp(req.headers))) return new NextResponse(null, { status: 429 });

  let payload: TrackPayload;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) return new NextResponse(null, { status: 413 });
    payload = JSON.parse(text);
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const ok = await ingest(payload, req.headers);
  return new NextResponse(null, { status: ok ? 204 : 400, headers: { "Cache-Control": "no-store" } });
}
