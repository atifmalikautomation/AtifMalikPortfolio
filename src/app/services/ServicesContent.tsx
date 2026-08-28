"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";

export function ServicesContent() {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <SectionHeading
            label="AI Systems"
            title="AI Services & Systems"
            subtitle="Not individual tools. Connected AI systems designed to solve real business problems."
          />

          <div className="space-y-12">
            {siteConfig.services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                id={service.id}
                className="rounded-[var(--radius-xl)] border border-border bg-bg-elevated overflow-hidden"
              >
                <div className="p-6 md:p-10">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <span className="text-xs font-mono text-accent">
                        SYSTEM {service.number}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold mt-1">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Problems */}
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-3">
                        The Problem
                      </h3>
                      <ul className="space-y-2">
                        {service.problems.map((p) => (
                          <li
                            key={p}
                            className="flex items-start gap-2 text-sm text-text-secondary"
                          >
                            <X
                              size={14}
                              className="text-red-400 mt-0.5 flex-shrink-0"
                            />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcomes */}
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-3">
                        The Outcome
                      </h3>
                      <ul className="space-y-2">
                        {service.outcomes.map((o) => (
                          <li
                            key={o}
                            className="flex items-start gap-2 text-sm text-text-secondary"
                          >
                            <Check
                              size={14}
                              className="text-accent mt-0.5 flex-shrink-0"
                            />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 text-xs font-mono rounded-full border border-border bg-bg-surface text-text-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <Button href={`/services/${service.slug}`}>
                    Learn More About {service.title}
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
