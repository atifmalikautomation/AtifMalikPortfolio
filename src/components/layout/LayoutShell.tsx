"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChatWidget } from "../chat/ChatWidget";
import { SocialSidebar } from "./SocialSidebar";
import { WhatsAppButton } from "./WhatsAppButton";
import { FloatingEmojis } from "./FloatingEmojis";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatPage = pathname === "/chat";

  if (isChatPage) {
    return <>{children}</>;
  }

  return (
    <>
      <FloatingEmojis />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <SocialSidebar />
      <ChatWidget />
      <WhatsAppButton />
    </>
  );
}
