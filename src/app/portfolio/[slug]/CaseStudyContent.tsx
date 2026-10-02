"use client";

import { motion } from "framer-motion";
import type { PortfolioItem } from "@/lib/site-config";
import { ArrowRight, ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CaseStudyContent({ project }: { project: PortfolioItem }) {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm text-dm">
              <Link href="/portfolio" className="hover:text-pink transition-colors inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Portfolio
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gr">{project.title}</span>
            </nav>

            {/* Category badge */}
            <span
              className="inline-flex px-3 py-1 rounded-full text-xs font-display font-bold text-white mb-3"
              style={{ background: "var(--pink)" }}
            >
              {project.category}
            </span>

            {/* Title */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-wh tracking-tight mb-4 leading-[1.1]">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-gr leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Visit Site Button — Yasir style */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-bd bg-card text-sm font-display font-bold text-wh hover:border-pink/40 hover:text-pink transition-all mb-8"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Live Site
              </a>
            )}

            {/* Hero image */}
            <div className="aspect-video rounded-2xl overflow-hidden border border-bd mb-12 relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          </motion.div>

          {/* Result highlight */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-pink/20 bg-pink/5 p-6 md:p-8 mb-12 text-center"
          >
            <div className="text-sm font-display font-bold text-pink uppercase tracking-wider mb-2">
              Key Result
            </div>
            <div className="font-display font-extrabold text-2xl md:text-3xl text-wh">
              📈 {project.result}
            </div>
          </motion.div>

          {/* Case study sections */}
          <div className="space-y-10">
            <CaseSection number="01" title="The Challenge">
              <p className="text-gr leading-relaxed">
                {project.caseStudy.challenge}
              </p>
            </CaseSection>

            <CaseSection number="02" title="The AI Solution">
              <p className="text-gr leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </CaseSection>

            <CaseSection number="03" title="The Build">
              <p className="text-gr leading-relaxed mb-5">
                {project.caseStudy.build}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm font-mono rounded-lg border border-bd bg-card text-gr"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CaseSection>

            <CaseSection number="04" title="The Results">
              <div className="rounded-2xl border border-pink/20 bg-pink/5 p-6">
                <div className="space-y-3">
                  {project.caseStudy.resultDetail.split(". ").filter(Boolean).map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-pink shrink-0 mt-0.5" />
                      <p className="text-gr text-sm leading-relaxed">
                        {point.endsWith(".") ? point : point + "."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CaseSection>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl border border-bd bg-card p-8 text-center"
          >
            <h2 className="font-display font-extrabold text-2xl text-wh mb-3">
              Want Similar Results?
            </h2>
            <p className="text-gr mb-6 max-w-md mx-auto">
              Let&apos;s discuss how a similar AI system could work for your business.
            </p>
            <Link
              href="/book"
              className="hero-cta-btn inline-flex !p-[2px]"
            >
              <span className="hero-cta-inner-btn !py-3 !px-8 !text-base !font-display !font-bold">
                Book a Free Strategy Call <ArrowRight size={18} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function CaseSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-lg bg-pink/10 flex items-center justify-center text-xs font-mono font-bold text-pink">
          {number}
        </span>
        <h2 className="text-xl font-display font-extrabold text-wh">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}
