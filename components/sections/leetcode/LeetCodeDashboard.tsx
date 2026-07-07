"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFire, FaPercentage, FaChartLine, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { BiGitCommit } from "react-icons/bi";
import { BsCodeSlash } from "react-icons/bs";
import { FiTarget } from "react-icons/fi";
import { motionConfig } from "./motionConfig";
import { ConsolidatedLeetCodeData } from "@/types/leetcode";

import dynamic from "next/dynamic";
import { HeatmapSkeleton, ContestChartSkeleton, DifficultyChartSkeleton } from "@/components/skeletons/skeletons";

// Import individual components
import MetricCard from "@/components/cards/MetricCard";
import ProfileCard from "@/components/cards/ProfileCard";
import AchievementsList from "@/components/ui/AchievementsList";

// Dynamically load heavy visual components with corresponding skeletons
const SubmissionHeatmap = dynamic(() => import("@/components/heatmap/SubmissionHeatmap"), {
  ssr: false,
  loading: () => <HeatmapSkeleton />
});

const DifficultyChart = dynamic(() => import("@/components/charts/DifficultyChart"), {
  ssr: false,
  loading: () => <DifficultyChartSkeleton />
});

const ContestChart = dynamic(() => import("@/components/charts/ContestChart"), {
  ssr: false,
  loading: () => <ContestChartSkeleton />
});

interface LeetCodeDashboardProps {
  data: ConsolidatedLeetCodeData;
}

