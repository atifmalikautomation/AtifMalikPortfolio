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
            <span className="font-mono text-[13px] tracking-[0.14em] uppercase text-pink inline-flex items-center gap-1.5">
              <Sparkles size={14} /> AI-First &middot; 2026
            </span>
          </motion.div>

          {/* Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-3"
          >
            <span
              className="inline-flex items-center gap-2 px-4 md:px-6 py-1.5 md:py-2 rounded-full font-display font-bold text-sm md:text-base text-white"
              style={{
                background: "linear-gradient(135deg, var(--pink) 0%, #FF4DA6 100%)",
              }}
            >
              <Sparkles size={16} /> Helping Service Businesses
            </span>
          </motion.div>

          {/* Headline Line 1: Build Automation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
            className="font-display font-extrabold text-[2.8rem] leading-[0.95] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] xl:text-[6.5rem] text-wh tracking-[-0.03em]"
          >
            <span
              className="text-pink inline-block -rotate-2 align-middle mr-2 sm:mr-3 text-[0.55em] font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Build
            </span>{" "}
            <span className="relative inline-block">
              <span
                className="absolute inset-x-[-0.1em] bottom-[0.08em] h-[0.32em] -rotate-1 rounded-md bg-pink/40"
                aria-hidden="true"
              />
              <span className="relative">Automation</span>
            </span>
          </motion.h1>

          {/* Headline Line 2: & AI Video Systems That Convert */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.55 }}
            className="font-display font-extrabold text-[1.7rem] leading-[1.1] sm:text-[2.6rem] md:text-[3.3rem] lg:text-[3.8rem] xl:text-[4.2rem] text-wh tracking-[-0.03em] sm:whitespace-nowrap mt-0.5"
          >
            <span>&amp; AI Video Systems That </span>
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
          </motion.h1>

          {/* Stats — Yasir style: inline horizontal, emoji + value + label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex items-center justify-center gap-6 sm:gap-10 mt-5 mb-5"
          >
            {siteConfig.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2"
              >
                <span className="text-xl">{stat.emoji}</span>
                <span className="font-display text-xl sm:text-2xl font-extrabold text-pink leading-none">{stat.value}</span>
                <span className="font-mono text-[9px] sm:text-[10px] text-gr tracking-[0.06em] uppercase leading-tight">{stat.label}</span>
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
            className="text-[13px] text-gr mb-2"
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
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase">Meet Atif</span>
              <span className="text-sm">&darr;</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
