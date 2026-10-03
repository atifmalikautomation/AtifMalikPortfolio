import { requireAdmin } from "@/lib/admin-auth";
import { isDbConfigured } from "@/lib/db";
import { AdminNav } from "./AdminNav";
import { LiveProvider } from "./LiveProvider";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  if (!isDbConfigured()) {
    return (
      <div className="flex min-h-screen flex-col md:flex-row">
        <AdminNav email={admin.email} />
        <main className="flex-1 min-w-0 px-4 py-6 md:px-8 md:py-8">
          <div className="rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/30 p-6 text-amber-200">
            Database is not connected. Set <code className="font-mono">DATABASE_URL</code> in Vercel.
          </div>
        </main>
      </div>
    );
  }

  return (
    <LiveProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        <AdminNav email={admin.email} />
        <main className="flex-1 min-w-0 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </LiveProvider>
  );
}
