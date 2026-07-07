"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  external = false,
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 py-3 px-6 md:py-3.5 md:px-7 rounded-full text-xs md:text-sm font-semibold tracking-wide border transition-all duration-300 pointer-events-auto select-none cursor-pointer";
  
  const variantClasses = {
    primary: "border-[var(--color-hero-button-border)] bg-[var(--color-hero-button-bg)] text-[var(--color-hero-button-text)] hover:bg-[var(--color-hero-button-hover)]",
    secondary: "bg-[var(--color-glass-bg)] border-[var(--color-glass-border)] text-[var(--color-hero-subtitle)] hover:border-[var(--color-hero-accent)] hover:text-[var(--color-hero-accent)] hover:bg-[color-mix(in_srgb,var(--color-hero-accent)_8%,transparent)]"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const style = variant === "primary" ? { boxShadow: "0 4px 14px 0 var(--hero-button-shadow)" } : undefined;

  const MotionLink = motion.create(Link);

  if (href) {
    if (external || href.startsWith("mailto:") || href.startsWith("http")) {
      return (
        <motion.a 
          href={href} 
          target={external ? "_blank" : undefined} 
          rel={external ? "noopener noreferrer" : undefined} 
          className={combinedClasses} 
          onClick={props.onClick as any}
          style={style}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <MotionLink 
        href={href} 
        className={combinedClasses} 
        onClick={props.onClick as any}
        style={style}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={combinedClasses}
      style={style}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
