"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { siteConfig, type Service } from "@/lib/site-config";
import { ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-narrow mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm text-text-muted">
              <Link href="/services" className="hover:text-accent transition-colors">
                Services
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text-secondary">{service.title}</span>
            </nav>

            <span className="text-xs font-mono text-accent mb-2 block">
              SYSTEM {service.number}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              {service.title}
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mb-10">
              {service.description}
            </p>
          </motion.div>

          {/* Problem / Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="rounded-[var(--radius-lg)] border border-red-500/20 bg-red-500/5 p-6"
            >
              <h2 className="text-sm font-mono uppercase tracking-widest text-red-400 mb-4">
                The Problem
              </h2>
              <ul className="space-y-3">
                {service.problems.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-text-secondary">
                    <X size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rounded-[var(--radius-lg)] border border-accent/20 bg-accent-dim/30 p-6"
            >
              <h2 className="text-sm font-mono uppercase tracking-widest text-accent mb-4">
                The Outcome
              </h2>
              <ul className="space-y-3">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-text-secondary">
                    <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Technology */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-sm font-mono uppercase tracking-widest text-text-muted mb-4">
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {service.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 text-sm font-mono rounded-[var(--radius)] border border-border bg-bg-surface text-text-secondary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="rounded-[var(--radius-xl)] border border-accent/20 bg-accent-dim/10 p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-3">
              Ready to Build Your {service.title}?
            </h2>
            <p className="text-text-secondary mb-6 max-w-lg mx-auto">
              Tell me about your business and I&apos;ll design a custom {service.title.toLowerCase()} system
              tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/contact" size="lg">
                Start Your Project
                <ArrowRight size={18} />
              </Button>
              <Button href="/calculator" variant="outline" size="lg">
                Calculate Your ROI
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
