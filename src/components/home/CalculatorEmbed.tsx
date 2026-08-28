"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Calculator, ArrowRight, Star } from "lucide-react";

export function CalculatorEmbed() {
  return (
    <section className="section-padding px-4" id="calculator">
      <div className="max-w-6xl mx-auto">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-[2rem] overflow-hidden p-8 md:p-12 lg:p-14"
          style={{
            background: "linear-gradient(135deg, #E0008A 0%, #C20076 40%, #A00062 100%)",
          }}
        >
          {/* Decorative stars */}
          <Star className="absolute top-6 right-10 w-4 h-4 text-white/50 fill-current" />
          <Star className="absolute bottom-8 left-12 w-3 h-3 text-white/40 fill-current" />

          {/* Grain overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")" }} />

          {/* Glow blurs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-pink text-sm font-display font-bold uppercase tracking-widest mb-5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Free Tool &middot; 60 Seconds
              </div>

              {/* Heading */}
              <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight" style={{ color: "#FFFFFF" }}>
                How much is manual work<br className="hidden sm:block" />
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    color: "#FFFFFF",
                  }}
                >
                  silently costing you?
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-white/85 text-base md:text-lg max-w-xl leading-relaxed">
                Drop in 4 numbers, get a personalised report showing exactly how much revenue you&apos;re leaking, and what AI automation would recover.
              </p>
            </div>

            {/* CTA Button */}
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2.5 bg-white text-pink font-display font-extrabold text-base md:text-lg rounded-full px-7 py-4 hover:scale-[1.04] transition shadow-lg shrink-0 self-center"
            >
              <Calculator className="w-5 h-5" />
              Calculate my ROI
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
