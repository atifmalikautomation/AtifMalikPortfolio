"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const affiliates = [
  { name: "Hostinger", emoji: "🌐", commission: "60% commission" },
  { name: "Lovable", emoji: "💜", commission: "30% commission" },
  { name: "GoHighLevel", emoji: "🚀", commission: "40% recurring" },
];

export function AffiliateSection() {
  return (
    <section className="section-padding bg-bg2">
      <div className="container-narrow mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-4xl mb-4">💰</div>
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-dm mb-4">
            Affiliate Program
          </div>
          <h2 className="font-display text-[clamp(24px,3.5vw,40px)] font-extrabold text-wh leading-[1.1] mb-3">
            Refer &amp; earn commission.
          </h2>
          <p className="text-base text-gr max-w-lg mx-auto mb-10">
            Earn up to 60% commission on every successful referral. Help businesses
            grow with the tools I recommend and get rewarded for it.
          </p>

          <Link
            href="/contact"
            className="btn btn-p mb-10 inline-flex"
          >
            Join the affiliate program
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {affiliates.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-card border border-bd rounded-[var(--r)] p-5 text-center hover:border-[rgba(224,0,138,0.25)] transition-all"
              >
                <div className="text-3xl mb-2">{a.emoji}</div>
                <div className="font-display text-base font-bold text-wh mb-1">{a.name}</div>
                <div className="font-mono text-[11px] text-pink tracking-[0.04em]">{a.commission}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
