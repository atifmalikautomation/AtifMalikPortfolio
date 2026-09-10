"use client";

import { motion } from "framer-motion";
import { Clock, MessageCircle, Shield } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function BookPageContent() {
  return (
    <div className="min-h-screen relative">
      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-wh md:text-5xl">
            Book your{" "}
            <span
              className="text-pink"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              free audit call.
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-gr md:text-lg">
            30 minutes, no obligation. You leave with a concrete plan — keep it even if you never hire me.
          </p>

          {/* Trust badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm text-dm">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-pink" /> 30 min
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4 text-pink" /> Replies in minutes
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-pink" /> No pitch unless you ask
            </span>
          </div>
        </motion.div>

        {/* Cal.com embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 overflow-hidden rounded-3xl border border-pink/20 bg-card shadow-[0_16px_48px_rgba(0,0,0,0.3)]"
        >
          <iframe
            src="https://cal.com/atifmalik/30min?embed=true&theme=dark"
            title="Book a call with Atif Malik"
            className="h-[680px] w-full border-0"
          />
        </motion.div>

        {/* WhatsApp fallback */}
        <p className="mt-5 text-center text-sm text-dm">
          Prefer async?{" "}
          <a
            href={`${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi Atif, I'd like a free audit")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-pink underline"
          >
            💬 WhatsApp me instead
          </a>{" "}
          — I usually reply within minutes.
        </p>
      </main>
    </div>
  );
}
