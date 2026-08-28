"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface Props {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={clsx(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-dm mb-4">
          {label}
        </div>
      )}
      <h2 className="font-display text-[clamp(28px,4vw,48px)] font-extrabold text-wh leading-[1.1] tracking-[-0.02em]">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base text-gr leading-[1.7] max-w-[520px] ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
