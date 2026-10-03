import Link from "next/link";
import { notFound } from "next/navigation";
import { Mic } from "lucide-react";
import { getConversation } from "@/lib/admin-data";
import { isValidConversationId } from "@/lib/chat-log";
import { deviceFromUA, flag, fmtDateTime, fmtTime } from "@/lib/admin-format";
import { DeleteButton, LeadNotes, LeadStatusSelect } from "../../AdminControls";
import { AutoRefresh } from "../../LiveProvider";
import { Badge } from "../../ui";
import { HandoffToggle } from "./HandoffToggle";

export const dynamic = "force-dynamic";

export default async function ConversationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isValidConversationId(id)) notFound();
  const data = await getConversation(id);
  if (!data) notFound();
  const { conversation: c, messages, lead } = data;

  const info: [string, React.ReactNode][] = [
    ["Visitor", c.visitor_id ? <Link key="v" href={`/admin/visitors/${c.visitor_id}`} className="font-mono text-[#F2A48F] hover:underline">#{c.short_id} →</Link> : "—"],
    ["Name", c.visitor_name || "—"],
    ["Email", c.visitor_email ? <a href={`mailto:${c.visitor_email}`} className="text-[#F2A48F] hover:underline break-all">{c.visitor_email}</a> : "—"],
    ["Location", `${flag(c.country)} ${[c.city, c.country].filter(Boolean).join(", ") || "Unknown"}`],
    ["Device", deviceFromUA(c.user_agent)],
    ["Page", c.page ?? "—"],
    ["Started", fmtDateTime(c.created_at)],
    ["Last message", fmtDateTime(c.last_message_at)],
    ["Messages", String(c.message_count)],
    ["Came from", c.referrer ? <span className="break-all">{c.referrer}</span> : "Direct"],
    ["ID", <span key="id" className="font-mono text-[11px] break-all text-zinc-400">{c.id}</span>],
  ];

  return (
    <div className="max-w-6xl space-y-5">
      <AutoRefresh minIntervalMs={4000} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/conversations" className="text-xs text-zinc-400 hover:text-zinc-200">← All conversations</Link>
          <h1 className="text-2xl font-semibold mt-1 flex items-center gap-3">
            {c.visitor_name || "Anonymous visitor"}
            <Badge status={c.status} />
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <HandoffToggle id={c.id} handoff={c.handoff} />
          <DeleteButton url={`/api/admin/conversations/${c.id}`} redirectTo="/admin/conversations" label="Delete conversation" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">
        {/* Transcript */}
        <section className="rounded-2xl bg-[#121826] ring-1 ring-white/10 p-4 sm:p-5 space-y-3">
          {messages.length === 0 && <p className="text-center text-sm text-zinc-500 py-10">Visitor joined but hasn&apos;t sent a message yet.</p>}
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                m.role === "user" ? "bg-[#E07A5F] text-white rounded-br-md" : "bg-white/[0.06] text-zinc-100 rounded-bl-md"
              }`}>
                <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">{m.content}</div>
                <div className={`mt-1 flex items-center gap-1.5 text-[10px] ${m.role === "user" ? "text-white/70 justify-end" : "text-zinc-500"}`}>
                  {m.is_voice && <span className="inline-flex items-center gap-0.5"><Mic size={10} />voice</span>}
                  <span>{fmtTime(m.created_at)}</span>
                  {m.role === "assistant" && m.model && <span>· {m.model}</span>}
                  {m.role === "assistant" && m.latency_ms != null && <span>· {(m.latency_ms / 1000).toFixed(1)}s</span>}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-2xl bg-[#121826] ring-1 ring-white/10 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Visitor</h2>
            <dl className="space-y-2.5 text-sm">
              {info.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[90px_1fr] gap-2">
                  <dt className="text-zinc-500">{k}</dt>
                  <dd className="text-zinc-200 min-w-0">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {lead && (
            <div className="rounded-2xl bg-[#121826] ring-1 ring-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Lead</h2>
                <LeadStatusSelect id={lead.id} status={lead.status} />
              </div>
              <dl className="text-xs space-y-1 text-zinc-300">
                {lead.name && <div><span className="text-zinc-500">Name:</span> {lead.name}</div>}
                {lead.email && <div className="break-all"><span className="text-zinc-500">Email:</span> {lead.email}</div>}
                {lead.phone && <div><span className="text-zinc-500">Phone:</span> {lead.phone}</div>}
                {lead.company && <div><span className="text-zinc-500">Company:</span> {lead.company}</div>}
                {lead.service && <div><span className="text-zinc-500">Service:</span> {lead.service}</div>}
              </dl>
              <LeadNotes id={lead.id} notes={lead.notes} />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
