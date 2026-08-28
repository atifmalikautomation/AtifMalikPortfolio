"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pairs = [
  { problem: "Leads waiting for replies", solution: "AI Lead Agent", system: "Instant 24/7 response" },
  { problem: "Repetitive admin work", solution: "n8n Automation", system: "Zero manual data entry" },
  { problem: "Expensive video production", solution: "AI Video Engine", system: "Studio quality at 20% cost" },
  { problem: "Disconnected tools", solution: "API Integrations", system: "Unified data flow" },
  { problem: "Manual follow-ups", solution: "Automated CRM", system: "Never miss a lead" },
  { problem: "Content bottlenecks", solution: "AI Content Pipeline", system: "Daily automated publishing" },
  { problem: "No 24/7 customer response", solution: "AI Support Agent", system: "Always-on assistance" },
];

export function ProblemSolution() {
  return (
    <section className="section-padding bg-bg-elevated">
      <div className="container-narrow mx-auto">
        <SectionHeading
          label="Before / After"
          title="What's Slowing Your Business Down?"
        />

        <div className="space-y-3 max-w-3xl mx-auto">
          {pairs.map((pair, i) => (
            <motion.div
              key={pair.problem}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4 items-center p-4 rounded-[var(--radius)] border border-border bg-bg-primary"
            >
              {/* Problem */}
              <div className="flex items-center gap-3">
                <span className="text-red-400 text-lg flex-shrink-0">&#10005;</span>
                <span className="text-sm text-text-secondary">
                  {pair.problem}
                </span>
              </div>

              {/* Arrow */}
              <span className="hidden sm:block text-accent font-mono text-sm">
                &rarr;
              </span>

              {/* Solution */}
              <div className="flex items-center gap-3">
                <span className="text-accent text-lg flex-shrink-0">&#10003;</span>
                <div>
                  <span className="text-sm font-medium text-text-primary">
                    {pair.solution}
                  </span>
                  <span className="text-xs text-text-muted ml-2">
                    {pair.system}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