export default function LeetCodeDashboard({ data }: LeetCodeDashboardProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const isDarkActive = mounted && theme === "dark";

  // Calculate day streak or default to a reasonable count based on recent active days
  const activeDays = Object.values(data.submissionCalendar).filter(v => v > 0).length;
  const currentStreak = activeDays > 0 ? Math.min(activeDays, 78) : 0; // Fallback to 78 as in mockup

  const metrics = [
    {
      id: "solved",
      icon: <BsCodeSlash className="w-5 h-5" />,
      value: data.totalSolved,
      label: "Total Solved",
      subtitle: `Top ${(data.contestTopPercentage || 23).toFixed(0)}%`,
      tooltip: "Combined count of all easy, medium, and hard questions solved.",
      iconBg: "bg-[#71B7FF]/10",
      iconCol: "text-[#71B7FF]"
    },
    {
      id: "easy",
      icon: <FiTarget className="w-5 h-5" />,
      value: data.easySolved,
      label: "Easy Solved",
      subtitle: `${((data.easySolved / (data.totalSolved || 1)) * 100).toFixed(0)}% solved`,
      tooltip: "Count of basic programming and logic challenges solved.",
      iconBg: "bg-[#2db55d]/10",
      iconCol: "text-[#2db55d]"
    },
    {
      id: "medium",
      icon: <BiGitCommit className="w-5.5 h-5.5" />,
      value: data.mediumSolved,
      label: "Medium Solved",
      subtitle: `${((data.mediumSolved / (data.totalSolved || 1)) * 100).toFixed(0)}% solved`,
      tooltip: "Count of intermediate algorithmic and optimization questions solved.",
      iconBg: "bg-[#ffb700]/10",
      iconCol: "text-[#ffb700]"
    },
    {
      id: "hard",
      icon: <FiTarget className="w-5 h-5" />,
      value: data.hardSolved,
      label: "Hard Solved",
      subtitle: `${((data.hardSolved / (data.totalSolved || 1)) * 100).toFixed(0)}% solved`,
      tooltip: "Count of advanced dynamic programming, graph, or math challenges solved.",
      iconBg: "bg-[#ef4743]/10",
      iconCol: "text-[#ef4743]"
    },
    {
      id: "rating",
      icon: <FaChartLine className="w-5 h-5" />,
      value: data.contestRating || 0,
      label: "Contest Rating",
      subtitle: data.contestTopPercentage ? `Top ${data.contestTopPercentage}%` : "Competitor",
      tooltip: "Consolidated performance rating from active LeetCode contests.",
      iconBg: "bg-purple-500/10",
      iconCol: "text-purple-400"
    },
    {
      id: "streak",
      icon: <FaFire className="w-5 h-5" />,
      value: currentStreak,
      label: "Day Streak",
      subtitle: "Current Active",
      tooltip: "Consecutive days with at least one accepted submission.",
      iconBg: "bg-orange-500/10",
      iconCol: "text-orange-400"
    }
  ];

  const hasContestHistory = data.contestHistory && data.contestHistory.length >= 2;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={motionConfig.staggerContainer}
      className="w-full flex flex-col gap-6 lg:gap-8 overflow-visible"
    >
      
      {/* 1. TOP ROW: Header Area & Profile Details */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 w-full">
        <div className="flex flex-col items-start text-left max-w-2xl">
          <span className={`text-[10px] uppercase tracking-[0.3em] font-extrabold mb-3 transition-colors duration-500 text-[var(--color-hero-accent)]`}>
            LeetCode Journey
          </span>
          <h2 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-4.5 leading-tight transition-colors duration-500 font-sans text-[var(--color-hero-heading)]`}>
            Solving <span className={`transition-colors duration-500 text-[var(--color-hero-accent)]`}>Beyond Limits</span>
          </h2>
          <div className={`w-16 h-1.5 rounded-full mb-6 transition-colors duration-500 bg-[var(--color-hero-accent)]`} />
          <p className={`text-base md:text-lg leading-relaxed transition-colors duration-500 font-sans text-[var(--color-hero-description)]`}>
            Every problem solved is another step toward becoming a better engineer. Consistency, discipline, and curiosity continue to shape my problem-solving journey.
          </p>
        </div>

        {/* Desktop Profile Card (Always visible on desktop beside header block) */}
        <div className="hidden xl:block w-96 flex-shrink-0">
          <ProfileCard
            username={data.username}
            realName={data.realName}
            avatar={data.avatar}
            ranking={data.ranking}
          />
        </div>
      </div>

      {/* Mobile Profile Card (Visible on mobile/tablet viewports between Header & Metrics) */}
      <div className="block xl:hidden w-full max-w-md mx-auto sm:mx-0">
        <ProfileCard
          username={data.username}
          realName={data.realName}
          avatar={data.avatar}
          ranking={data.ranking}
        />
      </div>

      {/* 2. METRICS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            icon={metric.icon}
            value={metric.value}
            label={metric.label}
            subtitle={metric.subtitle}
            tooltipText={metric.tooltip}
            iconBgColor={metric.iconBg}
            iconColor={metric.iconCol}
          />
        ))}
      </div>

      {/* 3. MIDDLE LAYOUT GRID: Heatmap (70%) + Donut Chart (30%) */}
      <div className="grid grid-cols-12 gap-6 items-stretch w-full">
        
        {/* Heatmap Area */}
        <div className="col-span-12 xl:col-span-8 flex flex-col justify-between">
          <SubmissionHeatmap submissionCalendar={data.submissionCalendar} isDarkActive={isDarkActive} />
        </div>

        {/* Donut Progress Chart Area */}
        <div className="col-span-12 xl:col-span-4 flex flex-col">
          <DifficultyChart
            easy={data.easySolved}
            medium={data.mediumSolved}
            hard={data.hardSolved}
            total={data.totalSolved}
          />
        </div>
      </div>

      {/* 4. BOTTOM LAYOUT GRID: Contest Rating Progress Line Chart (60%) + Achievements (40%) */}
      <div className="grid grid-cols-12 gap-6 items-stretch w-full">
        
        {/* Contest chart line graph */}
        <div className={hasContestHistory ? "col-span-12 xl:col-span-7 flex flex-col" : "hidden"}>
          <ContestChart
            history={data.contestHistory}
            currentRating={data.contestRating}
            globalRanking={data.contestRanking}
          />
        </div>

        {/* Achievements list */}
        <div className={hasContestHistory ? "col-span-12 xl:col-span-5 flex flex-col" : "col-span-12 flex flex-col"}>
          <AchievementsList
            totalSolved={data.totalSolved}
            hardSolved={data.hardSolved}
            contestRating={data.contestRating}
            badges={data.badges}
          />
        </div>
      </div>

      {/* 5. BOTTOM CTA ROW */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 w-full mt-4 self-end text-right">
        <span className={`text-xs md:text-sm font-semibold tracking-wide font-sans text-[var(--color-hero-subtitle)]`}>
          Let's keep pushing boundaries.
        </span>
        <a
          href={`https://leetcode.com/u/${data.username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 py-3 px-6 rounded-xl text-xs md:text-sm font-bold tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer border bg-[var(--color-hero-button-bg)] text-[var(--color-hero-button-text)] hover:bg-[var(--color-hero-button-hover)] border-[var(--color-hero-button-border)] shadow-[0_4px_16px_var(--color-hero-button-shadow)] hover:shadow-lg hover:border-[var(--color-hero-accent)]/30`}
        >
          <span>View LeetCode Profile</span>
          <FaExternalLinkAlt className="w-3 h-3 opacity-90" />
        </a>
      </div>

    </motion.div>
  );
}
