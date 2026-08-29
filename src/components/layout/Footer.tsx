import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Mail, Phone } from "lucide-react";

const services = [
  { label: "AI Video Production", href: "/#services" },
  { label: "n8n Automation", href: "/#services" },
  { label: "AI Chatbots", href: "/#services" },
  { label: "AI Agents", href: "/#services" },
  { label: "Web Apps", href: "/#services" },
  { label: "Lead Generation", href: "/#services" },
  { label: "Content Systems", href: "/#services" },
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

const platforms = [
  { label: "Fiverr", href: "https://fiverr.com/atifmalik", color: "#1DBF73" },
  { label: "Upwork", href: "https://upwork.com", color: "#14A800" },
  { label: "Payoneer", href: "https://payoneer.com", color: "#FF4800" },
  { label: "Wise", href: "https://wise.com", color: "#9FE870" },
  { label: "PayPal", href: "https://paypal.com", color: "#003087" },
];

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: "in" },
  { label: "Instagram", href: siteConfig.social.instagram, icon: "ig" },
  { label: "TikTok", href: siteConfig.social.twitter, icon: "tk" },
  { label: "Facebook", href: siteConfig.social.facebook, icon: "fb" },
  { label: "YouTube", href: siteConfig.social.youtube, icon: "yt" },
];

export function Footer() {
  return (
    <footer className="footer-bg border-t border-bd relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Main grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-pink flex items-center justify-center text-white font-display font-extrabold text-base">
                AM
              </div>
              <div className="font-display text-[22px] font-extrabold text-wh">Atif Malik</div>
            </div>
            <p className="text-[15px] font-semibold text-wh mb-2">
              AI Automation Engineer &middot; Growth Strategist
            </p>
            <p className="text-[14px] text-gr leading-[1.75] max-w-[300px] mb-6">
              Building premium websites &amp; AI-powered growth systems that generate leads, automate ops, and scale revenue, 24/7.
            </p>

            {/* Contact */}
            <div className="flex items-center gap-2.5 text-[14px] text-gr mb-3">
              <Mail size={16} className="text-pink" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-wh transition-colors">
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-[14px] text-gr mb-6">
              <Phone size={16} className="text-pink" />
              <a href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-wh transition-colors">
                {siteConfig.contact.phone}
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-bd2 flex items-center justify-center text-gr hover:text-pink hover:border-pink transition-colors text-xs font-bold"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h3 className="font-display text-lg font-bold text-pink mb-5">Services</h3>
            <div className="flex flex-col gap-2.5">
              {services.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="text-[15px] text-gr hover:text-wh transition-colors"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links column */}
          <div>
            <h3 className="font-display text-lg font-bold text-wh mb-5">Quick Links</h3>
            <div className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[15px] text-gr hover:text-wh transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-bd mt-5 pt-5 flex flex-col gap-3">
              <Link href="/portfolio" className="text-[15px] font-semibold text-pink hover:text-pink-hover transition-colors inline-flex items-center gap-2">
                <span>&#128188;</span> Portfolio
              </Link>
              <Link href="/calculator" className="text-[15px] font-semibold text-pink hover:text-pink-hover transition-colors inline-flex items-center gap-2">
                <span>&#128202;</span> ROI Calculator
              </Link>
            </div>
          </div>

          {/* Work With Me On column */}
          <div>
            <h3 className="font-display text-lg font-bold text-wh mb-5">Work With Me On</h3>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-bd2 hover:border-pink transition-colors bg-card"
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="text-[14px] text-gr font-medium">{p.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-bd flex flex-col sm:flex-row justify-center items-center gap-2 text-center">
          <span className="text-[13px] text-dm">
            &copy; {new Date().getFullYear()} Atif Malik. All rights reserved.
          </span>
          <span className="hidden sm:inline text-dm">&middot;</span>
          <Link href="/terms" className="text-[13px] text-dm hover:text-wh transition-colors">
            Disclaimer &amp; Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
