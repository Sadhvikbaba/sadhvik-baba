"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experiences } from "./constants";
import ExperienceCard from "./ExperienceCard";

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for the main line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative w-full flex flex-col gap-12 md:gap-20">
      {/* 
        The main vertical line. 
        On mobile: left-4 (16px from edge).
        On desktop: left-8 (32px from edge).
      */}
      <div className="absolute top-0 bottom-0 left-4 md:left-8 w-px bg-[var(--color-glass-border)] origin-top">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-[var(--color-hero-accent)] origin-top"
          style={{ scaleY: smoothProgress }}
        />
      </div>

      {experiences.map((exp, index) => (
        <TimelineNodeItem 
          key={exp.id} 
          experience={exp} 
          index={index} 
        />
      ))}
    </div>
  );
}

function TimelineNodeItem({ experience, index }: { experience: any; index: number }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ["start 70%", "start 30%"], // Trigger fill as it enters middle of screen
  });

  const smoothScale = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 20,
  });

  return (
    <div className="relative w-full flex items-start gap-8 md:gap-16">
      
      {/* Timeline Node Marker */}
      {/* Positioned exactly over the vertical line */}
      <div 
        ref={nodeRef}
        className="absolute left-4 md:left-8 top-12 -translate-x-1/2 flex items-center justify-center z-10"
      >
        {/* Outer Ring */}
        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-[var(--color-glass-border)] bg-[var(--site-bg)] shadow-sm flex items-center justify-center transition-colors duration-300 hover:border-[var(--color-hero-accent)]">
          {/* Inner Fill that scales up on scroll */}
          <motion.div 
            className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[var(--color-hero-accent)]"
            style={{ scale: smoothScale, opacity: smoothScale }}
          />
        </div>
      </div>

      {/* Date Marker (Desktop only, subtle label outside card if desired? 
          Actually, we put dates inside the card. We will just use the spacing for the timeline.) */}
      
      {/* Spacer to push card past the timeline line */}
      <div className="w-6 md:w-16 flex-shrink-0" />

      {/* The actual Card */}
      <div className="flex-1">
        <ExperienceCard experience={experience} />
      </div>

    </div>
  );
}
