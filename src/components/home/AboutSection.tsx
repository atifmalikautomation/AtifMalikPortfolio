"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const skills = [
  "Higgsfield AI",
  "n8n",
  "ElevenLabs",
  "Claude",
  "Custom APIs",
];

const stats = [
  { value: "<2hrs", label: "Response" },
  { value: "1-2wk", label: "Delivery" },
  { value: "14day", label: "Stabilization" },
];

export function AboutSection() {
  return (
    <section className="section-padding" id="about">
      <div className="container-narrow mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-bg3 border border-bd">
              {/* Pink left bar accent */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-pink z-10" />
              {/* Atif photo */}
              <img
                src="/images/atif.jpeg"
                alt="Atif Malik"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              {/* Pink glow behind image */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-pink06 blur-[80px] pointer-events-none" />
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-dm mb-4">
              About Me
            </div>

            <h2 className="font-display text-[clamp(26px,3.5vw,42px)] font-extrabold text-wh leading-[1.1] tracking-[-0.02em] mb-6">
              I&apos;m Atif Malik.{" "}
              <span className="text-pink">AI Video &amp; Automation Specialist</span>
            </h2>

            <p className="text-gr text-base leading-[1.75] mb-6">
              I help businesses eliminate manual work and scale content production
              using AI-powered automation systems. From cinematic AI video
              production to end-to-end workflow automation, I build the systems
              that let your business run without you.
            </p>

            <p className="text-gr text-base leading-[1.75] mb-8">
              Every system I build is designed to save time, cut costs, and
              generate measurable results &mdash; not just deliverables. Whether
              it&apos;s automating your lead pipeline or producing studio-grade
              video at a fraction of the cost, I focus on outcomes that move your
              revenue needle.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-[12px] font-mono rounded-[8px] border border-bd bg-bg3 text-gr hover:border-pink/30 hover:text-pink transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className="bg-card border border-bd rounded-[12px] p-4 text-center"
                >
                  <div className="text-lg font-display font-bold text-pink">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-mono text-dm uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-pink hover:text-pink-hover transition-colors group"
            >
              Read Full Bio
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
