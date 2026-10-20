"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { ArrowUpRight, ExternalLink, ChevronDown, CheckCircle2 } from "lucide-react";

type Project = {
  title: string;
  slug: string;
  category: string;
  kind?: string;
  liveUrl?: string;
  liveLabel?: string;
  description: string;
  technologies: readonly string[];
  result: string;
  metrics?: { value: string; label: string }[];
  image: string;
  caseStudy: {
    challenge: string;
    solution: string;
    build: string;
    resultDetail: string;
  };
};

const projects: Project[] = siteConfig.portfolio as unknown as Project[];

const categories = [
  "All Projects",
  ...new Set(projects.map((p) => p.category)),
];

function PortfolioImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink/10 to-purple-500/10">
        <span className="font-display font-bold text-wh/40 text-sm text-center px-4">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={onError}
    />
  );
}

export function PortfolioContent() {
  const [filter, setFilter] = useState("All Projects");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    filter === "All Projects"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="pt-4">
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-xs font-display font-bold uppercase tracking-widest text-pink mb-5">
              💼 Real Work. Real Results.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh text-center mb-2 leading-[1.1]"
          >
            Projects that{" "}
            <span
              className="text-pink"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              transformed businesses.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gr text-base md:text-lg text-center max-w-2xl mx-auto mb-8"
          >
            Every project started with a real problem. Every one ended with a system that scaled. Filter by what you need most.
          </motion.p>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setExpanded(null); }}
                className={clsx(
                  "px-4 py-2 text-sm rounded-full border transition-all cursor-pointer font-display font-semibold",
                  filter === cat
                    ? "border-pink bg-pink text-white"
                    : "border-bd text-gr hover:border-pink/30 hover:text-wh"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 3-column grid — Yasir style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((project, i) => {
                const isOpen = expanded === project.slug;

                return (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                    className={clsx(
                      "rounded-2xl border border-bd bg-card overflow-hidden hover:border-pink/30 hover:-translate-y-1 transition-all duration-300",
                      isOpen && "lg:col-span-3 md:col-span-2"
                    )}
                  >
                    {/* Collapsed card */}
                    <div className={clsx(isOpen ? "grid grid-cols-1 lg:grid-cols-2" : "")}>
                      {/* Image */}
                      <div className="aspect-video relative overflow-hidden bg-bg2">
                        <PortfolioImage src={project.image} alt={project.title} />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Category badges + year */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold border border-pink/30 text-pink">
                            {project.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-extrabold text-lg text-wh mb-1 leading-tight">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gr leading-relaxed mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Metric boxes — 3 in a row */}
                        {project.metrics && (
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {project.metrics.map((m, idx) => (
                              <div
                                key={idx}
                                className="rounded-xl py-2.5 px-2 text-center"
                                style={{ background: "var(--pink)", opacity: 0.9 }}
                              >
                                <div className="font-display font-extrabold text-base text-white leading-none mb-0.5">
                                  {m.value}
                                </div>
                                <div className="text-[9px] font-display font-medium text-white/70 uppercase tracking-wide">
                                  {m.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Bottom actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-bd">
                          <button
                            onClick={() => setExpanded(isOpen ? null : project.slug)}
                            className="inline-flex items-center gap-1 text-sm font-display font-bold text-pink hover:underline cursor-pointer"
                          >
                            &rarr; {isOpen ? "Close" : "View project"}
                          </button>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm font-display font-bold text-gr hover:text-pink transition-colors"
                            >
                              Live Demo <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded case study */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-bd px-5 md:px-8 py-6 md:py-8 space-y-8">
                            {/* Challenge */}
                            <div>
                              <h4 className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">The Challenge</h4>
                              <p className="text-gr text-sm leading-relaxed">{project.caseStudy.challenge}</p>
                            </div>

                            {/* What was built */}
                            <div>
                              <h4 className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">What Was Built</h4>
                              <div className="space-y-2">
                                {project.caseStudy.build.split(". ").filter(Boolean).map((point, idx) => (
                                  <div key={idx} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-pink shrink-0 mt-0.5" />
                                    <span className="text-sm text-gr">{point.endsWith(".") ? point : point + "."}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Tools */}
                            <div>
                              <h4 className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">Tools & Tech</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((t) => (
                                  <span key={t} className="px-3 py-1.5 text-xs font-mono rounded-lg bg-pink/5 border border-pink/10 text-pink/80">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Results */}
                            <div>
                              <h4 className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">The Results</h4>
                              <div className="rounded-xl bg-pink/5 border border-pink/10 p-5 space-y-2.5">
                                {project.caseStudy.resultDetail.split(". ").filter(Boolean).map((point, idx) => (
                                  <div key={idx} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-pink shrink-0 mt-0.5" />
                                    <span className="text-sm text-gr">{point.endsWith(".") ? point : point + "."}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-bd">
                              <span className="text-sm font-display font-bold text-wh">Want results like this?</span>
                              <a
                                href="/book"
                                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-display font-bold text-white transition-all hover:scale-105"
                                style={{ background: "var(--pink)" }}
                              >
                                Book free audit <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-pink hover:underline"
                                >
                                  Live Demo <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
