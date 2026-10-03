import { NextRequest, NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin-auth";
import { getSettings, saveSettings, type AppSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getSettings(), { headers: { "Cache-Control": "no-store" } });
}

const clampInt = (v: unknown, min: number, max: number): number | null =>
  typeof v === "number" && Number.isInteger(v) && v >= min && v <= max ? v : null;

export async function POST(req: NextRequest) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as Partial<AppSettings> | null;
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const left = clampInt(body.leftAfterSeconds, 30, 1800);
  const idle = clampInt(body.idleAfterSeconds, 15, 1800);
  const retention = clampInt(body.retentionDays, 0, 3650);
  if (left === null || idle === null || retention === null) {
    return NextResponse.json({ error: "Left: 30–1800s, Idle: 15–1800s, Retention: 0–3650 days" }, { status: 400 });
  }
  const next: AppSettings = { leftAfterSeconds: left, idleAfterSeconds: idle, retentionDays: retention };
  await saveSettings(next);
  return NextResponse.json({ ok: true, settings: next });
}
