"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export function InsightsContent() {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <SectionHeading
            label="AI Growth Lab"
            title="Insights & Resources"
            subtitle="Expert analysis on AI video production, automation, agents, and building AI-powered growth systems."
          />

          <div className="max-w-3xl mx-auto space-y-4">
            {siteConfig.insights.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={`/insights/${article.slug}`}
                  className="group block rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-6 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      {article.date}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold group-hover:text-accent transition-colors mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {article.excerpt}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
