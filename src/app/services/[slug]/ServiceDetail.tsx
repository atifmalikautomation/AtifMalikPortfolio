"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import type { Service } from "@/lib/site-config";
import { Check, X, ArrowRight, ArrowUpRight, Sparkles, Clock, Shield, Zap, Plus, Phone, Video, ChevronDown, MessageCircle, TrendingUp, Users, DollarSign, Timer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const serviceToCategoryMap: Record<string, string[]> = {
  "ai-video": ["AI Video"],
  "ai-automation": ["AI Automation"],
  "ai-agents": ["AI Chatbot", "AI Automation"],
  "ai-chatbots": ["AI Chatbot"],
  "ai-content": ["AI Content"],
  "ai-websites": ["Web Development"],
  "lead-automation": ["Lead Automation"],
  "custom-ai": ["AI Automation", "AI Chatbot", "Web Development"],
};

function PortfolioImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink/20 to-purple-500/20">
        <span className="font-display font-bold text-wh/70 text-sm text-center px-4">{alt}</span>
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" onError={() => setFailed(true)} />
  );
}

export function ServiceDetail({ service }: { service: Service }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: `How long does a ${service.title} project take?`, a: "Most systems go live in 14-21 days. Complex builds (dashboards, SaaS) take 30 days. No 3-month enterprise crawl. Milestone billing so you only pay when each stage ships." },
    { q: "What does it cost?", a: "Flat pricing: Starter from $500, Full Growth Engine from $2,500. Setup fee + monthly retainer. Full quote in 24 hours after your free audit call." },
    { q: "What if I already have a website or tools?", a: "Start with the free audit call. I'll show you what's actually broken, where money is leaking, and what's worth keeping. No pitch unless you ask for one." },
    { q: "Do you work with my industry?", a: "I work across service businesses — logistics, SaaS, coaching, e-commerce, real estate. If you sell a service, I can automate and scale it." },
    { q: "What tech do you use?", a: "Next.js & WordPress for sites. n8n/Make for automation. GoHighLevel for CRM. OpenAI & Claude for AI. ElevenLabs for voice. Midjourney & Higgsfield for video." },
    { q: "Can I cancel anytime?", a: "Yes. 90-day minimum on retainer plans, then month-to-month. No lock-in contracts, no hidden fees. You own everything from day one." },
  ];

  const whyCards = [
    { icon: Zap, title: "AI-First Approach", desc: "Every system is supercharged with frontier AI models — smarter automations, sharper copy, products that think.", highlight: false },
    { icon: Clock, title: "14-Day Launch", desc: "Most systems go live in 2 weeks. Milestone billing, you only pay when each stage ships. No surprises.", highlight: true },
    { icon: Shield, title: "800+ Projects Shipped", desc: "Battle-tested across 30+ industries. Your system is built on patterns proven to convert.", highlight: false },
    { icon: Sparkles, title: "You Own Everything", desc: "Code, designs, domains, data — it's all yours from day one. No vendor lock-in, ever.", highlight: true },
  ];

  return (
    <div className="pt-2 pb-16">

      {/* ═══ 1. HERO ═══ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-pink/[0.04] blur-[150px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-[10px] font-display font-bold uppercase tracking-widest text-pink mb-5">
                <Sparkles size={12} /> System {service.number}
              </span>

              <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[1.02] text-4xl sm:text-5xl lg:text-6xl text-wh">
                {service.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>
                  {service.title.split(" ").slice(-1)}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-gr leading-relaxed">
                {service.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/book" className="hero-cta-btn">
                  <span className="hero-cta-inner-btn">
                    <Sparkles size={16} /> Book a free audit <ArrowRight size={16} />
                  </span>
                </Link>
                <a href="#included" className="inline-flex items-center gap-2 text-wh font-display font-semibold border-b-2 border-pink pb-1 hover:gap-3 transition-all text-sm">
                  See what I build <ArrowRight size={16} />
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-dm">
                {["14-day launch", "Milestone billing", "Cancel anytime"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#22C55E]" /> {t}</span>
                ))}
              </div>
            </motion.div>

            {/* Right — Stats showcase */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {[
                { value: "800+", label: "Projects Shipped", emoji: "🚀" },
                { value: "14", label: "Day Avg Launch", emoji: "⚡" },
                { value: "5+", label: "Years Experience", emoji: "🗓️" },
                { value: "98%", label: "Client Satisfaction", emoji: "🎯" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl p-6 border transition-all hover:-translate-y-1 hover:shadow-lg ${
                    i % 2 === 1 ? "text-white border-transparent" : "bg-card border-bd"
                  }`}
                  style={i % 2 === 1 ? { background: "var(--pink)" } : undefined}
                >
                  <span className="text-2xl mb-2 block">{stat.emoji}</span>
                  <span className={`font-display font-extrabold text-3xl block ${i % 2 === 1 ? "" : "text-pink"}`}
                    style={i % 2 === 1 ? { color: "#FFFFFF" } : undefined}>{stat.value}</span>
                  <span className={`text-xs font-display font-bold uppercase tracking-wide ${i % 2 === 1 ? "text-white/70" : "text-dm"}`}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-pink/20 to-transparent" />

      {/* ═══ 2. TRUSTED BY ═══ */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-dm font-bold mb-8">
            Trusted by businesses worldwide
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
            {[
              { name: "Dean Russell", role: "Author & Publisher", i: "DR" },
              { name: "Robert Chery", role: "Business Owner", i: "RC" },
              { name: "Sarah Ahmed", role: "E-commerce Founder", i: "SA" },
              { name: "Michael K.", role: "Agency Owner", i: "MK" },
              { name: "Ahmed K.", role: "Moving Company", i: "AK" },
              { name: "Nadia K.", role: "Med Spa Owner", i: "NK" },
            ].map((client) => (
              <div key={client.name} className="flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-full flex items-center justify-center mb-2.5 text-xs font-display font-bold text-white" style={{ background: "var(--pink)" }}>{client.i}</div>
                <span className="block font-display font-bold text-sm text-wh tracking-tight">{client.name}</span>
                <span className="mt-0.5 text-[11px] text-dm">{client.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRY STATS ═══ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-bg2/40 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">The reality</p>
            <h2 className="font-display font-extrabold text-3xl lg:text-4xl tracking-tight leading-[1.05] text-wh">
              Why most businesses{" "}
              <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>stay stuck.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Timer, value: "40+", unit: "hrs/week", desc: "Wasted on manual tasks that AI handles in seconds" },
              { icon: DollarSign, value: "$3K–8K", unit: "/month", desc: "Revenue leaked from slow follow-ups and missed leads" },
              { icon: Users, value: "60%", unit: "of leads", desc: "Lost because no one replied within the first 5 minutes" },
              { icon: TrendingUp, value: "3.2x", unit: "growth", desc: "Average revenue increase after AI automation in 90 days" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.desc} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-bd bg-card p-6 text-center hover:-translate-y-1 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-pink/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-pink/20 transition-colors">
                    <Icon className="w-6 h-6 text-pink" strokeWidth={1.5} />
                  </div>
                  <div className="font-display font-extrabold text-3xl lg:text-4xl text-pink leading-none">{stat.value}</div>
                  <div className="text-xs font-display font-bold text-dm uppercase tracking-wider mt-1 mb-3">{stat.unit}</div>
                  <p className="text-sm text-gr leading-relaxed">{stat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-pink/20 to-transparent" />

      {/* ═══ 3. WHO I HELP ═══ */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">Who this is for</p>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight leading-[1.05] text-wh">
              One system.{" "}
              <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>
                Built deep, not wide.
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl p-6 border hover:-translate-y-1 transition-all ${
                    card.highlight ? "text-white border-transparent" : "bg-card border-bd"
                  }`}
                  style={card.highlight ? { background: "var(--pink)" } : undefined}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.highlight ? "bg-white/20" : "bg-pink/10"}`}>
                    <Icon className={`w-6 h-6 ${card.highlight ? "text-white" : "text-pink"}`} strokeWidth={1.5} />
                  </div>
                  <h3 className={`font-display font-bold text-lg mb-2 ${card.highlight ? "" : "text-wh"}`}
                    style={card.highlight ? { color: "#FFFFFF" } : undefined}>{card.title}</h3>
                  <p className={`text-sm leading-relaxed ${card.highlight ? "text-white/85" : "text-gr"}`}>{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-bg2/40 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">How it works</p>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight leading-[1.05] text-wh">
              Three steps to{" "}
              <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>launch day.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Free Audit Call", desc: "30 minutes. You tell me the biggest bottleneck. I map the fastest fix — you keep the plan even if you never hire me.", icon: Phone },
              { step: "02", title: "Build & Ship", desc: "I build your system in 14-21 days. Milestone billing — you only pay when each stage is approved and shipped.", icon: Zap },
              { step: "03", title: "Launch & Scale", desc: "Your system goes live. I monitor, optimize, and ensure everything runs at peak — for 90 days.", icon: Sparkles },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <div className="bg-card border border-bd rounded-2xl p-7 hover:-translate-y-1 hover:border-pink/30 transition-all h-full group">
                    <div className="flex items-center justify-between mb-6">
                      <span className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-extrabold text-xl text-white shadow-lg" style={{ background: "var(--pink)" }}>{item.step}</span>
                      <Icon className="w-5 h-5 text-dm group-hover:text-pink transition-colors" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-wh mb-3">{item.title}</h3>
                    <p className="text-sm text-gr leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-pink/20 to-transparent" />

      {/* ═══ 3. TRANSFORMATION ═══ */}
      <section id="included" className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-bg2/40 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">The Transformation</p>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight leading-[1.05] text-wh">
              From chaos to{" "}
              <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>
                clockwork.
              </span>
            </h2>
          </div>

          <div className="rounded-3xl border border-bd overflow-hidden bg-card">
            {/* Header */}
            <div className="grid grid-cols-[1fr_40px_1fr] md:grid-cols-[1fr_60px_1fr] items-center border-b border-bd">
              <div className="px-5 md:px-8 py-4">
                <span className="text-[10px] uppercase tracking-[0.25em] font-display font-bold text-red-400 flex items-center gap-2"><X size={12} /> Before</span>
              </div>
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-pink/10 border border-pink/20 flex items-center justify-center"><ArrowRight size={14} className="text-pink" /></div>
              </div>
              <div className="px-5 md:px-8 py-4">
                <span className="text-[10px] uppercase tracking-[0.25em] font-display font-bold text-[#22C55E] flex items-center gap-2"><Sparkles size={12} /> After</span>
              </div>
            </div>
            {/* Rows */}
            {service.problems.map((problem, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className={`grid grid-cols-[1fr_40px_1fr] md:grid-cols-[1fr_60px_1fr] items-center group hover:bg-bg2/60 transition-colors ${i < service.problems.length - 1 ? "border-b border-bd" : ""}`}>
                <div className="px-5 md:px-8 py-5">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5"><X size={10} className="text-red-400" /></span>
                    <span className="text-sm text-gr/70 leading-relaxed line-through decoration-red-400/30">{problem}</span>
                  </div>
                </div>
                <div className="flex justify-center"><div className="w-6 h-px bg-gradient-to-r from-red-400/30 via-pink to-[#22C55E]/30" /></div>
                <div className="px-5 md:px-8 py-5">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center shrink-0 mt-0.5"><Check size={10} className="text-[#22C55E]" /></span>
                    <span className="text-sm text-wh font-medium leading-relaxed">{service.outcomes[i] || "Fully automated"}</span>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Bottom CTA */}
            <div className="border-t border-bd px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: "rgba(224, 122, 95, 0.04)" }}>
              <p className="text-sm text-gr">Ready to make the switch? <span className="text-pink font-display font-bold">Average time: 14 days.</span></p>
              <Link href="/book" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-display font-bold text-white hover:scale-105 transition-all" style={{ background: "var(--pink)" }}>
                Start my transformation <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-pink/20 to-transparent" />

      {/* ═══ WHAT'S INCLUDED ═══ */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">What&apos;s included</p>
              <h2 className="font-display font-extrabold text-3xl lg:text-4xl tracking-tight leading-[1.05] text-wh mb-4">
                Everything in{" "}
                <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>your build.</span>
              </h2>
              <p className="text-gr leading-relaxed mb-6">No hidden costs, no surprise add-ons. This is exactly what ships when you hire me for {service.title}.</p>
              <div className="flex items-center gap-3 text-sm text-dm"><Shield className="w-5 h-5 text-pink" /><span>You own 100% of everything from day one</span></div>
            </div>
            <div className="space-y-3">
              {[
                { title: "Discovery & Strategy", items: ["Business process audit", "Competitor analysis", "Custom system architecture", "Tech stack selection"] },
                { title: "Design & Build", items: ["UI/UX design (Figma)", "Frontend development", "Backend & API integration", "AI model configuration"] },
                { title: "Testing & Launch", items: ["Full QA testing", "Performance optimization", "Deployment & DNS setup", "Launch day support"] },
                { title: "Post-Launch Care", items: ["90-day bug fixes included", "Performance monitoring", "Monthly strategy call", "Priority WhatsApp support"] },
              ].map((group, i) => (
                <motion.div key={group.title} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-card border border-bd rounded-2xl p-5 hover:border-pink/20 transition-all">
                  <h4 className="font-display font-bold text-base text-wh mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-extrabold text-white" style={{ background: "var(--pink)" }}>{i + 1}</span>
                    {group.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {group.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-gr"><Check className="w-3.5 h-3.5 text-pink shrink-0" />{item}</div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PORTFOLIO ═══ */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 mb-10 items-end">
            <div className="lg:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">Portfolio</p>
              <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight leading-[1.02] text-wh">
                Live projects.{" "}
                <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>
                  Real clients.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base text-gr leading-relaxed">
                Each project below was shipped in 14-30 days for a real business. Same quality, same speed for you.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(() => {
              const cats = serviceToCategoryMap[service.id] || [];
              const filtered = siteConfig.portfolio.filter((p) => cats.some((c) => p.category === c));
              const items = filtered.length > 0 ? filtered : [...siteConfig.portfolio].slice(0, 6);
              return items.slice(0, 6).map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group block bg-card border border-bd rounded-2xl overflow-hidden hover:border-pink/40 hover:-translate-y-1 transition-all"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden bg-bg2">
                      <PortfolioImage src={project.image} alt={project.title} />
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] uppercase tracking-widest text-pink font-display font-bold mb-2">{project.category}</p>
                      <h3 className="font-display font-bold text-lg text-wh mb-2 group-hover:text-pink transition">{project.title}</h3>
                      <p className="text-sm text-gr leading-relaxed line-clamp-2 mb-3">{project.description}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-bd">
                        <span className="text-xs text-pink font-display font-bold">{project.result}</span>
                        {!!(project as Record<string, unknown>).liveUrl && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-display font-bold text-pink">
                            Live <ArrowUpRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-pink/20 to-transparent" />

      {/* ═══ CLIENT RESULTS ═══ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-bg2/40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink/[0.03] blur-[150px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">Results</p>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight leading-[1.05] text-wh">
              Numbers that{" "}
              <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>speak louder.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { value: "40+", label: "Hours Saved Weekly", sub: "per client average" },
              { value: "3.2x", label: "Revenue Increase", sub: "within 90 days" },
              { value: "14", label: "Days to Launch", sub: "average delivery" },
              { value: "98%", label: "Client Retention", sub: "come back for more" },
            ].map((metric, i) => (
              <motion.div key={metric.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="text-center p-6 rounded-2xl border border-bd bg-card hover:-translate-y-1 transition-all">
                <div className="font-display font-extrabold text-4xl lg:text-5xl text-pink mb-1">{metric.value}</div>
                <div className="font-display font-bold text-sm text-wh mb-0.5">{metric.label}</div>
                <div className="text-[11px] text-dm">{metric.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 rounded-3xl" style={{ background: "conic-gradient(from 180deg, var(--pink), #C05A35, #8B3A1F, var(--pink), #F5A68A, var(--pink))", padding: "1px" }} />
              <div className="relative bg-card rounded-3xl p-8 md:p-10 m-px">
                <div className="absolute top-4 right-6 md:top-6 md:right-10 select-none pointer-events-none">
                  <span className="font-display text-[120px] leading-none text-pink/[0.07]">&ldquo;</span>
                </div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-5">{[...Array(5)].map((_, i) => <span key={i} className="text-base" style={{ color: "#F59E0B" }}>&#x2B50;</span>)}</div>
                  <p className="text-lg md:text-xl text-wh leading-relaxed font-display font-medium mb-6">
                    &ldquo;Atif delivered a complete system that transformed our operations. What used to take 4 hours daily now runs on autopilot. The ROI was visible within the first week.&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-5 border-t border-bd">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white" style={{ background: "var(--pink)" }}>DR</div>
                    <div>
                      <div className="font-display font-bold text-wh">Dean Russell</div>
                      <div className="text-sm text-gr">Author & Creative Director</div>
                    </div>
                    <span className="ml-auto px-3 py-1 rounded-full bg-pink/10 border border-pink/20 text-[10px] font-display font-bold uppercase tracking-widest text-pink hidden sm:block">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">The Stack</p>
            <h2 className="font-display font-extrabold text-2xl lg:text-3xl tracking-tight text-wh">
              Tools &amp; tech behind your{" "}
              <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>system.</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {service.tools.map((tool, i) => (
              <motion.span key={tool} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="px-5 py-2.5 text-sm font-display font-bold rounded-full border border-bd bg-card text-gr hover:border-pink/30 hover:text-wh transition-all">
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-pink/20 to-transparent" />

      {/* ═══ 5. THE PROMISE ═══ */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
            style={{ background: "linear-gradient(135deg, #E07A5F 0%, #C05A35 50%, #E07A5F 100%)" }}>
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" strokeWidth={1.2} />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3 text-white/80">The promise</p>
              <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight leading-[1] mb-5" style={{ color: "#FFFFFF" }}>
                Live in 14 days.<br />
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500, color: "#FFD6A0" }}>
                  Or your deposit back.
                </span>
              </h2>
              <p className="text-base leading-relaxed max-w-2xl mx-auto text-white/90">
                Miss the launch window and I refund your deposit — you keep the design files. Milestone billing means you only pay when each stage ships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. PRICING ═══ */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">Pricing</p>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight leading-[1.05] text-wh">
              Public pricing.{" "}
              <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>
                No discovery games.
              </span>
            </h2>
            <p className="mt-4 text-base text-gr">Pick a tier. Book a call. Full quote in 24 hours.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {[
              { name: "Starter", price: "500", period: "one-time", desc: "Everything you need to start booking calls on autopilot.", badge: null, primary: false,
                features: ["1 core automation workflow", "Basic AI chatbot setup", "CRM integration", "1 landing page or funnel", "14-day delivery", "30-day support"] },
              { name: "Growth Engine", price: "2,500", period: "+ $249/mo", desc: "The complete client-acquisition system, done for you.", badge: "Most Popular", primary: true,
                features: ["Up to 10 automation workflows", "AI video production (5 assets)", "Multi-platform AI chatbot", "Full CRM + pipeline automation", "Custom dashboard", "21-day delivery", "90-day support"] },
              { name: "Enterprise", price: "5,000", period: "+ $497/mo", desc: "Full-scale AI infrastructure for scaling businesses.", badge: null, primary: false,
                features: ["Everything in Growth Engine", "SaaS dashboard or web app", "AI agent development", "API integrations", "Monthly strategy calls", "30-day delivery"] },
            ].map((tier) => (
              <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={`relative flex flex-col p-7 rounded-3xl transition-all ${
                  tier.primary ? "text-white border-transparent md:scale-[1.03]" : "bg-card border border-bd"
                }`}
                style={tier.primary ? { background: "var(--pink)" } : undefined}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="hero-cta-btn !p-[2px] !shadow-none !rounded-full">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-card text-xs font-display font-extrabold uppercase tracking-widest text-wh">
                        <Sparkles size={12} className="text-pink" /> {tier.badge}
                      </span>
                    </div>
                  </div>
                )}
                <p className={`text-[10px] uppercase tracking-widest mb-2 mt-2 ${tier.primary ? "text-white/80" : "text-dm"}`}>{tier.name}</p>
                <p className={`text-sm mb-5 leading-relaxed ${tier.primary ? "text-white/85" : "text-gr"}`}>{tier.desc}</p>
                <div className={`mb-6 pb-6 border-b ${tier.primary ? "border-white/20" : "border-bd"}`}>
                  <p className={`font-display font-extrabold text-5xl tracking-tight ${tier.primary ? "" : "text-pink"}`}
                    style={tier.primary ? { color: "#FFFFFF" } : undefined}>${tier.price}</p>
                  <p className={`text-sm mt-1 ${tier.primary ? "text-white/75" : "text-dm"}`}>{tier.period}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm leading-snug ${tier.primary ? "text-white/90" : "text-gr"}`}>
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.primary ? "text-white/70" : "text-pink"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/book"
                  className={tier.primary
                    ? "inline-flex items-center justify-center gap-2 bg-white text-pink font-display font-bold text-sm rounded-full px-6 py-3.5 hover:scale-[1.02] transition shadow-lg"
                    : "hero-cta-btn w-full"
                  }>
                  {tier.primary ? (<>Book a strategy call <ArrowRight size={16} /></>) : (
                    <span className="hero-cta-inner-btn justify-center w-full">Get started <ArrowRight size={16} /></span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-dm mt-7">Retainer is month-to-month after 90 days. Cancel anytime.</p>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-pink/20 to-transparent" />

      {/* ═══ 7. FAQ ═══ */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">FAQ</p>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight leading-[1.05] text-wh">
              Common questions,{" "}
              <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>
                straight answers.
              </span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <button key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                className="w-full bg-card border border-bd rounded-2xl p-5 lg:p-6 text-left hover:border-pink/40 transition cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display font-bold text-base lg:text-lg text-wh">{faq.q}</h3>
                  <span className={`w-7 h-7 rounded-full bg-pink/10 border border-pink/30 flex items-center justify-center text-pink shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>
                    <Plus className="w-3.5 h-3.5" />
                  </span>
                </div>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="text-gr leading-relaxed mt-3 text-sm lg:text-base overflow-hidden">
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-pink/20 to-transparent" />

      {/* ═══ 8. GET STARTED — 2 cards ═══ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-pink/[0.06] blur-[180px]" />
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">Get started</p>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight leading-[1] text-wh">
              Two ways to start.{" "}
              <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>
                Both free.
              </span>
            </h2>
            <p className="mt-5 text-base text-gr max-w-2xl mx-auto leading-relaxed">
              Book the call, or message me on WhatsApp. No pitch unless you ask for one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Book the call */}
            <div className="bg-card border border-bd rounded-3xl p-8 hover:border-pink/30 hover:shadow-[0_8px_40px_rgba(224,122,95,0.06)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-pink/10 flex items-center justify-center mb-5">
                <Phone className="w-6 h-6 text-pink" />
              </div>
              <h3 className="font-display font-extrabold text-2xl mb-3 text-wh">Book the call</h3>
              <p className="text-gr mb-6 leading-relaxed text-sm">
                30 minutes. Bring your biggest bottleneck. You walk away with a clear plan — keep it even if you never hire me.
              </p>
              <Link href="/book" className="hero-cta-btn w-full !block">
                <span className="hero-cta-inner-btn justify-center w-full">
                  Book free audit <ArrowRight size={16} />
                </span>
              </Link>
            </div>

            {/* WhatsApp */}
            <div className="bg-card border border-bd rounded-3xl p-8 hover:border-[#25D366]/30 hover:shadow-[0_8px_40px_rgba(37,211,102,0.06)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center mb-5">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <h3 className="font-display font-extrabold text-2xl mb-3 text-wh">Message on WhatsApp</h3>
              <p className="text-gr mb-6 leading-relaxed text-sm">
                No call needed. Send me your situation and I&apos;ll reply with a personal action plan within minutes.
              </p>
              <a href="https://wa.me/923196780720?text=Hi%20Atif!%20I%27m%20interested%20in%20your%20services." target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-[#25D366] text-white font-display font-bold text-sm hover:brightness-110 transition">
                WhatsApp Atif <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
