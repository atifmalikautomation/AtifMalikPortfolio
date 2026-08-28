"use client";

import { motion } from "framer-motion";
import { Magnet, Eye, MousePointerClick, Repeat, ArrowDown } from "lucide-react";
import Link from "next/link";

const stages = [
  {
    number: "01",
    name: "ATTRACT",
    icon: Magnet,
    desc: "SEO, ads & content hooks that pull qualified buyers in.",
    stat: "10× traffic",
  },
  {
    number: "02",
    name: "ENGAGE",
    icon: Eye,
    desc: "Sharp visuals, AI copy & UX that hold attention.",
    stat: "2× time on page",
  },
  {
    number: "03",
    name: "CONVERT",
    icon: MousePointerClick,
    desc: "AI chat, CTAs & instant booking. One-click commitment.",
    stat: "3× bookings",
  },
  {
    number: "04",
    name: "SCALE",
    icon: Repeat,
    desc: "Nurture, upsell & compound. Clients become your channel.",
    stat: "40hrs saved/wk",
  },
];

export function GrowthSystem() {
  return (
    <section className="section-padding" id="growth-system">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-sm font-display font-semibold text-wh mb-6">
            &#x1F53B; The Growth System
          </span>

          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh mb-3 leading-tight">
            Our proven <span className="text-pink">growth funnel</span>,<br className="hidden sm:block" />
            attention &#x2192; revenue.
          </h2>

          <p className="text-gr text-base md:text-lg max-w-xl mx-auto">
            4 stages baked into every system we ship. Each one compounds the next.
          </p>
        </motion.div>

        {/* 4 stages — horizontal row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative rounded-2xl p-5 md:p-6 overflow-hidden group"
              style={{
                background: `linear-gradient(135deg, rgba(224,0,138,${0.9 - i * 0.15}) 0%, rgba(160,0,98,${0.9 - i * 0.1}) 100%)`,
              }}
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/5 blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <stage.icon size={20} style={{ color: "rgba(255,255,255,0.6)" }} className="mb-3" />

                <div className="font-display font-extrabold text-3xl mb-1" style={{ color: "#FFFFFF" }}>
                  {stage.number}
                </div>

                <h3 className="font-display font-bold text-sm mb-2" style={{ color: "#FFFFFF" }}>
                  {stage.name}
                </h3>

                <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {stage.desc}
                </p>

                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold"
                  style={{ background: "rgba(255,255,255,0.15)", color: "#FFFFFF" }}
                >
                  &#x2713; {stage.stat}
                </span>
              </div>

              {/* Arrow between cards — hidden on last */}
              {i < stages.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
                  <div className="w-6 h-6 rounded-full bg-bg border border-bd flex items-center justify-center">
                    <ArrowDown size={12} className="text-pink rotate-[-90deg]" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Book CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/book" className="hero-cta-btn">
            <span className="hero-cta-inner-btn">
              Start at Stage 1 <span className="ml-1">&#x2192;</span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
