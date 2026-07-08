"use client";

import React from "react";
import Image from "next/image";
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
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-16 w-full"
        >
          {/* Left Column: Heading and Subtitle */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            {/* Small Label */}
            <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold mb-3 text-[var(--color-hero-accent)] flex items-center gap-2">
              Technology Stack
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-hero-accent)]" />
              <span className="w-6 h-[1px] bg-[var(--color-hero-accent)]/50" />
            </span>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-hero-heading)] leading-[1.1] transition-colors duration-500 font-sans mb-5">
              The Engineering{" "}
              <span className="font-serif italic font-medium text-[var(--color-hero-accent)]">
                Toolbox
              </span>
            </h2>

            {/* Subtitle (moved under heading) */}
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[var(--color-hero-description)] transition-colors duration-500 font-sans max-w-xl">
              Every technology serves a purpose. From crafting seamless interfaces to designing
              scalable backend systems, these are the tools I use to build reliable, production-ready software.
            </p>
            <div className="w-16 h-1.5 rounded-full mt-6 bg-[var(--color-hero-accent)]" />
          </div>

          {/* Right Column: Illustration Images */}
          <div className="relative w-full max-w-[400px] md:max-w-[450px] lg:max-w-[500px] lg:w-[40%] aspect-[16/9] md:aspect-[400/180] mx-auto md:mx-0 pointer-events-none flex-shrink-0">
            <Image 
              src="/techstack/light.png"
              alt="Technology Illustration"
              fill
              className="object-contain object-center lg:object-right-bottom dark:hidden"
              sizes="(max-width: 768px) 300px, (max-width: 1200px) 450px, 500px"
              priority
            />
            <Image 
              src="/techstack/dark.png"
              alt="Technology Illustration"
              fill
              className="object-contain object-center lg:object-right-bottom hidden dark:block"
              sizes="(max-width: 768px) 300px, (max-width: 1200px) 450px, 500px"
              priority
            />
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
