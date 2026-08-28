"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "AI Starter System",
    badge: "QUICK LAUNCH",
    badgeIcon: false,
    desc: "Everything you need to start booking calls on autopilot.",
    setup: "$500",
    monthly: "$99/mo",
    highlighted: false,
    features: [
      "1 core automation workflow (n8n)",
      "Basic AI chatbot setup",
      "CRM integration (GHL or HubSpot)",
      "1 landing page or funnel",
      "Email sequence (up to 5 emails)",
      "Analytics & tracking setup",
      "2-week delivery",
      "30-day post-launch support",
    ],
    cta: "Get Started",
  },
  {
    name: "Full Growth Engine",
    badge: "MOST POPULAR",
    badgeIcon: true,
    desc: "The complete client-acquisition system, done for you, end to end.",
    setup: "$2,500",
    monthly: "$249/mo",
    highlighted: true,
    features: [
      "Up to 10 automation workflows",
      "AI video production (5 assets)",
      "Multi-platform AI chatbot",
      "Full CRM + pipeline automation",
      "Lead capture & qualification system",
      "Email + SMS automation sequences",
      "Custom dashboard & reporting",
      "Social media automation setup",
      "Booking system integration",
      "4-week delivery",
      "90-day support + optimization",
    ],
    cta: "Build My System",
  },
];

export function Pricing() {
  return (
    <section className="section-padding" id="pricing">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-sm font-display font-semibold text-wh mb-6">
            Investment
          </span>

          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh mb-4 leading-tight">
            Two ways to{" "}
            <span
              className="text-pink"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              grow with me
            </span>
            .<br className="hidden sm:block" />
            Zero hidden fees.
          </h2>

          <p className="text-gr text-base md:text-lg max-w-2xl mx-auto">
            Transparent, outcome-driven pricing. Setup fee + monthly retainer, cancel any time after 90 days.
          </p>
        </motion.div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={`relative rounded-2xl p-7 md:p-8 flex flex-col ${
                tier.highlighted ? "text-white" : "bg-card border border-bd"
              }`}
              style={
                tier.highlighted
                  ? { background: "linear-gradient(135deg, #E0008A 0%, #C20076 40%, #A00062 100%)" }
                  : undefined
              }
            >
              {/* Badge */}
              {tier.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 text-[11px] font-display font-bold uppercase tracking-widest rounded-full bg-card border border-bd text-wh flex items-center gap-1.5">
                  <Sparkles size={12} className="text-pink" /> {tier.badge}
                </span>
              )}

              {/* Badge label for non-highlighted */}
              {!tier.highlighted && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink/10 text-pink text-xs font-display font-bold mb-4 w-fit">
                  <Sparkles size={12} /> {tier.badge}
                </span>
              )}

              {/* Name */}
              <h3
                className={`font-display font-extrabold text-2xl md:text-3xl mb-2 ${tier.highlighted ? "" : "text-wh"}`}
                style={tier.highlighted ? { color: "#FFFFFF" } : undefined}
              >
                {tier.name}
              </h3>

              {/* Desc */}
              <p
                className={`text-sm mb-5 ${tier.highlighted ? "" : "text-gr"}`}
                style={tier.highlighted ? { color: "rgba(255,255,255,0.8)" } : undefined}
              >
                {tier.desc}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className={`font-display font-extrabold text-4xl md:text-5xl ${tier.highlighted ? "" : "text-pink"}`}
                  style={tier.highlighted ? { color: "#FFFFFF" } : undefined}
                >
                  {tier.setup}
                </span>
                <span
                  className={`text-sm ${tier.highlighted ? "" : "text-gr"}`}
                  style={tier.highlighted ? { color: "rgba(255,255,255,0.7)" } : undefined}
                >
                  one-time
                </span>
              </div>

              <div className="flex items-center gap-2 mb-7">
                <span
                  className={`font-display font-bold text-sm ${tier.highlighted ? "" : "text-wh"}`}
                  style={tier.highlighted ? { color: "#FFFFFF" } : undefined}
                >
                  + {tier.monthly}
                </span>
                <span
                  className={`text-sm ${tier.highlighted ? "" : "text-gr"}`}
                  style={tier.highlighted ? { color: "rgba(255,255,255,0.7)" } : undefined}
                >
                  retainer (90-day min)
                </span>
              </div>

              {/* Divider */}
              <div className={`h-px w-full mb-6 ${tier.highlighted ? "bg-white/20" : "bg-bd"}`} />

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-3 text-sm leading-relaxed ${tier.highlighted ? "" : "text-gr"}`}
                    style={tier.highlighted ? { color: "rgba(255,255,255,0.9)" } : undefined}
                  >
                    <span
                      className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        tier.highlighted ? "bg-white/15" : "bg-pink/10"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${tier.highlighted ? "" : "text-pink"}`}
                        style={tier.highlighted ? { color: "#FFFFFF" } : undefined}
                      />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/book"
                className={`inline-flex items-center justify-center gap-2 font-display font-bold text-sm rounded-full px-6 py-3.5 transition-all ${
                  tier.highlighted
                    ? "bg-card text-pink hover:scale-[1.02] shadow-lg"
                    : "hero-cta-btn"
                }`}
              >
                {tier.highlighted ? (
                  <>
                    {tier.cta} <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <span className="hero-cta-inner-btn justify-center w-full">
                    {tier.cta} <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gr text-sm mt-8"
        >
          Not sure which fits?{" "}
          <Link href="/book" className="text-pink font-semibold hover:underline">
            Book a free 1:1 audit call
          </Link>
          , I&apos;ll tell you the smallest spend that will move your number.
        </motion.p>
      </div>
    </section>
  );
}
