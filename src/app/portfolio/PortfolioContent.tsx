"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { clsx } from "clsx";

const categories = [
  "All",
  ...new Set(siteConfig.portfolio.map((p) => p.category)),
];

export function PortfolioContent() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? siteConfig.portfolio
      : siteConfig.portfolio.filter((p) => p.category === filter);

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <SectionHeading
            label="Portfolio"
            title="Featured Projects"
            subtitle="Real AI systems built for real businesses. Each project solves a specific problem."
          />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={clsx(
                  "px-4 py-2 text-sm rounded-full border transition-all cursor-pointer",
                  filter === cat
                    ? "border-accent bg-accent-dim text-accent"
                    : "border-border text-text-secondary hover:border-border-hover"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group block rounded-[var(--radius-lg)] border border-border bg-bg-elevated overflow-hidden hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="aspect-video bg-bg-surface flex items-center justify-center">
                      <span className="font-mono text-xs text-text-muted/50">
                        [PROJECT IMAGE]
                      </span>
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
                        {project.category}
                      </span>
                      <h3 className="text-lg font-semibold mt-1.5 mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 text-[10px] font-mono rounded border border-border text-text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-accent font-medium">
                        {project.result}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
