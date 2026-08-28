"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lock } from "lucide-react";

const problems = [
  "No consistent lead flow, feast or famine every month",
  "Manual follow-ups eating hours of your day",
  "AI tools bought but nothing connected or working",
  "Team dependent on you for every single decision",
  "Missed leads because of slow response times",
  "No clarity on what marketing is actually working",
];

const solutions = [
  "AI Lead Engine, automated funnel captures leads 24/7",
  "CRM automation follows up instantly, forever",
  "n8n/Make workflows connecting all your tools",
  "SOPs + automations that run without you",
  "AI chatbot responds in seconds, qualifies & books",
  "Analytics dashboard showing real ROI per channel",
];

export function ProblemsSection() {
  const [showSolutions, setShowSolutions] = useState(false);

  return (
    <section className="section-padding" id="problems">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14 text-center"
        >
          {/* Down arrow icon */}
          <div className="flex justify-center mb-4">
            <span className="w-10 h-10 rounded-full border border-bd flex items-center justify-center text-gr">
              <ChevronDown size={20} />
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh mb-3">
            The Problems Holding You Back
          </h2>
          <p className="text-gr text-base md:text-lg">
            (And The Systems That Fix Them)
          </p>
        </motion.div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problems — gradient pink box */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-6 md:p-8 text-white"
            style={{
              background: "linear-gradient(135deg, #E0008A 0%, #C20076 40%, #A00062 100%)",
            }}
          >
            <h3 className="font-display text-lg font-bold mb-6 flex items-center gap-2" style={{ color: "#FFFFFF" }}>
              &#x274C; What&apos;s Keeping You Stuck
            </h3>
            <div className="space-y-4">
              {problems.map((problem, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <span className="font-mono text-sm text-white/60 font-bold min-w-[20px] mt-0.5">
                    {i + 1}.
                  </span>
                  <p className="text-sm text-white/90 leading-[1.7] font-medium">{problem}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solutions — white/card box with lock toggle */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-bd bg-card p-6 md:p-8"
          >
            <h3 className="font-display text-lg font-bold text-wh mb-6 flex items-center gap-2">
              &#x2705; The Systems That Fix This
            </h3>

            <AnimatePresence mode="wait">
              {showSolutions ? (
                <motion.div
                  key="solutions"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-4"
                >
                  {solutions.map((solution, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 border-l-2 border-l-pink pl-3"
                    >
                      <span className="font-mono text-sm text-pink font-bold min-w-[20px] mt-0.5">
                        {i + 1}.
                      </span>
                      <p className="text-sm text-gr leading-[1.7]">{solution}</p>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  {/* Blurred preview text */}
                  <div className="space-y-4 blur-[6px] select-none pointer-events-none">
                    {solutions.map((solution, i) => (
                      <div key={i} className="flex items-start gap-3 pl-3">
                        <span className="font-mono text-sm text-gr font-bold min-w-[20px] mt-0.5">{i + 1}.</span>
                        <p className="text-sm text-gr leading-[1.7]">{solution}</p>
                      </div>
                    ))}
                  </div>

                  {/* Lock overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Lock size={32} className="text-pink/40 mb-4" />
                    <button
                      onClick={() => setShowSolutions(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink text-white font-display font-bold text-sm hover:brightness-110 transition-all shadow-[0_0_0_3px_rgba(224,0,138,0.25)]"
                    >
                      <Lock size={14} /> Unlock My Solutions
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
