"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FEATURED_PROJECTS } from "./constants";
import HorizontalScroll from "./HorizontalScroll";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const numProjects = FEATURED_PROJECTS.length;

  return (
    <section 
      ref={sectionRef}
      id="projects"
      aria-label="Featured Projects"
      className="relative w-full border-b border-[var(--color-glass-border)] bg-[var(--site-bg)]"
    >
      {/* ── DESKTOP / TABLET: Horizontal Scroll ── */}
      <div 
        className="hidden md:block w-full z-10 relative" 
        style={{ height: `calc(100vh + ${(numProjects - 1) * 100}vw)` }}
      >
        <HorizontalScroll 
          itemCount={numProjects} 
          scrollYProgress={scrollYProgress}
        >
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </HorizontalScroll>

        {/* Section Header (Absolute so it sticks to the top of the pinned viewport) */}
        <div className="absolute top-0 left-0 w-full px-12 lg:px-24 pt-20 lg:pt-28 pb-12 pointer-events-none z-20">
          <div className="max-w-2xl text-left pointer-events-auto">
            <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold mb-3 text-[var(--color-hero-accent)] flex items-center gap-2">
              Featured Projects
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-hero-accent)]" />
              <span className="w-6 h-[1px] bg-[var(--color-hero-accent)]/50" />
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-hero-heading)] leading-[1.1] font-sans">
              Built for the <span className="font-serif italic font-medium text-[var(--color-hero-accent)]">Real World</span>
            </h2>
          </div>
        </div>
      </div>

      {/* ── MOBILE: Vertical Stack ── */}
      <div className="md:hidden flex flex-col gap-12 py-16 z-10 relative overflow-hidden w-full max-w-[100vw]">
        <div className="px-6 text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold mb-3 text-[var(--color-hero-accent)] flex items-center gap-2">
            Featured Projects
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-hero-accent)]" />
            <span className="w-6 h-[1px] bg-[var(--color-hero-accent)]/50" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-hero-heading)] leading-[1.1] font-sans">
            Built for the <span className="font-serif italic font-medium text-[var(--color-hero-accent)]">Real World</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--color-hero-description)] font-sans">
            Every project is an opportunity to solve real problems, explore modern technologies, and engineer scalable solutions from the ground up.
          </p>
        </div>
        
        <div className="flex flex-col gap-16">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

    </section>
  );
}
