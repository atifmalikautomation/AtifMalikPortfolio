"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Service } from "@/lib/site-config";
import { Check, X, ArrowRight, Sparkles, Clock, Shield, Zap, Plus, Phone, Video, ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";

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
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
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

              <div className="mt-7 flex items-center gap-2 text-sm text-dm">
                <Check className="w-4 h-4 text-[#22C55E]" />
                <span>14-day launch · Milestone billing · Cancel anytime</span>
              </div>
            </motion.div>

            {/* Right — Stats showcase */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:grid grid-cols-2 gap-3"
            >
              {[
                { value: "800+", label: "Projects Shipped", emoji: "🚀" },
                { value: "14", label: "Day Avg Launch", emoji: "⚡" },
                { value: "5+", label: "Years Experience", emoji: "🗓️" },
                { value: "5★", label: "Rated Worldwide", emoji: "⭐" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl p-5 border transition-all hover:-translate-y-1 ${
                    i % 2 === 1 ? "text-white border-transparent" : "bg-card border-bd"
                  }`}
                  style={i % 2 === 1 ? { background: "linear-gradient(135deg, var(--pink) 0%, #FF4DA6 100%)" } : undefined}
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

      {/* ═══ 2. TRUSTED BY ═══ */}
      <section className="py-10 px-4 border-y border-bd bg-bg2/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-dm font-bold mb-5">
            Trusted by businesses worldwide
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-4 items-start justify-items-center">
            {[
              { name: "Dean Russell", role: "Author & Publisher" },
              { name: "Robert Chery", role: "Business Owner" },
              { name: "Sarah Ahmed", role: "E-commerce Founder" },
              { name: "Michael K.", role: "Agency Owner" },
              { name: "Ahmed K.", role: "Moving Company" },
              { name: "Nadia K.", role: "Med Spa Owner" },
            ].map((client) => (
              <div key={client.name} className="text-center">
                <span className="block font-display font-extrabold text-base text-wh/75 tracking-tight">{client.name}</span>
                <span className="mt-0.5 inline-block text-xs font-semibold text-dm">{client.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  style={card.highlight ? { background: "linear-gradient(135deg, var(--pink) 0%, #FF4DA6 100%)" } : undefined}
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

      {/* ═══ 3. BEFORE & AFTER ═══ */}
      <section id="included" className="section-padding">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">Before &amp; After</p>
            <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight leading-[1.05] text-wh">
              What&apos;s broken vs what you{" "}
              <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 500 }}>
                actually get.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-6">
              <h3 className="text-sm font-display font-bold text-red-400 mb-5 flex items-center gap-2">
                <X size={18} /> The Pain Right Now
              </h3>
              <ul className="space-y-4">
                {service.problems.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gr">
                    <span className="w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={12} className="text-red-400" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/[0.06] p-6">
              <h3 className="text-sm font-display font-bold text-[#22C55E] mb-5 flex items-center gap-2">
                <Check size={18} /> After Atif Builds It
              </h3>
              <ul className="space-y-4">
                {service.outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gr">
                    <span className="w-5 h-5 rounded-full bg-[#22C55E]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-[#22C55E]" />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </motion.div>
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
            {[
              { name: "Bayou Savage", category: "AI Graphic Novel", desc: "Complete AI-generated comic book with character consistency across 50+ pages.", color: "from-pink/20 to-purple-500/20" },
              { name: "The Optician Project", category: "AI Commercial", desc: "30-second cinematic AI commercial for optical business with professional editing.", color: "from-blue-500/20 to-cyan-500/20" },
              { name: "DaCount Brand", category: "AI Design", desc: "Gothic t-shirt brand design with AI-generated split face artwork and branding.", color: "from-orange-500/20 to-red-500/20" },
              { name: "Sara AI Agent", category: "AI Sales Agent", desc: "GHL + Gemini powered text agent for lead qualification and appointment booking.", color: "from-green-500/20 to-teal-500/20" },
              { name: "Helping Hopes", category: "Web Development", desc: "Education conversion website with Next.js, Tailwind and Framer Motion.", color: "from-yellow-500/20 to-amber-500/20" },
              { name: "Academic Support", category: "Web App", desc: "Full platform for AIOU students with 40 routes, dashboards and order system.", color: "from-indigo-500/20 to-violet-500/20" },
            ].map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-card border border-bd rounded-2xl overflow-hidden hover:border-pink/40 hover:-translate-y-1 transition-all"
              >
                <div className={`aspect-[16/10] bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                  <span className="font-display font-extrabold text-2xl text-wh/90 text-center px-4">{project.name}</span>
                </div>
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-widest text-pink font-display font-bold mb-2">{project.category}</p>
                  <h3 className="font-display font-bold text-lg text-wh mb-2 group-hover:text-pink transition">{project.name}</h3>
                  <p className="text-sm text-gr leading-relaxed">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
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

      {/* ═══ 5. THE PROMISE ═══ */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center"
            style={{ background: "linear-gradient(135deg, var(--pink) 0%, #FF4DA6 100%)" }}>
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <Check className="w-14 h-14 mx-auto mb-5 text-white/80" strokeWidth={1.5} />
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
                style={tier.primary ? { background: "linear-gradient(160deg, var(--pink) 0%, #C20076 100%)" } : undefined}
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

      {/* ═══ 8. GET STARTED — 2 cards ═══ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-pink/[0.05] blur-[160px]" />
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
            <div className="bg-card border border-bd rounded-3xl p-8 hover:border-pink/30 transition">
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
            <div className="bg-card border border-bd rounded-3xl p-8 hover:border-[#25D366]/30 transition">
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
