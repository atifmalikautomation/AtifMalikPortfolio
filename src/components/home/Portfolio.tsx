"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const featured = siteConfig.portfolio.filter((_, i) => i < 6);

const gradientFallbacks: Record<string, string> = {
  "AI Automation": "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
  "AI Video": "linear-gradient(135deg, #4a0020 0%, #831843 50%, #be185d 100%)",
  "AI Chatbot": "linear-gradient(135deg, #042f2e 0%, #115e59 50%, #0d9488 100%)",
  "Lead Automation": "linear-gradient(135deg, #1c1917 0%, #44403c 50%, #78716c 100%)",
  "AI Content": "linear-gradient(135deg, #1a2e05 0%, #365314 50%, #4d7c0f 100%)",
  "Web Development": "linear-gradient(135deg, #0c0a09 0%, #292524 50%, #57534e 100%)",
};

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

export function Portfolio() {
  return (
    <section className="section-padding" id="work">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-xs font-display font-bold uppercase tracking-widest text-pink mb-6">
            💼 Portfolio
          </span>

          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh mb-3 leading-tight">
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
          </h2>

          <p className="text-gr text-base md:text-lg max-w-2xl mx-auto">
            Each project solves a specific business problem with AI automation, chatbots, video, or custom development.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block rounded-2xl border border-bd bg-card overflow-hidden hover:border-pink/30 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-video relative overflow-hidden bg-bg2">
                  <PortfolioImage src={project.image} alt={project.title} category={project.category} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <span
                    className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold uppercase tracking-wider text-white mb-2.5"
                    style={{ background: "var(--pink)" }}
                  >
                    {project.category}
                  </span>
                  <h3 className="text-lg font-display font-bold text-wh mb-2 group-hover:text-pink transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gr leading-relaxed mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="text-xs text-pink font-display font-bold pt-3 mt-3 border-t border-bd">
                    {project.result}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link href="/portfolio" className="hero-cta-btn inline-flex !p-[2px]">
            <span className="hero-cta-inner-btn !py-3 !px-8 !text-base !font-display !font-bold">
              View All Projects <ArrowRight size={18} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
