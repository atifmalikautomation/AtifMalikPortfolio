"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hand } from "lucide-react";

/** Toggle the HUMAN_HANDOFF flag on a conversation. */
export function HandoffToggle({ id, handoff }: { id: string; handoff: boolean }) {
  const router = useRouter();
  const [on, setOn] = useState(handoff);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    const res = await fetch(`/api/admin/conversations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ handoff: !on }),
    }).catch(() => null);
    setBusy(false);
    if (res?.ok) { setOn(!on); router.refresh(); } else alert("Couldn't update");
  }

  return (
    <button onClick={toggle} disabled={busy}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs ring-1 disabled:opacity-50 ${
        on ? "bg-amber-500/15 text-amber-300 ring-amber-500/40" : "text-zinc-300 ring-white/15 hover:bg-white/5"
      }`}>
      <Hand size={13} />
      {on ? "Handed off to human ✓" : "Mark for human handoff"}
    </button>
  );
}
