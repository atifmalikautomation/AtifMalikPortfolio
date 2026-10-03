import { NextRequest, NextResponse } from "next/server";
import { saveContactLead } from "@/lib/chat-log";

const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const MAX_REQUESTS = 5;
const ipTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipTimestamps.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  ipTimestamps.set(ip, recent);
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { name, email, service, business, message, source } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // 1) Store in the admin panel database
    const saved = await saveContactLead(
      { name, email, service, business, message, source: source || "contact-form" },
      { visitorId: body.visitorId, sessionId: body.sessionId }
    );

    // 2) Optionally forward to a CRM / n8n webhook
    let forwarded = false;
    const webhookUrl = process.env.CRM_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            service: service || "Not specified",
            business: business || "Not specified",
            message,
            source: source || "contact-form",
            timestamp: new Date().toISOString(),
            ip,
          }),
          signal: AbortSignal.timeout(8000),
        });
        forwarded = response.ok;
        if (!response.ok) console.error("Webhook failed:", response.status);
      } catch (err) {
        console.error("Webhook error:", err);
      }
    }

    if (!saved && !forwarded) {
      console.error("=== CONTACT SUBMISSION NOT STORED ===", JSON.stringify({ name, email, service, business, message }));
      return NextResponse.json({ error: "Failed to submit. Please try WhatsApp instead." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
