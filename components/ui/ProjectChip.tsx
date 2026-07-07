"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProjectChipProps {
  name: string;
  isHighlighted: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function ProjectChip({
  name,
  isHighlighted,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: ProjectChipProps) {
  return (
    <motion.span
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-[10px] sm:text-xs font-mono font-semibold transition-all duration-300 cursor-pointer border
        ${
          isHighlighted
            ? "bg-[color-mix(in_srgb,var(--color-hero-accent)_20%,transparent)] border-[var(--color-hero-accent)] text-[var(--color-hero-accent)] scale-[1.05] shadow-[0_0_10px_rgba(var(--color-hero-accent),0.2)]"
            : isDimmed
            ? "bg-[var(--color-glass-bg)] opacity-40 border-[var(--color-glass-border)] text-[var(--color-hero-subtitle)] scale-[0.98]"
            : "bg-[var(--color-glass-bg)] border-[var(--color-glass-border)] text-[var(--color-hero-accent)] hover:bg-[color-mix(in_srgb,var(--color-hero-accent)_8%,transparent)] hover:border-[var(--color-hero-accent)]"
        }
      `}
    >
      <span>{name}</span>
    </motion.span>
  );
}
