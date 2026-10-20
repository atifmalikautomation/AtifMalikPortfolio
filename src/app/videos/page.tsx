"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";

const reels = [
  { id: "ig1", src: "/videos/ig_dxxqi7fk_aj.mp4", category: "Social Content" },
  { id: "fb1", src: "/videos/fb_1569205884564725.mp4", category: "Ad Creative" },
  { id: "ig2", src: "/videos/ig_dxt9iz_jjq9.mp4", category: "Social Content" },
  { id: "fb2", src: "/videos/fb_1697528768037153.mp4", category: "Ad Creative" },
  { id: "ig3", src: "/videos/ig_dy2tzhmodod.mp4", category: "Social Content" },
  { id: "mindscribe", src: "/videos/mindscribe-video.mp4", category: "AI SaaS Video" },
  { id: "ig4", src: "/videos/ig_daeqwciszei.mp4", category: "Social Content" },
  { id: "fb3", src: "/videos/fb_870209396096770.mp4", category: "Ad Creative" },
  { id: "ig5", src: "/videos/ig_das9tvqzub8.mp4", category: "Social Content" },
  { id: "0907", src: "/videos/0907.mp4", category: "Product Video" },
  { id: "ig6", src: "/videos/ig_dbeedbbteir.mp4", category: "Social Content" },
  { id: "wearhouse", src: "/videos/wearhouse.mp4", category: "Brand Video" },
  { id: "ig7", src: "/videos/ig_dbwgwggy8z0.mp4", category: "Social Content" },
  { id: "final-vertical", src: "/videos/final-vertical-video.mp4", category: "Social Content" },
  { id: "ig8", src: "/videos/ig_dcmvkoizlc9.mp4", category: "Social Content" },
  { id: "cool-paws-mat", src: "/videos/cool-paws-mat.mp4", category: "Product Video" },
  { id: "cool-paws-rev", src: "/videos/cool-paws-mat-revision.mp4", category: "Product Video" },
];

// Lazy video: only loads when near viewport
function LazyVideoThumb({ src, onClick }: { src: string; onClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isNear, setIsNear] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const nearObserver = new IntersectionObserver(
      ([entry]) => setIsNear(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    nearObserver.observe(el);
    return () => nearObserver.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const visObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    visObserver.observe(el);
    return () => visObserver.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVisible && isNear) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, isNear]);

  return (
    <div ref={containerRef} className="w-full h-full" onClick={onClick}>
      {isNear ? (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          onLoadedData={() => setHasLoaded(true)}
          className="w-full h-full object-cover"
        />
      ) : null}
      {!hasLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] animate-pulse" />
      )}
    </div>
  );
}

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const openVideo = useCallback((src: string) => {
    setActiveVideo(src);
    setMuted(false);
  }, []);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
    setMuted(true);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest(".video-protected")) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeVideo]);

  return (
    <>
      <div className="min-h-screen pt-4 pb-20">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-5 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-xs font-display font-bold uppercase tracking-widest text-pink mb-4">
              🎬 AI Video Production
            </span>

            <h1 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh mb-3 leading-tight">
              Cinematic AI{" "}
              <span
                className="text-pink"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                }}
              >
                Video Portfolio
              </span>
            </h1>

            <p className="text-gr text-base md:text-lg max-w-2xl mx-auto mb-2">
              Studio-quality AI videos — product ads, brand films, social content, and cinematic storytelling powered by frontier AI models.
            </p>

            <p className="text-pink font-display font-bold text-sm">
              {reels.length} Videos — Click any video to watch with sound
            </p>
          </motion.div>
        </div>

        {/* Video Grid */}
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {reels.map((reel, i) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="video-protected aspect-[9/16] rounded-2xl border border-bd overflow-hidden relative bg-black">
                  <LazyVideoThumb src={reel.src} onClick={() => openVideo(reel.src)} />

                  <div className="absolute inset-0 z-[1] pointer-events-none" />

                  <div className="absolute inset-0 z-[2] flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 z-[3] pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-white text-[10px] font-display font-bold uppercase tracking-wider bg-pink">
                      {reel.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Write Your Idea */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="idea"
          className="max-w-2xl mx-auto px-5 mt-16"
        >
          <div className="rounded-2xl border border-bd bg-card p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink/10 mb-3">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-display font-extrabold text-xl md:text-2xl text-wh mb-1.5">
                Have a Video Idea?
              </h3>
              <p className="text-gr text-sm max-w-md mx-auto">
                Share your concept — I'll craft a cinematic AI video tailored to your brand.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const idea = (form.elements.namedItem("idea") as HTMLTextAreaElement).value;
                if (!idea.trim()) return;
                const msg = encodeURIComponent(`Hi Atif! I have a video idea:\n\n${idea}`);
                window.open(`https://wa.me/923196780720?text=${msg}`, "_blank");
                form.reset();
              }}
              className="max-w-lg mx-auto"
            >
              <textarea
                name="idea"
                rows={3}
                placeholder="Describe your video idea — product, style, mood, platform..."
                className="w-full rounded-xl border border-bd bg-bg2 text-wh px-4 py-3 text-sm font-display placeholder:text-gr/50 focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/20 resize-none mb-4 transition-all"
              />
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] text-gr font-display">Typically reply within 2 hours</p>
                <button
                  type="submit"
                  className="flex-shrink-0 px-6 py-2.5 rounded-full text-white text-sm font-display font-bold transition-all hover:scale-105 hover:shadow-lg"
                  style={{ background: "#25D366" }}
                >
                  Send on WhatsApp →
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-[400px] w-full max-h-[90vh] video-protected"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideo}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={() => setMuted(!muted)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors z-10"
              >
                {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>

              <video
                ref={modalVideoRef}
                src={activeVideo}
                autoPlay
                loop
                muted={muted}
                playsInline
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                className="w-full rounded-2xl"
                style={{ maxHeight: "85vh" }}
              />

              <div className="absolute inset-0 rounded-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
