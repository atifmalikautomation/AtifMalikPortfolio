"use client";

import { motion } from "framer-motion";

const allTestimonials = [
  {
    initials: "DR", name: "Dean R.", role: "Author & Creative Director", platform: "Fiverr",
    text: "Atif delivered a complete AI graphic novel with incredible detail. His understanding of cinematic composition and character consistency was next level.",
  },
  {
    initials: "RC", name: "Robert C.", role: "Business Owner", platform: "Fiverr",
    text: "The AI commercial Atif produced looked like it came from a real production studio. Fast delivery and the result exceeded expectations.",
  },
  {
    initials: "SA", name: "Sarah A.", role: "E-commerce Founder", platform: "Upwork",
    text: "Atif automated our entire order processing workflow with n8n. What used to take 4 hours daily now runs on autopilot.",
  },
  {
    initials: "MK", name: "Michael K.", role: "Agency Owner", platform: "LinkedIn",
    text: "Atif is not just a developer, he's a strategic partner. His systems thinking is on another level.",
  },
  {
    initials: "JT", name: "James T.", role: "SaaS Founder", platform: "LinkedIn",
    text: "Atif built our AI chatbot and lead qualification system. It handles 80% of our inbound inquiries automatically.",
  },
  {
    initials: "LW", name: "Lisa W.", role: "Digital Consultant", platform: "Fiverr",
    text: "The AI chatbot he built handles our customer support 24/7. Saved us $3K/month in staff costs immediately.",
  },
  {
    initials: "AK", name: "Ahmed K.", role: "Moving Company Owner", platform: "Upwork",
    text: "Atif automated our entire lead follow-up. We went from missing 60% of inquiries to booking every single one automatically.",
  },
  {
    initials: "NK", name: "Nadia K.", role: "Med Spa Owner", platform: "Upwork",
    text: "Best investment we made. Atif built our entire CRM + funnel in days. We're now generating leads while we sleep.",
  },
  {
    initials: "DO", name: "David O.", role: "Transport Company", platform: "Fiverr",
    text: "The n8n automation he built saves our team 40+ hours every week. Absolutely game-changing.",
  },
];

// Split into 3 columns
const col1 = allTestimonials.filter((_, i) => i % 3 === 0);
const col2 = allTestimonials.filter((_, i) => i % 3 === 1);
const col3 = allTestimonials.filter((_, i) => i % 3 === 2);

function TestimonialCard({ t }: { t: typeof allTestimonials[0] }) {
  return (
    <div className="bg-card border border-bd rounded-2xl p-5 md:p-6 mb-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, var(--pink), #FF4DA6)" }}
        >
          <span className="text-xs font-bold font-mono" style={{ color: "#FFFFFF" }}>{t.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-display font-bold text-wh">{t.name}</div>
          <div className="text-xs text-gr">{t.role}</div>
        </div>
        <span className="px-3 py-1 rounded-full bg-card border border-bd text-xs font-display font-bold text-gr flex-shrink-0">
          {t.platform}
        </span>
      </div>

      {/* Quote */}
      <p className="text-sm text-gr leading-relaxed mb-4">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Stars */}
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-sm" style={{ color: "#F59E0B" }}>&#x2B50;</span>
        ))}
      </div>
    </div>
  );
}

function ScrollColumn({ items, direction }: { items: typeof allTestimonials; direction: "up" | "down" }) {
  const doubled = [...items, ...items, ...items];

  return (
    <div className="h-[500px] overflow-hidden relative">
      {/* Fade top/bottom */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />

      <div className={`flex flex-col ${direction === "up" ? "animate-scroll-up" : "animate-scroll-down"}`}>
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.initials}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="section-padding" id="testimonials">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-xs font-display font-bold uppercase tracking-widest text-pink mb-6">
            Receipts
          </span>

          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh mb-3 leading-tight">
            Trusted by{" "}
            <span
              className="text-pink"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              300+ businesses
            </span>{" "}
            across logistics, SaaS &amp; coaching.
          </h2>

          <p className="text-gr text-base md:text-lg max-w-2xl mx-auto">
            Real names, real businesses, real numbers, no stock photos.
          </p>
        </motion.div>

        {/* 3-column vertical scrolling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ScrollColumn items={col1} direction="up" />
          <ScrollColumn items={col2} direction="down" />
          <ScrollColumn items={col3} direction="up" />
        </div>
      </div>
    </section>
  );
}
