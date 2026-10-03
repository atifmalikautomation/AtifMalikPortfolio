"use client";

import { useState, useSyncExternalStore } from "react";
import { isOptedOut, setTrackingOptOut } from "@/lib/tracker-client";
import type { AppSettings } from "@/lib/db";

const noopSubscribe = () => () => {};

const input = "w-full rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-2 text-sm outline-none focus:ring-[#E07A5F]/50";
const btn = "rounded-xl bg-[#E07A5F] hover:bg-[#d56a4f] px-4 py-2 text-sm font-medium text-white disabled:opacity-50";

function Msg({ m }: { m: { ok: boolean; text: string } | null }) {
  if (!m) return null;
  return <p className={`text-xs ${m.ok ? "text-emerald-300" : "text-red-300"}`}>{m.text}</p>;
}

export function TrackingSettingsForm({ initial }: { initial: AppSettings }) {
  const [s, setS] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const res = await fetch("/api/admin/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s) }).catch(() => null);
    const data = await res?.json().catch(() => null);
    setBusy(false);
    setMsg(res?.ok ? { ok: true, text: "Saved ✓" } : { ok: false, text: data?.error ?? "Couldn't save" });
  }

  const num = (k: keyof AppSettings) => (e: React.ChangeEvent<HTMLInputElement>) => setS({ ...s, [k]: Math.round(Number(e.target.value)) });

  return (
    <form onSubmit={save} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label className="space-y-1.5">
          <span className="text-xs text-zinc-400">Mark visitor as LEFT after (seconds without heartbeat)</span>
          <input type="number" min={30} max={1800} value={s.leftAfterSeconds} onChange={num("leftAfterSeconds")} className={input} />
        </label>
        <label className="space-y-1.5">
          <span className="text-xs text-zinc-400">Mark visitor as IDLE after (seconds without interaction)</span>
          <input type="number" min={15} max={1800} value={s.idleAfterSeconds} onChange={num("idleAfterSeconds")} className={input} />
        </label>
        <label className="space-y-1.5">
          <span className="text-xs text-zinc-400">Keep data for (days, 0 = forever)</span>
          <input type="number" min={0} max={3650} value={s.retentionDays} onChange={num("retentionDays")} className={input} />
        </label>
      </div>
      <p className="text-[11px] text-zinc-500">The tracker sends a heartbeat every 15s while the tab is visible (30s when hidden). Keep “LEFT after” above 60s to avoid false exits.</p>
      <div className="flex items-center gap-3">
        <button disabled={busy} className={btn}>{busy ? "Saving…" : "Save settings"}</button>
        <Msg m={msg} />
      </div>
    </form>
  );
}

export function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (next !== confirm) return setMsg({ ok: false, text: "New passwords don't match" });
    setBusy(true); setMsg(null);
    const res = await fetch("/api/admin/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ current, next }) }).catch(() => null);
    const data = await res?.json().catch(() => null);
    setBusy(false);
    if (res?.ok) { setMsg({ ok: true, text: "Password changed ✓" }); setCurrent(""); setNext(""); setConfirm(""); }
    else setMsg({ ok: false, text: data?.error ?? "Couldn't change password" });
  }

  return (
    <form onSubmit={submit} className="space-y-3 max-w-sm">
      <input type="password" autoComplete="current-password" placeholder="Current password" value={current} onChange={(e) => setCurrent(e.target.value)} className={input} required />
      <input type="password" autoComplete="new-password" placeholder="New password (min 10 characters)" minLength={10} value={next} onChange={(e) => setNext(e.target.value)} className={input} required />
      <input type="password" autoComplete="new-password" placeholder="Confirm new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={input} required />
      <div className="flex items-center gap-3">
        <button disabled={busy} className={btn}>{busy ? "Saving…" : "Change password"}</button>
        <Msg m={msg} />
      </div>
    </form>
  );
}

/** Lets the owner exclude their own browser from visitor stats. */
export function OptOutToggle() {
  const stored = useSyncExternalStore(noopSubscribe, () => isOptedOut(), () => null);
  const [override, setOut] = useState<boolean | null>(null);
  const out = override ?? stored;
  if (out === null) return null;
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input type="checkbox" checked={out} onChange={(e) => { setTrackingOptOut(e.target.checked); setOut(e.target.checked); }}
        className="mt-0.5 w-4 h-4 accent-[#E07A5F]" />
      <span className="text-sm">
        Don&apos;t track this browser
        <span className="block text-xs text-zinc-500">Recommended on your own devices so your visits don&apos;t appear in the stats. (Admin pages are never tracked.)</span>
      </span>
    </label>
  );
}

export function DangerZone() {
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function run(scope: "retention" | "tracking" | "everything") {
    let confirmText: string | null = null;
    if (scope !== "retention") {
      confirmText = prompt(scope === "tracking"
        ? 'This deletes ALL visitor tracking data (sessions, page views, events). Chats and leads are kept.\n\nType DELETE to confirm:'
        : 'This deletes EVERYTHING: visitors, chats and leads.\n\nType DELETE to confirm:');
      if (confirmText !== "DELETE") return;
    }
    setBusy(scope); setMsg(null);
    const res = await fetch("/api/admin/data/purge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ scope, confirm: confirmText }) }).catch(() => null);
    const data = await res?.json().catch(() => null);
    setBusy(null);
    setMsg(res?.ok
      ? { ok: true, text: scope === "retention" ? `Done — ${data?.deleted ?? 0} old records removed` : "Deleted ✓" }
      : { ok: false, text: data?.error ?? "Failed" });
  }

  const b = "rounded-xl px-4 py-2 text-sm ring-1 disabled:opacity-50";
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => run("retention")} disabled={!!busy} className={`${b} ring-white/15 hover:bg-white/5`}>{busy === "retention" ? "Running…" : "Apply retention now"}</button>
        <button onClick={() => run("tracking")} disabled={!!busy} className={`${b} text-red-300 ring-red-500/30 hover:bg-red-500/10`}>{busy === "tracking" ? "Deleting…" : "Delete all tracking data"}</button>
        <button onClick={() => run("everything")} disabled={!!busy} className={`${b} text-red-300 ring-red-500/30 hover:bg-red-500/10`}>{busy === "everything" ? "Deleting…" : "Delete everything"}</button>
      </div>
      <Msg m={msg} />
    </div>
  );
}
