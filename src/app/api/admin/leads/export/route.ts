import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin-auth";
import { allLeads } from "@/lib/admin-data";

/** Download all leads as CSV (opens in Excel / Google Sheets). */
export async function GET() {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const leads = await allLeads();
  const cols = ["id", "created_at", "name", "email", "phone", "company", "source", "status", "service", "message", "notes", "short_id", "visitor_id", "conversation_id"] as const;
  const esc = (v: unknown) => {
    if (v === null || v === undefined) return "";
    let s = v instanceof Date ? v.toISOString() : String(v);
    // Prevent spreadsheet formula injection
    if (/^[=+\-@]/.test(s)) s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [cols.join(","), ...leads.map((l) => cols.map((c) => esc(l[c])).join(","))].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse("\uFEFF" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="atif-leads-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
