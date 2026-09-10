"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Video, Workflow, Mic, Brain, Bot, Code2, Target, Plug } from "lucide-react";

const tools = [
  { icon: Video, name: "Higgsfield", color: "#E0008A", bg: "rgba(224,0,138,0.12)" },
  { icon: Workflow, name: "n8n", color: "#FF6D5A", bg: "rgba(255,109,90,0.12)" },
  { icon: Mic, name: "ElevenLabs", color: "#7C3AED", bg: "rgba(124,58,237,0.12)" },
  { icon: Brain, name: "Claude", color: "#D97706", bg: "rgba(217,119,6,0.12)" },
  { icon: Bot, name: "OpenAI", color: "#10A37F", bg: "rgba(16,163,127,0.12)" },
  { icon: Code2, name: "Next.js", color: "#171717", bg: "rgba(23,23,23,0.15)" },
  { icon: Target, name: "GHL", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  { icon: Plug, name: "APIs", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
];

const socials = [
  { name: "YouTube", href: "https://youtube.com/@atifmalikfreelancer", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  )},
  { name: "Instagram", href: "https://www.instagram.com/atifmalik_ai/", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
  )},
  { name: "LinkedIn", href: "https://www.linkedin.com/in/atif-malik-745096324/", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  )},
  { name: "Facebook", href: "https://web.facebook.com/profile.php?id=100087796622999", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  )},
  { name: "TikTok", href: "https://www.tiktok.com/@atifmalikautomation", icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
  )},
];

const stats = [
  { value: "800+", label: "Projects Shipped", emoji: "🚀" },
  { value: "5+", label: "Years Experience", emoji: "🗓️" },
  { value: "5★", label: "Rated Worldwide", emoji: "⭐" },
];

export function AboutSection() {
  return (
    <section className="section-padding relative" id="about">
      {/* Gradient BG — covers grid lines like Yasir */}
      <div
        className="absolute inset-0 z-0 rounded-3xl"
        style={{
          background: "linear-gradient(160deg, var(--bg2) 0%, var(--bg) 40%, var(--bg2) 70%, var(--bg) 100%)",
        }}
      />
      {/* Pink glow — top-right corner 15% */}
      <div
        className="absolute top-0 right-0 w-[40%] h-[50%] z-0 pointer-events-none rounded-tr-3xl"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(224,0,138,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left — Content (order-2 on mobile, order-1 on lg) */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-[10px] font-display font-bold uppercase tracking-widest text-pink mb-5">
              <Sparkles size={12} /> About Me
            </span>

            <h2 className="font-display text-[clamp(28px,4vw,46px)] font-extrabold text-wh leading-[1.08] tracking-[-0.02em] mb-4">
              I&apos;m{" "}
              <span
                className="text-pink"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                Atif Malik.
              </span>
            </h2>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-[10px] font-display font-bold uppercase tracking-widest text-pink mb-6">
              <Sparkles size={12} /> AI Video &amp; Automation Specialist
            </span>

            <p className="text-gr text-base leading-[1.75] mb-7">
              I turn manual chaos into AI-powered systems — cinematic video
              production, workflow automation, intelligent chatbots, and lead
              engines that run 24/7. Every system I ship is built to save hours,
              cut costs, and move revenue. Not just deliverables — real results.
            </p>

            {/* Toolkit */}
            <div className="grid grid-cols-4 gap-1.5 mb-6">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-bd bg-card group hover:border-bd2 transition-colors cursor-default"
                >
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: tool.bg }}
                  >
                    <tool.icon size={11} style={{ color: tool.color }} />
                  </div>
                  <span className="text-[10px] font-display font-semibold text-gr group-hover:text-wh transition-colors truncate">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Follow / Connect */}
            <div className="mb-7">
              <span className="text-[11px] font-mono text-dm uppercase tracking-widest block mb-3">
                Follow / Connect
              </span>
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-full border border-bd bg-card flex items-center justify-center text-gr hover:text-pink hover:border-pink/40 transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile stats — only on small screens */}
            <div className="grid grid-cols-3 gap-2 mb-7 sm:hidden">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-3 text-center"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(224, 0, 138, 0.2)",
                    boxShadow: "0 4px 20px rgba(224, 0, 138, 0.15)",
                  }}
                >
                  <span className="text-base block mb-0.5">{stat.emoji}</span>
                  <div className="text-sm font-display font-extrabold text-pink">
                    {stat.value}
                  </div>
                  <div className="text-[9px] font-mono text-dm uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/book" className="hero-cta-btn">
                <span className="hero-cta-inner-btn text-sm">
                  <Sparkles size={14} /> Book a free audit <ArrowRight size={14} />
                </span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-display font-semibold text-wh border-b-2 border-pink pb-1 hover:gap-3 transition-all"
              >
                Full story <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Right — Image (order-1 on mobile, order-2 on lg) */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative pb-8 sm:pb-10 order-1 lg:order-2"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-bd">
              {/* Pink accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-pink via-pink/60 to-transparent z-10" />

              {/* Photo */}
              <Image
                src="/images/atif.jpeg"
                alt="Atif Malik — AI Growth Systems Architect"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Bottom gradient overlay — theme-aware */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 z-[1]"
                style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
              />


              {/* Glow */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-pink06 blur-[100px] pointer-events-none" />
            </div>

            {/* Floating badge — top-right, half inside half outside */}
            <div
              className="absolute -top-4 -right-3 lg:-right-5 z-20 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[10px] sm:text-[11px] font-display font-bold uppercase tracking-[0.12em] text-pink whitespace-nowrap"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(224, 0, 138, 0.2)",
                boxShadow: "0 4px 20px rgba(224, 0, 138, 0.15)",
              }}
            >
              <Sparkles size={12} className="flex-shrink-0" /> No.1 AI Agency in Pakistan
            </div>

            {/* Floating stats — overlapping bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-2 left-0 lg:-left-6 z-20 hidden sm:block"
            >
              <div className="grid grid-cols-3 gap-2">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl p-3 text-center min-w-[88px]"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid rgba(224, 0, 138, 0.2)",
                      boxShadow: "0 4px 20px rgba(224, 0, 138, 0.15)",
                    }}
                  >
                    <span className="text-lg block mb-0.5">{stat.emoji}</span>
                    <div className="text-base font-display font-extrabold text-pink leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[9px] font-mono text-dm uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
