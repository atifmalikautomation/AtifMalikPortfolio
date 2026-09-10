"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Sparkles } from "lucide-react";


export function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center"
      id="hero"
      style={{ height: "calc(100dvh - 70px)" }}
    >
      {/* Pink glow */}
      <div className="hero-glow" />

      <div className="container-narrow mx-auto px-4 sm:px-8 w-full">
        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
          {/* AI-First badge — Yasir style: plain mono text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-1.5"
          >
            <span className="font-display font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase text-pink inline-flex items-center gap-1.5">
              <Sparkles size={14} /> AI-First &middot; 2026
            </span>
          </motion.div>

          {/* Pill — tilted with animated gradient border like CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 md:mb-5"
          >
            <span className="inline-block -rotate-3 hero-cta-btn !p-[2px]">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 md:px-5 py-1 md:py-1.5 font-display font-bold text-xs md:text-base text-white"
                style={{ background: "linear-gradient(135deg, var(--pink) 0%, #FF4DA6 100%)" }}
              >
                <Sparkles size={14} /> Helping Service Businesses
              </span>
            </span>
          </motion.div>

          {/* Headline — Single h1 with two visual lines for SEO */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
            className="font-display font-extrabold text-[2.75rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] xl:leading-[1.02] text-wh tracking-tight w-full"
          >
            {/* "Build" on its own line on mobile, inline on desktop */}
            <span className="block sm:inline">
              <span
                className="inline-block sm:-rotate-2 align-middle sm:mr-3 text-[0.7em] sm:text-[0.55em] font-bold text-pink mb-1 sm:mb-0"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                Build
              </span>{" "}
            </span>
            <span className="relative inline-block">
              <span
                className="absolute inset-x-[-0.1em] bottom-[0.08em] h-[0.28em] -rotate-1 rounded-full bg-pink/15"
                aria-hidden="true"
              />
              <span className="relative">AI Growth Systems</span>
            </span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.55 }}
              className="block mt-1"
            >
              &amp; Automation That{" "}
              <span className="relative inline-block">
                <span
                  className="text-pink"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                >
                  Convert
                </span>
                <span className="absolute -right-4 -top-1 text-pink sm:-right-7 sm:-top-4" aria-hidden="true">
                  <Sparkles className="w-4 h-4 sm:w-[22px] sm:h-[22px]" />
                </span>
              </span>
            </motion.span>
          </motion.h1>

          {/* Thin gradient line — Yasir style */}
          <div className="flex justify-center mt-4 md:mt-5 mb-1">
            <div className="h-[2px] w-40 sm:w-72 md:w-96 bg-gradient-to-r from-transparent via-pink/60 to-transparent rounded-full shadow-[0_0_14px_rgba(224,0,138,0.3)]" />
          </div>

          {/* Stats — Yasir exact style: vertical on mobile, horizontal on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex items-start justify-center gap-8 sm:gap-10 mt-6 mb-6 w-full"
          >
            {siteConfig.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-2.5"
              >
                <span className="w-10 h-10 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--pink) 0%, #FF4DA6 100%)" }}
                >
                  {stat.emoji}
                </span>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="font-display text-xl sm:text-2xl font-extrabold text-pink leading-none">{stat.value}</span>
                  <span className="mt-0.5 font-display text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-gr/60">{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-2 w-full sm:w-auto px-2 sm:px-0"
          >
            <Link
              href="/book"
              className="hero-cta-btn w-full sm:w-auto"
            >
              <span className="hero-cta-inner-btn w-full sm:w-auto justify-center">
                <Sparkles size={18} /> Schedule a Free 1:1 Call <span className="ml-1">&rarr;</span>
              </span>
            </Link>
          </motion.div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-[13.5px] text-gr mb-2" style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Free 30-min audit &middot; no obligation &middot; I reply in <strong className="text-wh">minutes, not days</strong>
          </motion.p>

          {/* Meet Atif — Yasir style: plain mono, muted */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <a href="#about" className="inline-flex flex-col items-center gap-0.5 text-gr hover:text-wh transition-colors">
              <span className="text-[10px] tracking-[0.2em] uppercase font-display font-bold">Meet Atif</span>
              <span className="text-sm animate-bounce">&darr;</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
