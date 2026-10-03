import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Atif Malik",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root min-h-screen w-full bg-[#0B0F17] text-zinc-100 antialiased" style={{ colorScheme: "dark" }}>
      {children}
    </div>
  );
}
