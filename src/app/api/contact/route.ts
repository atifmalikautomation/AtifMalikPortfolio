import { NextRequest, NextResponse } from "next/server";

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

    const webhookUrl = process.env.CRM_WEBHOOK_URL;

    if (webhookUrl) {
      // Send to CRM/n8n webhook
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
      });

      if (!response.ok) {
        console.error("Webhook failed:", response.status);
        return NextResponse.json({ error: "Failed to submit. Please try WhatsApp instead." }, { status: 500 });
      }
    } else {
      // Log to console when no webhook configured (dev mode)
      console.log("=== NEW CONTACT FORM SUBMISSION ===");
      console.log(JSON.stringify({ name, email, service, business, message, source, timestamp: new Date().toISOString() }, null, 2));
      console.log("=== Set CRM_WEBHOOK_URL in .env.local to forward to your CRM ===");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
