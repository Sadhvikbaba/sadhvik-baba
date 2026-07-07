"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaBuilding } from "react-icons/fa";
import { Experience } from "./constants";
import { motionConfig } from "./motion";
import MetricCard from "@/components/cards/MetricCard";
import TechnologyPill from "@/components/ui/TechnologyPill";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <motion.div
      variants={motionConfig.fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="w-full flex flex-col p-6 md:p-8 rounded-[28px] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] shadow-sm hover:shadow-lg hover:border-[var(--color-hero-accent)] transition-all duration-300 gap-8"
    >
      {/* 1. HEADER ROW (Logo, Title, Dates, Metrics) */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8 xl:gap-12 w-full">
        
        {/* Left: Role Info */}
        <div className="flex gap-5 items-start">
          {/* Logo Frame */}
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border border-[var(--color-glass-border)] bg-[var(--site-bg)] text-[var(--color-hero-heading)] shadow-sm flex-shrink-0">
            <FaBuilding className="w-6 h-6 opacity-80" />
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--color-hero-heading)] uppercase">
              {experience.company}
            </h3>
            <span className="text-sm md:text-base font-bold text-[var(--color-hero-accent)]">
              {experience.role}
            </span>
            
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs md:text-sm text-[var(--color-hero-description)] font-medium font-mono">
              <span className="flex items-center gap-1.5">
                <FaCalendarAlt className="opacity-70" />
                {experience.duration}
              </span>
              <span className="hidden sm:inline opacity-50">|</span>
              <span className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="opacity-70" />
                {experience.location}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Metrics Mini Cards */}
        {experience.metrics && experience.metrics.length > 0 && (
          <div className="flex flex-col gap-3 w-full xl:w-auto">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-hero-subtitle)]">
              Engineering Impact
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {experience.metrics.map((metric) => (
                <div 
                  key={metric.id}
                  className="flex flex-col p-3 rounded-xl border border-[var(--color-glass-border)] bg-[var(--site-bg)] hover:border-[var(--color-hero-accent)] transition-colors duration-300"
                >
                  <div className="flex items-center gap-2 mb-2 text-[var(--color-hero-accent)]">
                    {metric.icon}
                    <span className="text-lg font-bold text-[var(--color-hero-heading)] leading-none">
                      {metric.value}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--color-hero-description)] font-bold uppercase tracking-wide leading-tight">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--color-glass-border)]" />

      {/* 2. BOTTOM ROW (Highlights & Tech) */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full justify-between">
        
        {/* Left: What I Built */}
        <div className="flex flex-col gap-4 w-full lg:max-w-md">
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-hero-subtitle)]">
            Built During This Role
          </span>
          <ul className="flex flex-col gap-3">
            {experience.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <FaCheckCircle className="w-4 h-4 mt-0.5 text-[var(--color-hero-accent)] flex-shrink-0 opacity-80" />
                <span className="text-sm text-[var(--color-hero-description)] leading-snug">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Tech Stack */}
        <div className="flex flex-col gap-4 w-full lg:max-w-md xl:max-w-lg">
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[var(--color-hero-subtitle)]">
            Technologies Used
          </span>
          <div className="flex flex-wrap gap-2.5">
            {experience.tech.map((tech) => (
              <TechnologyPill
                key={tech}
                name={tech}
              />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
