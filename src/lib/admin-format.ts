/** Small formatting helpers for the admin panel (Pakistan time). */

const TZ = "Asia/Karachi";

export function fmtDateTime(v: string | Date | null | undefined): string {
  if (!v) return "—";
  return new Date(v).toLocaleString("en-GB", {
    timeZone: TZ,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function fmtTime(v: string | Date): string {
  return new Date(v).toLocaleTimeString("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: true });
}

export function timeAgo(v: string | Date | null | undefined): string {
  if (!v) return "—";
  const s = Math.floor((Date.now() - new Date(v).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)}d ago`;
  return fmtDateTime(v).split(",")[0];
}

/** Country code → flag emoji (e.g. "PK" → 🇵🇰). */
export function flag(cc: string | null | undefined): string {
  if (!cc || cc.length !== 2) return "🌐";
  return String.fromCodePoint(...cc.toUpperCase().split("").map((c) => 0x1f1a5 + c.charCodeAt(0)));
}

export function deviceFromUA(ua: string | null | undefined): string {
  if (!ua) return "Unknown";
  const os = /iPhone|iPad/.test(ua) ? "iOS" : /Android/.test(ua) ? "Android" : /Windows/.test(ua) ? "Windows" : /Mac OS/.test(ua) ? "macOS" : /Linux/.test(ua) ? "Linux" : "Other";
  const browser = /Edg\//.test(ua) ? "Edge" : /OPR\//.test(ua) ? "Opera" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : /Firefox\//.test(ua) ? "Firefox" : "Browser";
  return `${browser} · ${os}`;
}

export function truncate(s: string | null | undefined, n: number): string {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export const STATUS_STYLES: Record<string, string> = {
  // leads
  new: "bg-sky-500/15 text-sky-300 ring-sky-500/30",
  contacted: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  qualified: "bg-violet-500/15 text-violet-300 ring-violet-500/30",
  converted: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  lost: "bg-zinc-500/15 text-zinc-400 ring-zinc-500/30",
  // conversations
  active: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  completed: "bg-sky-500/15 text-sky-300 ring-sky-500/30",
  abandoned: "bg-zinc-500/15 text-zinc-400 ring-zinc-500/30",
  human_handoff: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  lead: "bg-[#E07A5F]/15 text-[#F2A48F] ring-[#E07A5F]/30",
  // visitors
  online: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  idle: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  left: "bg-zinc-500/15 text-zinc-400 ring-zinc-500/30",
  returning: "bg-violet-500/15 text-violet-300 ring-violet-500/30",
};

export const STATUS_LABELS: Record<string, string> = {
  human_handoff: "Human handoff",
  active: "Active",
  idle: "Idle",
  left: "Left",
  online: "Online",
};

export function statusLabel(s: string): string {
  return STATUS_LABELS[s] ?? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ");
}

/** 522 → "08m 42s", 4000 → "1h 06m" */
export function fmtDuration(totalSeconds: number | null | undefined): string {
  const s = Math.max(0, Math.floor(totalSeconds ?? 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${String(m).padStart(2, "0")}m ${String(sec).padStart(2, "0")}s`;
}

export function fmtSeconds(v: string | Date): string {
  return new Date(v).toLocaleTimeString("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
}

export function deviceLabel(d: string | null | undefined): string {
  return d === "mobile" ? "📱 Mobile" : d === "tablet" ? "📲 Tablet" : d === "desktop" ? "🖥️ Desktop" : "Unknown";
}
