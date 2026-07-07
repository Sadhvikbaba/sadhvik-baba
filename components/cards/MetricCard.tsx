"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { motionConfig } from "@/components/sections/leetcode/motionConfig";

interface MetricCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  subtitle?: string;
  tooltipText?: string;
  iconBgColor?: string;
  iconColor?: string;
}

function AnimatedCounter({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, value, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [value, duration]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = new Intl.NumberFormat().format(latest);
      }
    });
  }, [rounded]);

  return <span ref={ref}>0</span>;
}

export default function MetricCard({
  icon,
  value,
  label,
  subtitle,
  tooltipText,
  iconBgColor = "bg-[var(--color-glass-border)]",
  iconColor = "text-[var(--color-hero-subtitle)]"
}: MetricCardProps) {
  return (
    <motion.div
      role="article"
      aria-label={`${label} metric: ${value}`}
      variants={motionConfig.fadeUp}
      whileHover="hover"
      className="relative w-full p-5 md:p-6 rounded-[24px] border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] shadow-sm hover:shadow-md transition-shadow duration-300 select-none group cursor-help overflow-visible"
    >
      {/* Tooltip trigger wrapper */}
      {tooltipText && (
        <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none bottom-[105%] left-1/2 -translate-x-1/2 w-48 p-2 text-[10px] font-medium leading-normal bg-[var(--site-bg)] text-[var(--color-hero-heading)] border border-[var(--color-glass-border)] rounded-lg shadow-xl backdrop-blur-md transition-opacity duration-300 z-50 text-center">
          {tooltipText}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--site-bg)]" />
        </div>
      )}

      {/* Icon Circle */}
      <motion.div
        variants={{
          hover: { rotate: 5, scale: 1.05, transition: { duration: 0.2 } }
        }}
        className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${iconBgColor} ${iconColor}`}
      >
        {icon}
      </motion.div>

      {/* Big Stat Count */}
      <span className="text-3xl md:text-4xl font-extrabold mb-1 tracking-tight font-sans text-[var(--color-hero-heading)] transition-colors duration-500 block">
        <AnimatedCounter value={value} />
      </span>

      {/* Title */}
      <span className="text-[11px] md:text-xs font-bold mb-1 uppercase tracking-wider text-[var(--color-hero-subtitle)] block">
        {label}
      </span>

      {/* Detail Label / Subtitle */}
      {subtitle && (
        <span className="text-[10px] md:text-[11px] text-[var(--color-hero-description)] font-mono block">
          {subtitle}
        </span>
      )}
    </motion.div>
  );
}
