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
            ? "bg-slate-800/10 dark:bg-slate-900/20 border-slate-700/10 dark:border-slate-800/20 text-slate-500/40 opacity-40 scale-[0.98]"
            : "bg-[#FAF7F2] dark:bg-slate-900/60 border-[#E6E1D3] dark:border-slate-800/60 text-[#B57552] dark:text-[#71B7FF] hover:bg-[#E6E1D3]/30 dark:hover:bg-slate-800/40 hover:border-[#B57552] dark:hover:border-[#71B7FF]"
        }
      `}
    >
      <span>{name}</span>
    </motion.span>
  );
}
