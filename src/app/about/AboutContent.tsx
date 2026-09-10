"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Video,
  Workflow,
  Bot,
  Globe,
  Zap,
  Target,
  Heart,
  Shield,
  Clock,
  Code2,
  Rocket,
  Award,
  Users,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

const journey = [
  {
    year: "2021",
    title: "Started Freelancing",
    desc: "Began with web development and graphic design on Fiverr. Quickly realized the power of automation.",
  },
  {
    year: "2023",
    title: "AI-First Pivot",
    desc: "Shifted entirely to AI video production, automation systems, and intelligent chatbots.",
  },
  {
    year: "2024",
    title: "800+ Projects",
    desc: "Crossed 800 delivered projects. Clients across US, UK, Middle East, and Pakistan.",
  },
  {
    year: "2026",
    title: "Full AI Agency",
    desc: "Running a premium AI growth systems agency — video, automation, agents, and web apps.",
  },
];

const values = [
  {
    icon: Zap,
    title: "AI-First Thinking",
    desc: "Every business process gets evaluated through the lens of what AI can automate, enhance, or replace entirely.",
  },
  {
    icon: Clock,
    title: "14-Day Launch",
    desc: "Most systems go live in 2 weeks. Milestone billing — you only pay when each stage ships. No surprises.",
  },
  {
    icon: Shield,
    title: "You Own Everything",
    desc: "Code, designs, domains, data — it's all yours from day one. No vendor lock-in, no hostage pricing, ever.",
  },
  {
    icon: Heart,
    title: "Outcomes Over Outputs",
    desc: "I measure success by hours saved, leads generated, and revenue impact — not deliverables shipped.",
  },
];

const skills = [
  { icon: Video, label: "AI Video Production", tools: "Veo, Sora, Runway, Higgsfield, Kling" },
  { icon: Workflow, label: "Business Automation", tools: "n8n, Make, Zapier, GoHighLevel" },
  { icon: Bot, label: "AI Agents & Chatbots", tools: "OpenAI, Claude, Gemini, Custom" },
  { icon: Globe, label: "Web Development", tools: "Next.js, React, WordPress, APIs" },
  { icon: MessageSquare, label: "Voice AI", tools: "ElevenLabs, Custom Voice Agents" },
  { icon: Target, label: "Lead Automation", tools: "CRM, WhatsApp, Email, Calendly" },
];

const stats = [
  { value: "800+", label: "Projects Shipped", emoji: "🚀" },
  { value: "5+", label: "Years Experience", emoji: "🗓️" },
  { value: "30+", label: "Industries Served", emoji: "🌍" },
  { value: "5★", label: "Rated Worldwide", emoji: "⭐" },
];

