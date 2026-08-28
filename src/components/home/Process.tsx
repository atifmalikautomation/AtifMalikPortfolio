"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export function Process() {
  return (
    <section className="section-padding" id="process">
      <div className="container-narrow mx-auto">
        <SectionHeading
          label="Process"
          title="From Idea to Intelligent Growth"
          subtitle="A proven five-stage framework for building AI systems that actually work."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-transparent -translate-x-1/2" />

          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-5 md:gap-4">
            {siteConfig.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative text-center"
              >
                {/* Step circle */}
                <div className="mx-auto w-12 h-12 rounded-full bg-accent-dim border border-accent/30 flex items-center justify-center mb-4">
                  <span className="text-sm font-mono font-bold text-accent">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow for desktop */}
                {i < siteConfig.process.length - 1 && (
                  <span className="hidden md:block absolute top-6 -right-2 text-accent/40 text-lg">
                    &rarr;
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
