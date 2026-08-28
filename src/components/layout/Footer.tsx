import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const footerCols = [
  {
    title: "Navigate",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Case Studies", href: "/portfolio" },
      { label: "Blog", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "AI Automation & n8n", href: "/services/ai-automation" },
      { label: "AI Chatbots", href: "/services/ai-chatbots" },
      { label: "AI Video Production", href: "/services/ai-video-production" },
      { label: "AI Content Systems", href: "/services/ai-content-systems" },
      { label: "AI Web Development", href: "/services/ai-web-development" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
      { label: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}` },
      { label: "Book a Call", href: siteConfig.contact.calendly },
      { label: "Portfolio Archive", href: "/portfolio" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-bd bg-bg">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="py-[60px] pb-10 border-b border-bd">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="font-display text-[22px] font-extrabold mb-2 text-gradient">ATIF MALIK</div>
              <p className="text-sm text-gr leading-[1.7] max-w-[320px] mb-5">
                AI automation specialist based in Pakistan. I build n8n workflows, AI chatbots,
                video pipelines, and intelligent systems that run your business on autopilot.
              </p>
            </div>
            {footerCols.map((col) => (
              <div key={col.title}>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-dm mb-3.5">{col.title}</div>
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-[13px] text-gr py-[3px] hover:text-wh transition-colors"
                    {...(link.href.startsWith("http") || link.href.startsWith("mailto") || link.href.startsWith("tel")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="font-mono text-[11px] text-dm">&copy; {new Date().getFullYear()} Atif Malik. All rights reserved.</div>
          <div className="flex gap-5">
            <Link href="/about" className="font-mono text-[11px] text-dm hover:text-wh transition-colors">About</Link>
            <Link href="/services" className="font-mono text-[11px] text-dm hover:text-wh transition-colors">Services</Link>
            <Link href="/contact" className="font-mono text-[11px] text-dm hover:text-wh transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
