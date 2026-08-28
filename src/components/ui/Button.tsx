"use client";

import Link from "next/link";
import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover font-semibold shadow-[0_0_20px_rgba(224,0,138,0.2)] hover:shadow-[0_0_30px_rgba(224,0,138,0.3)] hover:brightness-115 hover:-translate-y-0.5",
  secondary:
    "bg-bg-surface text-text-primary hover:bg-surface-hover border border-border hover:border-border-hover",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-bg-surface",
  outline:
    "border border-accent/40 text-accent hover:bg-accent-dim hover:border-accent",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const cls = clsx(
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap",
    variants[variant],
    sizes[size],
    disabled && "opacity-50 pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
