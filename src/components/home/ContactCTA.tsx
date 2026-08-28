"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="section-padding px-4" id="contact-cta">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-[2rem] overflow-hidden p-8 md:p-14 lg:p-16"
          style={{ background: "linear-gradient(135deg, #E0008A 0%, #C20076 50%, #A00062 100%)" }}
        >
          {/* Decorative blurs */}
          <div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center">
            {/* Heading */}
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl mb-5 leading-[1.05] tracking-tight" style={{ color: "#FFFFFF" }}>
              Your Business Deserves<br />
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "#FFD6A0",
                }}
              >
                To Run Without You.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
              Stop being the bottleneck. Book a free 30-minute audit and discover exactly what to build, fix, or automate to scale, starting this week.
            </p>

            {/* Two cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
              {/* Book a Call */}
              <div className="relative bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 text-center border border-bd">
                <div className="w-14 h-14 rounded-full bg-pink/10 flex items-center justify-center mx-auto mb-5">
                  <Phone className="w-6 h-6 text-pink" />
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-wh mb-2">
                  Book a Free 30-Min Call
                </h3>
                <p className="text-sm text-gr mb-6 leading-relaxed">
                  Get a personalised audit of your business. Zero obligation, 100% value.
                </p>
                <Link
                  href="/book"
                  className="hero-cta-btn inline-block w-full"
                >
                  <span className="hero-cta-inner-btn justify-center w-full">
                    Book My Free Audit <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </div>

              {/* Direct Message */}
              <div className="relative bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 text-center border border-bd">
                <div className="w-14 h-14 rounded-full bg-pink/10 flex items-center justify-center mx-auto mb-5">
                  <MessageCircle className="w-6 h-6 text-pink" />
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-wh mb-2">
                  Send a Direct Message
                </h3>
                <p className="text-sm text-gr mb-6 leading-relaxed">
                  DM &quot;SYSTEM&quot; on LinkedIn or WhatsApp and I&apos;ll reply within 24 hours.
                </p>
                <div className="flex gap-2 sm:gap-3 w-full">
                  <a
                    href="https://linkedin.com/in/atif-malik-/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-pink/10 border border-pink/30 text-pink font-display font-bold text-sm rounded-full px-4 py-3 hover:bg-pink hover:border-pink transition-all" style={{ color: undefined }}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://wa.me/923196780720"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-pink/10 border border-pink/30 text-pink font-display font-bold text-sm rounded-full px-4 py-3 hover:bg-pink hover:border-pink transition-all"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
