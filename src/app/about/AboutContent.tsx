"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";

const philosophy = [
  { title: "Systems Over Busywork", description: "Every solution I build eliminates repetitive work and creates compounding value." },
  { title: "AI-First Thinking", description: "I evaluate every business process through the lens of what AI can automate, enhance, or replace." },
  { title: "Outcomes Over Outputs", description: "I measure success by hours saved, leads generated, and revenue impact — not deliverables shipped." },
  { title: "Build to Last", description: "Production-ready, documented, maintainable systems. No fragile prototypes that break." },
];

const expertise = [
  "AI Video Production (Veo, Sora, Runway, Higgsfield)",
  "Business Automation (n8n, Make, Zapier)",
  "AI Agents & Chatbots (OpenAI, Claude, Gemini)",
  "Web Development (Next.js, React, WordPress)",
  "Voice AI & ElevenLabs Integration",
  "CRM & Lead Automation Systems",
  "API Integration & Custom Development",
  "AI Content Production Pipelines",
];

export function AboutContent() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block mb-4 px-3 py-1 text-xs font-mono uppercase tracking-widest text-accent bg-accent-dim rounded-full border border-accent/20">
                About
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Building AI Systems
                <br />
                <span className="text-gradient">That Actually Work</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-4">
                I&apos;m Atif Malik — an AI growth systems architect and AI video
                production specialist based in Pakistan. I help businesses turn
                manual processes into intelligent, automated systems.
              </p>
              <p className="text-text-secondary leading-relaxed">
                My approach combines strategic thinking with hands-on engineering.
                I don&apos;t just advise — I design, build, and deploy complete AI
                systems that generate real business results. From AI-powered video
                production pipelines to full-stack automation architectures, I
                handle the entire journey from concept to production.
              </p>
            </motion.div>

            {/* Portrait placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="aspect-[4/5] rounded-[var(--radius-xl)] bg-bg-surface border border-border flex items-center justify-center"
            >
              <span className="text-sm text-text-muted font-mono">
                [PROFESSIONAL PORTRAIT]
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-bg-elevated">
        <div className="container-narrow mx-auto">
          <SectionHeading
            label="Philosophy"
            title="How I Think About AI"
            align="left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl">
            {philosophy.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="rounded-[var(--radius-lg)] border border-border bg-bg-primary p-6"
              >
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <SectionHeading
            label="Expertise"
            title="What I Build"
            align="left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
            {expertise.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center gap-3 text-sm text-text-secondary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-bg-elevated">
        <div className="container-narrow mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Build Something?
          </h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">
            Whether you need AI video production, business automation, or a
            complete AI growth system — let&apos;s talk about what&apos;s possible.
          </p>
          <Button href={siteConfig.cta.primary.href} size="lg">
            {siteConfig.cta.primary.label}
            <ArrowRight size={18} />
          </Button>
        </div>
      </section>
    </div>
  );
}
