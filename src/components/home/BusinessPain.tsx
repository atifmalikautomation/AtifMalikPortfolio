"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const painPoints = [
  { id: "revenue", emoji: "\uD83D\uDCC9", title: "Revenue Rollercoaster", desc: "$5K month then $1K month" },
  { id: "referrals", emoji: "\uD83D\uDE4F", title: "Living on Referrals", desc: "Praying clients magically appear" },
  { id: "outreach", emoji: "\uD83D\uDCE2", title: "Zero Outreach Game", desc: "No prospecting system at all" },
  { id: "delivery", emoji: "\uD83D\uDCE6", title: "Trapped in Delivery", desc: "No time to work ON the business" },
  { id: "cost", emoji: "\uD83D\uDCB8", title: "Can\u2019t Afford SDRs", desc: "Tools + salaries too expensive" },
  { id: "ignored", emoji: "\uD83D\uDCBB", title: "Generic Messages Ignored", desc: "0.5% reply rate (ouch!)" },
];

const stressEmojis = ["\uD83D\uDE0E", "\uD83D\uDE42", "\uD83D\uDE10", "\uD83D\uDE1F", "\uD83D\uDE30", "\uD83D\uDE31", "\uD83E\uDD2F"];

export function BusinessPain() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const stressPercent = Math.round((selected.size / painPoints.length) * 100);
  const emojiIndex = Math.min(
    stressEmojis.length - 1,
    Math.floor((selected.size / painPoints.length) * (stressEmojis.length - 1))
  );

  return (
    <section className="section-padding" id="audit">
      <div className="container-narrow mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {"\u26A1"} Brutal Honesty Time
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Check every box that describes your reality. No sugar-coating. {"\uD83D\uDE2C"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {painPoints.map((pain, i) => {
            const isActive = selected.has(pain.id);
            return (
              <motion.button
                key={pain.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                onClick={() => toggle(pain.id)}
                whileTap={{ scale: 0.97 }}
                className={`flex items-start gap-4 p-5 rounded-[var(--radius-lg)] border text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-accent/40 bg-accent-dim"
                    : "border-border bg-bg-secondary hover:border-border-hover"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all ${
                    isActive ? "bg-accent border-accent" : "border-text-muted"
                  }`}
                >
                  {isActive && (
                    <svg className="w-3 h-3 text-bg-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{pain.emoji}</span>
                    <span className={`font-semibold text-sm ${isActive ? "text-text-primary" : "text-text-secondary"}`}>
                      {pain.title}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">{pain.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Stress Meter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[var(--radius-xl)] border border-border bg-bg-secondary p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-text-primary">Your Agency Stress Level:</span>
            <span className="text-sm font-bold text-accent">{stressPercent}%</span>
          </div>
          <div className="relative h-3 rounded-full bg-bg-primary overflow-hidden">
            <motion.div
              className="h-full rounded-full stress-gradient"
              initial={{ width: 0 }}
              animate={{ width: `${stressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-2xl">{stressEmojis[emojiIndex]}</span>
            <div className="text-right">
              <span className="text-xs text-text-muted block">
                {stressPercent === 0 && "You\u2019re Chill, But let\u2019s keep it that way"}
                {stressPercent > 0 && stressPercent <= 33 && "Getting there\u2026 time to act"}
                {stressPercent > 33 && stressPercent <= 66 && "Okay, this is serious."}
                {stressPercent > 66 && stressPercent < 100 && "You NEED AI systems. Now."}
                {stressPercent === 100 && "\uD83D\uDD25 Let\u2019s fix this ASAP!"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Fix this CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8"
        >
          <a
            href="https://cal.com/atifmalik/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-p text-base"
          >
            Fix this with a free audit &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
