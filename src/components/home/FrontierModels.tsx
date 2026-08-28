"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const models = [
  {
    name: "Claude",
    company: "Anthropic",
    image: "/images/ai-claude.webp",
    gradient: "from-orange-400/15 via-pink-300/10 to-transparent",
    scale: 1.1,
  },
  {
    name: "Gemini",
    company: "Google DeepMind",
    image: "/images/ai-gemini.webp",
    gradient: "from-blue-400/15 via-purple-300/10 to-transparent",
    scale: 1.4,
  },
  {
    name: "ChatGPT",
    company: "OpenAI",
    image: "/images/ai-chatgpt.webp",
    gradient: "from-green-400/15 via-teal-300/10 to-transparent",
    scale: 1.3,
  },
  {
    name: "Higgsfield",
    company: "AI Video",
    image: "/images/ai-higgsfield.png",
    gradient: "from-purple-400/15 via-pink-300/10 to-transparent",
    scale: 1.1,
  },
  {
    name: "ElevenLabs",
    company: "AI Voice",
    image: "/images/ai-elevenlabs.png",
    gradient: "from-cyan-400/15 via-blue-300/10 to-transparent",
    scale: 1.1,
  },
  {
    name: "Midjourney",
    company: "AI Image",
    image: "/images/ai-midjourney.png",
    gradient: "from-indigo-400/15 via-violet-300/10 to-transparent",
    scale: 1.8,
  },
];

export function FrontierModels() {
  return (
    <section className="section-padding" id="intelligence">
      <div className="max-w-5xl mx-auto text-center">
        {/* Pill badge — like Yasir's glass-pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-sm font-display font-semibold text-wh">
            <Zap className="w-4 h-4 text-pink" /> The Intelligence Behind The Build
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh mb-4"
        >
          Powered By The World&apos;s{" "}
          <span className="text-pink">Most Advanced AI</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gr text-base md:text-lg max-w-2xl mx-auto mb-12 md:mb-14"
        >
          Every system I build is supercharged with frontier large language models, for smarter
          automations, sharper copy, and products that truly think.
        </motion.p>

        {/* 6 Model Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="group relative rounded-2xl border border-bd bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-pink/30 hover:shadow-[0_8px_32px_rgba(224,0,138,0.1)] overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b ${model.gradient} pointer-events-none`} />

              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-5 transition-transform group-hover:scale-110 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={model.image}
                    alt={`${model.name} logo`}
                    width={80}
                    height={80}
                    style={{ width: 80, height: 80, objectFit: "contain", transform: `scale(${model.scale})` }}
                  />
                </div>
                <h3 className="text-lg font-bold text-wh font-display">{model.name}</h3>
                <p className="text-sm text-gr mt-1">{model.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
