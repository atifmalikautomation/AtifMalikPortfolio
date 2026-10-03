import Link from "next/link";
import { dashboardData } from "@/lib/admin-data";
import { flag, timeAgo, truncate } from "@/lib/admin-format";
import { AutoRefresh } from "./LiveProvider";
import { LiveFeed, LiveStatCards } from "./LiveBoard";
import { Badge, BarChart, BarList, Card, Empty, PageHeader, StatCard, sourceIcon } from "./ui";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { totals, daily, topPages, sources, recentLeads, recentConvs } = await dashboardData();

  return (
    <div className="space-y-6 max-w-[1400px]">
      <AutoRefresh />
      <PageHeader title="Dashboard" sub="Visitors, chatbot and leads at a glance" />

      <section className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <LiveStatCards compact />
        <StatCard label="Conversions" value={totals?.conversions_30d ?? 0} sub="leads converted · 30 days" href="/admin/leads?status=converted" />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5 items-start">
        <div className="space-y-5 min-w-0">
          <Card title="Last 14 days" bodyClass="p-5">
            <BarChart
              data={daily.map((d) => ({ label: d.day.slice(8), title: `${d.day}: ${d.visitors} visitors, ${d.chats} chats, ${d.leads} leads`, values: [d.visitors, d.chats, d.leads] }))}
              series={[{ name: "Visitors", color: "#38bdf8" }, { name: "Chats", color: "#E07A5F" }, { name: "Leads", color: "#34d399" }]}
            />
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card title="Top pages · today" action={<Link href="/admin/analytics" className="text-xs text-[#F2A48F] hover:underline">Analytics →</Link>}>
              <BarList rows={topPages.map((p) => ({ key: p.path, label: p.path, value: p.views, extra: <span className="text-[11px] text-zinc-500">{p.uniques} uniq</span> }))} valueLabel="views" empty="No page views today yet." />
            </Card>
            <Card title="Traffic sources · 7 days" action={<Link href="/admin/analytics?range=7d" className="text-xs text-[#F2A48F] hover:underline">Details →</Link>}>
              <BarList rows={sources.map((s) => ({ key: s.source, label: `${sourceIcon(s.source)} ${s.source}`, value: s.visitors }))} valueLabel="visitors" empty="No visits in the last 7 days." />
            </Card>
          </div>

          <Card title="Recent conversations" action={<Link href="/admin/conversations" className="text-xs text-[#F2A48F] hover:underline">View all →</Link>}>
            {recentConvs.length === 0 ? (
              <Empty>No conversations yet. They will appear here as visitors chat.</Empty>
            ) : (
              <ul className="divide-y divide-white/5">
                {recentConvs.map((c) => (
                  <li key={c.id}>
                    <Link href={`/admin/conversations/${c.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.03]">
                      <span className="text-lg" aria-hidden>{flag(c.country)}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">
                          {c.visitor_name || (c.short_id ? `Visitor #${c.short_id}` : "Anonymous")}
                          {c.visitor_email && <span className="text-zinc-500 font-normal"> · {c.visitor_email}</span>}
                        </div>
                        <div className="text-xs text-zinc-400 truncate">{truncate(c.preview, 110) || "—"}</div>
                      </div>
                      <div className="text-right shrink-0 space-y-1">
                        <Badge status={c.status} />
                        <div className="text-[11px] text-zinc-500">{timeAgo(c.last_message_at)} · {c.message_count} msgs</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-5">
          <Card title="Live activity" action={<Link href="/admin/live" className="text-xs text-[#F2A48F] hover:underline">Live view →</Link>} bodyClass="max-h-[420px] overflow-y-auto">
            <LiveFeed limit={15} />
          </Card>
          <Card title="Recent leads" action={<Link href="/admin/leads" className="text-xs text-[#F2A48F] hover:underline">All leads →</Link>}>
            {recentLeads.length === 0 ? (
              <Empty>No leads yet.</Empty>
            ) : (
              <ul className="divide-y divide-white/5">
                {recentLeads.map((l) => (
                  <li key={l.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{l.name || l.email || l.phone || "Unnamed lead"}</div>
                      <div className="text-xs text-zinc-500 truncate">{l.service || l.email || l.phone || l.source} · {timeAgo(l.created_at)}</div>
                    </div>
                    <Badge status={l.status} />
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Open leads" value={totals?.new_leads ?? 0} sub="status: new" href="/admin/leads?status=new" highlight={!!totals?.new_leads} />
            <StatCard label="Avg reply" value={totals?.avg_latency_ms ? `${(totals.avg_latency_ms / 1000).toFixed(1)}s` : "—"} sub="chatbot · 7 days" />
          </div>
        </div>
      </div>
    </div>
  );
}
