import { getAdmin } from "@/lib/admin-auth";
import { getLiveSnapshot } from "@/lib/admin-data";
import { isDbConfigured } from "@/lib/db";
import { sweepLeftSessions } from "@/lib/tracking";

/**
 * Server-Sent Events stream for the admin panel.
 *
 * Vercel serverless functions can't hold WebSockets, so we poll the database
 * every few seconds inside a short-lived SSE response and push a snapshot only
 * when something changed. The stream closes itself before `maxDuration`; the
 * browser's EventSource reconnects automatically (retry: 2s).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const TICK_MS = 3000;
const LIFETIME_MS = 50_000;
const SWEEP_EVERY_MS = 10_000;

export async function GET(req: Request) {
  if (!(await getAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured()) return Response.json({ error: "Database not configured" }, { status: 503 });

  const encoder = new TextEncoder();
  const started = Date.now();
  let closed = false;
  req.signal.addEventListener("abort", () => { closed = true; });

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (chunk: string) => {
        if (closed) return;
        try { controller.enqueue(encoder.encode(chunk)); } catch { closed = true; }
      };
      send("retry: 2000\n\n");

      let lastKey = "";
      let lastSweep = 0;
      let lastPing = Date.now();

      while (!closed && Date.now() - started < LIFETIME_MS) {
        try {
          if (Date.now() - lastSweep > SWEEP_EVERY_MS) {
            await sweepLeftSessions();
            lastSweep = Date.now();
          }
          const snap = await getLiveSnapshot();
          // Change detection ignores the server clock
          const key = JSON.stringify({ ...snap, now: 0 });
          if (key !== lastKey) {
            lastKey = key;
            send(`event: snapshot\ndata: ${JSON.stringify(snap)}\n\n`);
            lastPing = Date.now();
          } else if (Date.now() - lastPing > 15_000) {
            send(`: ping\n\n`);
            lastPing = Date.now();
          }
        } catch (err) {
          console.error("admin stream: snapshot failed", err);
          send(`event: problem\ndata: ${JSON.stringify({ message: "Database temporarily unavailable" })}\n\n`);
        }
        await new Promise((r) => setTimeout(r, TICK_MS));
      }
      if (!closed) {
        closed = true;
        try { controller.close(); } catch { /* already closed */ }
      }
    },
    cancel() { closed = true; },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
