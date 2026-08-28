"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stages = [
  { label: "Attention", description: "AI video & content captures audience", icon: "eye" },
  { label: "AI Content", description: "Automated production pipeline", icon: "sparkles" },
  { label: "Lead Capture", description: "Intelligent forms & chatbots", icon: "magnet" },
  { label: "AI Conversation", description: "Agent qualifies & engages", icon: "message" },
  { label: "Conversion", description: "Automated booking & sales", icon: "target" },
  { label: "Automation", description: "Fulfillment & operations", icon: "cog" },
  { label: "Data", description: "Analytics & insights", icon: "chart" },
  { label: "Optimization", description: "AI learns & improves", icon: "refresh" },
];

export function GrowthLoop() {
  return (
    <section className="section-padding" id="growth-loop">
      <div className="container-narrow mx-auto">
        <SectionHeading
          label="Framework"
          title="The AI Growth Loop"
          subtitle="I don't build isolated tools. I build connected systems where every stage feeds the next."
        />

        {/* Loop visualization */}
        <div className="relative max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="relative flex items-start gap-4 p-4 rounded-[var(--radius)] border border-border bg-bg-elevated hover:border-accent/20 transition-all duration-300"
              >
                {/* Step number */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-dim border border-accent/20 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-accent">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    {stage.label}
                  </h3>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {stage.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Loop indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent-dim text-sm text-accent font-mono">
              &#8634; Continuous loop &mdash; every cycle improves the next
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
