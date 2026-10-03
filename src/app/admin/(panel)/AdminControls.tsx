"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { STATUS_STYLES } from "@/lib/admin-format";

/** Inline status dropdown for a lead. */
export function LeadStatusSelect({ id, status }: { id: number; status: string }) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  async function change(next: string) {
    const prev = value;
    setValue(next);
    setSaving(true);
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    }).catch(() => null);
    setSaving(false);
    if (!res?.ok) setValue(prev);
    else router.refresh();
  }

  return (
    <select value={value} disabled={saving} onChange={(e) => change(e.target.value)} aria-label="Lead status"
      className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 outline-none cursor-pointer bg-transparent ${STATUS_STYLES[value] ?? ""}`}>
      {["new", "contacted", "qualified", "converted", "lost"].map((s) => (
        <option key={s} value={s} className="bg-[#121826] text-zinc-100">{s[0].toUpperCase() + s.slice(1)}</option>
      ))}
    </select>
  );
}

/** Private notes about a lead (auto-saves on blur). */
export function LeadNotes({ id, notes }: { id: number; notes: string | null }) {
  const [value, setValue] = useState(notes ?? "");
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function save() {
    if (value === (notes ?? "")) return;
    setState("saving");
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: value }),
    }).catch(() => null);
    setState(res?.ok ? "saved" : "error");
  }

  return (
    <div>
      <textarea value={value} onChange={(e) => { setValue(e.target.value); setState("idle"); }} onBlur={save} rows={3}
        placeholder="Private notes (e.g. called on WhatsApp, sent quote…)"
        className="w-full rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-2 text-sm outline-none focus:ring-[#E07A5F]/50 placeholder:text-zinc-500 resize-y" />
      <div className="text-[11px] text-zinc-500 h-4 mt-1">
        {state === "saving" ? "Saving…" : state === "saved" ? "Saved ✓" : state === "error" ? "Couldn't save" : ""}
      </div>
    </div>
  );
}

/** Delete button with confirmation. */
export function DeleteButton({ url, redirectTo, label = "Delete" }: { url: string; redirectTo?: string; label?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (!confirm("Delete permanently? This cannot be undone.")) return;
    setBusy(true);
    const res = await fetch(url, { method: "DELETE" }).catch(() => null);
    setBusy(false);
    if (!res?.ok) return alert("Delete failed");
    if (redirectTo) router.replace(redirectTo);
    router.refresh();
  }

  return (
    <button onClick={onClick} disabled={busy}
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-red-300 ring-1 ring-red-500/30 hover:bg-red-500/10 disabled:opacity-50">
      <Trash2 size={13} />
      {busy ? "Deleting…" : label}
    </button>
  );
}
