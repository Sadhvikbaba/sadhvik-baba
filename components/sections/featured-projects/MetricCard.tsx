"use client";

import React from "react";
import { motion } from "framer-motion";
import { metricCardVariants } from "./motion";

interface MetricCardProps {
  value: string;
  label: string;
}

export default function MetricCard({ value, label }: MetricCardProps) {
  return (
    <motion.div
      variants={metricCardVariants}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="flex flex-col gap-1 p-4 rounded-xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] min-w-0"
    >
      <div className="text-xl sm:text-2xl 2xl:text-3xl font-bold text-[var(--color-hero-heading)] font-sans tracking-tight flex items-baseline truncate">
        {value}
      </div>
      <div className="text-[8px] sm:text-[10px] 2xl:text-xs font-semibold text-[var(--color-hero-subtitle)] uppercase tracking-wider truncate">
        {label}
      </div>
    </motion.div>
  );
}
