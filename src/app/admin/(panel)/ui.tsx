/** Small presentational building blocks for the admin panel (server + client safe). */
import Link from "next/link";
import { STATUS_STYLES, statusLabel } from "@/lib/admin-format";

export function PageHeader({ title, sub, children }: { title: string; sub?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {sub && <p className="text-sm text-zinc-400 mt-1">{sub}</p>}
      </div>
      {children}
    </header>
  );
}

export function StatCard({ label, value, sub, href, highlight, dot }: {
  label: string; value: React.ReactNode; sub?: React.ReactNode; href?: string; highlight?: boolean; dot?: string;
}) {
  const body = (
    <>
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-zinc-500">
        {dot && <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />}
        {label}
      </div>
      <div className={`text-2xl font-semibold mt-1.5 tabular-nums ${highlight ? "text-[#F2A48F]" : ""}`}>{value}</div>
      {sub && <div className="text-[11px] text-zinc-500 mt-1">{sub}</div>}
    </>
  );
  const cls = `rounded-2xl bg-[#121826] ring-1 p-4 ${highlight ? "ring-[#E07A5F]/40" : "ring-white/10"}`;
  return href ? <Link href={href} className={`${cls} hover:ring-[#E07A5F]/60 transition`}>{body}</Link> : <div className={cls}>{body}</div>;
}

export function Badge({ status, label }: { status: string; label?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 whitespace-nowrap ${STATUS_STYLES[status] ?? "bg-white/5 text-zinc-300 ring-white/10"}`}>
      {label ?? statusLabel(status)}
    </span>
  );
}

export function LiveDot({ status }: { status: "active" | "idle" | "left" | string }) {
  if (status === "active") {
    return (
      <span className="relative flex w-2.5 h-2.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
        <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400" />
      </span>
    );
  }
  return <span className={`inline-flex w-2.5 h-2.5 rounded-full ${status === "idle" ? "bg-amber-400" : "bg-zinc-600"}`} />;
}

export function Card({ title, action, children, className = "", bodyClass = "" }: {
  title?: React.ReactNode; action?: React.ReactNode; children: React.ReactNode; className?: string; bodyClass?: string;
}) {
  return (
    <section className={`rounded-2xl bg-[#121826] ring-1 ring-white/10 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-white/10">
          <h2 className="text-sm font-semibold">{title}</h2>
          {action}
        </div>
      )}
      <div className={bodyClass}>{children}</div>
    </section>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="px-5 py-10 text-center text-sm text-zinc-500">{children}</p>;
}

/** Horizontal bar list (top pages, sources, devices…). */
export function BarList({ rows, valueLabel, empty = "No data yet." }: {
  rows: { label: React.ReactNode; value: number; extra?: React.ReactNode; href?: string; key?: string }[];
  valueLabel?: string;
  empty?: string;
}) {
  if (!rows.length) return <Empty>{empty}</Empty>;
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="px-5 py-3 space-y-2">
      {valueLabel && <li className="flex justify-end text-[10px] uppercase tracking-wider text-zinc-500">{valueLabel}</li>}
      {rows.map((r, i) => {
        const inner = (
          <div className="relative flex items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-sm">
            <div className="absolute inset-y-0 left-0 rounded-lg bg-[#E07A5F]/10" style={{ width: `${(r.value / max) * 100}%` }} />
            <span className="relative truncate text-zinc-200">{r.label}</span>
            <span className="relative flex items-center gap-3 shrink-0 tabular-nums text-zinc-300">
              {r.extra}
              <span className="font-medium">{r.value.toLocaleString()}</span>
            </span>
          </div>
        );
        return <li key={r.key ?? i}>{r.href ? <Link href={r.href} className="block hover:bg-white/[0.03] rounded-lg">{inner}</Link> : inner}</li>;
      })}
    </ul>
  );
}

/** Simple dependency-free bar chart with up to 3 series. */
export function BarChart({ data, series, height = 160 }: {
  data: { label: string; title?: string; values: number[] }[];
  series: { name: string; color: string }[];
  height?: number;
}) {
  const max = Math.max(1, ...data.flatMap((d) => d.values));
  const step = Math.ceil(data.length / 12);
  return (
    <div>
      <div className="flex items-center gap-4 text-xs text-zinc-400 mb-3">
        {series.map((s) => (
          <span key={s.name} className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />{s.name}</span>
        ))}
      </div>
      <div className="flex items-end gap-1 sm:gap-1.5" style={{ height }}>
        {data.map((d, i) => (
          <div key={d.label + i} className="flex-1 flex flex-col items-center gap-1 min-w-0 h-full" title={d.title ?? `${d.label}: ${d.values.join(" / ")}`}>
            <div className="w-full flex items-end justify-center gap-[2px] flex-1">
              {d.values.map((v, j) => (
                <div key={j} className="flex-1 max-w-3 rounded-t" style={{ background: series[j]?.color, height: `${(v / max) * 100}%`, minHeight: v ? 3 : 0 }} />
              ))}
            </div>
            <div className="text-[10px] text-zinc-500 truncate h-3">{i % step === 0 ? d.label : ""}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function sourceIcon(source: string | null | undefined): string {
  const s = (source ?? "").toLowerCase();
  if (s.includes("google")) return "🔎";
  if (s === "direct") return "➡️";
  if (s.includes("instagram")) return "📸";
  if (s.includes("facebook")) return "📘";
  if (s.includes("linkedin")) return "💼";
  if (s.includes("youtube")) return "▶️";
  if (s.includes("fiverr")) return "🟢";
  if (s.includes("upwork")) return "🟩";
  if (s.includes("twitter") || s === "x") return "✖️";
  if (s.includes("whatsapp")) return "💬";
  return "🔗";
}
