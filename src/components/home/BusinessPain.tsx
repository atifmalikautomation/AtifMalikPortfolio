"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const painPoints = [
  { id: "nocontent", icon: "📉", label: "No AI Video Strategy", desc: "Competitors post daily, you\u2019re invisible" },
  { id: "manual", icon: "🙏", label: "Doing Everything Manually", desc: "Follow-ups, data entry, all by hand" },
  { id: "nobot", icon: "📭", label: "No AI Chatbot", desc: "Leads leave before you even reply" },
  { id: "noflow", icon: "📦", label: "Zero Automation", desc: "No n8n or Make workflows running" },
  { id: "nolead", icon: "💸", label: "Leads Slipping Away", desc: "No funnel or capture system" },
  { id: "nosystem", icon: "📧", label: "Can\u2019t Scale Alone", desc: "Business stops when you stop" },
];

const stressMessages: Record<number, { emoji: string; message: string }> = {
  0: { emoji: "😎", message: "You\u2019re Chill. But let\u2019s keep it that way" },
  1: { emoji: "🙂", message: "Looking okay. But there\u2019s room to improve" },
  2: { emoji: "😐", message: "Mild Stress. Time to build systems" },
  3: { emoji: "😟", message: "Getting Serious. You need automation" },
  4: { emoji: "😰", message: "High Stress. Action Needed NOW!" },
  5: { emoji: "🤯", message: "CRITICAL. Your business is bleeding!" },
  6: { emoji: "🚨", message: "🚨 DANGER. Book a call RIGHT NOW!" },
};

export function BusinessPain() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupDismissed(true);
  };

  useEffect(() => {
    if (selected.size === painPoints.length && !popupDismissed) {
      setShowPopup(true);
    }
  }, [selected, popupDismissed]);

  const stressPercent = Math.round((selected.size / painPoints.length) * 100);
  const stressInfo = stressMessages[selected.size] || stressMessages[0];
  const barColor = selected.size <= 1 ? "hsl(152,69%,46%)" : selected.size <= 3 ? "hsl(38,92%,50%)" : "hsl(0,72%,51%)";

  return (
    <section className="section-padding" id="audit">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh tracking-tight leading-[1.05]">
            {"\u26A1"} Brutal Honesty Time
          </h2>
          <p className="mt-3 text-base text-gr">
            Check every box that describes your reality. No sugar-coating. {"\uD83D\uDE2C"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
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
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-pink/40 bg-pink12"
                    : "border-bd bg-card hover:border-bd2"
                }`}
              >
                <div
                  className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    isActive ? "bg-pink border-pink" : "border-dm"
                  }`}
                >
                  {isActive && (
                    <span className="text-white text-xs leading-none">✓</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{pain.icon}</span>
                    <span className={`font-display font-semibold text-[13px] ${isActive ? "text-wh" : "text-wh"}`}>
                      {pain.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-dm">{pain.desc}</p>
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
          className="rounded-2xl border border-bd bg-card p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-display font-bold text-wh">Your Agency Stress Level:</span>
            <span className="text-sm font-bold text-pink">{stressPercent}%</span>
          </div>
          <div className="relative h-3 rounded-full bg-bg3 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: barColor }}
              initial={{ width: 0 }}
              animate={{ width: `${stressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-2xl">{stressInfo.emoji}</span>
            <div className="text-right">
              <span className="text-xs text-dm block">{stressInfo.message}</span>
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
          <Link href="/book" className="hero-cta-btn">
            <span className="hero-cta-inner-btn">
              Fix this with a free audit →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Popup when all 6 selected */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closePopup} />
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: "spring", damping: 20, stiffness: 250 }}
              className="relative bg-card border border-bd rounded-3xl p-8 md:p-10 max-w-md w-full text-center shadow-[0_24px_60px_rgba(224,0,138,0.2)]"
            >
              <div className="text-5xl mb-4">🔥</div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-wh mb-2">
                All 6 checked!
              </h3>
              <p className="text-gr text-sm mb-6 leading-relaxed">
                You checked every single pain point — your business is <strong className="text-pink">bleeding time &amp; money</strong>. Let&apos;s fix this together with a free audit.
              </p>
              <Link href="/book" className="hero-cta-btn w-full">
                <span className="hero-cta-inner-btn w-full justify-center">
                  Fix this with a free audit →
                </span>
              </Link>
              <button
                onClick={closePopup}
                className="mt-4 text-sm text-dm hover:text-wh transition-colors cursor-pointer"
              >
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
