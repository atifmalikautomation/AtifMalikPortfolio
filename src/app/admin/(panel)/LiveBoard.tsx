"use client";

import Link from "next/link";
import { useState } from "react";
import type { LeftSession, LiveEvent, LiveSession } from "@/lib/admin-data";
import { deviceLabel, flag, fmtDuration } from "@/lib/admin-format";
import { eventLabel, TONE_CLASSES } from "@/lib/admin-events";
import { useLive, useNow } from "./LiveProvider";
import { Card, Empty, LiveDot, StatCard, sourceIcon } from "./ui";

const JUST_ARRIVED_S = 300;

function ago(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}

const since = (now: number, t: string) => now - new Date(t).getTime();

/** Top stat cards (used on Live + Dashboard). */
export function LiveStatCards({ compact = false }: { compact?: boolean }) {
  const { snap } = useLive();
  const c = snap?.counts;
  const v = (n: number | undefined) => (n === undefined ? "—" : n);
  if (compact) {
    return (
      <>
        <StatCard label="Live now" value={v(c?.online)} dot="bg-emerald-400" sub={c ? `${c.active} active · ${c.idle} idle` : "connecting…"} href="/admin/live" highlight={!!c?.online} />
        <StatCard label="Visitors today" value={v(c?.visitorsToday)} sub={c ? `${c.sessionsToday} sessions` : undefined} href="/admin/visitors?range=today" />
        <StatCard label="Chatbot chats" value={v(c?.chatsToday)} sub="today" href="/admin/conversations?range=today" />
        <StatCard label="New leads" value={v(c?.leadsToday)} sub="today" href="/admin/leads?range=today" highlight={!!c?.leadsToday} />
      </>
    );
  }
  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3">
      <StatCard label="Online now" value={v(c?.online)} dot="bg-emerald-400" highlight={!!c?.online} />
      <StatCard label="Active" value={v(c?.active)} dot="bg-emerald-400" />
      <StatCard label="Idle" value={v(c?.idle)} dot="bg-amber-400" />
      <StatCard label="Visitors today" value={v(c?.visitorsToday)} />
      <StatCard label="Sessions today" value={v(c?.sessionsToday)} />
      <StatCard label="Chats today" value={v(c?.chatsToday)} href="/admin/conversations?range=today" />
      <StatCard label="New leads today" value={v(c?.leadsToday)} href="/admin/leads?range=today" highlight={!!c?.leadsToday} />
    </section>
  );
}

