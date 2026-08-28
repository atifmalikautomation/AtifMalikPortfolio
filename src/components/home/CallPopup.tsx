"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff } from "lucide-react";

export function CallPopup() {
  const [show, setShow] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("am_call")) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem("am_call", "1");
      setShow(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show || accepted) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setShow(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [show, accepted]);

  const decline = useCallback(() => setShow(false), []);

  const accept = useCallback(() => {
    setAccepted(true);
    setTimeout(() => {
      window.open("https://wa.me/923196780720?text=Hi%20Atif!%20I%20came%20from%20your%20website.", "_blank");
      setTimeout(() => setShow(false), 2000);
    }, 1500);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "140%" }}
          animate={{ y: 0 }}
          exit={{ y: "140%" }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="fixed bottom-6 left-6 w-[320px] max-w-[calc(100vw-3rem)] z-[9999]"
        >
          {/* Card — white in light, dark in dark */}
          <div className="rounded-[28px] bg-card border border-bd shadow-[0_24px_60px_-12px_rgba(224,0,138,0.15),0_0_0_1px_var(--bd)] overflow-hidden pb-2">
            {/* Island pill */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-[110px] h-[28px] bg-wh rounded-[18px]" />
            </div>

            {/* Carrier text */}
            <div className="text-center text-[11px] text-gr tracking-[0.5px] py-1.5">
              <span className="text-pink">&#x1F4F1;</span> AI Automation &middot; atifmalik.me
            </div>

            {/* Avatar with pulse rings */}
            <div className="relative flex items-center justify-center h-[140px]">
              {!accepted && (
                <>
                  <span className="absolute w-[90px] h-[90px] border-2 border-pink/30 rounded-full animate-ping" style={{ animationDuration: "2s" }} />
                  <span className="absolute w-[115px] h-[115px] border-2 border-pink/20 rounded-full animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
                  <span className="absolute w-[140px] h-[140px] border-2 border-pink/10 rounded-full animate-ping" style={{ animationDuration: "2s", animationDelay: "1s" }} />
                </>
              )}
              <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-pink to-[#651545] flex items-center justify-center relative z-10 shadow-[0_6px_20px_-4px_rgba(224,0,138,0.4)]">
                <span className="font-display text-[24px] font-extrabold" style={{ color: "#FFFFFF" }}>AM</span>
              </div>
            </div>

            {/* Name & title */}
            <div className="text-center px-6">
              <h3 className="font-display text-[28px] font-bold text-wh tracking-tight">Atif Malik</h3>
              <p className="text-sm text-gr mt-0.5">AI Automation Specialist</p>
            </div>

            {/* Status */}
            <div className="flex items-center justify-center gap-2 mt-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[13px] text-gr">
                {accepted ? "connected..." : "incoming whatsapp call..."}
              </span>
            </div>

            {/* Countdown / Progress */}
            <div className="px-6 mb-4">
              <div className="h-px bg-bd mb-3" />
              <p className="text-center text-xs text-gr">
                {accepted ? "Connecting on WhatsApp..." : `Atif stops calling in ${countdown}s`}
              </p>
            </div>

            {/* Buttons */}
            {!accepted ? (
              <div className="flex justify-center gap-6 pb-4">
                <div className="flex flex-col items-center gap-1.5">
                  <button
                    onClick={decline}
                    className="w-14 h-14 rounded-full bg-[#FF3B30] flex items-center justify-center hover:brightness-110 transition-all shadow-lg"
                  >
                    <PhoneOff size={22} style={{ color: "#FFFFFF" }} />
                  </button>
                  <span className="text-xs text-gr">Decline</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <button
                    onClick={accept}
                    className="w-14 h-14 rounded-full bg-[#22C55E] flex items-center justify-center hover:brightness-110 transition-all shadow-lg"
                  >
                    <Phone size={22} style={{ color: "#FFFFFF" }} />
                  </button>
                  <span className="text-xs text-gr">Accept</span>
                </div>
              </div>
            ) : (
              <div className="text-center pb-4">
                <p className="text-sm font-semibold" style={{ color: "#22C55E" }}>Redirecting you now...</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
