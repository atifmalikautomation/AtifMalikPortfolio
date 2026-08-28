"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const benefits = [
  { emoji: "\uD83C\uDFAF", text: "Personalised automation roadmap for your business" },
  { emoji: "\uD83D\uDD0D", text: "Identify your biggest time & revenue leaks" },
  { emoji: "\uD83E\uDD16", text: "See exactly which AI systems fit your needs" },
  { emoji: "\uD83D\uDCB0", text: "Get a transparent quote \u2014 no hidden fees" },
  { emoji: "\u26A1", text: "Walk away with actionable next steps, even if we don\u2019t work together" },
];

const trustItems = [
  { value: "800+", label: "Projects Delivered" },
  { value: "5+", label: "Years Experience" },
  { value: "5\u2605", label: "Rated on Fiverr & Upwork" },
  { value: "30min", label: "Free, No Obligation" },
];

const testimonials = [
  {
    quote: "Atif built an AI automation system that saves our team 20+ hours per week. The ROI was visible within the first month.",
    name: "Dean Russell",
    role: "Author & Publisher",
    source: "Fiverr",
  },
  {
    quote: "The AI video production quality exceeded our expectations. Professional, fast, and incredibly affordable.",
    name: "Robert Chery",
    role: "Business Owner",
    source: "LinkedIn",
  },
  {
    quote: "Our WhatsApp chatbot handles 80% of customer inquiries automatically. Response time went from hours to seconds.",
    name: "Sarah Ahmed",
    role: "E-commerce Founder",
    source: "Upwork",
  },
];

export function BookPageContent() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-narrow mx-auto px-4 sm:px-8">
        {/* Hero area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-[11px] tracking-[0.15em] uppercase text-pink mb-4">
              Free Strategy Call
            </div>
            <h1 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold text-wh leading-[1.05] tracking-[-0.02em] mb-6">
              Let&apos;s Build Your{" "}
              <span
                className="text-pink inline-block -rotate-[2deg]"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "0.85em",
                }}
              >
                AI Growth System
              </span>
            </h1>
            <p className="text-lg text-gr leading-relaxed mb-8">
              Book a free 30-minute strategy call. I&apos;ll audit your current systems,
              identify automation opportunities, and give you a clear action plan &mdash;
              whether we work together or not.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              <h3 className="text-sm font-semibold text-wh uppercase tracking-wider">What you&apos;ll get:</h3>
              {benefits.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg mt-0.5">{item.emoji}</span>
                  <span className="text-sm text-gr leading-relaxed">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {trustItems.map((item) => (
                <div
                  key={item.label}
                  className="text-center p-3 rounded-xl bg-card border border-bd"
                >
                  <div className="font-display text-xl font-extrabold text-pink">{item.value}</div>
                  <div className="font-mono text-[9px] text-gr tracking-wider uppercase mt-1">{item.label}</div>
                </div>
              ))}
            </div>

            {/* About Atif */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-bd">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-pink/30 flex-shrink-0">
                <Image
                  src="/images/atif.jpeg"
                  alt="Atif Malik"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-display font-bold text-wh text-sm">Atif Malik</div>
                <div className="text-xs text-gr">AI Automation Engineer &middot; 5+ Years &middot; 800+ Projects</div>
              </div>
            </div>
          </motion.div>

          {/* Right — Cal.com embed */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-bd bg-card p-2 shadow-[0_16px_48px_rgba(0,0,0,0.3)]"
          >
            <div className="rounded-xl overflow-hidden bg-[#0A0008] min-h-[500px] flex flex-col items-center justify-center text-center p-8 gap-6">
              <div className="w-20 h-20 rounded-full bg-pink/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Book Your Free Strategy Call</h3>
                <p className="text-sm text-gray-400 max-w-sm">Pick a time that works for you. 30-minute call, zero commitment.</p>
              </div>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                <a
                  href="https://cal.com/atifmalik/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pink w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-center transition-all hover:scale-[1.02]"
                >
                  Choose a Time Slot
                </a>
                <a
                  href={siteConfig.contact.whatsapp + "?text=" + encodeURIComponent("Hi Atif! I'd like to book a strategy call.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl text-sm font-medium text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366]/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.593-.794-6.362-2.135l-.144-.108-3.69 1.237 1.237-3.69-.108-.144A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  Or Message on WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span>&#x2714; Free</span>
                <span>&#x2714; 30 min</span>
                <span>&#x2714; No obligation</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="font-display text-2xl font-extrabold text-wh text-center mb-10">
            What Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-bd bg-card p-6"
              >
                <div className="flex items-center gap-1 mb-3 text-pink text-sm">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j}>&#x2B50;</span>
                  ))}
                </div>
                <p className="text-sm text-gr leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-wh text-sm">{t.name}</div>
                  <div className="text-xs text-dm">{t.role} &middot; {t.source}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gr mb-2">
            &#x2714; No commitment &nbsp; &#x2714; 30 minutes &nbsp; &#x2714; 100% free
          </p>
          <a
            href={siteConfig.contact.whatsapp + "?text=" + encodeURIComponent("Hi Atif! I'd like to book a strategy call.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#25D366] hover:underline"
          >
            Prefer WhatsApp? Message me directly &rarr;
          </a>
        </motion.div>
      </div>
    </div>
  );
}
