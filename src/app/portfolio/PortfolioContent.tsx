"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { clsx } from "clsx";
import { ExternalLink, ChevronUp, CheckCircle2, MessageCircle, Flame } from "lucide-react";

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
  const expandRef = useRef<HTMLDivElement>(null);

  const filtered =
    filter === "All Projects"
      ? projects
      : projects.filter((p) => p.category === filter);

  useEffect(() => {
    if (expanded && expandRef.current) {
      setTimeout(() => {
        expandRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [expanded]);

  return (
    <div className="pt-4">
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-xs font-display font-bold uppercase tracking-widest text-pink mb-5">
              💼 Real Work. Real Results.
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh text-center mb-2 leading-[1.1]">
            Projects that{" "}
            <span className="text-pink" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 600 }}>
              transformed businesses.
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gr text-base md:text-lg text-center max-w-2xl mx-auto mb-8">
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
                  filter === cat ? "border-pink bg-pink text-white" : "border-bd text-gr hover:border-pink/30 hover:text-wh"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid + inline expand */}
          <div className="space-y-6">
            {/* Cards row by row — we render grid, then expanded panel after the row */}
            {(() => {
              const rows: Project[][] = [];
              for (let i = 0; i < filtered.length; i += 3) {
                rows.push(filtered.slice(i, i + 3));
              }

              return rows.map((row, rowIdx) => {
                const expandedInRow = row.find((p) => p.slug === expanded);

                return (
                  <div key={rowIdx}>
                    {/* 3-column row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {row.map((project, i) => (
                        <motion.div
                          key={project.slug}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                          className={clsx(
                            "rounded-2xl border bg-card overflow-hidden hover:-translate-y-1 transition-all duration-300",
                            expanded === project.slug ? "border-pink" : "border-bd hover:border-pink/30"
                          )}
                        >
                          <div className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold border border-pink/30 text-pink">
                                {project.category}
                              </span>
                            </div>

                            <h3 className="font-display font-extrabold text-lg text-wh mb-1 leading-tight">{project.title}</h3>
                            <p className="text-sm text-gr leading-relaxed mb-4 line-clamp-2">{project.description}</p>

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

                            <div className="flex items-center justify-between pt-3 border-t border-bd">
                              <button
                                onClick={() => setExpanded(expanded === project.slug ? null : project.slug)}
                                className="inline-flex items-center gap-1 text-sm font-display font-bold text-pink hover:underline cursor-pointer"
                              >
                                {expanded === project.slug ? (
                                  <><ChevronUp className="w-4 h-4" /> Close</>
                                ) : (
                                  <>&rarr; View project</>
                                )}
                              </button>
                              {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-display font-bold text-gr hover:text-pink transition-colors">
                                  Live Demo <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Inline expanded panel — appears below the row */}
                    <AnimatePresence>
                      {expandedInRow && (
                        <motion.div
                          ref={expandRef}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="max-w-2xl mx-auto mt-5 rounded-2xl border border-bd bg-card shadow-lg">
                            {/* Top bar */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-bd">
                              <button onClick={() => setExpanded(null)} className="inline-flex items-center gap-1.5 text-sm font-display font-bold text-pink hover:underline cursor-pointer">
                                <ChevronUp className="w-4 h-4" /> Close
                              </button>
                              {expandedInRow.liveUrl && (
                                <a href={expandedInRow.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-display font-bold text-gr hover:text-pink transition-colors">
                                  Live Demo <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>

                            <div className="px-6 py-6 space-y-6">
                              {/* Title */}
                              <div>
                                <h2 className="font-display font-extrabold text-2xl text-wh mb-1">
                                  {categoryEmoji[expandedInRow.category] || "🚀"} {expandedInRow.title}
                                </h2>
                                <p className="text-sm text-gr">{expandedInRow.category} &middot; Case Study</p>
                              </div>

                              {expandedInRow.liveUrl && (
                                <a href={expandedInRow.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-display font-bold border border-pink/30 text-pink hover:bg-pink/5 transition-colors">
                                  Visit site <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}

                              <hr className="border-bd" />

                              {/* THE CHALLENGE */}
                              <div>
                                <h4 className="text-xs uppercase tracking-[0.2em] text-pink font-display font-bold mb-3">The Challenge</h4>
                                <p className="text-sm text-gr leading-relaxed">{expandedInRow.caseStudy.challenge}</p>
                              </div>

                              {/* WHAT WAS BUILT */}
                              <div>
                                <h4 className="text-xs uppercase tracking-[0.2em] text-pink font-display font-bold mb-3">What Was Built</h4>
                                <p className="text-sm text-gr leading-relaxed mb-4">{expandedInRow.caseStudy.solution}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {expandedInRow.caseStudy.build.split(". ").filter(Boolean).map((point, idx) => (
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
                                        const m = expandedInRow.metrics || [];
                                        return [
                                          { area: "Efficiency", before: "Slow, manual", after: m[0] ? `${m[0].value} ${m[0].label}` : "Automated" },
                                          { area: "Speed", before: "Hours to days", after: m[1] ? `${m[1].value} ${m[1].label}` : "Minutes" },
                                          { area: "Scale", before: "Limited capacity", after: m[2] ? `${m[2].value} ${m[2].label}` : "Unlimited" },
                                          { area: "Operations", before: "Scattered tools", after: "Unified system" },
                                        ].map((row, idx) => (
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
                                  {expandedInRow.technologies.map((t) => (
                                    <span key={t} className="px-3 py-1.5 text-xs font-mono rounded-full border border-pink/20 text-pink/80">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* CTA */}
                              <div className="rounded-xl bg-pink/5 border border-pink/10 p-6 text-center space-y-4">
                                <h3 className="font-display font-bold text-lg text-wh">Want results like this for your business?</h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                  <a href="/book" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-display font-bold text-white transition-all hover:scale-105 shadow-lg" style={{ background: "var(--pink)" }}>
                                    <Flame className="w-4 h-4" /> Book free audit
                                  </a>
                                  <a href="https://wa.me/923196780720" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-display font-bold border border-pink/30 text-pink hover:bg-pink/5 transition-colors">
                                    <MessageCircle className="w-4 h-4" /> Ask about this
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>
    </div>
  );
}
