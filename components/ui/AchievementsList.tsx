"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaAward, FaShieldAlt } from "react-icons/fa";
import { motionConfig } from "@/components/sections/leetcode/motionConfig";
import { LeetCodeBadge } from "@/types/leetcode";

interface AchievementsListProps {
  totalSolved: number;
  hardSolved: number;
  contestRating: number | null;
  badges: LeetCodeBadge[];
}

export default function AchievementsList({
  totalSolved,
  hardSolved,
  contestRating,
  badges
}: AchievementsListProps) {
  // Generate achievements dynamically based on real statistics
  const achievements = React.useMemo(() => {
    const list: { title: string; subtitle: string; icon: React.ReactNode }[] = [];

    // 1. Total solved milestones
    if (totalSolved >= 500) {
      list.push({
        title: "Solved 500 Problems",
        subtitle: "Expert Milestone",
        icon: <FaTrophy className="w-4 h-4 text-[#ffb700]" />
      });
    } else if (totalSolved >= 250) {
      list.push({
        title: "Solved 250 Problems",
        subtitle: "Intermediate Milestone",
        icon: <FaTrophy className="w-4 h-4 text-[#ffb700]" />
      });
    } else if (totalSolved >= 100) {
      list.push({
        title: "Solved 100 Problems",
        subtitle: "Getting Started Milestone",
        icon: <FaTrophy className="w-4 h-4 text-[#ffb700]" />
      });
    }

    // 2. Hard solved milestones
    if (hardSolved >= 100) {
      list.push({
        title: "100 Hard Problems Solved",
        subtitle: "Master Level Milestone",
        icon: <FaAward className="w-4 h-4 text-[#ef4743]" />
      });
    } else if (hardSolved >= 50) {
      list.push({
        title: "50 Hard Problems Solved",
        subtitle: "Advanced Level Milestone",
        icon: <FaAward className="w-4 h-4 text-[#ef4743]" />
      });
    } else if (hardSolved >= 10) {
      list.push({
        title: "10 Hard Problems Solved",
        subtitle: "Intro to Hard Level",
        icon: <FaAward className="w-4 h-4 text-[#ef4743]" />
      });
    }

    // 3. Contest rating achievements
    if (contestRating && contestRating >= 1700) {
      list.push({
        title: `Contest Rating ${contestRating}+`,
        subtitle: contestRating >= 1850 ? "Guardian Level Bound" : "Leveled Up (Specialist Rank)",
        icon: <FaMedal className="w-4 h-4 text-[#71B7FF]" />
      });
    } else if (contestRating && contestRating >= 1600) {
      list.push({
        title: `Contest Rating ${contestRating}+`,
        subtitle: "Specialist Competitor",
        icon: <FaMedal className="w-4 h-4 text-[#71B7FF]" />
      });
    }

    // 4. Custom badges from API response (deduplicated or dynamic)
    badges.forEach((badge) => {
      // Exclude simple yearly badges to keep lists premium
      if (badge.name.includes("Knight") || badge.name.includes("Guardian") || badge.name.includes("Daily")) {
        list.push({
          title: badge.name,
          subtitle: badge.hoverText || "Earned Badge",
          icon: <FaShieldAlt className="w-4 h-4 text-[#2db55d]" />
        });
      }
    });

    // Provide default achievements if list is short
    if (list.length === 0) {
      list.push({
        title: "First Steps",
        subtitle: "Curiosity and consistency are forming.",
        icon: <FaTrophy className="w-4 h-4 text-[var(--color-hero-subtitle)]" />
      });
    }

    return list.slice(0, 4); // Limit to top 4 achievements for visual grid balance
  }, [totalSolved, hardSolved, contestRating, badges]);

  return (
    <motion.div
      role="article"
      aria-label="Achievements List Card"
      variants={motionConfig.fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="w-full p-5 md:p-6 rounded-[24px] border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] shadow-sm hover:shadow-md transition-shadow duration-300 select-none flex flex-col items-start"
    >
      <span className="text-xs font-bold mb-5 uppercase tracking-wider text-[var(--color-hero-subtitle)] font-sans">
        Recent Achievements
      </span>

      <div className="flex flex-col gap-4 w-full mt-2">
        {achievements.map((ach, idx) => (
          <div key={idx} className="flex items-center gap-4 w-full">
            {/* Icon Frame */}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] flex-shrink-0">
              {ach.icon}
            </div>
            
            {/* Title / Description */}
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-[var(--color-hero-heading)] font-sans leading-tight">
                {ach.title}
              </span>
              <span className="text-[10px] text-[var(--color-hero-description)] font-mono mt-0.5 leading-none">
                {ach.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
