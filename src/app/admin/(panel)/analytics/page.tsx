import Link from "next/link";
import { getAnalytics, resolveRange } from "@/lib/admin-data";
import { flag, fmtDuration } from "@/lib/admin-format";
import { RANGE_OPTIONS } from "../ListControls";
import { BarChart, BarList, Card, Empty, PageHeader, StatCard, sourceIcon } from "../ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Analytics · Admin" };

export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<{ range?: string; from?: string; to?: string }> }) {
  const sp = await searchParams;
  const range = resolveRange(sp.range, sp.from, sp.to);
  const a = await getAnalytics(range);
  const t = a.totals;
  const bounceRate = t.sessions ? Math.round((t.bounce / t.sessions) * 100) : 0;

  return (
    <div className="space-y-6 max-w-[1400px]">
      <PageHeader title="Analytics" sub={`${range.label} · Pakistan time`}>
        <div className="flex flex-wrap items-center gap-2">
          {RANGE_OPTIONS.filter((o) => o.value !== "custom").map((o) => (
            <Link key={o.value} href={`/admin/analytics?range=${o.value}`}
              className={`rounded-full px-3.5 py-1.5 text-xs ring-1 ${range.key === o.value ? "bg-[#E07A5F]/15 text-[#F2A48F] ring-[#E07A5F]/40" : "text-zinc-400 ring-white/10 hover:text-zinc-100"}`}>
              {o.label}
            </Link>
          ))}
          <form action="/admin/analytics" className="flex items-center gap-1.5">
            <input type="hidden" name="range" value="custom" />
            <input type="date" name="from" defaultValue={range.fromStr} required aria-label="From"
              className="rounded-lg bg-white/5 ring-1 ring-white/10 px-2 py-1 text-xs text-zinc-300 [color-scheme:dark]" />
            <span className="text-zinc-500 text-xs">→</span>
            <input type="date" name="to" defaultValue={range.toStr} required aria-label="To"
              className="rounded-lg bg-white/5 ring-1 ring-white/10 px-2 py-1 text-xs text-zinc-300 [color-scheme:dark]" />
            <button className={`rounded-full px-3 py-1.5 text-xs ring-1 ${range.key === "custom" ? "bg-[#E07A5F]/15 text-[#F2A48F] ring-[#E07A5F]/40" : "text-zinc-300 ring-white/10 hover:bg-white/5"}`}>Apply</button>
          </form>
        </div>
      </PageHeader>

      <section className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
        <StatCard label="Visitors" value={t.visitors} />
        <StatCard label="New visitors" value={t.new_visitors} />
        <StatCard label="Sessions" value={t.sessions} />
        <StatCard label="Page views" value={t.pageviews} />
        <StatCard label="Avg session" value={fmtDuration(t.avg_session_s)} />
        <StatCard label="Bounce rate" value={`${bounceRate}%`} sub="1-page sessions" />
        <StatCard label="Chats" value={t.chats} />
        <StatCard label="Leads" value={t.leads} highlight={t.leads > 0} />
      </section>

      <Card title={`Trend · ${range.bucket === "hour" ? "hourly" : "daily"}`} bodyClass="p-5">
        <BarChart
          data={a.trend.map((d) => ({
            label: range.bucket === "hour" ? d.bucket.slice(11, 13) : d.bucket.slice(5),
            title: `${d.bucket}: ${d.visitors} visitors, ${d.pageviews} views, ${d.chats} chats`,
            values: [d.visitors, d.pageviews, d.chats],
          }))}
          series={[{ name: "Visitors", color: "#38bdf8" }, { name: "Page views", color: "#a78bfa" }, { name: "Chats", color: "#E07A5F" }]}
        />
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-5 items-start">
        <Card title="Most visited pages">
          {a.pages.length === 0 ? <Empty>No page views in this period.</Empty> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-500 border-b border-white/10">
                    <th className="px-5 py-2.5 font-medium">Page</th>
                    <th className="px-4 py-2.5 font-medium text-right">Views</th>
                    <th className="px-4 py-2.5 font-medium text-right">Unique</th>
                    <th className="px-5 py-2.5 font-medium text-right">Avg time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {a.pages.map((p) => (
                    <tr key={p.path} className="hover:bg-white/[0.02]">
                      <td className="px-5 py-2 max-w-72 truncate">
                        <Link href={`/admin/visitors?path=${encodeURIComponent(p.path)}`} className="hover:text-[#F2A48F]">{p.path}</Link>
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums">{p.views.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right tabular-nums text-zinc-400">{p.uniques.toLocaleString()}</td>
                      <td className="px-5 py-2 text-right tabular-nums text-zinc-400">{p.avg_ms != null ? fmtDuration(p.avg_ms / 1000) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <div className="space-y-5">
          <Card title="Active pages right now">
            <BarList rows={a.active.map((p) => ({ key: p.path, label: p.path, value: p.visitors }))} valueLabel="visitors" empty="Nobody online right now." />
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-5">
            <Card title="Entry pages">
              <BarList rows={a.entry.map((p) => ({ key: p.path, label: p.path, value: p.sessions }))} valueLabel="sessions" />
            </Card>
            <Card title="Exit pages">
              <BarList rows={a.exit.map((p) => ({ key: p.path, label: p.path, value: p.sessions }))} valueLabel="sessions" />
            </Card>
          </div>
        </div>
      </div>

      <Card title="Traffic sources">
        {a.sources.length === 0 ? <Empty>No traffic in this period.</Empty> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-500 border-b border-white/10">
                  <th className="px-5 py-2.5 font-medium">Source</th>
                  <th className="px-4 py-2.5 font-medium text-right">Visitors</th>
                  <th className="px-4 py-2.5 font-medium text-right">Sessions</th>
                  <th className="px-4 py-2.5 font-medium text-right">Chatbot conversations</th>
                  <th className="px-5 py-2.5 font-medium text-right">Leads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {a.sources.map((s) => (
                  <tr key={s.source} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-2">
                      <Link href={`/admin/visitors?source=${encodeURIComponent(s.source)}`} className="hover:text-[#F2A48F]">{sourceIcon(s.source)} {s.source}</Link>
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">{s.visitors}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-400">{s.sessions}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{s.chats}</td>
                    <td className="px-5 py-2 text-right tabular-nums text-[#F2A48F]">{s.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="px-5 py-3 text-[11px] text-zinc-500 border-t border-white/5">
          Sources come only from UTM tags or the browser referrer. No referrer = “Direct”. Nothing is guessed.
        </p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title="UTM campaigns">
          {a.campaigns.length === 0 ? <Empty>No UTM-tagged visits. Add ?utm_source=…&utm_campaign=… to your links.</Empty> : (
            <BarList rows={a.campaigns.map((c, i) => ({ key: String(i), label: `${c.utm_campaign}${c.utm_source ? ` · ${c.utm_source}` : ""}${c.utm_medium ? `/${c.utm_medium}` : ""}`, value: c.visitors }))} valueLabel="visitors" />
          )}
        </Card>
        <Card title="Devices">
          <BarList rows={a.devices.map((d) => ({ key: d.label, label: d.label[0].toUpperCase() + d.label.slice(1), value: d.n }))} valueLabel="visitors" />
          {a.browsers.length > 0 && <div className="border-t border-white/5"><BarList rows={a.browsers.map((b) => ({ key: b.label, label: b.label, value: b.n }))} /></div>}
        </Card>
        <Card title="Countries">
          <BarList rows={a.countries.map((c) => ({ key: c.label, label: `${flag(c.label)} ${c.label === "??" ? "Unknown" : c.label}`, value: c.n }))} valueLabel="visitors" />
        </Card>
      </div>
    </div>
  );
}