const toolPills = [
  "Next.js", "React", "n8n", "Make", "OpenAI", "Claude", "Gemini",
  "ElevenLabs", "Higgsfield AI", "Runway", "Veo", "Kling 3.0",
  "GoHighLevel", "Zapier", "WordPress", "FFmpeg", "Remotion",
  "Seedance 2.0", "WhatsApp API", "Custom APIs",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export function AboutContent() {
  return (
    <div className="pt-2 pb-16">
      {/* ═══ 1. HERO ═══ */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-[10px] font-display font-bold uppercase tracking-widest text-pink mb-5">
                <Sparkles size={12} /> About Me
              </span>

              <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[1.02] text-4xl sm:text-5xl lg:text-6xl text-wh">
                I Build AI Systems{" "}
                <span
                  className="text-pink"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                >
                  That Work
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-gr leading-relaxed">
                I&apos;m Atif Malik — an AI growth systems architect and video production
                specialist based in Pakistan. I help businesses turn manual chaos into
                intelligent, automated systems that generate real revenue.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/book" className="hero-cta-btn">
                  <span className="hero-cta-inner-btn">
                    <Sparkles size={16} /> Book a free audit <ArrowRight size={16} />
                  </span>
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-wh font-display font-semibold border-b-2 border-pink pb-1 hover:gap-3 transition-all text-sm"
                >
                  See my work <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-7 flex items-center gap-2 text-sm text-dm">
                <Rocket className="w-4 h-4 text-pink" />
                <span>800+ projects · 5+ years · Serving clients worldwide</span>
              </div>
            </motion.div>

            {/* Right — Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`rounded-2xl border border-bd p-5 ${
                    i % 2 === 0
                      ? "bg-gradient-to-br from-pink/10 to-transparent"
                      : "bg-card"
                  }`}
                >
                  <span className="text-2xl mb-2 block">{stat.emoji}</span>
                  <div className="font-display font-extrabold text-3xl text-wh">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gr mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 2. JOURNEY TIMELINE ═══ */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-dm mb-4 block">
              The Journey
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-extrabold text-wh leading-[1.1] tracking-[-0.02em]">
              From Freelancer to{" "}
              <span
                className="text-pink"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                AI Agency
              </span>
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-pink/50 via-pink/20 to-transparent hidden sm:block" />

            <div className="space-y-8">
              {journey.map((item, i) => (
                <motion.div
                  key={item.year}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative flex gap-6 items-start"
                >
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink to-pink/60 flex items-center justify-center">
                    <span className="font-display font-bold text-xs text-white">
                      {item.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="rounded-2xl border border-bd bg-card p-5 flex-1">
                    <h3 className="font-display font-bold text-lg text-wh">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gr mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. VALUES / PHILOSOPHY ═══ */}
      <section className="section-padding bg-bg2">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-dm mb-4 block">
              Philosophy
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-extrabold text-wh leading-[1.1] tracking-[-0.02em]">
              How I{" "}
              <span
                className="text-pink"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                Think
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`rounded-2xl border border-bd p-6 ${
                  i % 2 === 0
                    ? "bg-gradient-to-br from-pink/8 to-transparent"
                    : "bg-card"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-pink/15 flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-pink" />
                </div>
                <h3 className="font-display font-bold text-base text-wh mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gr leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. EXPERTISE ═══ */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-dm mb-4 block">
              Expertise
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-extrabold text-wh leading-[1.1] tracking-[-0.02em]">
              What I{" "}
              <span
                className="text-pink"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                Build
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-2xl border border-bd bg-card p-5 group hover:border-pink/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-pink/15 flex items-center justify-center mb-3 group-hover:bg-pink/25 transition-colors">
                  <skill.icon size={20} className="text-pink" />
                </div>
                <h3 className="font-display font-bold text-base text-wh mb-1">
                  {skill.label}
                </h3>
                <p className="text-xs text-dm leading-relaxed">{skill.tools}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. TECH STACK PILLS ═══ */}
      <section className="section-padding bg-bg2">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-dm mb-4 block">
              Tech Stack
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-extrabold text-wh leading-[1.1] tracking-[-0.02em]">
              Tools I{" "}
              <span
                className="text-pink"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                Use
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto"
          >
            {toolPills.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                className="px-4 py-2 rounded-full border border-bd bg-card text-sm text-gr font-display font-semibold hover:border-pink/40 hover:text-pink transition-colors cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 6. THE PROMISE ═══ */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-bd bg-gradient-to-br from-pink/15 via-pink/5 to-transparent p-8 sm:p-12 text-center"
          >
            {/* Glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-pink/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10">
              <Award className="w-10 h-10 text-pink mx-auto mb-4" />
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-wh mb-4 leading-tight">
                Live in 14 days.{" "}
                <span
                  className="text-pink"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                >
                  Or your deposit back.
                </span>
              </h2>
              <p className="text-gr max-w-lg mx-auto mb-6 leading-relaxed">
                I don&apos;t do 3-month enterprise crawls. Your system ships fast,
                milestone-billed, and production-ready from day one.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-dm">
                <span className="flex items-center gap-2">
                  <Code2 size={16} className="text-pink" /> Production-Ready
                </span>
                <span className="flex items-center gap-2">
                  <Users size={16} className="text-pink" /> Founder-Led
                </span>
                <span className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-pink" /> ROI-Focused
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 7. CTA — GET STARTED ═══ */}
      <section className="section-padding bg-bg2">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {/* Book Call */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-bd bg-card p-7 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-pink/15 flex items-center justify-center mx-auto mb-4">
                <Sparkles size={22} className="text-pink" />
              </div>
              <h3 className="font-display font-bold text-lg text-wh mb-2">
                Book a Free Audit
              </h3>
              <p className="text-sm text-gr mb-5 leading-relaxed">
                30-minute strategy call. I&apos;ll show you what&apos;s broken and how AI
                fixes it. No pitch unless you ask.
              </p>
              <Link href="/book" className="hero-cta-btn inline-block">
                <span className="hero-cta-inner-btn">
                  Book the call <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-bd bg-card p-7 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={22} className="text-[#25D366]" />
              </div>
              <h3 className="font-display font-bold text-lg text-wh mb-2">
                Message on WhatsApp
              </h3>
              <p className="text-sm text-gr mb-5 leading-relaxed">
                Prefer a quick chat? Send me a message on WhatsApp. I reply within
                a few hours.
              </p>
              <a
                href="https://wa.me/923196780720"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-display font-bold text-sm hover:bg-[#20BD5A] transition-colors"
              >
                Open WhatsApp <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
