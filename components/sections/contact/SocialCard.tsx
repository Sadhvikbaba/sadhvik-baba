"use client";

import { motion } from "framer-motion";
import { scaleFadeVariant } from "./motion";
import { FiArrowRight } from "react-icons/fi";
import { IconType } from "react-icons";

interface SocialCardProps {
  title: string;
  description: string;
  icon: IconType;
  href: string;
  isFeatured?: boolean;
}

export default function SocialCard({ title, description, icon: Icon, href, isFeatured }: SocialCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={scaleFadeVariant}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col justify-between p-4 md:p-5 rounded-2xl bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] hover:border-[var(--color-hero-accent)]/50 transition-colors duration-300 overflow-hidden min-h-[140px] h-full ${isFeatured ? "col-span-2 sm:col-span-1" : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-hero-accent)]/0 to-[var(--color-hero-accent)]/0 group-hover:from-[var(--color-hero-accent)]/5 group-hover:to-transparent transition-all duration-500" />
      
      <div className="relative z-10 flex flex-col gap-3">
        <div className={`rounded-full flex items-center justify-center bg-[var(--color-hero-accent)]/10 text-[var(--color-hero-accent)] ${isFeatured ? "w-10 h-10 sm:w-8 sm:h-8" : "w-8 h-8"}`}>
          <Icon className={isFeatured ? "w-5 h-5 sm:w-4 sm:h-4" : "w-4 h-4"} />
        </div>
        
        <div className="flex flex-col">
          <h3 className={`font-bold text-[var(--color-hero-heading)] ${isFeatured ? "text-base sm:text-sm" : "text-sm"}`}>{title}</h3>
          <p className={`text-[var(--color-hero-description)] truncate leading-tight mt-1 ${isFeatured ? "text-xs sm:text-[10px] md:text-[11px]" : "text-[10px] md:text-[11px]"}`}>{description}</p>
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-4 flex items-center text-[var(--color-hero-heading)] opacity-50 group-hover:opacity-100 transition-opacity">
        <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:text-[var(--color-hero-accent)] transition-all duration-300" />
      </div>
    </motion.a>
  );
}
