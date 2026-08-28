"use client";

import { siteConfig } from "@/lib/site-config";
import { motion } from "framer-motion";

const socials = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  )},
  { label: "Instagram", href: siteConfig.social.instagram, icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  )},
  { label: "Fiverr", href: siteConfig.social.fiverr, icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092V16h-1.722v-3.727h-.85c-.546 0-.84.41-.84 1.092V16h-1.72V11.39h1.72v.577c.28-.42.7-.657 1.266-.657h.96c.565 0 .984.237 1.264.658v-.578h1.612v4.612zM11.112 12.8a.995.995 0 1 0-.002-1.99.995.995 0 0 0 .002 1.99zm-.862-3.41V16H8.528V9.39h1.722zM7.442 9.39h1.722v6.612H7.442V9.39zM3.348 9.39H0v1.47h1.592V16h1.756v-5.14h1.592V9.39H3.348zm8.5 0H9.39v6.612h1.458c1.12 0 1.878-.84 1.878-1.992V11.39c0-1.152-.758-2-1.878-2z"/></svg>
  )},
  { label: "Facebook", href: siteConfig.social.facebook, icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  )},
  { label: "YouTube", href: siteConfig.social.youtube, icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><path fill="var(--bg-primary)" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  )},
];

export function SocialSidebar() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {socials.map((s, i) => (
        <motion.a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-[0_4px_16px_rgba(224,0,138,0.25)] hover:shadow-[0_8px_30px_rgba(224,0,138,0.4)]"
          style={{
            background: "linear-gradient(135deg, var(--pink) 0%, #FF4DA6 100%)",
            border: "1.5px solid rgba(255, 77, 166, 0.45)",
          }}
          aria-label={s.label}
        >
          {s.icon}
        </motion.a>
      ))}
    </div>
  );
}
