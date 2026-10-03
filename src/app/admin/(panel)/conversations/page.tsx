import Link from "next/link";
import { CONVERSATION_STATUSES, listConversations } from "@/lib/admin-data";
import { deviceFromUA, flag, fmtDateTime, statusLabel, timeAgo, truncate } from "@/lib/admin-format";
import { AutoRefresh } from "../LiveProvider";
import { DateFilter, Pagination, SearchBar } from "../ListControls";
import { Badge, PageHeader } from "../ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Conversations · Admin" };

type SP = { q?: string; status?: string; range?: string; from?: string; to?: string; page?: string };

export default async function ConversationsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const { rows, total, page, pages } = await listConversations({ ...sp, page: Number(sp.page) || 1 });

  const tab = (value: string, label: string) => {
    const qs = new URLSearchParams();
    Object.entries(sp).forEach(([k, v]) => v && k !== "status" && k !== "page" && qs.set(k, v));
    if (value) qs.set("status", value);
    const active = (sp.status ?? "") === value;
    return (
      <Link key={label} href={`/admin/conversations${qs.size ? `?${qs}` : ""}`}
        className={`rounded-full px-3.5 py-1.5 text-xs ring-1 ${active ? "bg-[#E07A5F]/15 text-[#F2A48F] ring-[#E07A5F]/40" : "text-zinc-400 ring-white/10 hover:text-zinc-100"}`}>
        {label}
      </Link>
    );
  };

  return (
    <div className="space-y-5 max-w-6xl">
      <AutoRefresh />
      <PageHeader title="Conversations" sub={`${total} conversation${total === 1 ? "" : "s"}${sp.q ? ` matching “${sp.q}”` : ""}`} />

      <div className="flex flex-wrap gap-2">
        {tab("", "All")}
        {CONVERSATION_STATUSES.map((s) => tab(s, statusLabel(s)))}
      </div>

      <SearchBar action="/admin/conversations" q={sp.q} placeholder="Search name, email, visitor ID, conversation ID or message text…">
        {sp.status && <input type="hidden" name="status" value={sp.status} />}
        <DateFilter range={sp.range} from={sp.from} to={sp.to} />
      </SearchBar>

      <div className="rounded-2xl bg-[#121826] ring-1 ring-white/10 overflow-hidden">
        {rows.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-zinc-500">No conversations found.</p>
        ) : (
          <ul className="divide-y divide-white/5">
            {rows.map((c) => (
              <li key={c.id}>
                <Link href={`/admin/conversations/${c.id}`} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-3.5 hover:bg-white/[0.03]">
                  <span className="text-xl" aria-hidden title={[c.city, c.country].filter(Boolean).join(", ")}>{flag(c.country)}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">
                      {c.visitor_name || "Anonymous"}
                      {c.short_id && <span className="font-mono text-xs text-zinc-500 font-normal"> #{c.short_id}</span>}
                      {c.visitor_email && <span className="text-zinc-500 font-normal"> · {c.visitor_email}</span>}
                    </div>
                    <div className="text-xs text-zinc-400 truncate mt-0.5">{truncate(c.preview, 140) || "— no messages —"}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">
                      {deviceFromUA(c.user_agent)} · started {fmtDateTime(c.created_at)}{c.page ? ` · on ${c.page}` : ""}
                    </div>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <Badge status={c.status} />
                    <div className="text-xs text-zinc-300">{timeAgo(c.last_message_at)}</div>
                    <div className="text-[11px] text-zinc-500">{c.message_count} msgs</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Pagination base="/admin/conversations" page={page} pages={pages} params={sp} />
    </div>
  );
}
