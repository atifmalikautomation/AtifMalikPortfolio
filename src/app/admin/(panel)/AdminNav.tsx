"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Radio, Users, MessagesSquare, Star, BarChart3, Settings, LogOut, ExternalLink, UserCircle,
} from "lucide-react";
import { ConnectionBadge, useLive } from "./LiveProvider";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/live", label: "Live Visitors", icon: Radio, live: true },
  { href: "/admin/visitors", label: "Visitors", icon: Users },
  { href: "/admin/conversations", label: "Conversations", icon: MessagesSquare },
  { href: "/admin/leads", label: "Leads", icon: Star },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { snap } = useLive();
  const online = snap?.counts.online;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="md:w-60 md:h-screen md:sticky md:top-0 shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-[#0E131D] flex md:flex-col z-40">
      <div className="hidden md:flex items-start justify-between px-5 py-6">
        <div>
          <div className="text-sm font-semibold">Atif Malik</div>
          <div className="text-xs text-zinc-500">Visitor &amp; Chat CRM</div>
        </div>
        <ConnectionBadge />
      </div>
      <nav className="flex md:flex-col gap-1 p-2 md:px-3 flex-1 overflow-x-auto">
        {links.map(({ href, label, icon: Icon, live }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors ${
                active ? "bg-[#E07A5F]/15 text-[#F2A48F]" : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
              }`}>
              <Icon size={16} />
              {label}
              {live && online !== undefined && (
                <span className={`ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${online > 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-white/5 text-zinc-500"}`}>
                  {online}
                </span>
              )}
            </Link>
          );
        })}
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm whitespace-nowrap text-zinc-400 hover:text-zinc-100 hover:bg-white/5">
          <ExternalLink size={16} />
          Open website
        </a>
      </nav>
      <div className="p-2 md:p-3 md:border-t border-white/10 flex md:block items-center gap-1">
        <span className="md:hidden px-2"><ConnectionBadge /></span>
        <Link href="/admin/settings#profile" className="hidden md:flex items-center gap-2 px-3 pb-2 text-xs text-zinc-400 hover:text-zinc-200 truncate" title={email}>
          <UserCircle size={15} className="shrink-0" />
          <span className="truncate">{email}</span>
        </Link>
        <button onClick={logout}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:text-red-300 hover:bg-red-500/10 w-full">
          <LogOut size={16} />
          <span className="hidden sm:inline">Log out</span>
        </button>
      </div>
    </aside>
  );
}
