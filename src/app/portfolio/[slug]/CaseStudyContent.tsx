"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { PortfolioItem } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CaseStudyContent({ project }: { project: PortfolioItem }) {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-narrow mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <nav className="mb-8 text-sm text-text-muted">
              <Link href="/portfolio" className="hover:text-accent transition-colors">
                Portfolio
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text-secondary">{project.title}</span>
            </nav>

            <span className="text-xs font-mono text-accent mb-2 block">
              {project.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Hero image placeholder */}
            <div className="aspect-video rounded-[var(--radius-xl)] bg-bg-surface border border-border mb-12 flex items-center justify-center">
              <span className="font-mono text-sm text-text-muted/50">
                [PROJECT SCREENSHOT / VIDEO]
              </span>
            </div>
          </motion.div>

          {/* Case study sections */}
          <div className="space-y-10">
            <CaseSection number="01" title="The Challenge">
              <p className="text-text-secondary leading-relaxed">
                [Describe the specific business challenge this project addressed.
                What was the client struggling with? What was the impact on their business?]
              </p>
            </CaseSection>

            <CaseSection number="02" title="The AI Opportunity">
              <p className="text-text-secondary leading-relaxed">
                [What AI-powered solution was identified? Why was this the right approach?
                How did the system architecture address the root cause?]
              </p>
            </CaseSection>

            <CaseSection number="03" title="The Build">
              <p className="text-text-secondary leading-relaxed mb-4">
                [Describe the technical implementation. What was built, how was it connected,
                and what made this solution unique?]
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm font-mono rounded-[var(--radius)] border border-border bg-bg-surface text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CaseSection>

            <CaseSection number="04" title="The Result">
              <div className="rounded-[var(--radius-lg)] border border-accent/20 bg-accent-dim/20 p-6">
                <div className="text-2xl font-bold text-accent mb-2">
                  {project.result}
                </div>
                <p className="text-sm text-text-secondary">
                  [Add additional metrics: hours saved, revenue impact, response time improvement, etc.]
                </p>
              </div>
            </CaseSection>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-3">
              Want Similar Results?
            </h2>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              Let&apos;s discuss how a similar AI system could work for your business.
            </p>
            <Button href="/contact" size="lg">
              Start Your Project
              <ArrowRight size={18} />
            </Button>
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
        <span className="text-xs font-mono text-accent">{number}</span>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}
