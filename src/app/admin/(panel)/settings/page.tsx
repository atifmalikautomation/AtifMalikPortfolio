import { requireAdmin } from "@/lib/admin-auth";
import { getSettings } from "@/lib/db";
import { Card, PageHeader } from "../ui";
import { DangerZone, OptOutToggle, PasswordForm, TrackingSettingsForm } from "./SettingsForms";

export const dynamic = "force-dynamic";
export const metadata = { title: "Settings · Admin" };

export default async function SettingsPage() {
  const [admin, settings] = await Promise.all([requireAdmin(), getSettings()]);

  return (
    <div className="space-y-5 max-w-4xl">
      <PageHeader title="Settings" sub="Tracking rules, privacy and your admin account" />

      <Card title="Visitor tracking" bodyClass="p-5">
        <TrackingSettingsForm initial={settings} />
      </Card>

      <Card title="Privacy" bodyClass="p-5 space-y-4">
        <OptOutToggle />
        <ul className="text-xs text-zinc-400 space-y-1 list-disc pl-5">
          <li>Visitors get a random anonymous ID stored in their browser — no fingerprinting, no cross-site tracking.</li>
          <li>IP addresses are never stored. Location is coarse (country/city) from Vercel&apos;s edge headers.</li>
          <li>Browsers that send Global Privacy Control (GPC) are not tracked at all.</li>
          <li>Names, emails and phone numbers are stored only when a visitor types them into the chat or contact form.</li>
          <li>Any visitor&apos;s data can be deleted from their profile page (“Delete all visitor data”).</li>
        </ul>
      </Card>

      <Card title="Data deletion" bodyClass="p-5">
        <DangerZone />
      </Card>

      <div id="profile" className="scroll-mt-6">
        <Card title="Admin profile" bodyClass="p-5 space-y-5">
          <div className="text-sm">
            <div className="text-xs text-zinc-500">Signed in as</div>
            <div className="font-medium">{admin.email}</div>
            <div className="text-[11px] text-zinc-500 mt-1">Session expires {new Date(admin.exp * 1000).toLocaleString("en-GB", { timeZone: "Asia/Karachi" })}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Change password</div>
            <PasswordForm />
          </div>
        </Card>
      </div>
    </div>
  );
}
