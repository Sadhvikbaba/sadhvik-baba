"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { motionConfig } from "@/components/sections/leetcode/motionConfig";

interface SubmissionHeatmapProps {
  submissionCalendar: Record<string, number>;
  isDarkActive: boolean;
}

export default function SubmissionHeatmap({ submissionCalendar, isDarkActive }: SubmissionHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<{
    dateString: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Normalize submission calendar keys to YYYY-MM-DD
  const dateMap = useMemo(() => {
    const map: Record<string, number> = {};
    Object.entries(submissionCalendar).forEach(([timestampStr, count]) => {
      try {
        const timeSec = Number(timestampStr);
        if (!isNaN(timeSec)) {
          // Force UTC/local conversion to date string
          const dateStr = new Date(timeSec * 1000).toISOString().split("T")[0];
          map[dateStr] = (map[dateStr] || 0) + count;
        }
      } catch (err) {
        console.error("Error formatting calendar date:", err);
      }
    });
    return map;
  }, [submissionCalendar]);

  // Construct 53 weeks (Sunday to Saturday) ending today
  const { weeks, monthLabels } = useMemo(() => {
    const daysList: { date: Date; dateString: string; count: number }[] = [];
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
    
    // Retrieve exactly 52 full weeks + current week days
    const totalDays = 52 * 7 + (currentDayOfWeek + 1);
    
    // Go back to the starting Sunday
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - totalDays + 1);

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dateString = d.toISOString().split("T")[0];
      const count = dateMap[dateString] || 0;
      daysList.push({ date: d, dateString, count });
    }

    // Chunk into 53 columns (weeks)
    const weeksList: typeof daysList[] = [];
    const labels: { text: string; colIndex: number }[] = [];
    let currentWeek: typeof daysList = [];
    let lastMonth = -1;

    daysList.forEach((day, index) => {
      currentWeek.push(day);
      
      // If Sunday (first day of the week column)
      if (currentWeek.length === 1) {
        const month = day.date.getMonth();
        if (month !== lastMonth) {
          const monthText = day.date.toLocaleString("default", { month: "short" });
          labels.push({ text: monthText, colIndex: weeksList.length });
          lastMonth = month;
        }
      }

      if (currentWeek.length === 7) {
        weeksList.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      weeksList.push(currentWeek);
    }

    return { weeks: weeksList, monthLabels: labels };
  }, [dateMap]);

  // Calculate cell color style based on theme and counts
  const getCellBg = (count: number) => {
    if (count === 0) {
      return isDarkActive ? "bg-slate-800/35" : "bg-[#E6E1D3]/35";
    }
    
    if (isDarkActive) {
      // Dark Mode (Blue Theme)
      if (count <= 2) return "bg-[#71B7FF]/30";
      if (count <= 4) return "bg-[#71B7FF]/65";
      return "bg-[#71B7FF]";
    } else {
      // Light Mode (Terracotta Theme)
      if (count <= 2) return "bg-[#B57552]/30";
      if (count <= 4) return "bg-[#B57552]/65";
      return "bg-[#B57552]";
    }
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    dateString: string,
    count: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parent = e.currentTarget.closest(".heatmap-card");
    if (parent) {
      const parentRect = parent.getBoundingClientRect();
      setHoveredDay({
        dateString,
        count,
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top
      });
    }
  };

  const formatDateString = (dateStr: string) => {
    if (!dateStr) return "";
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  return (
    <motion.div
      role="grid"
      aria-label="Submission Activity Heatmap Grid"
      variants={motionConfig.fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="heatmap-card relative w-full p-5 md:p-6 rounded-[24px] border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] shadow-sm hover:shadow-md transition-shadow duration-300 select-none flex flex-col items-start overflow-visible"
    >
      <span className="text-xs font-bold mb-6 uppercase tracking-wider text-slate-400 font-sans">
        Submission Activity
      </span>

      {/* Tooltip (rendered outside overflow-x-auto wrapper to avoid clipping) */}
      {hoveredDay && (
        <div
          className="absolute p-2 bg-[#FAF7F2] dark:bg-slate-950 text-[#1E293B] dark:text-slate-200 border border-[#E6E1D3] dark:border-slate-800 rounded-lg text-[9px] md:text-[10px] font-medium z-50 pointer-events-none shadow-xl transform -translate-x-1/2 -translate-y-full flex flex-col items-center justify-center text-center backdrop-blur-md"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y - 8}px`,
            width: "140px"
          }}
        >
          <span className="font-sans font-bold text-slate-800 dark:text-white">
            {hoveredDay.count > 0
              ? `${hoveredDay.count} submission${hoveredDay.count > 1 ? "s" : ""}`
              : "No submissions"}
          </span>
          <span className="text-slate-500 dark:text-slate-400 font-mono text-[8px] mt-0.5">
            on {formatDateString(hoveredDay.dateString)}
          </span>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#FAF7F2] dark:border-t-slate-950" />
        </div>
      )}

      {/* Heatmap Layout container */}
      <div className="relative w-full flex flex-col mt-2 overflow-x-auto overflow-y-visible no-scrollbar pb-2">
        
        {/* Heatmap Grid Wrapper */}
        <div className="flex flex-col gap-1 min-w-[580px] overflow-visible">
          {/* Months header */}
          <div className="relative h-4 w-full flex text-[9px] font-semibold text-slate-500 font-mono select-none">
            {monthLabels.map((lbl, idx) => (
              <span
                key={idx}
                className="absolute"
                style={{ left: `${(lbl.colIndex / 53) * 100}%` }}
              >
                {lbl.text}
              </span>
            ))}
          </div>

          {/* Grid Rows (Days of the week) */}
          <div className="flex gap-2.5 items-center overflow-visible">
            {/* Day Labels Column */}
            <div className="flex flex-col justify-between text-[8px] md:text-[9px] font-bold text-slate-500 font-mono h-[78px] pr-1.5 leading-none select-none">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Weeks columns */}
            <div className="flex gap-1.5 flex-1 overflow-visible">
              {weeks.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1 overflow-visible">
                  {week.map((day, rowIdx) => (
                    <motion.div
                      key={`${colIdx}-${rowIdx}`}
                      aria-label={`${day.count} submissions on ${day.dateString}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: (colIdx * 7 + rowIdx) * 0.0015,
                        ease: "easeOut"
                      }}
                      onMouseEnter={(e) => handleMouseEnter(e, day.dateString, day.count)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-colors duration-300 shrink-0 ${getCellBg(
                        day.count
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend bar */}
        <div className="flex items-center gap-1.5 self-end mt-4 text-[9px] font-semibold text-slate-500 font-mono select-none mr-2">
          <span>Less</span>
          <div className={`w-2.5 h-2.5 rounded-[2px] ${getCellBg(0)}`} />
          <div className={`w-2.5 h-2.5 rounded-[2px] ${getCellBg(1)}`} />
          <div className={`w-2.5 h-2.5 rounded-[2px] ${getCellBg(4)}`} />
          <div className={`w-2.5 h-2.5 rounded-[2px] ${getCellBg(6)}`} />
          <span>More</span>
        </div>

      </div>
    </motion.div>
  );
}
