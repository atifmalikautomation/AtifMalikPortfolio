"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const differentiators = [
  {
    title: "One Person. Full AI Stack.",
    description:
      "Strategy, AI, automation, video, and engineering — all from one source. No miscommunication between departments.",
  },
  {
    title: "Strategy + Build",
    description:
      "I don't just build what you ask for. I help you figure out what to build, then I build it.",
  },
  {
    title: "AI Video + Automation",
    description:
      "A rare combination. Most automation experts can't produce video. Most video creators can't automate. I do both.",
  },
  {
    title: "Direct Communication",
    description:
      "You talk to me, not an account manager. Every conversation moves the project forward.",
  },
  {
    title: "Production-Ready Systems",
    description:
      "No prototypes that break. Everything I deliver is tested, documented, and ready for real business use.",
  },
  {
    title: "Business Outcome First",
    description:
      "I measure success by your results — hours saved, leads generated, costs reduced — not by deliverables shipped.",
  },
];

export function WhyAtif() {
  return (
    <section className="section-padding">
      <div className="container-narrow mx-auto">
        <SectionHeading
          label="Why Me"
          title="Why Work With Atif?"
          subtitle="What makes working with me different from a typical agency or freelancer."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-6 hover:border-accent/20 transition-all duration-300"
            >
              <h3 className="text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
