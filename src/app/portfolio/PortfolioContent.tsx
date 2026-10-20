"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";

function PortfolioImage({ src, alt, category }: { src: string; alt: string; category: string }) {
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);
  const gradient = gradientFallbacks[category] || gradientFallbacks["Web Development"];

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: gradient }}>
        <span className="font-display font-bold text-white/60 text-sm text-center px-4">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={onError}
    />
  );
}

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
  "All",
  ...new Set(projects.map((p) => p.category)),
];

const kindBadge: Record<string, { label: string; color: string }> = {
  client: { label: "Client Project", color: "#10b981" },
  "case-study": { label: "Case Study", color: "#6366f1" },
  "live-demo": { label: "Live Demo", color: "#0ea5e9" },
};

const gradientFallbacks: Record<string, string> = {
  "AI Automation": "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
  "AI Video": "linear-gradient(135deg, #4a0020 0%, #831843 50%, #be185d 100%)",
  "AI Chatbot": "linear-gradient(135deg, #042f2e 0%, #115e59 50%, #0d9488 100%)",
  "Lead Automation": "linear-gradient(135deg, #1c1917 0%, #44403c 50%, #78716c 100%)",
  "AI Content": "linear-gradient(135deg, #1a2e05 0%, #365314 50%, #4d7c0f 100%)",
  "Web Development": "linear-gradient(135deg, #0c0a09 0%, #292524 50%, #57534e 100%)",
};

export function PortfolioContent() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-sm font-display font-semibold text-wh">
              Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh text-center mb-4 leading-[1.1]"
          >
            Real AI Systems,{" "}
            <span
              className="text-pink"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              Real Results.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gr text-base md:text-lg text-center max-w-xl mx-auto mb-10"
          >
            Each project solves a specific business problem with AI automation, chatbots, video, or custom development.
          </motion.p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={clsx(
                  "px-4 py-2 text-sm rounded-full border transition-all cursor-pointer font-display font-semibold",
                  filter === cat
                    ? "border-pink bg-pink/10 text-pink"
                    : "border-bd text-gr hover:border-pink/30 hover:text-wh"
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
                  <div className="group block rounded-2xl border border-bd bg-card overflow-hidden hover:border-pink/30 hover:-translate-y-1 transition-all duration-300">
                    {/* Image */}
                    <Link href={`/portfolio/${project.slug}`}>
                      <div className="aspect-video relative overflow-hidden bg-bg2">
                        <PortfolioImage src={project.image} alt={project.title} category={project.category} />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-black" />
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5">
                      <span
                        className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold uppercase tracking-wider text-white mb-2.5"
                        style={{ background: "var(--pink)" }}
                      >
                        {project.category}
                      </span>
                      <Link href={`/portfolio/${project.slug}`}>
                        <h3 className="text-lg font-display font-bold text-wh mb-2 group-hover:text-pink transition-colors leading-tight">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gr leading-relaxed mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.technologies.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 text-[10px] font-mono rounded border border-bd text-dm"
                          >
                            {t}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-0.5 text-[10px] font-mono rounded border border-bd text-dm">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-bd">
                        <span className="text-xs text-pink font-display font-bold">
                          {project.result}
                        </span>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-display font-bold text-white transition-opacity hover:opacity-80"
                            style={{ background: "var(--pink)" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.liveLabel || "Live Demo"} <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
