"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { clsx } from "clsx";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? "hidden" : "";
  };

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-[100] py-4 transition-all duration-[350ms]",
          scrolled && "nav-scrolled backdrop-blur-[20px] border-b border-bd"
        )}
      >
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-4 sm:px-8">
          {/* Logo */}
          <Link href="/" className="font-display text-[17px] font-extrabold tracking-[0.04em] text-gradient">
            ATIF MALIK
          </Link>

          {/* Desktop links — centered */}
          <ul className="hidden lg:flex items-center gap-7 list-none absolute left-1/2 -translate-x-1/2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    "text-sm font-medium transition-colors duration-200 hover:text-wh",
                    pathname === item.href ? "text-wh" : "text-gr"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/book"
              className="nav-book-btn px-5 py-2 rounded-full text-sm font-semibold transition-all inline-flex items-center gap-1.5"
            >
              Book Free Audit <span>&rarr;</span>
            </Link>
          </div>

          {/* Mobile: theme toggle + burger */}
          <div className="lg:hidden flex items-center gap-3 z-[101]">
            <ThemeToggle />
          <button
            className="flex flex-col gap-[5px] p-2"
            onClick={toggleMobile}
            aria-label="Toggle menu"
          >
            <span className={clsx("w-5 h-[1.5px] bg-wh transition-all duration-300", mobileOpen && "rotate-45 translate-y-[6.5px]")} />
            <span className={clsx("w-5 h-[1.5px] bg-wh transition-all duration-300", mobileOpen && "opacity-0")} />
            <span className={clsx("w-5 h-[1.5px] bg-wh transition-all duration-300", mobileOpen && "-rotate-45 -translate-y-[6.5px]")} />
          </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg z-[99] flex flex-col justify-center items-center gap-6"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-[26px] font-bold text-wh"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="nav-book-btn mt-4 px-8 py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-all"
            >
              Book Free Audit <span>&rarr;</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
