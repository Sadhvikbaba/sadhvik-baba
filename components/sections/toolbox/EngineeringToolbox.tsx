"use client";

import React from "react";
import { motion } from "framer-motion";
import { toolboxCategories } from "@/lib/toolbox";
import ToolboxCard from "@/components/cards/ToolboxCard";
import { motionConfig } from "@/components/motion/motionConfig";

export default function EngineeringToolbox() {
  const getColSpanClass = (index: number) => {
    // We have 7 cards (indices 0 to 6)
    let classes = "col-span-12"; // Default mobile

    // Tablet: 2, 2, 2, 1
    if (index === 6) {
      classes += " md:col-span-12"; // Card 7 spans full width
    } else {
      classes += " md:col-span-6"; // Cards 1-6 span half-width
    }

    // Laptop: 3, 2, 2
    if (index < 3) {
      classes += " lg:col-span-4"; // Cards 1-3 span 4 cols (3 cards)
    } else {
      classes += " lg:col-span-6"; // Cards 4-7 span 6 cols (2 cards per row)
    }

    // Desktop: 4, 3
    if (index < 4) {
      classes += " xl:col-span-3"; // Cards 1-4 span 3 cols (4 cards)
    } else {
      classes += " xl:col-span-4"; // Cards 5-7 span 4 cols (3 cards)
    }

    return classes;
  };

  return (
    <section
      id="toolbox"
      aria-label="The Engineering Toolbox"
      className="relative z-30 w-full min-h-screen py-16 lg:py-24 bg-[var(--sky-main)] transition-colors duration-500 flex items-center justify-center border-b border-[var(--color-glass-border)]"
    >
      {/* Visual Accent - subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full blur-3xl pointer-events-none z-0 bg-[color-mix(in_srgb,var(--color-hero-accent)_3%,transparent)]" />

      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 flex flex-col gap-12 lg:gap-16">
        
        {/* Header Block: Responsive Row Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={motionConfig.staggerContainer}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 w-full"
        >
          <div className="flex flex-col items-start text-left max-w-2xl">
            {/* Small Label */}
            <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold mb-3 text-[var(--color-hero-accent)] flex items-center gap-2">
              Technology Stack
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-hero-accent)]" />
              <span className="w-6 h-[1px] bg-[var(--color-hero-accent)]/50" />
            </span>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-hero-heading)] leading-[1.1] transition-colors duration-500 font-sans">
              The Engineering{" "}
              <span className="font-serif italic font-medium text-[var(--color-hero-accent)]">
                Toolbox
              </span>
            </h2>
            <div className="w-16 h-1.5 rounded-full mt-5 bg-[var(--color-hero-accent)]" />
          </div>

          {/* Subtitle (aligned to bottom/right on desktop) */}
          <div className="max-w-xl">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[var(--color-hero-description)] transition-colors duration-500 font-sans lg:mb-1">
              Every technology serves a purpose. From crafting seamless interfaces to designing
              scalable backend systems, these are the tools I use to build reliable, production-ready software.
            </p>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={motionConfig.staggerContainer}
          className="grid grid-cols-12 gap-6 w-full items-stretch"
        >
          {toolboxCategories.map((category, idx) => (
            <div key={category.id} className={getColSpanClass(idx)}>
              <ToolboxCard category={category} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
