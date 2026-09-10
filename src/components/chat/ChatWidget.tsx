"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const quickButtons = [
  "What do you do?",
  "Pricing",
  "See your work",
  "Book a call",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-50">

      {/* ── Pill button (hidden when popup open) ── */}
      {!open && (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-card border border-bd shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-[rgba(224,0,138,0.3)] transition-all cursor-pointer animate-float-gentle"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-pink/30">
              <Image src="/images/atif-face.jpeg" alt="Atif Malik" width={44} height={44} className="w-full h-full object-cover object-top" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-card" />
          </div>
          <div className="text-left">
            <div className="text-[13px] font-semibold text-wh flex items-center gap-1">
              Chat with Atif
              <Sparkles size={12} className="text-pink" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-[2px]">
                <span className="w-[3px] h-[10px] rounded-full bg-[#22C55E] animate-[chatWave1_1s_ease-in-out_infinite]" />
                <span className="w-[3px] h-[14px] rounded-full bg-[#22C55E] animate-[chatWave2_1s_ease-in-out_infinite_0.15s]" />
                <span className="w-[3px] h-[8px] rounded-full bg-[#22C55E] animate-[chatWave3_1s_ease-in-out_infinite_0.3s]" />
              </div>
              <span className="text-[11px] text-[#22C55E] font-medium">Online now</span>
            </div>
          </div>
        </motion.button>
      )}

      {/* ── Popup (Yasir-exact style) ── */}
      {open && (
        <motion.div
          initial={{ y: 16, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="chat-popup-border w-[calc(100vw-40px)] sm:w-[326px]"
          style={{
            maxWidth: 326,
            borderRadius: 23,
            padding: 3,
            boxShadow: "0 16px 50px rgba(0,0,0,0.14)",
          }}
        >
          <div style={{ borderRadius: 20, overflow: "hidden", background: "linear-gradient(170deg, #fce8f1 0%, #f5d4e6 40%, #edd0e2 70%, #f0d8e8 100%)", width: "100%" }}>
          {/* Header */}
          <div style={{ padding: "20px 20px 8px 20px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", flexShrink: 0 }}>
                <Image src="/images/atif-face.jpeg" alt="Atif Malik" width={44} height={44} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#2a1520", lineHeight: 1.2, fontFamily: "var(--fd)" }}>
                  Atif Malik
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
                  <span style={{ fontSize: 11.5, color: "#22C55E", fontWeight: 500 }}>Replies instantly</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 20,
                color: "#bbb",
                lineHeight: 1,
                padding: "2px 4px",
                marginTop: -2,
              }}
            >
              &times;
            </button>
          </div>

          {/* Divider line */}
          <div style={{ margin: "0 20px", height: 1, background: "rgba(0,0,0,0.07)" }} />

          {/* Chat bubble */}
          <div style={{ padding: "14px 20px 16px" }}>
            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px 16px 16px 4px",
                padding: "14px 16px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                fontSize: 13.5,
                lineHeight: 1.65,
                color: "#333",
              }}
            >
              Hey &#x1F44B; I&apos;m Atif&apos;s site — let&apos;s skip the boring scroll. Ask me anything.
            </div>
          </div>

          {/* Divider line */}
          <div style={{ margin: "0 20px", height: 1, background: "rgba(0,0,0,0.07)" }} />

          {/* Quick Start */}
          <div style={{ padding: "12px 20px 16px" }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#baa8b5", marginBottom: 10 }}>
              Quick Start
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {quickButtons.map((btn) => (
                <Link
                  key={btn}
                  href="/chat"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "9px 14px",
                    borderRadius: 9999,
                    background: "#ffffff",
                    border: "2px solid #e0c8d8",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: "#4a3545",
                    textDecoration: "none",
                    textAlign: "center",
                    transition: "border-color 0.2s",
                  }}
                >
                  {btn}
                </Link>
              ))}
            </div>
          </div>

          {/* Divider line */}
          <div style={{ margin: "0 20px", height: 1, background: "rgba(0,0,0,0.07)" }} />

          {/* CTA Button */}
          <div style={{ padding: "14px 20px 20px" }}>
            <Link
              href="/chat"
              className="hero-cta-btn"
              style={{ width: "100%", display: "block" }}
            >
              <span
                className="hero-cta-inner-btn"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "13px 24px",
                  fontSize: 14,
                  borderRadius: 9999,
                }}
              >
                Open the full chat &rarr;
              </span>
            </Link>
            <p style={{ textAlign: "center", fontSize: 10.5, color: "#c0a8b8", marginTop: 10, fontWeight: 500 }}>
              Opens Atif&apos;s Studio — instant, no forms.
            </p>
          </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
