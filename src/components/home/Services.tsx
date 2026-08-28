"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";

export function Services() {
  return (
    <section className="section-padding bg-bg-elevated" id="systems">
      <div className="container-narrow mx-auto">
        <SectionHeading
          label="AI Systems"
          title="Systems Built to Scale Your Business"
          subtitle="Not just tools. Connected AI systems designed around your business goals."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {siteConfig.services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative rounded-[var(--radius-lg)] border border-border bg-bg-primary p-6 md:p-8 hover:border-accent/30 transition-all duration-300"
            >
              {/* Number */}
              <span className="text-xs font-mono text-accent/60 mb-3 block">
                SYSTEM {service.number}
              </span>

              <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Tools */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {service.tools.slice(0, 4).map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 text-[11px] font-mono rounded border border-border bg-bg-surface text-text-muted"
                  >
                    {tool}
                  </span>
                ))}
                {service.tools.length > 4 && (
                  <span className="px-2 py-0.5 text-[11px] font-mono text-text-muted">
                    +{service.tools.length - 4}
                  </span>
                )}
              </div>

              {/* Link */}
              <Button
                href={`/services/${service.slug}`}
                variant="ghost"
                size="sm"
                className="group/btn"
              >
                Learn more
                <ArrowRight
                  size={14}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
