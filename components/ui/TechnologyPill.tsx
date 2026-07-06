"use client";

import React from "react";
import { motion } from "framer-motion";
import { motionConfig } from "../motion/motionConfig";

interface TechnologyPillProps {
  name: string;
  isHighlighted: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function TechnologyPill({
  name,
  isHighlighted,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: TechnologyPillProps) {
  return (
    <motion.div
      variants={motionConfig.pillHover}
      whileHover="hover"
      whileTap="tap"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-300 select-none border
        ${
          isHighlighted
            ? "bg-[color-mix(in_srgb,var(--color-hero-accent)_20%,transparent)] border-[var(--color-hero-accent)] text-[var(--color-hero-accent)] shadow-[0_0_12px_rgba(var(--color-hero-accent),0.25)] scale-[1.03] -translate-y-0.5"
            : isDimmed
            ? "bg-slate-800/10 dark:bg-slate-900/20 border-slate-700/10 dark:border-slate-800/20 text-slate-500/60 dark:text-slate-500/40 opacity-50 scale-[0.98]"
            : "bg-slate-100/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-[var(--color-hero-accent)] hover:text-[var(--color-hero-accent)] hover:bg-[color-mix(in_srgb,var(--color-hero-accent)_8%,transparent)]"
        }
      `}
      style={{
        boxShadow: isHighlighted ? "0 0 14px var(--color-hero-accent)" : undefined,
      }}
    >
      {name}
    </motion.div>
  );
}
