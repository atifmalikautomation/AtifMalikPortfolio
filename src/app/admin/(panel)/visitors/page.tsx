import Link from "next/link";
import { listVisitors, visitorFilterOptions } from "@/lib/admin-data";
import { deviceLabel, flag, timeAgo } from "@/lib/admin-format";
import { AutoRefresh } from "../LiveProvider";
import { DateFilter, FilterSelect, Pagination, SearchBar } from "../ListControls";
import { Badge, LiveDot, PageHeader, sourceIcon } from "../ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Visitors · Admin" };

type SP = { q?: string; status?: string; device?: string; source?: string; chat?: string; lead?: string; type?: string; path?: string; range?: string; from?: string; to?: string; page?: string };

export default async function VisitorsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const [{ rows, total, page, pages }, opts] = await Promise.all([
    listVisitors({ ...sp, page: Number(sp.page) || 1 }),
    visitorFilterOptions(),
  ]);
  const anyFilter = Object.entries(sp).some(([k, v]) => k !== "page" && v);

  return (
    <div className="space-y-5 max-w-[1400px]">
      <AutoRefresh minIntervalMs={15000} />
      <PageHeader title="Visitors" sub={`${total.toLocaleString()} visitor${total === 1 ? "" : "s"} · anonymous IDs unless they shared their details`} />

      <SearchBar action="/admin/visitors" q={sp.q} placeholder="Search visitor ID, name, email, conversation ID…">
        <FilterSelect name="status" value={sp.status} label="Status" options={[
          { value: "online", label: "Online" }, { value: "active", label: "Active" }, { value: "idle", label: "Idle" }, { value: "offline", label: "Offline / left" },
        ]} />
        <FilterSelect name="type" value={sp.type} label="Visitor" options={[{ value: "new", label: "New" }, { value: "returning", label: "Returning" }]} />
        <FilterSelect name="device" value={sp.device} label="Device" options={[{ value: "desktop", label: "Desktop" }, { value: "mobile", label: "Mobile" }, { value: "tablet", label: "Tablet" }]} />
        <FilterSelect name="source" value={sp.source} label="Source" options={opts.sources.map((s) => ({ value: s, label: s }))} />
        <FilterSelect name="chat" value={sp.chat} label="Chatbot" options={[{ value: "yes", label: "Used chatbot" }, { value: "no", label: "No chat" }]} />
        <FilterSelect name="lead" value={sp.lead} label="Lead" options={[
          { value: "yes", label: "Is a lead" }, { value: "no", label: "Not a lead" },
          { value: "new", label: "Lead: New" }, { value: "contacted", label: "Lead: Contacted" }, { value: "qualified", label: "Lead: Qualified" },
          { value: "converted", label: "Lead: Converted" }, { value: "lost", label: "Lead: Lost" },
        ]} />
        <input name="path" defaultValue={sp.path} placeholder="Visited page e.g. /services"
          className="w-48 rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-2.5 text-sm outline-none focus:ring-[#E07A5F]/50 placeholder:text-zinc-500" />
        <DateFilter range={sp.range} from={sp.from} to={sp.to} />
      </SearchBar>
      {anyFilter && <Link href="/admin/visitors" className="inline-block text-xs text-zinc-400 hover:text-zinc-200">✕ Clear filters</Link>}

      <div className="rounded-2xl bg-[#121826] ring-1 ring-white/10 overflow-x-auto">
        {rows.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-zinc-500">No visitors found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-500 border-b border-white/10">
                <th className="px-4 py-3 font-medium">Visitor</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Last page</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Source</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Device</th>
                <th className="px-4 py-3 font-medium text-right">Sessions</th>
                <th className="px-4 py-3 font-medium text-right hidden sm:table-cell">Pages</th>
                <th className="px-4 py-3 font-medium">Chat / Lead</th>
                <th className="px-4 py-3 font-medium whitespace-nowrap">Last seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((v) => (
                <tr key={v.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <Link href={`/admin/visitors/${v.id}`} className="flex items-center gap-2 hover:text-[#F2A48F]">
                      <span>{flag(v.country)}</span>
                      <span className="font-mono text-xs font-semibold">#{v.short_id}</span>
                      {v.name && <span className="text-xs text-zinc-300 truncate max-w-32">{v.name}</span>}
                    </Link>
                    {v.email && <div className="text-[11px] text-zinc-500 truncate max-w-48">{v.email}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-xs">
                      <LiveDot status={v.live_status} />
                      {v.live_status === "left" ? <span className="text-zinc-500">Offline</span> : v.live_status === "active" ? <span className="text-emerald-300">Active</span> : <span className="text-amber-300">Idle</span>}
                    </span>
                    {v.session_count > 1 && <div className="text-[10px] text-violet-300 mt-0.5">Returning</div>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-xs text-zinc-300 max-w-48 truncate">{v.current_path ?? "—"}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs whitespace-nowrap">{sourceIcon(v.first_source)} {v.first_source ?? "Unknown"}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-zinc-400 whitespace-nowrap">{deviceLabel(v.device_type)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{v.session_count}</td>
                  <td className="px-4 py-3 text-right tabular-nums hidden sm:table-cell">{v.pageview_count}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {v.conv_count > 0 && <span className="text-[11px] text-sky-300">💬 {v.conv_count}</span>}
                      {v.lead_status && <Badge status={v.lead_status} />}
                      {!v.conv_count && !v.lead_status && <span className="text-[11px] text-zinc-600">—</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-400 whitespace-nowrap">{timeAgo(v.last_seen_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination base="/admin/visitors" page={page} pages={pages} params={sp} />
    </div>
  );
}
