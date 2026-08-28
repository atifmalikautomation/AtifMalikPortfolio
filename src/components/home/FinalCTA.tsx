"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, MessageCircle } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Gold glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,200,0.06)_0%,transparent_60%)]" />

      <div className="container-narrow mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Ready to Turn Vision
            <br />
            <span className="text-gradient">Into Revenue?</span>
          </h2>

          <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto">
            Tell me what you&apos;re building, automating, or scaling.
            I&apos;ll show you the AI system that makes it happen &mdash; or
            just say hello.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={siteConfig.cta.primary.href} size="lg">
              {siteConfig.cta.primary.label}
              <ArrowRight size={18} />
            </Button>
            <Button href="/chat" variant="outline" size="lg">
              <MessageCircle size={18} />
              Chat With Me
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
