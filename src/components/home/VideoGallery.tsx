"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX, ArrowRight } from "lucide-react";
import Link from "next/link";

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

// Lazy video: only loads src when near viewport, pauses + unloads when far away
function LazyVideoThumb({ src, onClick }: { src: string; onClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isNear, setIsNear] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Near observer: start loading video when within 400px of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const nearObserver = new IntersectionObserver(
      ([entry]) => setIsNear(entry.isIntersecting),
      { rootMargin: "200px 400px 200px 400px" }
    );
    nearObserver.observe(el);
    return () => nearObserver.disconnect();
  }, []);

  // Visible observer: play only when actually on screen
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

  // Play/pause based on visibility
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
      {/* Gradient placeholder while video hasn't loaded */}
      {!hasLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] animate-pulse" />
      )}
    </div>
  );
}

export function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const openVideo = useCallback((src: string) => {
    if (hasDraggedRef.current) return;
    setActiveVideo(src);
    setMuted(false);
  }, []);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
    setMuted(true);
  }, []);

  // Auto-scroll with requestAnimationFrame
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.8;
    let lastTime = 0;

    const tick = (time: number) => {
      if (!isPausedRef.current && !isDraggingRef.current) {
        const delta = lastTime ? (time - lastTime) : 16;
        lastTime = time;
        el.scrollLeft += speed * (delta / 16);

        const halfScroll = el.scrollWidth / 2;
        if (el.scrollLeft >= halfScroll) {
          el.scrollLeft -= halfScroll;
        }
      } else {
        lastTime = 0;
      }
      autoScrollRef.current = requestAnimationFrame(tick);
    };

    autoScrollRef.current = requestAnimationFrame(tick);
    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    };
  }, []);

  const handleMouseEnter = useCallback(() => { isPausedRef.current = true; }, []);
  const handleMouseLeave = useCallback(() => {
    isPausedRef.current = false;
    isDraggingRef.current = false;
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.clientX;
    scrollStartRef.current = scrollRef.current?.scrollLeft ?? 0;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 5) hasDraggedRef.current = true;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollStartRef.current - dx;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    setTimeout(() => { hasDraggedRef.current = false; }, 50);
  }, []);

  const handleTouchStart = useCallback(() => { isPausedRef.current = true; }, []);
  const handleTouchEnd = useCallback(() => {
    setTimeout(() => { isPausedRef.current = false; }, 2000);
  }, []);

  // Block right-click on videos
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest(".video-protected")) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeVideo]);


  return (
    <>
      <section className="section-padding overflow-hidden" id="video-portfolio">
        <div className="max-w-6xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-xs font-display font-bold uppercase tracking-widest text-pink mb-6">
              <span aria-hidden="true">🎬</span> AI Video Production
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

        {/* Scrollable reels — auto-scroll + manual touch/drag */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {[...reels, ...reels].map((reel, i) => (
            <div
              key={`${reel.id}-${i}`}
              className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] group cursor-pointer select-none"
            >
              <div className="video-protected aspect-[9/16] rounded-2xl border border-bd overflow-hidden relative bg-black">
                <LazyVideoThumb src={reel.src} onClick={() => openVideo(reel.src)} />

                {/* Download protection overlay */}
                <div className="absolute inset-0 z-[1] pointer-events-none" />

                {/* Play button overlay */}
                <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all">
                    <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                  </div>
                </div>

                {/* Category label */}
                <div className="absolute bottom-3 left-3 z-[3] pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full text-white text-[10px] font-display font-bold uppercase tracking-wider bg-pink">{reel.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Videos + My Idea */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4"
        >
          <Link href="/videos" className="hero-cta-btn inline-flex !p-[2px]">
            <span className="hero-cta-inner-btn !py-3 !px-6 sm:!px-8 !text-sm sm:!text-base !font-display !font-bold">
              View All Videos <ArrowRight size={18} />
            </span>
          </Link>
          <Link
            href="/videos#idea"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full border border-bd bg-card text-wh text-sm sm:text-base font-display font-bold hover:border-pink/40 hover:text-pink transition-all"
          >
            💡 My Idea
          </Link>
        </motion.div>
      </section>

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
