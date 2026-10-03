import Link from "next/link";

/** Search box + pagination shared by list pages (pure server-rendered, GET forms). */
export function SearchBar({ action, q, placeholder, children }: {
  action: string; q?: string; placeholder: string; children?: React.ReactNode;
}) {
  return (
    <form action={action} className="flex flex-wrap gap-2">
      <input name="q" defaultValue={q} placeholder={placeholder} type="search"
        className="flex-1 min-w-48 rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-2.5 text-sm outline-none focus:ring-[#E07A5F]/50 placeholder:text-zinc-500" />
      {children}
      <button className="rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2.5 text-sm">Search</button>
    </form>
  );
}

/** Native <select> styled for the dark admin theme (works inside GET forms). */
export function FilterSelect({ name, value, options, label }: {
  name: string; value?: string; label: string; options: { value: string; label: string }[];
}) {
  return (
    <select name={name} defaultValue={value ?? ""} aria-label={label}
      className="rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-2.5 text-sm outline-none focus:ring-[#E07A5F]/50 text-zinc-200">
      <option value="" className="bg-[#121826]">{label}: All</option>
      {options.map((o) => <option key={o.value} value={o.value} className="bg-[#121826]">{o.label}</option>)}
    </select>
  );
}

export const RANGE_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "custom", label: "Custom range" },
];

/** Date filter: range select + optional custom from/to inputs. */
export function DateFilter({ range, from, to }: { range?: string; from?: string; to?: string }) {
  return (
    <>
      <FilterSelect name="range" value={range} label="Date" options={RANGE_OPTIONS} />
      <input type="date" name="from" defaultValue={from} aria-label="From date" title="Custom range: from"
        className="rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-2 text-sm text-zinc-300 outline-none [color-scheme:dark]" />
      <input type="date" name="to" defaultValue={to} aria-label="To date" title="Custom range: to"
        className="rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-2 text-sm text-zinc-300 outline-none [color-scheme:dark]" />
    </>
  );
}

export function Pagination({ base, page, pages, params }: {
  base: string; page: number; pages: number; params: Record<string, string | undefined>;
}) {
  if (pages <= 1) return null;
  const href = (p: number) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => v && k !== "page" && sp.set(k, v));
    sp.set("page", String(p));
    return `${base}?${sp.toString()}`;
  };
  const btn = "rounded-lg px-3 py-1.5 text-sm ring-1 ring-white/10";
  return (
    <div className="flex items-center justify-between text-sm text-zinc-400">
      <span>Page {page} of {pages}</span>
      <div className="flex gap-2">
        {page > 1 ? <Link href={href(page - 1)} className={`${btn} hover:bg-white/5`}>← Prev</Link> : <span className={`${btn} opacity-40`}>← Prev</span>}
        {page < pages ? <Link href={href(page + 1)} className={`${btn} hover:bg-white/5`}>Next →</Link> : <span className={`${btn} opacity-40`}>Next →</span>}
      </div>
    </div>
  );
}
