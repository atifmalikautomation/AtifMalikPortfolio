"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";
import { clsx } from "clsx";
import { ArrowUpRight, ExternalLink, ChevronDown, CheckCircle2, X } from "lucide-react";

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

function PortfolioImage({ src, alt, category }: { src: string; alt: string; category: string }) {
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);
  const gradients: Record<string, string> = {
    "AI Automation": "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)",
    "AI Video": "linear-gradient(135deg, #4a0020 0%, #be185d 100%)",
    "AI Chatbot": "linear-gradient(135deg, #042f2e 0%, #0d9488 100%)",
    "Lead Automation": "linear-gradient(135deg, #1c1917 0%, #78716c 100%)",
    "AI Content": "linear-gradient(135deg, #1a2e05 0%, #4d7c0f 100%)",
    "Web Development": "linear-gradient(135deg, #0A0008 0%, #3D0028 100%)",
  };
  const gradient = gradients[category] || gradients["Web Development"];

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: gradient }}>
        <span className="font-display font-bold text-white/60 text-lg text-center px-6">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-700"
      sizes="(max-width: 768px) 100vw, 50vw"
      onError={onError}
    />
  );
}

function extractMetrics(result: string): { value: string; label: string }[] {
  const parts = result.split(",").map((s) => s.trim());
  return parts.map((p) => {
    const match = p.match(/^([\d.]+[%x×+K]*\+?)\s+(.+)$/i) || p.match(/^(.+?)\s+([\d.]+[%x×+K]*\+?)$/i);
    if (match) return { value: match[1], label: match[2] };
    return { value: p, label: "" };
  });
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
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          {/* Header — Yasir style */}
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

          {/* Filter tabs — Yasir style */}
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

          {/* Project cards — Yasir expandable style */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => {
                const isOpen = expanded === project.slug;

                return (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="rounded-2xl border border-bd bg-card overflow-hidden"
                  >
                    {/* Card — 2 column on desktop */}
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Image */}
                      <div className="aspect-video lg:aspect-auto relative overflow-hidden group">
                        <PortfolioImage src={project.image} alt={project.title} category={project.category} />
                        {/* Category badges */}
                        <div className="absolute top-3 left-3 flex gap-2 z-10">
                          <span
                            className="px-2.5 py-1 rounded-full text-[10px] font-display font-bold text-white backdrop-blur-sm"
                            style={{ background: "var(--pink)" }}
                          >
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-7 flex flex-col justify-between">
                        <div>
                          <h3 className="font-display font-extrabold text-xl md:text-2xl text-wh mb-1.5 leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gr leading-relaxed mb-4">
                            {project.description}
                          </p>

                          {/* Metric highlight */}
                          <div className="rounded-xl bg-pink/5 border border-pink/10 p-4 mb-4">
                            <div className="font-display font-extrabold text-xl text-pink">
                              {project.result}
                            </div>
                          </div>

                          {/* Tech pills */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.technologies.map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-1 text-[10px] font-mono rounded-md bg-pink/5 border border-pink/10 text-pink/80"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3 pt-3 border-t border-bd">
                          <button
                            onClick={() => setExpanded(isOpen ? null : project.slug)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-display font-bold border border-bd text-wh hover:border-pink/30 transition-all cursor-pointer"
                          >
                            {isOpen ? "Close" : "View project"}
                            <ChevronDown className={clsx("w-3.5 h-3.5 transition-transform", isOpen && "rotate-180")} />
                          </button>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-display font-bold text-white transition-all hover:scale-105"
                              style={{ background: "var(--pink)" }}
                            >
                              Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded case study — Yasir style */}
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
                              <p className="text-gr text-sm leading-relaxed mb-4">{project.caseStudy.solution}</p>
                              <div className="space-y-2">
                                {project.caseStudy.build.split(". ").filter(Boolean).map((point, idx) => (
                                  <div key={idx} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-pink shrink-0 mt-0.5" />
                                    <span className="text-sm text-gr">{point.endsWith(".") ? point : point + "."}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Results */}
                            <div>
                              <h4 className="text-[10px] uppercase tracking-[0.3em] text-pink font-display font-bold mb-3">The Results</h4>
                              <div className="rounded-xl bg-pink/5 border border-pink/10 p-5">
                                <div className="space-y-2.5">
                                  {project.caseStudy.resultDetail.split(". ").filter(Boolean).map((point, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5">
                                      <CheckCircle2 className="w-4 h-4 text-pink shrink-0 mt-0.5" />
                                      <span className="text-sm text-gr">{point.endsWith(".") ? point : point + "."}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* CTA */}
                            <div className="flex items-center gap-4 pt-4 border-t border-bd">
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
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
