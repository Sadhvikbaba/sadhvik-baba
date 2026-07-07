"use client";

import React from "react";
import { motion } from "framer-motion";
import { techPillVariants } from "./motion";

interface TechPillProps {
  name: string;
}

export default function TechPill({ name }: TechPillProps) {
  return (
    <motion.div
      variants={techPillVariants}
      whileHover={{
        y: -2,
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      className="px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-300 select-none border 
        bg-[var(--color-glass-bg)] 
        border-[var(--color-glass-border)] 
        text-[var(--color-hero-subtitle)] 
        hover:border-[var(--color-hero-accent)] 
        hover:text-[var(--color-hero-accent)] 
        hover:bg-[color-mix(in_srgb,var(--color-hero-accent)_8%,transparent)]
        hover:shadow-[0_0_12px_rgba(var(--color-hero-accent),0.25)]"
    >
      {name}
    </motion.div>
  );
}
