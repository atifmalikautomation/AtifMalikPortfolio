"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { motion, AnimatePresence } from "framer-motion";

const quickReplies = [
  "I need AI automation",
  "I want a free audit",
  "Tell me about pricing",
  "I need a web app built",
];

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] rounded-2xl bg-card border border-bd shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#075E54] px-4 py-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                  <Image
                    src="/images/atif.jpeg"
                    alt="Atif Malik"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-[#075E54]" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">Atif Malik</div>
                <div className="text-[#A8D5A2] text-xs">Online &middot; usually replies within 1 hour</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white text-xl leading-none p-1"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {/* Chat body */}
            <div className="p-4 bg-[#0D1418] min-h-[120px]">
              {/* Message bubble */}
              <div className="bg-[#1A2A33] rounded-xl rounded-tl-none px-4 py-3 max-w-[85%] shadow-sm">
                <p className="text-sm text-white leading-relaxed">
                  Hey there! &#x1F44B;
                </p>
                <p className="text-sm text-white/90 mt-1 leading-relaxed">
                  I&apos;m Atif, AI Automation Engineer. How can I help you today?
                </p>
                <div className="text-[10px] text-white/40 mt-1 text-right">Just now</div>
              </div>
            </div>

            {/* Quick replies */}
            <div className="p-3 border-t border-bd bg-card flex flex-wrap gap-2">
              {quickReplies.map((text) => (
                <a
                  key={text}
                  href={`${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs rounded-full border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
                >
                  {text}
                </a>
              ))}
            </div>

            {/* Input bar */}
            <div className="px-3 pb-3 bg-card">
              <a
                href={`${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi Atif! I came from your website.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-medium hover:brightness-110 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Start Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-shadow flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )}
      </motion.button>
    </>
  );
}
