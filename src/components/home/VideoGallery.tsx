"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink } from "lucide-react";
import Link from "next/link";

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  videoUrl?: string;
  youtubeId?: string;
  category: string;
  tools: string[];
};

const sampleVideos: VideoItem[] = [
  // Placeholder entries — replace with real videos when provided
];

export function VideoGallery({ videos = sampleVideos }: { videos?: VideoItem[] }) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  if (videos.length === 0) {
    return (
      <section className="section-padding" id="video-portfolio">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
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

            <p className="text-gr text-base md:text-lg max-w-2xl mx-auto mb-8">
              Studio-quality AI videos created with frontier models. Product ads, brand films, social content, and cinematic storytelling.
            </p>

            {/* Coming soon card */}
            <div className="max-w-lg mx-auto rounded-2xl border border-bd bg-card p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-pink/10 flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-pink" />
              </div>
              <h3 className="font-display font-bold text-xl text-wh mb-2">Video Reel Coming Soon</h3>
              <p className="text-gr text-sm mb-4">
                My AI video production portfolio is being prepared. In the meantime, check out the case studies.
              </p>
              <Link
                href="/portfolio/ai-product-video"
                className="inline-flex items-center gap-2 text-sm text-pink font-display font-bold hover:underline"
              >
                View AI Video Case Study <ExternalLink size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding" id="video-portfolio">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
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
            Studio-quality AI videos created with frontier models. Product ads, brand films, social content, and cinematic storytelling.
          </p>
        </motion.div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <button
                onClick={() => setActiveVideo(video)}
                className="group block w-full rounded-2xl border border-bd bg-card overflow-hidden hover:border-pink/30 hover:-translate-y-1 transition-all duration-300 text-left cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="aspect-video relative overflow-hidden bg-bg2">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ background: "linear-gradient(135deg, #4a0020 0%, #831843 50%, #be185d 100%)" }}
                    />
                  )}
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-display font-bold text-white"
                    style={{ background: "var(--pink)" }}
                  >
                    {video.category}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-display font-bold text-base text-wh mb-1 group-hover:text-pink transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gr line-clamp-2">{video.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {video.tools.slice(0, 3).map((tool) => (
                      <span key={tool} className="px-2 py-0.5 text-[9px] font-mono rounded border border-bd text-dm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-bold text-lg text-white">{activeVideo.title}</h3>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Close video"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden bg-black">
                {activeVideo.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    title={activeVideo.title}
                  />
                ) : activeVideo.videoUrl ? (
                  <VideoPlayer src={activeVideo.videoUrl} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">
                    Video preview not available
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      autoPlay
      playsInline
      className="w-full h-full object-contain"
      preload="metadata"
    >
      Your browser does not support the video tag.
    </video>
  );
}
