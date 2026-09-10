"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { clsx } from "clsx";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Briefcase, Calculator, ChevronDown, ArrowRight, Sparkles, Video, Workflow, MessageSquareText, Target, Globe, ShoppingCart, Share2, Mail } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? "hidden" : "";
  };

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-[100] py-4 transition-all duration-[350ms]",
          scrolled && "nav-scrolled backdrop-blur-[20px] border-b border-bd"
        )}
      >
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-4 sm:px-8">
          {/* Logo */}
          <Link href="/" className="font-display text-[17px] font-extrabold tracking-[0.04em] text-gradient">
            ATIF MALIK
          </Link>

          {/* Desktop links — centered */}
          <ul className="hidden lg:flex items-center gap-7 list-none absolute left-1/2 -translate-x-1/2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                {item.label === "Services" ? (
                  <div className="relative">
                    <button
                      className="text-sm font-medium text-gr transition-colors duration-200 hover:text-wh flex items-center gap-1 cursor-pointer"
                      onMouseEnter={() => setServicesOpen(true)}
                    >
                      Services <ChevronDown className={clsx("w-3.5 h-3.5 transition-transform", servicesOpen && "rotate-180")} />
                    </button>
                    {servicesOpen && (
                      <div
                        className="fixed left-1/2 -translate-x-1/2 top-[2.8rem] pt-4 w-[min(820px,calc(100vw-2rem))] z-[9999]"
                        onMouseLeave={() => setServicesOpen(false)}
                      >
                        <div className="bg-card border border-bd rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.3)] p-5 relative z-[102]">
                          <div className="flex items-center justify-between pb-3 mb-4 border-b border-bd">
                            <div>
                              <p className="font-display font-extrabold text-base text-wh">Services I build for you</p>
                              <p className="text-xs text-dm">Pick a service, see what I ship.</p>
                            </div>
                            <a href="/#services" className="text-xs font-display font-bold text-pink hover:brightness-125 inline-flex items-center gap-1">
                              All services <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                          <div className="grid grid-cols-12 gap-4">
                            {/* CTA card */}
                            <div className="col-span-12 lg:col-span-4">
                              <div className="relative overflow-hidden rounded-2xl p-5 h-full flex flex-col"
                                style={{ background: "linear-gradient(155deg, var(--pink) 0%, #FF4DA6 100%)" }}
                              >
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                                <div className="relative z-10 flex flex-col h-full">
                                  <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-display font-bold text-white/85 mb-3">
                                    <Sparkles size={12} /> Free strategy call
                                  </div>
                                  <h4 className="font-display font-extrabold text-xl leading-tight mb-2" style={{ color: "#FFFFFF" }}>Not sure which service fits?</h4>
                                  <p className="text-sm text-white/85 leading-relaxed mb-4 flex-1">Book a 15-min audit. I&apos;ll map your fastest path to revenue, no pitch.</p>
                                  <Link href="/book" onClick={() => setServicesOpen(false)} className="inline-flex items-center justify-center gap-2 bg-white text-pink font-display font-extrabold text-sm rounded-full px-5 py-2.5 hover:scale-[1.03] transition shadow-lg">
                                    Book free call <ArrowRight className="w-4 h-4" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                            {/* Service grid — Yasir style: icon box + name + desc */}
                            <div className="col-span-12 lg:col-span-8">
                              <div className="grid grid-cols-2 gap-1">
                                {[
                                  { icon: Video, name: "AI Video Production", desc: "UGC, ads & cinematic AI videos", slug: "ai-video-production" },
                                  { icon: Workflow, name: "n8n Automation", desc: "Workflows that run 24/7", slug: "ai-automation" },
                                  { icon: MessageSquareText, name: "AI Chatbots", desc: "WhatsApp, web & Messenger bots", slug: "ai-chatbots" },
                                  { icon: Target, name: "GoHighLevel CRM", desc: "Funnels, pipelines & follow-ups", slug: "lead-sales-automation" },
                                  { icon: Globe, name: "Web Development", desc: "Custom sites built to convert", slug: "ai-web-development" },
                                  { icon: ShoppingCart, name: "E-commerce Solutions", desc: "Stores + retention + CRO", slug: "ai-content-systems" },
                                  { icon: Share2, name: "AI Agents", desc: "Custom agents that handle tasks", slug: "ai-agents" },
                                  { icon: Mail, name: "Custom AI Systems", desc: "End-to-end AI infrastructure", slug: "custom-ai-systems" },
                                ].map((s) => (
                                  <Link key={s.name} href={`/services/${s.slug}`} onClick={() => setServicesOpen(false)}
                                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-pink/5 transition group">
                                    <span className="w-9 h-9 rounded-lg bg-pink/10 flex items-center justify-center shrink-0">
                                      <s.icon className="w-4 h-4 text-pink" />
                                    </span>
                                    <div>
                                      <span className="text-sm font-display font-bold text-wh block leading-tight group-hover:text-pink transition-colors">{s.name}</span>
                                      <span className="text-[11px] text-dm">{s.desc}</span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                          {/* Footer */}
                          <div className="mt-4 pt-3 border-t border-bd text-center">
                            <p className="text-[11px] text-dm">
                              Need something custom?{" "}
                              <a href="https://wa.me/923196780720" target="_blank" rel="noopener noreferrer" className="text-pink font-semibold hover:underline">
                                Message me on WhatsApp
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : item.label === "Portfolio" ? (
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gr transition-colors duration-200 hover:text-wh flex items-center gap-1"
                  >
                    <Briefcase className="w-3.5 h-3.5" /> Portfolio
                  </Link>
                ) : item.label === "ROI" ? (
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gr transition-colors duration-200 hover:text-wh flex items-center gap-1"
                  >
                    <Calculator className="w-3.5 h-3.5" /> ROI
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    className={clsx(
                      "text-sm font-medium transition-colors duration-200 hover:text-wh",
                      pathname === item.href ? "text-wh" : "text-gr"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/book"
              className="hero-cta-btn !p-[2px] !shadow-none"
            >
              <span className="hero-cta-inner-btn !py-2 !px-5 !text-sm !font-display !font-bold !tracking-tight">
                Book Free Audit <span>&rarr;</span>
              </span>
            </Link>
          </div>

          {/* Mobile: theme toggle + burger */}
          <div className="lg:hidden flex items-center gap-3 z-[101]">
            <ThemeToggle />
          <button
            className="flex flex-col gap-[5px] p-2"
            onClick={toggleMobile}
            aria-label="Toggle menu"
          >
            <span className={clsx("w-5 h-[1.5px] bg-wh transition-all duration-300", mobileOpen && "rotate-45 translate-y-[6.5px]")} />
            <span className={clsx("w-5 h-[1.5px] bg-wh transition-all duration-300", mobileOpen && "opacity-0")} />
            <span className={clsx("w-5 h-[1.5px] bg-wh transition-all duration-300", mobileOpen && "-rotate-45 -translate-y-[6.5px]")} />
          </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg z-[99] flex flex-col justify-center items-center gap-6"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-[26px] font-bold text-wh"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="nav-book-btn mt-4 px-8 py-3 rounded-full font-display font-bold tracking-tight inline-flex items-center gap-2 transition-all"
            >
              Book Free Audit <span>&rarr;</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
