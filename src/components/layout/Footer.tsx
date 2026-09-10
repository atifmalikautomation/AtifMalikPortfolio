import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Mail, Phone, ArrowRight, Check } from "lucide-react";

const services = [
  { label: "AI Video Production", href: "/services/ai-video-production" },
  { label: "n8n Automation", href: "/services/ai-automation" },
  { label: "AI Chatbots", href: "/services/ai-chatbots" },
  { label: "AI Agents", href: "/services/ai-agents" },
  { label: "Web Apps", href: "/services/ai-web-development" },
  { label: "Lead Generation", href: "/services/lead-sales-automation" },
  { label: "Content Systems", href: "/services/ai-content-systems" },
];

const quickLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Book a Call", href: "/book" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: siteConfig.social.tiktok,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: siteConfig.social.youtube,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
        <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer
      className="mt-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, var(--pink) 0%, #651545 100%)",
        color: "#ffffff",
      }}
    >
      {/* Glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(255, 200, 50, 0.2)" }} />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(255, 255, 255, 0.1)" }} />
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(/grain.svg)", backgroundRepeat: "repeat" }} />
      {/* Top shimmer */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 py-16 relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* ─── Brand ─── */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ border: "2px solid rgba(255,255,255,0.25)" }}>
                <Image src="/images/atif-face.jpeg" alt="Atif Malik" width={48} height={48} className="w-full h-full object-cover object-top" />
              </div>
              <h3 className="font-display font-extrabold text-2xl" style={{ color: "#fff" }}>Atif Malik</h3>
            </div>
            <p className="text-base font-display font-semibold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
              AI Automation Engineer &middot; Growth Strategist
            </p>
            <p className="text-[13.5px] leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
              Building premium websites &amp; AI-powered growth systems that generate leads, automate ops, and scale revenue, 24/7.
            </p>

            {/* Contact */}
            <div className="space-y-2.5 mb-5">
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2.5 text-[12px] sm:text-[13px] hover:brightness-125 transition-all break-all" style={{ color: "rgba(255,255,255,0.9)" }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <Mail size={13} />
                </span>
                {siteConfig.contact.email}
              </a>
              <a href="https://wa.me/923196780720" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[13px] hover:brightness-125 transition-all" style={{ color: "rgba(255,255,255,0.9)" }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <Phone size={13} />
                </span>
                {siteConfig.contact.phone}
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-white/20"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.2)", color: "#fff" }}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ─── Services ─── */}
          <div>
            <h4 className="font-display font-bold text-lg mb-1" style={{ color: "#fff" }}>Services</h4>
            <div className="w-8 h-[2px] rounded-full mb-5" style={{ background: "linear-gradient(90deg, #fde68a, transparent)" }} />
            <div className="flex flex-col gap-2.5">
              {services.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="text-[14px] transition-all hover:translate-x-1 hover:text-white inline-flex items-center gap-2"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.35)" }} />
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ─── Quick Links ─── */}
          <div>
            <h4 className="font-display font-bold text-lg mb-1" style={{ color: "#fff" }}>Quick Links</h4>
            <div className="w-8 h-[2px] rounded-full mb-5" style={{ background: "linear-gradient(90deg, #fde68a, transparent)" }} />
            <div className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[14px] transition-all hover:translate-x-1 hover:text-white inline-flex items-center gap-2"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.35)" }} />
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 flex flex-col gap-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              <Link href="/portfolio" className="text-[14px] font-semibold hover:translate-x-1 transition-all inline-flex items-center gap-1.5" style={{ color: "#fde68a" }}>
                <span>&#x1F4BC;</span> Portfolio
              </Link>
              <Link href="/calculator" className="text-[14px] font-semibold hover:translate-x-1 transition-all inline-flex items-center gap-1.5" style={{ color: "#fde68a" }}>
                <span>&#x1F4CA;</span> ROI Calculator
              </Link>
            </div>
          </div>

          {/* ─── CTA Card ─── */}
          <div>
            <div
              className="rounded-2xl p-6 backdrop-blur-sm"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ background: "#fde68a", boxShadow: "0 0 8px rgba(253,232,138,0.6)" }} />
                <h4 className="font-display font-bold text-lg" style={{ color: "#fff" }}>Ready to Grow?</h4>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.85)" }}>
                Book a free 30-min strategy call. Let&apos;s build your AI-powered growth system.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-sm transition-all hover:scale-105 hover:shadow-lg w-full justify-center"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #f0e6ff 100%)",
                  color: "#651545",
                  boxShadow: "0 4px 20px rgba(255,255,255,0.25)",
                }}
              >
                Book a Free Call
                <ArrowRight size={16} />
              </Link>
              <div className="mt-4 pt-4 flex flex-col gap-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                {["No commitment required", "Free growth audit included", "Reply within 24 hours"].map((t) => (
                  <div key={t} className="flex items-center gap-2.5 text-[13px]" style={{ color: "rgba(255,255,255,0.9)" }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(253,232,138,0.15)", border: "1px solid rgba(253,232,138,0.3)" }}>
                      <Check size={11} style={{ color: "#fde68a" }} />
                    </div>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gradient divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {/* Bottom bar */}
        <div className="pt-6 pb-3 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.5)" }} />
            <span>Available for new projects</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>&middot;</span>
            <span>&copy; {new Date().getFullYear()} Atif Malik</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/terms" className="transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
              Terms
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
              Privacy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
