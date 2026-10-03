"use client";

/**
 * Real-time layer for the admin panel.
 * - Opens an EventSource to /api/admin/stream (auto-reconnects; server closes every ~50s).
 * - If the stream errors hard, checks the login (/api/admin/me) → redirects on expiry,
 *   otherwise falls back to a one-off poll and retries with exponential backoff.
 * - Emits subtle toasts for new visitors, chat messages and leads.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { LiveSnapshot } from "@/lib/admin-data";

export type ConnState = "connecting" | "live" | "reconnecting" | "offline";
type Toast = { id: number; text: string; href?: string; tone: "green" | "coral" | "sky" };

type LiveCtx = { snap: LiveSnapshot | null; conn: ConnState; offsetMs: number; problem: string | null };
const Ctx = createContext<LiveCtx>({ snap: null, conn: "connecting", offsetMs: 0, problem: null });

export const useLive = () => useContext(Ctx);

/** Ticking "server now" (ms), corrected for clock skew between browser and server. */
export function useNow(intervalMs = 1000): number {
  const { offsetMs } = useLive();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now + offsetMs;
}

export function LiveProvider({ children }: { children: React.ReactNode }) {
  const [snap, setSnap] = useState<LiveSnapshot | null>(null);
  const [conn, setConn] = useState<ConnState>("connecting");
  const [offsetMs, setOffset] = useState(0);
  const [problem, setProblem] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const lastMax = useRef<number | null>(null);
  const toastId = useRef(0);

  const pushToast = useCallback((t: Omit<Toast, "id">) => {
    const id = ++toastId.current;
    setToasts((list) => [...list.slice(-3), { ...t, id }]);
    setTimeout(() => setToasts((list) => list.filter((x) => x.id !== id)), 5000);
  }, []);

  const apply = useCallback((s: LiveSnapshot) => {
    setSnap(s);
    setProblem(null);
    setOffset(new Date(s.now).getTime() - Date.now());
    if (lastMax.current !== null && s.maxEventId > lastMax.current) {
      const fresh = s.events.filter((e) => e.id > lastMax.current!);
      const arrived = fresh.filter((e) => e.type === "VISITOR_ENTERED" || e.type === "VISITOR_RETURNED").length;
      const msgs = fresh.filter((e) => e.type === "CHATBOT_MESSAGE");
      const leads = fresh.filter((e) => e.type === "LEAD_CREATED");
      if (arrived) pushToast({ text: arrived > 1 ? `${arrived} new visitors arrived` : "New visitor arrived", href: "/admin/live", tone: "green" });
      if (msgs.length) {
        const cid = msgs[0].metadata?.conversationId;
        pushToast({ text: msgs.length > 1 ? `${msgs.length} new chatbot messages` : "New chatbot message", href: typeof cid === "string" ? `/admin/conversations/${cid}` : "/admin/conversations", tone: "sky" });
      }
      if (leads.length) pushToast({ text: leads.length > 1 ? `${leads.length} new leads created` : "New lead created", href: "/admin/leads", tone: "coral" });
    }
    lastMax.current = s.maxEventId;
  }, [pushToast]);

  useEffect(() => {
    let es: EventSource | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let attempt = 0;
    let disposed = false;

    const poll = async () => {
      try {
        const res = await fetch("/api/admin/visitors/live", { cache: "no-store" });
        if (res.status === 401) return "auth";
        if (res.ok) apply(await res.json());
        return res.ok ? "ok" : "fail";
      } catch {
        return "fail";
      }
    };

    const connect = () => {
      if (disposed) return;
      es = new EventSource("/api/admin/stream");
      es.addEventListener("snapshot", (ev) => {
        attempt = 0;
        setConn("live");
        try { apply(JSON.parse((ev as MessageEvent).data)); } catch { /* ignore malformed */ }
      });
      es.addEventListener("problem", (ev) => {
        try { setProblem(JSON.parse((ev as MessageEvent).data).message); } catch { /* ignore */ }
      });
      es.onopen = () => setConn("live");
      es.onerror = async () => {
        if (disposed) return;
        if (!navigator.onLine) { setConn("offline"); return; }
        if (es && es.readyState === EventSource.CONNECTING) { setConn("reconnecting"); return; } // browser retries itself
        // Hard failure (non-200 response): find out why, then retry with backoff
        es?.close();
        setConn("reconnecting");
        const me = await fetch("/api/admin/me", { cache: "no-store" }).catch(() => null);
        if (me?.status === 401) { window.location.href = "/admin/login?expired=1"; return; }
        const r = await poll();
        if (r === "auth") { window.location.href = "/admin/login?expired=1"; return; }
        attempt++;
        const delay = Math.min(30_000, 1000 * 2 ** attempt);
        retryTimer = setTimeout(connect, delay);
      };
    };

    const onOffline = () => setConn("offline");
    const onOnline = () => { setConn("reconnecting"); es?.close(); if (retryTimer) clearTimeout(retryTimer); attempt = 0; connect(); };
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    connect();

    return () => {
      disposed = true;
      es?.close();
      if (retryTimer) clearTimeout(retryTimer);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, [apply]);

  const value = useMemo(() => ({ snap, conn, offsetMs, problem }), [snap, conn, offsetMs, problem]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-72 max-w-[calc(100vw-2rem)]" aria-live="polite">
        {toasts.map((t) => (
          <Link key={t.id} href={t.href ?? "/admin/live"}
            className="flex items-center gap-2.5 rounded-xl bg-[#161D2C]/95 backdrop-blur ring-1 ring-white/10 shadow-xl px-4 py-3 text-sm text-zinc-100 hover:ring-white/20">
            <span className={`w-2 h-2 rounded-full shrink-0 ${t.tone === "green" ? "bg-emerald-400" : t.tone === "coral" ? "bg-[#E07A5F]" : "bg-sky-400"}`} />
            {t.text}
          </Link>
        ))}
      </div>
    </Ctx.Provider>
  );
}

/** Small connection indicator for the sidebar. */
export function ConnectionBadge() {
  const { conn, problem } = useLive();
  const map: Record<ConnState, [string, string]> = {
    connecting: ["bg-zinc-400 animate-pulse", "Connecting…"],
    live: ["bg-emerald-400", "Live"],
    reconnecting: ["bg-amber-400 animate-pulse", "Reconnecting…"],
    offline: ["bg-red-500", "Offline"],
  };
  const [dot, label] = problem ? ["bg-amber-400 animate-pulse", "DB issue"] : map[conn];
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400" title={problem ?? label}>
      <span className={`w-2 h-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

/** Re-fetches server-rendered data when live events arrive (throttled). */
export function AutoRefresh({ minIntervalMs = 8000 }: { minIntervalMs?: number }) {
  const router = useRouter();
  const { snap } = useLive();
  const last = useRef<{ id: number | null; at: number }>({ id: null, at: 0 });
  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!snap) return;
    if (last.current.id === null) { last.current.id = snap.maxEventId; return; }
    if (snap.maxEventId === last.current.id) return;
    last.current.id = snap.maxEventId;
    const wait = Math.max(0, minIntervalMs - (Date.now() - last.current.at));
    if (pending.current) return;
    pending.current = setTimeout(() => {
      pending.current = null;
      last.current.at = Date.now();
      if (document.visibilityState === "visible") router.refresh();
    }, wait);
  }, [snap, router, minIntervalMs]);

  useEffect(() => () => { if (pending.current) clearTimeout(pending.current); }, []);
  return null;
}
