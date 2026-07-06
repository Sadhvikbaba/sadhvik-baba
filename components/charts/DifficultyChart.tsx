"use client";

import React from "react";
import { motion } from "framer-motion";
import { motionConfig } from "@/components/sections/leetcode/motionConfig";

interface DifficultyChartProps {
  easy: number;
  medium: number;
  hard: number;
  total: number;
}

export default function DifficultyChart({ easy, medium, hard, total }: DifficultyChartProps) {
  const r = 50;
  const circumference = 2 * Math.PI * r; // ~314.16

  const segments = [
    { label: "Easy", count: easy, color: "#2db55d", pct: total > 0 ? easy / total : 0 },
    { label: "Medium", count: medium, color: "#ffb700", pct: total > 0 ? medium / total : 0 },
    { label: "Hard", count: hard, color: "#ef4743", pct: total > 0 ? hard / total : 0 }
  ];

  // Compute starting rotation angles
  let currentRotation = -90; // Start at top center
  const renderedSegments = segments.map((seg) => {
    const rotation = currentRotation;
    currentRotation += seg.pct * 360;
    return {
      ...seg,
      rotation
    };
  });

  return (
    <motion.div
      role="img"
      aria-label={`Difficulty chart showing: Easy ${easy}, Medium ${medium}, Hard ${hard}`}
      variants={motionConfig.fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="w-full p-5 md:p-6 rounded-[24px] border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] shadow-sm hover:shadow-md transition-shadow duration-300 select-none flex flex-col items-start"
    >
      <span className="text-xs font-bold mb-5 uppercase tracking-wider text-slate-400 font-sans">
        Difficulty Breakdown
      </span>

      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-8 mt-2">
        {/* SVG Circular Donut Chart */}
        <div className="relative w-36 h-36 flex-shrink-0">
          <svg className="w-full h-full transform -scale-x-100" viewBox="0 0 120 120">
            {/* Background Track Circle */}
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="transparent"
              stroke="var(--glass-card-border)"
              strokeWidth="10"
              className="opacity-40"
            />
            {/* Rendered Segment Arcs */}
            {renderedSegments.map((seg, index) => (
              <motion.circle
                key={index}
                cx="60"
                cy="60"
                r={r}
                fill="transparent"
                stroke={seg.color}
                strokeWidth="10"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: circumference * (1 - seg.pct) }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                transform={`rotate(${seg.rotation} 60 60)`}
              />
            ))}
          </svg>
          
          {/* Inner details overlays */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-[var(--color-hero-heading)] tracking-tight">
              {new Intl.NumberFormat().format(total)}
            </span>
            <span className="text-[10px] text-slate-500 font-mono font-medium tracking-wide uppercase">
              Solved
            </span>
          </div>
        </div>

        {/* Legend Panel */}
        <div className="flex flex-col gap-3.5 w-full flex-1">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {/* Dot */}
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                <span className="text-xs font-semibold text-slate-300 font-sans">
                  {seg.label}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {new Intl.NumberFormat().format(seg.count)}{" "}
                <span className="text-[10px] text-slate-500">
                  ({(seg.pct * 100).toFixed(0)}%)
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
