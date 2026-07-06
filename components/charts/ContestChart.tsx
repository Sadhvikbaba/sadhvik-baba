"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { motionConfig } from "@/components/sections/leetcode/motionConfig";

interface ContestHistoryItem {
  rating: number;
  date: string;
  title: string;
}

interface ContestChartProps {
  history: ContestHistoryItem[];
  currentRating: number | null;
  globalRanking: number | null;
}

export default function ContestChart({ history, currentRating, globalRanking }: ContestChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
    rating: number;
    date: string;
    title: string;
  } | null>(null);

  // If no history exists, hide component gracefully per user spec
  if (!history || history.length < 2) {
    return null;
  }

  const width = 500;
  const height = 180;
  const paddingX = 30;
  const paddingY = 25;

  const ratings = history.map((h) => h.rating);
  const maxRating = Math.max(...ratings, currentRating || 0);
  const minRating = Math.min(...ratings, currentRating || 0) - 50;

  const pointsCount = history.length;
  const stepX = (width - 2 * paddingX) / (pointsCount - 1);
  const rangeY = maxRating - minRating;

  // Calculate points
  const points = history.map((item, index) => {
    const x = paddingX + index * stepX;
    const y =
      height -
      paddingY -
      ((item.rating - minRating) / (rangeY || 1)) * (height - 2 * paddingY);
    return { x, y, ...item };
  });

  // Construct line path (d)
  const lineD = points.reduce(
    (path, point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `${path} L ${point.x} ${point.y}`,
    ""
  );

  // Construct filled area path
  const areaD = `${lineD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <motion.div
      role="img"
      aria-label="Contest Rating Progression Chart"
      variants={motionConfig.fadeUp}
      whileHover="hover"
      className="relative w-full p-5 md:p-6 rounded-[24px] border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] shadow-sm hover:shadow-md transition-shadow duration-300 select-none flex flex-col overflow-visible"
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 w-full">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
          Contest History
        </span>
        {currentRating && (
          <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs">
            <span className="text-slate-400">
              Rating: <strong className="text-white">{currentRating}</strong>
            </span>
            {globalRanking && (
              <span className="text-slate-400">
                Rank: <strong className="text-[#71B7FF]">#{new Intl.NumberFormat().format(globalRanking)}</strong>
              </span>
            )}
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-[140px] mt-2 overflow-visible">
        {/* Tooltip Overlay */}
        {hoveredPoint && (
          <div
            className="absolute p-2 bg-[#FAF7F2] dark:bg-slate-950 text-[#1E293B] dark:text-slate-200 border border-[#E6E1D3] dark:border-slate-800 rounded-lg text-[9px] md:text-[10px] font-medium z-50 pointer-events-none shadow-xl transform -translate-x-1/2 -translate-y-full flex flex-col items-center gap-0.5 backdrop-blur-md"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100 - 4}%`,
              width: "130px"
            }}
          >
            <span className="text-slate-500 dark:text-slate-400 font-mono text-[8px] truncate max-w-full">
              {hoveredPoint.title}
            </span>
            <span className="font-sans font-bold text-slate-800 dark:text-white">
              Rating: {hoveredPoint.rating}
            </span>
            <span className="text-slate-400 dark:text-slate-500 font-mono text-[8px]">
              {hoveredPoint.date}
            </span>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#FAF7F2] dark:border-t-slate-950" />
          </div>
        )}

        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="contestAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#71B7FF" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#71B7FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {Array.from({ length: 4 }).map((_, i) => {
            const y = paddingY + (i * (height - 2 * paddingY)) / 3;
            const valueVal = Math.round(maxRating - (i * rangeY) / 3);
            return (
              <g key={i} className="opacity-20">
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="var(--glass-card-border)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 6}
                  y={y + 3}
                  fill="currentColor"
                  fontSize="7"
                  fontFamily="monospace"
                  textAnchor="end"
                  className="text-slate-500"
                >
                  {valueVal}
                </text>
              </g>
            );
          })}

          {/* Filled Area path */}
          <motion.path
            d={areaD}
            fill="url(#contestAreaGrad)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Stroke Line path */}
          <motion.path
            d={lineD}
            fill="none"
            stroke="#71B7FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Data Points / Circles */}
          {points.map((p, index) => (
            <g key={index}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill="#0E1B2E"
                stroke="#71B7FF"
                strokeWidth="2.5"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 + 0.5 }}
                className="cursor-pointer"
                onMouseEnter={() =>
                  setHoveredPoint({
                    x: p.x,
                    y: p.y,
                    rating: p.rating,
                    date: p.date,
                    title: p.title
                  })
                }
                onMouseLeave={() => setHoveredPoint(null)}
              />
            </g>
          ))}
        </svg>
      </div>
    </motion.div>
  );
}
