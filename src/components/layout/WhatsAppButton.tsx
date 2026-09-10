"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
            className="fixed bottom-24 right-6 z-50 w-[340px] rounded-2xl overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,0.5)]"
            style={{ border: "1px solid rgba(37,211,102,0.15)" }}
          >
            {/* Header — WhatsApp green */}
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, #075E54 0%, #128C7E 100%)" }}
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-full overflow-hidden" style={{ border: "2px solid rgba(255,255,255,0.3)" }}>
                  <Image
                    src="/images/atif-face.jpeg"
                    alt="Atif Malik"
                    width={44}
                    height={44}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22C55E]" style={{ border: "2px solid #075E54" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-display font-bold text-[15px]">Atif Malik</div>
                <div className="text-[12px] flex items-center gap-1.5" style={{ color: "#A8D5A2" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  Online &middot; replies instantly
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                style={{ color: "rgba(255,255,255,0.6)" }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat body — WhatsApp style wallpaper */}
            <div
              className="px-4 py-5"
              style={{
                background: "var(--bg2)",
                backgroundImage: "radial-gradient(circle at 20% 50%, var(--pink06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(37,211,102,0.04) 0%, transparent 50%)",
              }}
            >
              {/* Message bubble */}
              <div
                className="rounded-2xl rounded-tl-md px-4 py-3 max-w-[88%] relative"
                style={{ background: "var(--card)", border: "1px solid var(--bd)" }}
              >
                <p className="text-[14px] text-wh leading-relaxed">
                  Hey there! &#x1F44B;
                </p>
                <p className="text-[13px] text-gr mt-1 leading-relaxed">
                  I&apos;m Atif — AI Automation Engineer. Drop a message or tap a quick reply below!
                </p>
                <div className="text-[10px] text-dm mt-1.5 text-right">Just now</div>
              </div>
            </div>

            {/* Quick replies */}
            <div className="px-4 py-3" style={{ background: "var(--bg)", borderTop: "1px solid var(--bd)" }}>
              <div className="text-[10px] font-display font-bold tracking-[0.12em] uppercase text-dm mb-2.5">
                Quick Reply
              </div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((text) => (
                  <a
                    key={text}
                    href={`${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-[12px] font-medium rounded-full transition-all hover:brightness-110"
                    style={{ border: "1px solid rgba(37,211,102,0.3)", color: "#25D366", background: "rgba(37,211,102,0.06)" }}
                  >
                    {text}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA button */}
            <div className="px-4 pb-4 pt-2" style={{ background: "var(--bg)" }}>
              <a
                href={`${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi Atif! I came from your website.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full px-4 py-3 rounded-xl text-white text-[14px] font-display font-bold transition-all hover:brightness-110 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)", boxShadow: "0 4px 16px rgba(37,211,102,0.3)" }}
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
        transition={{ delay: 0.5, type: "spring" }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white flex items-center justify-center cursor-pointer transition-all hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          boxShadow: open ? "0 0 0 rgba(37,211,102,0)" : "0 4px 20px rgba(37,211,102,0.4)",
        }}
        aria-label="Chat on WhatsApp"
      >
        {open ? (
          <X size={24} />
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )}
      </motion.button>
    </>
  );
}
