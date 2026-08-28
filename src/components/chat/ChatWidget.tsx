"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function ChatWidget() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-5 left-5 z-50 animate-float-gentle"
    >
      <Link
        href="/chat"
        className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-card border border-bd shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-[rgba(224,0,138,0.3)] transition-all group"
      >
        {/* Avatar with photo + sparkle on top-right */}
        <div className="relative">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-pink/30">
            <Image
              src="/images/atif.jpeg"
              alt="Atif Malik"
              width={44}
              height={44}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-card" />
        </div>

        {/* Text */}
        <div className="text-left">
          <div className="text-[13px] font-semibold text-wh flex items-center gap-1">
            Chat with Atif
            <Sparkles size={12} className="text-pink" />
          </div>
          <div className="flex items-center gap-1.5">
            {/* Sound wave bars */}
            <div className="flex items-center gap-[2px]">
              <span className="w-[3px] h-[10px] rounded-full bg-[#22C55E] animate-[chatWave1_1s_ease-in-out_infinite]" />
              <span className="w-[3px] h-[14px] rounded-full bg-[#22C55E] animate-[chatWave2_1s_ease-in-out_infinite_0.15s]" />
              <span className="w-[3px] h-[8px] rounded-full bg-[#22C55E] animate-[chatWave3_1s_ease-in-out_infinite_0.3s]" />
            </div>
            <span className="text-[11px] text-[#22C55E] font-medium">Online now</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