/** Live activity feed. */
export function LiveFeed({ limit = 25 }: { limit?: number }) {
  const { snap } = useLive();
  const now = useNow(5000);
  const events = (snap?.events ?? []).slice(0, limit);
  if (!snap) return <Empty>Connecting to live data…</Empty>;
  if (!events.length) return <Empty>No activity yet. Events appear here the moment visitors arrive.</Empty>;
  return (
    <ul className="divide-y divide-white/5">
      {events.map((e: LiveEvent) => {
        const l = eventLabel(e);
        return (
          <li key={e.id}>
            <Link href={e.visitor_id ? `/admin/visitors/${e.visitor_id}` : "#"} className="flex items-start gap-3 px-5 py-2.5 hover:bg-white/[0.03]">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${TONE_CLASSES[l.tone]}`} />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-zinc-200 truncate">
                  <span className="font-mono text-xs text-zinc-400 mr-1.5">#{e.short_id ?? "——"}</span>
                  {l.text}
                </div>
              </div>
              <span className="text-[11px] text-zinc-500 whitespace-nowrap">{ago(since(now, e.created_at))}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function VisitorChip({ s, now, kind }: { s: LiveSession; now: number; kind: "arrived" | "here" }) {
  return (
    <Link href={`/admin/visitors/${s.visitor_id}`} className="block rounded-xl bg-white/[0.03] ring-1 ring-white/5 hover:ring-white/15 px-3 py-2.5">
      <div className="flex items-center gap-2">
        <LiveDot status={s.status} />
        <span className="font-mono text-xs font-semibold">#{s.short_id}</span>
        {s.is_returning && <span className="text-[10px] text-violet-300">returning</span>}
        <span className="ml-auto text-[11px] text-zinc-500 tabular-nums">
          {kind === "arrived" ? ago(since(now, s.started_at)) : fmtDuration(since(now, s.started_at) / 1000)}
        </span>
      </div>
      <div className="text-xs text-zinc-400 truncate mt-1">{s.current_path ?? "—"}</div>
    </Link>
  );
}

function LeftChip({ s, now }: { s: LeftSession; now: number }) {
  return (
    <Link href={`/admin/visitors/${s.visitor_id}`} className="block rounded-xl bg-white/[0.03] ring-1 ring-white/5 hover:ring-white/15 px-3 py-2.5">
      <div className="flex items-center gap-2">
        <LiveDot status="left" />
        <span className="font-mono text-xs font-semibold">#{s.short_id}</span>
        <span className="ml-auto text-[11px] text-zinc-500">Left {ago(since(now, s.left_at))}</span>
      </div>
      <div className="text-xs text-zinc-400 truncate mt-1">{s.exit_path ?? "—"} · stayed {fmtDuration(s.duration_s)}</div>
    </Link>
  );
}

function Column({ title, count, tone, children }: { title: string; count: number; tone: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-[#121826] ring-1 ring-white/10 flex flex-col min-h-48">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className={`w-2 h-2 rounded-full ${tone}`} />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">{title}</h3>
        <span className="ml-auto text-xs text-zinc-500 tabular-nums">{count}</span>
      </div>
      <div className="p-3 space-y-2 overflow-y-auto max-h-80">{children}</div>
    </div>
  );
}

/** "Who is coming / who is going" board. */
export function ComingGoing() {
  const { snap } = useLive();
  const now = useNow();
  const online = snap?.online ?? [];
  const arrived = online.filter((s) => since(now, s.started_at) / 1000 < JUST_ARRIVED_S);
  const returningOnline = online.filter((s) => s.is_returning);
  const returningOthers = (snap?.returningToday ?? []).filter((r) => !online.some((o) => o.session_id === r.session_id));
  const none = (t: string) => <p className="text-xs text-zinc-500 text-center py-6">{t}</p>;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      <Column title="Just arrived" count={arrived.length} tone="bg-sky-400">
        {arrived.length ? arrived.map((s) => <VisitorChip key={s.session_id} s={s} now={now} kind="arrived" />) : none("No new arrivals in the last 5 min")}
      </Column>
      <Column title="Currently here" count={online.length} tone="bg-emerald-400">
        {online.length ? online.map((s) => <VisitorChip key={s.session_id} s={s} now={now} kind="here" />) : none("Nobody on the site right now")}
      </Column>
      <Column title="Recently left" count={snap?.recentlyLeft.length ?? 0} tone="bg-zinc-500">
        {snap?.recentlyLeft.length ? snap.recentlyLeft.map((s) => <LeftChip key={s.session_id} s={s} now={now} />) : none("No one left in the last 30 min")}
      </Column>
      <Column title="Returning" count={returningOnline.length + returningOthers.length} tone="bg-violet-400">
        {returningOnline.map((s) => <VisitorChip key={s.session_id} s={s} now={now} kind="here" />)}
        {returningOthers.map((s) => <LeftChip key={s.session_id} s={s} now={now} />)}
        {!returningOnline.length && !returningOthers.length && none("No returning visitors today")}
      </Column>
    </section>
  );
}

/** Detailed live visitor table (desktop) / cards (mobile). */
export function LiveTable() {
  const { snap, conn } = useLive();
  const now = useNow();
  const [filter, setFilter] = useState<"all" | "active" | "idle" | "chat">("all");
  if (!snap) return <Card title="Live visitors"><Empty>{conn === "offline" ? "You are offline." : "Connecting to live data…"}</Empty></Card>;

  const rows = snap.online.filter((s) =>
    filter === "all" ? true : filter === "chat" ? s.chat_opened || s.chat_messages > 0 : s.status === filter);

  const tabs = (
    <div className="flex gap-1">
      {(["all", "active", "idle", "chat"] as const).map((f) => (
        <button key={f} onClick={() => setFilter(f)}
          className={`rounded-full px-2.5 py-1 text-[11px] ring-1 ${filter === f ? "bg-[#E07A5F]/15 text-[#F2A48F] ring-[#E07A5F]/40" : "text-zinc-400 ring-white/10 hover:text-zinc-100"}`}>
          {f === "chat" ? "Using chat" : f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );

  const chatStatus = (s: LiveSession) => (s.chat_messages > 0 ? "Chatting" : s.chat_opened ? "Opened" : "Not opened");

  return (
    <Card title={`Live visitors (${snap.online.length})`} action={tabs}>
      {rows.length === 0 ? (
        <Empty>{snap.online.length ? "No visitors match this filter." : `No one online. A visitor counts as online until ${snap.settings.leftAfterSeconds}s without a heartbeat.`}</Empty>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-500 border-b border-white/10">
                  <th className="px-4 py-2.5 font-medium">Visitor</th>
                  <th className="px-4 py-2.5 font-medium">Current page</th>
                  <th className="px-4 py-2.5 font-medium">Arrived</th>
                  <th className="px-4 py-2.5 font-medium">Session</th>
                  <th className="px-4 py-2.5 font-medium">Chatbot</th>
                  <th className="px-4 py-2.5 font-medium">Device</th>
                  <th className="px-4 py-2.5 font-medium">Source</th>
                  <th className="px-4 py-2.5 font-medium">Last activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((s) => (
                  <tr key={s.session_id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-2.5">
                      <Link href={`/admin/visitors/${s.visitor_id}`} className="flex items-center gap-2 hover:text-[#F2A48F]">
                        <LiveDot status={s.status} />
                        <span className="font-mono text-xs font-semibold">#{s.short_id}</span>
                        <span className="text-xs">{flag(s.country)}</span>
                        {s.name && <span className="text-xs text-zinc-400 truncate max-w-28">{s.name}</span>}
                        {s.is_returning && <span className="text-[10px] text-violet-300">↺</span>}
                        {s.has_lead && <span className="text-[10px]" title="Lead">⭐</span>}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 max-w-56">
                      <div className="truncate text-zinc-200" title={s.current_title ?? undefined}>{s.current_path ?? "—"}</div>
                      <div className="text-[11px] text-zinc-500">{s.pageviews} page{s.pageviews === 1 ? "" : "s"}</div>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-zinc-400 whitespace-nowrap">{ago(since(now, s.started_at))}</td>
                    <td className="px-4 py-2.5 tabular-nums whitespace-nowrap">{fmtDuration(since(now, s.started_at) / 1000)}</td>
                    <td className="px-4 py-2.5 text-xs whitespace-nowrap">
                      <span className={s.chat_messages ? "text-[#F2A48F]" : s.chat_opened ? "text-sky-300" : "text-zinc-500"}>{chatStatus(s)}</span>
                      {s.chat_messages > 0 && <span className="text-zinc-500"> · {s.chat_messages} msg</span>}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-zinc-400 whitespace-nowrap">{deviceLabel(s.device_type)}<div className="text-[11px] text-zinc-500">{s.browser} · {s.os}</div></td>
                    <td className="px-4 py-2.5 text-xs whitespace-nowrap">{sourceIcon(s.source)} {s.source}</td>
                    <td className="px-4 py-2.5 text-xs text-zinc-400 whitespace-nowrap">
                      {ago(since(now, s.last_interaction_at))}
                      <div className={`text-[11px] ${s.status === "active" ? "text-emerald-400" : "text-amber-400"}`}>{s.status === "active" ? "Active" : "Idle"}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <ul className="lg:hidden divide-y divide-white/5">
            {rows.map((s) => (
              <li key={s.session_id}>
                <Link href={`/admin/visitors/${s.visitor_id}`} className="block px-4 py-3 hover:bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <LiveDot status={s.status} />
                    <span className="font-mono text-sm font-semibold">Visitor #{s.short_id}</span>
                    <span className="text-xs">{flag(s.country)}</span>
                    <span className={`ml-auto text-[11px] ${s.status === "active" ? "text-emerald-400" : "text-amber-400"}`}>{s.status === "active" ? "Online" : "Idle"}</span>
                  </div>
                  <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                    <dt className="text-zinc-500">Current page</dt><dd className="truncate">{s.current_path ?? "—"}</dd>
                    <dt className="text-zinc-500">Session</dt><dd className="tabular-nums">{fmtDuration(since(now, s.started_at) / 1000)}</dd>
                    <dt className="text-zinc-500">Chatbot</dt><dd>{chatStatus(s)}</dd>
                    <dt className="text-zinc-500">Messages</dt><dd>{s.chat_messages}</dd>
                    <dt className="text-zinc-500">Source</dt><dd>{s.source}</dd>
                    <dt className="text-zinc-500">Device</dt><dd>{deviceLabel(s.device_type)}</dd>
                  </dl>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}
