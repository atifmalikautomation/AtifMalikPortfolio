import Link from "next/link";
import { Download } from "lucide-react";
import { LEAD_STATUSES, listLeads } from "@/lib/admin-data";
import { fmtDateTime, statusLabel, truncate } from "@/lib/admin-format";
import { DeleteButton, LeadStatusSelect } from "../AdminControls";
import { AutoRefresh } from "../LiveProvider";
import { DateFilter, FilterSelect, Pagination, SearchBar } from "../ListControls";
import { PageHeader } from "../ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Leads · Admin" };

type SP = { q?: string; status?: string; source?: string; range?: string; from?: string; to?: string; page?: string };

export default async function LeadsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const { rows, total, page, pages } = await listLeads({ ...sp, page: Number(sp.page) || 1 });

  const tab = (value: string, label: string) => {
    const qs = new URLSearchParams();
    Object.entries(sp).forEach(([k, v]) => v && k !== "status" && k !== "page" && qs.set(k, v));
    if (value) qs.set("status", value);
    const active = (sp.status ?? "") === value;
    return (
      <Link key={label} href={`/admin/leads${qs.size ? `?${qs}` : ""}`}
        className={`rounded-full px-3.5 py-1.5 text-xs ring-1 ${active ? "bg-[#E07A5F]/15 text-[#F2A48F] ring-[#E07A5F]/40" : "text-zinc-400 ring-white/10 hover:text-zinc-100"}`}>
        {label}
      </Link>
    );
  };

  return (
    <div className="space-y-5 max-w-6xl">
      <AutoRefresh />
      <PageHeader title="Leads" sub={`${total} lead${total === 1 ? "" : "s"} from the chatbot and contact form`}>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- file download, not a page */}
        <a href="/api/admin/leads/export" download className="inline-flex items-center gap-2 rounded-xl bg-[#E07A5F] hover:bg-[#d56a4f] px-4 py-2.5 text-sm font-medium text-white">
          <Download size={15} /> Export CSV
        </a>
      </PageHeader>

      <div className="flex flex-wrap gap-2">
        {tab("", "All")}
        {LEAD_STATUSES.map((s) => tab(s, statusLabel(s)))}
      </div>

      <SearchBar action="/admin/leads" q={sp.q} placeholder="Search name, email, phone, company, service, visitor/conversation ID…">
        {sp.status && <input type="hidden" name="status" value={sp.status} />}
        <FilterSelect name="source" value={sp.source} label="Source" options={[{ value: "chat", label: "Chatbot" }, { value: "contact-form", label: "Contact form" }]} />
        <DateFilter range={sp.range} from={sp.from} to={sp.to} />
      </SearchBar>

      <div className="rounded-2xl bg-[#121826] ring-1 ring-white/10 overflow-x-auto">
        {rows.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-zinc-500">No leads found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-500 border-b border-white/10">
                <th className="px-4 py-3 font-medium">Lead</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Details</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium whitespace-nowrap">Created</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((l) => (
                <tr key={l.id} className="align-top hover:bg-white/[0.02]">
                  <td className="px-4 py-3 min-w-44">
                    <div className="font-medium">{l.name || "—"}</div>
                    {l.email && <a href={`mailto:${l.email}`} className="text-xs text-[#F2A48F] hover:underline break-all">{l.email}</a>}
                    {l.phone && <div className="text-xs text-zinc-400">{l.phone}</div>}
                    {l.company && <div className="text-xs text-zinc-500">{l.company}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-zinc-300 whitespace-nowrap">
                      {l.source === "chat" ? "💬 Chat" : l.source === "contact-form" ? "📝 Form" : l.source}
                    </span>
                    {l.visitor_id && (
                      <Link href={`/admin/visitors/${l.visitor_id}`} className="block mt-1 font-mono text-[11px] text-zinc-500 hover:text-[#F2A48F]">#{l.short_id ?? "visitor"}</Link>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-xs text-zinc-400 max-w-md">
                    {l.service && <div><span className="text-zinc-500">Service:</span> {l.service}</div>}
                    {l.message && <div className="mt-0.5">{truncate(l.message, 160)}</div>}
                    {l.notes && <div className="mt-1 text-amber-200/80">📌 {truncate(l.notes, 100)}</div>}
                    {l.conversation_id && (
                      <Link href={`/admin/conversations/${l.conversation_id}`} className="mt-1 inline-block text-[#F2A48F] hover:underline">View chat →</Link>
                    )}
                  </td>
                  <td className="px-4 py-3"><LeadStatusSelect id={l.id} status={l.status} /></td>
                  <td className="px-4 py-3 text-xs text-zinc-400 whitespace-nowrap">{fmtDateTime(l.created_at)}</td>
                  <td className="px-4 py-3"><DeleteButton url={`/api/admin/leads/${l.id}`} label="" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination base="/admin/leads" page={page} pages={pages} params={sp} />
    </div>
  );
}
