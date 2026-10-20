"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const reels = [
  { id: "1", title: "AI Product Ad", category: "Product Video", gradient: "from-pink/30 to-purple-600/30", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
  { id: "2", title: "Brand Story Film", category: "Brand Video", gradient: "from-blue-500/30 to-cyan-500/30", icon: "M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" },
  { id: "3", title: "AI Commercial", category: "Ad Creative", gradient: "from-orange-500/30 to-red-500/30", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { id: "4", title: "Social Reel", category: "Social Content", gradient: "from-green-500/30 to-teal-500/30", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { id: "5", title: "UGC-Style Video", category: "UGC Content", gradient: "from-indigo-500/30 to-violet-500/30", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { id: "6", title: "Product Launch", category: "Launch Video", gradient: "from-yellow-500/30 to-amber-500/30", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { id: "7", title: "Cinematic Intro", category: "Brand Film", gradient: "from-rose-500/30 to-pink/30", icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "8", title: "AI Explainer", category: "Explainer", gradient: "from-sky-500/30 to-blue-600/30", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
];

const doubled = [...reels, ...reels];

export function VideoGallery() {
  return (
    <section className="section-padding overflow-hidden" id="video-portfolio">
      <div className="max-w-6xl mx-auto mb-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-xs font-display font-bold uppercase tracking-widest text-pink mb-6">
            AI Video Production
          </span>

          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh mb-3 leading-tight">
            Cinematic AI{" "}
            <span
              className="text-pink"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              Video Showcase
            </span>
          </h2>

          <p className="text-gr text-base md:text-lg max-w-2xl mx-auto">
            Studio-quality AI videos — product ads, brand films, social content, and cinematic storytelling powered by frontier AI models.
          </p>
        </motion.div>
      </div>

      {/* Auto-scrolling reels — right to left */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-scroll-left">
          {doubled.map((reel, i) => (
            <div
              key={`${reel.id}-${i}`}
              className="flex-shrink-0 w-[220px] md:w-[260px] group cursor-pointer"
            >
              <div className={`aspect-[9/16] rounded-2xl bg-gradient-to-br ${reel.gradient} border border-bd overflow-hidden relative flex flex-col items-center justify-center hover:scale-[1.03] transition-transform duration-300`}>
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 opacity-70">
                    <path d={reel.icon} />
                  </svg>
                </div>

                {/* Play button */}
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-white/30 group-hover:scale-110 transition-all">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </div>

                {/* Text */}
                <div className="text-center px-4">
                  <div className="text-white font-display font-bold text-sm mb-0.5">{reel.title}</div>
                  <div className="text-white/50 text-[10px] font-display uppercase tracking-wider">{reel.category}</div>
                </div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
