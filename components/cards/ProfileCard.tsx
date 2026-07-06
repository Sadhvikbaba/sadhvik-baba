"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { motionConfig } from "@/components/sections/leetcode/motionConfig";

interface ProfileCardProps {
  username: string;
  realName: string;
  avatar: string;
  ranking: number;
}

export default function ProfileCard({ username, realName, avatar, ranking }: ProfileCardProps) {
  return (
    <motion.div
      role="article"
      aria-label="LeetCode Profile Card"
      variants={motionConfig.fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="w-full p-4 rounded-2xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] flex flex-col min-[390px]:flex-row min-[390px]:items-center justify-between gap-3.5 select-none group transition-shadow duration-300 hover:shadow-md"
    >
      <div className="flex items-center gap-3.5">
        {/* Avatar Frame */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-700/30">
          <Image
            src={avatar}
            alt={realName}
            fill
            sizes="48px"
            className="object-cover"
            priority={false}
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-[var(--color-hero-heading)] leading-tight font-sans">
            {realName}
          </span>
          <span className="text-xs text-slate-500 font-mono flex items-center gap-1 mt-0.5">
            <SiLeetcode className="w-3.5 h-3.5 text-[#F79F1B]" />
            {username}
          </span>
        </div>
      </div>

      {/* Rank Indicator and link */}
      <a
        href={`https://leetcode.com/u/${username}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="self-end min-[390px]:self-auto flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-[#E6E1D3] dark:border-slate-800/80 bg-[#FAF7F2] dark:bg-slate-900/50 hover:bg-[#E6E1D3]/50 dark:hover:bg-slate-900/80 text-xs font-mono font-semibold text-[#B57552] dark:text-[#71B7FF] hover:text-[#8C4A2B] dark:hover:text-white transition-all duration-300 cursor-pointer"
        aria-label="Visit LeetCode profile website"
      >
        <span>Rank #{new Intl.NumberFormat("en-US").format(ranking)}</span>
        <FaExternalLinkAlt className="w-2.5 h-2.5 opacity-80" />
      </a>
    </motion.div>
  );
}
