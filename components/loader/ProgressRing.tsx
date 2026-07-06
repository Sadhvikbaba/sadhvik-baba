"use client";

import React from "react";
import { motion } from "framer-motion";
import { progressRingVariants } from "./loaderMotion";

interface ProgressRingProps {
  progress: number; // 0 to 1
  size: number;     // px diameter
  strokeWidth?: number;
}

export default function ProgressRing({
  progress,
  size,
  strokeWidth = 1.5,
}: ProgressRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  const center = size / 2;

  return (
    <motion.div
      variants={progressRingVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-hidden="true"
      style={{ width: size, height: size, flexShrink: 0 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--glass-card-border)"
          strokeWidth={strokeWidth}
          strokeOpacity={0.6}
        />
        {/* Progress arc */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--hero-accent)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
          style={{
            filter: "drop-shadow(0 0 3px var(--hero-accent))",
          }}
        />
        {/* Dot at the leading edge */}
        <motion.circle
          cx={center}
          cy={strokeWidth}
          r={strokeWidth * 1.5}
          fill="var(--hero-accent)"
          style={{
            transformOrigin: `${center}px ${center}px`,
            filter: "drop-shadow(0 0 4px var(--hero-accent))",
          }}
          animate={{ rotate: 360 * progress }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
    </motion.div>
  );
}
