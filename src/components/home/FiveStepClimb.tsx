"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Palette, Rocket, Bot, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Strategy & Discovery",
    desc: "Video call, business audit & competitor scan.",
    highlight: true,
  },
  {
    icon: Palette,
    num: "02",
    title: "Design Foundation",
    desc: "Wireframes, copy direction & UX architecture.",
    highlight: false,
  },
  {
    icon: Rocket,
    num: "03",
    title: "Build & Launch",
    desc: "Mobile-first build, on-page SEO, fast load.",
    highlight: true,
  },
  {
    icon: Bot,
    num: "04",
    title: "AI Automation",
    desc: "CRM, chatbot, follow-ups, payments wired in.",
    highlight: false,
  },
  {
    icon: TrendingUp,
    num: "05",
    title: "Growth & Scaling",
    desc: "A/B tests, SEO, ads, monthly optimisation.",
    highlight: true,
  },
];

export function FiveStepClimb() {
  return (
    <section id="process" className="section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          {/* Pill badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-sm font-display font-semibold text-wh mb-6">
            The Process
          </span>

          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh mb-3 leading-tight">
            A{" "}
            <span
              className="text-pink"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              5-step climb
            </span>{" "}
            from idea to<br className="hidden sm:block" />
            compounding growth.
          </h2>

          <p className="text-gr text-base md:text-lg max-w-xl mx-auto">
            The same playbook we&apos;ve run across 600+ projects.
          </p>
        </motion.div>

        {/* 5 cards horizontal */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`rounded-2xl p-5 md:p-6 ${
                step.highlight
                  ? ""
                  : "bg-card border border-bd"
              }`}
              style={
                step.highlight
                  ? {
                      background: "linear-gradient(135deg, #E0008A 0%, #C20076 40%, #A00062 100%)",
                      color: "#FFFFFF",
                    }
                  : undefined
              }
            >
              {/* Icon + Number */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    step.highlight ? "bg-white/20" : "bg-pink/10"
                  }`}
                >
                  <step.icon size={16} style={step.highlight ? { color: "#FFFFFF" } : undefined} className={step.highlight ? "" : "text-pink"} />
                </span>
                <span className={`font-display font-extrabold text-3xl ${step.highlight ? "" : "text-pink"}`} style={step.highlight ? { color: "#FFFFFF" } : undefined}>
                  {step.num}
                </span>
              </div>

              {/* Title */}
              <h3 className={`font-display font-bold text-sm md:text-base mb-2 ${step.highlight ? "" : "text-wh"}`} style={step.highlight ? { color: "#FFFFFF" } : undefined}>
                {step.title}
              </h3>

              {/* Description */}
              <p className={`text-xs md:text-sm leading-relaxed ${step.highlight ? "" : "text-gr"}`} style={step.highlight ? { color: "rgba(255,255,255,0.85)" } : undefined}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/book"
            className="hero-cta-btn"
          >
            <span className="hero-cta-inner-btn">
              Start at Step 1 <ArrowRight size={16} className="ml-1" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
