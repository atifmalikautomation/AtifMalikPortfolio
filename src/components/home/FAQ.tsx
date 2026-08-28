"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HelpCircle, ChevronDown, Sparkles, ArrowRight } from "lucide-react";

const faqs = [
  {
    emoji: "\u26A1",
    q: "How fast can you deliver results?",
    a: "Most clients see their first automation live within 3\u20135 business days. Full systems are typically deployed in 1\u20132 weeks depending on complexity.",
  },
  {
    emoji: "\uD83E\uDDE0",
    q: "Do I need technical knowledge to use your systems?",
    a: "Zero technical knowledge needed. I build everything and train you (or your team) on how to use it. If anything breaks, I fix it.",
  },
  {
    emoji: "\uD83C\uDFC6",
    q: "What makes you different from other automation agencies?",
    a: "I don\u2019t outsource. You get direct access to me, not a team of juniors. Every system is personally built and comes with an ROI guarantee.",
  },
  {
    emoji: "\uD83C\uDFAF",
    q: "Which businesses do you work best with?",
    a: "Service-based businesses ready to stop doing things manually and start scaling with systems. Agencies, coaches, e-commerce brands, clinics, and more.",
  },
  {
    emoji: "\uD83D\uDEE1\uFE0F",
    q: "What if the system doesn\u2019t work for my business?",
    a: "I guarantee results for clients who implement the systems I build. If it doesn\u2019t perform as agreed, I fix it \u2014 free of charge, no questions asked.",
  },
  {
    emoji: "\uD83D\uDE80",
    q: "How do I get started?",
    a: "Book a free 30-minute AI Audit call. I\u2019ll analyze your business, identify the biggest automation opportunities, and give you a clear plan \u2014 even if you don\u2019t work with me after.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-padding" id="faq">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-sm font-display font-semibold text-wh mb-6">
            <HelpCircle className="w-4 h-4 text-pink" /> Got Questions?
          </span>

          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh mb-4">
            Everything You Need to Know
          </h2>

          <p className="text-gr text-base md:text-lg max-w-2xl mx-auto">
            Before you book your free audit, here are the answers to the most common questions
          </p>
        </motion.div>

        {/* FAQ Items — card style like Yasir */}
        <div className="space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className={`bg-card border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-pink/40" : "border-bd"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 md:p-6 text-left cursor-pointer group"
                >
                  <span className="w-10 h-10 rounded-xl bg-pink/10 flex items-center justify-center text-lg shrink-0">
                    {item.emoji}
                  </span>
                  <span className="font-display font-bold text-wh text-base md:text-lg flex-1 group-hover:text-pink transition-colors">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gr shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-pink" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[4.75rem]">
                        <p className="text-gr text-sm md:text-base leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gr mb-4">Still have questions?</p>
          <Link href="/book" className="hero-cta-btn">
            <span className="hero-cta-inner-btn">
              <Sparkles className="w-4 h-4" /> Book a Free Call, I&apos;ll Answer Everything <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
