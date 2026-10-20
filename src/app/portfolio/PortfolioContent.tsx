"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";
import { clsx } from "clsx";
import { ArrowUpRight, ExternalLink, ChevronUp, CheckCircle2, MessageCircle, Flame } from "lucide-react";

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
  metrics?: readonly { value: string; label: string }[];
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

const categoryEmoji: Record<string, string> = {
  "AI Automation": "⚙️",
  "AI Video": "🎬",
  "AI Chatbot": "💬",
  "Lead Automation": "📈",
  "AI Content": "📝",
  "Web Development": "🌐",
};

export function PortfolioContent() {
  const [filter, setFilter] = useState("All Projects");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    filter === "All Projects"
      ? projects
      : projects.filter((p) => p.category === filter);

  const expandedProject = expanded ? projects.find((p) => p.slug === expanded) : null;

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

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                className="rounded-2xl border border-bd bg-card overflow-hidden hover:border-pink/30 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-video relative overflow-hidden bg-bg2">
                  <PortfolioImage src={project.image} alt={project.title} />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold border border-pink/30 text-pink">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-lg text-wh mb-1 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gr leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Metric boxes */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="rounded-xl py-2.5 px-2 text-center" style={{ background: "var(--pink)", opacity: 0.9 }}>
                          <div className="font-display font-extrabold text-base text-white leading-none mb-0.5">{m.value}</div>
                          <div className="text-[9px] font-display font-medium text-white/70 uppercase tracking-wide">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bottom actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-bd">
                    <button
                      onClick={() => setExpanded(project.slug)}
                      className="inline-flex items-center gap-1 text-sm font-display font-bold text-pink hover:underline cursor-pointer"
                    >
                      &rarr; View project
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ POPUP MODAL — Yasir style centered card ═══ */}
      <AnimatePresence>
        {expandedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(null)}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-10 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-bd rounded-2xl w-full max-w-2xl shadow-2xl"
            >
              {/* Top bar — Close + Live site */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-bd">
                <button
                  onClick={() => setExpanded(null)}
                  className="inline-flex items-center gap-1.5 text-sm font-display font-bold text-pink hover:underline cursor-pointer"
                >
                  <ChevronUp className="w-4 h-4" /> Close
                </button>
                {expandedProject.liveUrl && (
                  <a
                    href={expandedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-display font-bold text-gr hover:text-pink transition-colors"
                  >
                    Live Demo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-6">
                {/* Title with emoji */}
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-wh mb-1">
                    {categoryEmoji[expandedProject.category] || "🚀"} {expandedProject.title}
                  </h2>
                  <p className="text-sm text-gr">
                    {expandedProject.category} &middot; Case Study
                  </p>
                </div>

                {/* Visit site button */}
                {expandedProject.liveUrl && (
                  <a
                    href={expandedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-display font-bold border border-pink/30 text-pink hover:bg-pink/5 transition-colors"
                  >
                    Visit site <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <hr className="border-bd" />

                {/* THE CHALLENGE */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-pink font-display font-bold mb-3">The Challenge</h4>
                  <p className="text-sm text-gr leading-relaxed">{expandedProject.caseStudy.challenge}</p>
                </div>

                {/* WHAT WAS BUILT */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-pink font-display font-bold mb-3">What Was Built</h4>
                  <p className="text-sm text-gr leading-relaxed mb-4">{expandedProject.caseStudy.solution}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {expandedProject.caseStudy.build.split(". ").filter(Boolean).map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink shrink-0 mt-0.5" />
                        <span className="text-sm text-gr">{point.endsWith(".") ? point : point + "."}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* THE TRANSFORMATION — Before/After table */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-pink font-display font-bold mb-3">The Transformation</h4>
                  <div className="rounded-xl border border-bd overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-bd">
                          <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gr font-display font-bold">Area</th>
                          <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gr font-display font-bold">❌ Before</th>
                          <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-gr font-display font-bold">✅ After</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const results = expandedProject.caseStudy.resultDetail.split(". ").filter(Boolean);
                          const rows = results.slice(0, 4).map((r) => {
                            const parts = r.split(/from |to |dropped |increased |improved |grew |reduced /i);
                            return {
                              area: r.substring(0, 30).replace(/[.]/g, ""),
                              before: "Manual process",
                              after: r.length > 40 ? r.substring(0, 40) + "..." : r,
                            };
                          });
                          // Generate meaningful before/after from metrics
                          const metrics = expandedProject.metrics || [];
                          const areas = [
                            { area: "Efficiency", before: "Slow, manual", after: metrics[0] ? `${metrics[0].value} ${metrics[0].label}` : "Automated" },
                            { area: "Speed", before: "Hours to days", after: metrics[1] ? `${metrics[1].value} ${metrics[1].label}` : "Minutes" },
                            { area: "Scale", before: "Limited capacity", after: metrics[2] ? `${metrics[2].value} ${metrics[2].label}` : "Unlimited" },
                            { area: "Operations", before: "Scattered tools", after: "Unified system" },
                          ];
                          return areas.map((row, idx) => (
                            <tr key={idx} className={idx < 3 ? "border-b border-bd" : ""}>
                              <td className="px-4 py-3 text-gr">{row.area}</td>
                              <td className="px-4 py-3 text-gr/60">{row.before}</td>
                              <td className="px-4 py-3 text-wh font-display font-bold">{row.after}</td>
                            </tr>
                          ));
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* TOOLS & TECH */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-pink font-display font-bold mb-3">Tools & Tech</h4>
                  <div className="flex flex-wrap gap-2">
                    {expandedProject.technologies.map((t) => (
                      <span key={t} className="px-3 py-1.5 text-xs font-mono rounded-full border border-pink/20 text-pink/80 hover:bg-pink/5 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="rounded-xl bg-pink/5 border border-pink/10 p-6 text-center space-y-4">
                  <h3 className="font-display font-bold text-lg text-wh">
                    Want results like this for your business?
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href="/book"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-display font-bold text-white transition-all hover:scale-105 shadow-lg"
                      style={{ background: "var(--pink)" }}
                    >
                      <Flame className="w-4 h-4" /> Book free audit
                    </a>
                    <a
                      href="https://wa.me/923196780720"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-display font-bold border border-pink/30 text-pink hover:bg-pink/5 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> Ask about this
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
