"use client";

import { motion } from "framer-motion";

export function HonestSection() {
  return (
    <section className="section-padding bg-bg-elevated relative overflow-hidden">
      {/* Subtle accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container-narrow mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-block mb-4 px-3 py-1 text-xs font-mono uppercase tracking-widest text-accent bg-accent-dim rounded-full border border-accent/20">
            Real Talk
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            No Fluff. Straight Talk.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-6 text-lg text-text-secondary leading-relaxed"
        >
          <p>
            Before we go any further, here&apos;s the part most agencies skip.
          </p>
          <p>
            I don&apos;t promise overnight viral fame. I don&apos;t guarantee
            &ldquo;10x your revenue in 30 days.&rdquo; If that&apos;s what
            you&apos;re looking for, we&apos;re not a fit &mdash; and that&apos;s
            okay.
          </p>
          <p>
            What I <em className="text-accent not-italic font-medium">do</em> promise:
            every system I build is engineered to compound. The AI videos I
            produce aren&apos;t disposable content &mdash; they&apos;re assets
            that keep working for you. The automations I set up don&apos;t just
            save time once &mdash; they scale as you grow.
          </p>
          <p>
            I&apos;m selective about who I work with because the best results
            come from real partnerships, not transactional gigs. If you&apos;re
            building something meaningful and want an AI partner who actually
            cares about your outcome &mdash; let&apos;s talk.
          </p>
          <p className="text-text-primary font-medium">
            That&apos;s the honest part. Still here? Good. Let me show you
            exactly how we&apos;ll work together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
