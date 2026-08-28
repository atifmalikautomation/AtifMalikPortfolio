"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, X, ExternalLink } from "lucide-react";
import Link from "next/link";

const categories = [
  "All",
  ...Array.from(new Set(siteConfig.portfolio.map((p) => p.category))),
];

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    filter === "All"
      ? siteConfig.portfolio
      : siteConfig.portfolio.filter((p) => p.category === filter);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section className="section-padding bg-bg-elevated" id="work">
      <div className="container-narrow mx-auto">
        <SectionHeading
          label="Portfolio"
          title="Selected Work"
          subtitle="Real systems and productions built for real businesses. Every project delivered a measurable outcome."
        />

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 cursor-pointer ${
                filter === cat
                  ? "border-accent bg-accent-dim text-accent"
                  : "border-border text-text-muted hover:text-text-secondary hover:border-border-hover"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div
                  onClick={() => setLightbox(siteConfig.portfolio.indexOf(project))}
                  className="group block rounded-[var(--radius-lg)] border border-border bg-bg-primary overflow-hidden hover:border-accent/30 transition-all duration-300 cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-bg-surface relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent flex items-center justify-center">
                      <span className="font-mono text-xs text-text-muted/40">
                        [[PROJECT IMAGE]]
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm text-text-primary font-medium bg-bg-primary/80 backdrop-blur-sm px-4 py-2 rounded-full">
                        View Details
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-semibold mt-1.5 mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="text-xs text-accent font-medium">
                      {project.result}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 text-center">
          <Button href="/portfolio" variant="outline">
            View All Projects
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[60] bg-bg-primary/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-bg-elevated border border-border rounded-[var(--radius-xl)] max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              {(() => {
                const project = siteConfig.portfolio[lightbox];
                return (
                  <>
                    {/* Preview area */}
                    <div className="aspect-video bg-bg-surface relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent flex items-center justify-center">
                        <span className="font-mono text-sm text-text-muted/40">
                          [[PROJECT MEDIA]]
                        </span>
                      </div>
                      <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 p-2 rounded-full bg-bg-primary/80 backdrop-blur-sm border border-border hover:border-accent/30 transition-colors cursor-pointer"
                        aria-label="Close lightbox"
                      >
                        <X size={18} className="text-text-secondary" />
                      </button>
                    </div>

                    <div className="p-6 md:p-8">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold mt-2 mb-3">
                        {project.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed mb-5">
                        {project.description}
                      </p>

                      {/* Result */}
                      <div className="mb-5 p-4 rounded-[var(--radius)] bg-accent-dim border border-accent/20">
                        <span className="text-xs font-mono uppercase tracking-widest text-accent/70">
                          Result
                        </span>
                        <p className="text-accent font-bold text-lg mt-1">
                          {project.result}
                        </p>
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-mono rounded-full border border-border text-text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors font-medium"
                      >
                        View Full Case Study
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
