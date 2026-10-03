import Link from "next/link";
import { notFound } from "next/navigation";
import { getVisitorProfile, type EventRow } from "@/lib/admin-data";
import { deviceLabel, flag, fmtDateTime, fmtDuration, fmtSeconds, timeAgo, truncate } from "@/lib/admin-format";
import { eventLabel, TONE_CLASSES } from "@/lib/admin-events";
import { isUuid } from "@/lib/request-info";
import { DeleteButton, LeadStatusSelect } from "../../AdminControls";
import { AutoRefresh } from "../../LiveProvider";
import { Badge, Card, Empty, LiveDot, sourceIcon } from "../../ui";

export const dynamic = "force-dynamic";

const HIDDEN = new Set(["SESSION_STARTED", "SESSION_ENDED"]);
const DIM = new Set(["PAGE_EXIT", "VISITOR_IDLE", "VISITOR_ACTIVE", "SESSION_RESUMED"]);

export default async function VisitorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) notFound();
  const data = await getVisitorProfile(id);
  if (!data) notFound();
  const { visitor: v, status, sessions, events, conversations, leads, totals } = data;
  const lead = leads[0];

  // Group timeline by session (newest session first, events chronological inside)
  const bySession = new Map<string, EventRow[]>();
  for (const e of events) {
    if (HIDDEN.has(e.type)) continue;
    const k = e.session_id ?? "none";
    if (!bySession.has(k)) bySession.set(k, []);
    bySession.get(k)!.push(e);
  }
  const sessionOrder = [...sessions.map((s) => s.id).filter((sid) => bySession.has(sid)), ...(bySession.has("none") ? ["none"] : [])];

  const overview: [string, React.ReactNode][] = [
    ["Visitor ID", <span key="id" className="font-mono text-xs break-all">{v.id}</span>],
    ["First seen", fmtDateTime(v.first_seen_at)],
    ["Last seen", `${fmtDateTime(v.last_seen_at)} (${timeAgo(v.last_seen_at)})`],
    ["Type", v.session_count > 1 ? <Badge key="t" status="returning" /> : "New visitor"],
    ["Location", `${flag(v.country)} ${[v.city, v.region, v.country].filter(Boolean).join(", ") || "Unknown"}`],
    ["Device", `${deviceLabel(v.device_type)} · ${v.browser ?? "?"} · ${v.os ?? "?"}`],
    ["First source", `${sourceIcon(v.first_source)} ${v.first_source ?? "Unknown"}`],
    ["Referrer", v.first_referrer ? <span key="r" className="break-all">{v.first_referrer}</span> : "None (direct)"],
    ["Landing page", v.first_landing ?? "—"],
  ];
  if (v.name) overview.unshift(["Name", v.name]);
  if (v.email) overview.unshift(["Email", <a key="e" href={`mailto:${v.email}`} className="text-[#F2A48F] hover:underline break-all">{v.email}</a>]);

  return (
    <div className="max-w-[1400px] space-y-5">
      <AutoRefresh minIntervalMs={6000} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/visitors" className="text-xs text-zinc-400 hover:text-zinc-200">← All visitors</Link>
          <h1 className="text-2xl font-semibold mt-1 flex items-center gap-3">
            <LiveDot status={status} />
            Visitor <span className="font-mono">#{v.short_id}</span>
            {v.name && <span className="text-zinc-400 text-lg font-normal">· {v.name}</span>}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {status === "left" ? `Offline · last seen ${timeAgo(v.last_seen_at)}` : status === "active" ? "Online and active now" : "Online but idle"}
            {sessions[0] && status !== "left" && sessions[0].current_path && <> · on <span className="text-zinc-200">{sessions[0].current_path}</span></>}
          </p>
        </div>
        <DeleteButton url={`/api/admin/visitors/${v.id}`} redirectTo="/admin/visitors" label="Delete all visitor data" />
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          ["Sessions", totals.sessions],
          ["Pages viewed", totals.pageviews],
          ["Time on site", fmtDuration(totals.durationS)],
          ["Conversations", totals.conversations],
          ["Lead status", lead ? <Badge key="l" status={lead.status} /> : "Not a lead"],
          ["Status", <Badge key="s" status={status === "left" ? "left" : status === "active" ? "online" : "idle"} label={status === "left" ? "Left" : status === "active" ? "Online" : "Idle"} />],
        ].map(([k, val]) => (
          <div key={String(k)} className="rounded-2xl bg-[#121826] ring-1 ring-white/10 p-4">
            <div className="text-[11px] uppercase tracking-wider text-zinc-500">{k}</div>
            <div className="text-lg font-semibold mt-1 tabular-nums">{val}</div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">
        {/* Timeline */}
        <Card title="Session timeline">
          {sessionOrder.length === 0 ? (
            <Empty>No events recorded.</Empty>
          ) : (
            <div className="divide-y divide-white/10">
              {sessionOrder.map((sid) => {
                const s = sessions.find((x) => x.id === sid);
                const list = bySession.get(sid)!;
                return (
                  <div key={sid} className="px-5 py-4">
                    {s && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-xs text-zinc-400">
                        <span className="font-semibold text-zinc-200">{fmtDateTime(s.started_at)}</span>
                        <span>· {fmtDuration(s.duration_s)}</span>
                        <span>· {s.pageviews} pages</span>
                        <span>· {sourceIcon(s.source)} {s.source}</span>
                        {s.utm_campaign && <span>· campaign: {s.utm_campaign}</span>}
                        <span>· {deviceLabel(s.device_type)}</span>
                        {s.live_status !== "left" ? <Badge status={s.live_status === "active" ? "online" : "idle"} label={s.live_status === "active" ? "Live now" : "Idle"} /> : null}
                      </div>
                    )}
                    <ol className="relative border-l border-white/10 ml-1.5 space-y-2.5">
                      {list.map((e) => {
                        const l = eventLabel(e);
                        const cid = typeof e.metadata?.conversationId === "string" ? e.metadata.conversationId : null;
                        return (
                          <li key={e.id} className={`pl-4 relative ${DIM.has(e.type) ? "opacity-50" : ""}`}>
                            <span className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ring-2 ring-[#121826] ${TONE_CLASSES[l.tone]}`} />
                            <div className="flex items-baseline gap-3 text-sm">
                              <span className="font-mono text-[11px] text-zinc-500 tabular-nums shrink-0">{fmtSeconds(e.created_at)}</span>
                              <span className="text-zinc-200 min-w-0 break-words">
                                {l.text}
                                {cid && (e.type === "CHATBOT_MESSAGE" || e.type === "CHATBOT_OPENED") && (
                                  <Link href={`/admin/conversations/${cid}`} className="ml-2 text-xs text-[#F2A48F] hover:underline">view chat →</Link>
                                )}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Card title="Overview" bodyClass="p-4">
            <dl className="space-y-2.5 text-sm">
              {overview.map(([k, val]) => (
                <div key={k} className="grid grid-cols-[96px_1fr] gap-2">
                  <dt className="text-zinc-500">{k}</dt>
                  <dd className="text-zinc-200 min-w-0">{val}</dd>
                </div>
              ))}
            </dl>
          </Card>

          {leads.length > 0 && (
            <Card title="Lead">
              <ul className="divide-y divide-white/5">
                {leads.map((l) => (
                  <li key={l.id} className="px-4 py-3 space-y-1 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium truncate">{l.name || l.email || l.phone || "Lead"}</span>
                      <LeadStatusSelect id={l.id} status={l.status} />
                    </div>
                    {l.email && <div className="text-xs text-zinc-400">{l.email}</div>}
                    {l.phone && <div className="text-xs text-zinc-400">{l.phone}</div>}
                    {l.service && <div className="text-xs text-zinc-400">Service: {l.service}</div>}
                    <div className="text-[11px] text-zinc-500">{l.source} · {fmtDateTime(l.created_at)}</div>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card title={`Conversations (${conversations.length})`}>
            {conversations.length === 0 ? (
              <Empty>Never used the chatbot.</Empty>
            ) : (
              <ul className="divide-y divide-white/5">
                {conversations.map((c) => (
                  <li key={c.id}>
                    <Link href={`/admin/conversations/${c.id}`} className="block px-4 py-3 hover:bg-white/[0.03]">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-zinc-400">{fmtDateTime(c.created_at)}</span>
                        <Badge status={c.status} />
                      </div>
                      <div className="text-sm text-zinc-200 truncate mt-1">{truncate(c.preview, 80) || "No messages"}</div>
                      <div className="text-[11px] text-zinc-500">{c.message_count} messages</div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title={`Sessions (${sessions.length})`}>
            <ul className="divide-y divide-white/5 max-h-80 overflow-y-auto">
              {sessions.map((s) => (
                <li key={s.id} className="px-4 py-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <LiveDot status={s.live_status} />
                    <span className="text-zinc-200">{fmtDateTime(s.started_at)}</span>
                    <span className="ml-auto text-zinc-500 tabular-nums">{fmtDuration(s.duration_s)}</span>
                  </div>
                  <div className="text-zinc-500 mt-0.5 truncate">
                    {s.landing_path ?? "—"} → {s.exit_path ?? s.current_path ?? "—"} · {s.source}
                    {s.screen ? ` · ${s.screen}` : ""}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}
