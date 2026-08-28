"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { siteConfig } from "@/lib/site-config";

export function TrustBar() {
  return (
    <section className="relative border-y border-border bg-bg-elevated/50">
      <div className="container-narrow mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {siteConfig.stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
