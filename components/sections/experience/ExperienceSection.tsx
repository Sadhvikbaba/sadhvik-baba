"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { motionConfig } from "./motion";
import ExperienceTimeline from "./ExperienceTimeline";

export default function ExperienceSection() {
  // Setup simple scroll parallax for the illustration
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="experience" className="relative w-full min-h-screen py-24 lg:py-32 bg-[var(--site-bg)] border-b border-[var(--color-glass-border)] transition-colors duration-500 overflow-hidden">
      
      {/* Background radial gradient subtle highlight */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-[var(--color-hero-accent)]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* 
        Max Width Container (1440px)
      */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-16 lg:gap-24 relative z-10">
        
        {/* ====================================================
            HEADER AREA 
            ==================================================== */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 lg:gap-8 w-full">
          
          {/* Left: Text Content (65-70% width on desktop) */}
          <motion.div 
            variants={motionConfig.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left w-full lg:w-[55%]"
          >
            <motion.span 
              variants={motionConfig.fadeUp}
              className="text-xs uppercase tracking-[0.3em] font-extrabold mb-4 transition-colors duration-500 text-[var(--color-hero-accent)]"
            >
              EXPERIENCE
            </motion.span>
            
            <motion.h2 
              variants={motionConfig.fadeUp}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight transition-colors duration-500 font-sans text-[var(--color-hero-heading)]"
            >
              Engineering in <span className="text-[var(--color-hero-accent)]">Practice</span>
            </motion.h2>

            <motion.p 
              variants={motionConfig.fadeUp}
              className="text-base md:text-lg leading-relaxed max-w-2xl transition-colors duration-500 font-sans text-[var(--color-hero-description)]"
            >
              Building software isn't just about writing code—it's about collaborating with teams, shipping production-ready solutions, and creating measurable engineering impact.
            </motion.p>
          </motion.div>

          {/* Right/Bottom: Decorative Illustration (30-35% width on desktop) */}
          <motion.div 
            style={{ y }}
            className="relative mt-16 lg:mt-0 w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] lg:w-[45%] aspect-[950/270] opacity-70 pointer-events-none select-none transition-opacity duration-1000"
          >
            {/* Light Mode Illustration */}
            <Image
              src="/experience/light.png"
              alt="Mountain Outline"
              fill
              className="object-contain object-center lg:object-right dark:hidden"
              priority
            />
            {/* Dark Mode Illustration */}
            <Image
              src="/experience/dark.png"
              alt="Mountain Outline"
              fill
              className="object-contain object-center lg:object-right hidden dark:block"
              priority
            />
          </motion.div>
          
        </div>

        {/* ====================================================
            TIMELINE AREA
            ==================================================== */}
        <div className="w-full relative mt-8">
          <ExperienceTimeline />
        </div>

      </div>
    </section>
  );
}
