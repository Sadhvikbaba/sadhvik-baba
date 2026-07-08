"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValue, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { FaRupeeSign, FaTrophy, FaCalendarAlt } from "react-icons/fa";
import { TfiMouse } from "react-icons/tfi";


const ACHIEVEMENTS = [
  {
    id: "msc-2024",
    shortId: "MSC",
    badge: "Winner",
    title: "Microsoft Student Community Hackathon",
    year: "2024",
    date: "November 2024",
    project: "AI Mail Router & Workflow Automation",
    prize: "",
    image: "/achievements/microsoft.png",
    description: "Allows users to submit issues in simple language to automatically generate polished, professional emails. An ML classifier automatically routes the mail to the correct department, while an integrated workflow tracker monitors resolution progress. The system also includes a directory mapping faculty cabin locations.",
    techStack: [
      "React", "Node.js", "PostgreSQL", "Prisma", "Docker", 
      "Hugging Face", "Google OAuth"
    ],
    timelineLabel: ["Microsoft Student", "Community Hackathon", "(2024)"],
    mobileLabel: "MSC Hackathon (2024)"
  },
  {
    id: "ninehacks-2025",
    shortId: "9Hacks",
    badge: "2nd Place",
    title: "9Hacks",
    year: "2025",
    date: "September 2025",
    project: "Code Paglu",
    prize: "",
    image: "/achievements/9hacks.png",
    description: "Developed a real-time collaborative coding platform enabling multiple developers to edit code together using WebSockets and WebRTC with synchronized editor state and communication tools.",
    techStack: [
      "React", "Node.js", "WebRTC", "WebSockets", "Monaco Editor", 
      "Live Collaboration"
    ],
    timelineLabel: ["9Hacks", "(2025)"],
    mobileLabel: "9Hacks (2025)"
  },
  {
    id: "sweeyam-2026",
    shortId: "SWEeyam",
    badge: "1st Place",
    title: "SWEeyam Hackathon 2026",
    year: "2026",
    date: "January 2026",
    project: "AI-Powered Self Healing System",
    prize: "₹50,000",
    image: "/achievements/sweeyam.png",
    description: "Built an AI-powered autonomous monitoring and self-healing platform for deployed applications. It monitors, detects anomalies using ML, and automatically fixes issues through an AI agent that clones repositories, runs Docker containers, repairs code, and pushes updates to GitHub.",
    techStack: [
      "React", "Node.js", "Docker", "Prometheus", "Grafana", "Loki", 
      "Redis", "Microservices", "Isolation Forest", "Machine Learning", 
      "GitHub", "Blackbox Exporter"
    ],
    timelineLabel: ["SWEeyam Hackathon", "(2026)"],
    mobileLabel: "SWEeyam Hackathon (2025)"
  }
];

// Faded detailed Trophy outline inside background with laurels and circular guides
function LargeBackgroundTrophy() {
  return (
    <svg
      viewBox="0 0 1000 800"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[85vh] max-w-[900px] max-h-[800px] pointer-events-none z-0 opacity-[0.09] dark:opacity-[0.05] text-[var(--color-hero-accent)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Concentric blueprint reference circles */}
      <circle cx="500" cy="380" r="350" strokeDasharray="3 9" />
      <circle cx="500" cy="380" r="250" strokeDasharray="2 6" />
      <circle cx="500" cy="380" r="140" strokeDasharray="4 4" opacity="0.5" />
      
      {/* Crosshairs guidelines */}
      <line x1="500" y1="20" x2="500" y2="740" strokeDasharray="5 5" opacity="0.4" />
      <line x1="120" y1="380" x2="880" y2="380" strokeDasharray="5 5" opacity="0.4" />
      <line x1="200" y1="80" x2="800" y2="680" strokeDasharray="2 8" opacity="0.3" />
      <line x1="200" y1="680" x2="800" y2="80" strokeDasharray="2 8" opacity="0.3" />

      {/* Laurel Wreath wrapping the trophy */}
      {/* Left side Wreath */}
      <path d="M 340 500 C 250 420 230 280 330 160" strokeWidth="1.25" />
      {/* Left Leaves */}
      <path d="M 330 480 C 310 475 295 450 300 440 C 305 430 320 445 330 460 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M 298 420 C 275 410 265 385 275 375 C 285 365 295 385 305 400 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M 272 350 C 252 335 248 310 260 300 C 272 290 278 315 285 330 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M 262 280 C 248 260 250 235 262 225 C 274 215 276 240 280 258 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M 270 210 C 262 190 270 165 282 160 C 294 155 296 180 294 195 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M 295 150 C 295 130 308 110 320 110 C 328 110 322 135 315 145 Z" fill="currentColor" fillOpacity="0.15" />

      {/* Right side Wreath */}
      <path d="M 660 500 C 750 420 770 280 670 160" strokeWidth="1.25" />
      {/* Right Leaves */}
      <path d="M 670 480 C 690 475 705 450 700 440 C 695 430 680 445 670 460 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M 702 420 C 725 410 735 385 725 375 C 715 365 705 385 695 400 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M 728 350 C 748 335 752 310 740 300 C 728 290 722 315 715 330 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M 738 280 C 752 260 750 235 738 225 C 726 215 724 240 720 258 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M 730 210 C 738 190 730 165 718 160 C 706 155 708 180 706 195 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M 705 150 C 705 130 692 110 680 110 C 672 110 678 135 685 145 Z" fill="currentColor" fillOpacity="0.15" />

      {/* Trophy Outline */}
      {/* Base Pedestal */}
      <rect x="400" y="540" width="200" height="30" rx="3" />
      <rect x="430" y="500" width="140" height="40" rx="2" />
      
      {/* Pedestal Stand */}
      <rect x="475" y="450" width="50" height="50" />
      
      {/* Trophy Cup Body */}
      <path d="M 390 230 C 390 410 610 410 610 230 Z" strokeWidth="1.5" />
      <path d="M 370 210 H 630" strokeWidth="1.5" />
      
      {/* Handles */}
      <path d="M 390 250 C 310 250 310 350 390 350" strokeWidth="1.2" />
      <path d="M 610 250 C 690 250 690 350 610 350" strokeWidth="1.2" />
      
      {/* Star inside cup */}
      <path d="M 500 260 L 506 275 H 522 L 509 284 L 514 299 L 500 290 L 486 299 L 491 284 L 478 275 H 494 Z" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}



export default function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll progress of the entire achievements section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Clamp progress to strictly [0, 1] to prevent the ball from floating past the dots
  const clampedProgress = useTransform(scrollYProgress, (value) => Math.min(Math.max(value, 0), 1));

  // Calculate active achievement index based on scroll segment (chronological scroll progress)
  useMotionValueEvent(clampedProgress, "change", (latest) => {
    let index = 0;
    if (latest >= 0.35 && latest < 0.75) {
      index = 1;
    } else if (latest >= 0.75) {
      index = 2;
    }
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Smooth progress indicators bound to clamped scroll progress
  const activeDotX = useTransform(clampedProgress, [0, 1], ["0%", "100%"]);
  const activeLineWidth = useTransform(clampedProgress, [0, 0.35, 0.75, 1], ["0%", "50%", "100%", "100%"]);
  
  // Vertical progress indicators for mobile
  const activeDotY = useTransform(clampedProgress, [0, 1], ["0%", "100%"]);
  const activeLineHeight = useTransform(clampedProgress, [0, 0.35, 0.75, 1], ["0%", "50%", "100%", "100%"]);

  // Mouse Tilt Motion (Desktop Card Hover Only)
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = -(mouseY / (height / 2)) * 2; // Max 2 deg rotation
    const rY = (mouseX / (width / 2)) * 2;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const currentAchievement = ACHIEVEMENTS[activeIndex];

  const contentVariants = {
    initial: { opacity: 0, y: 15, filter: "blur(4px)" },
    animate: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { type: "spring", stiffness: 140, damping: 22, mass: 0.7 } 
    },
    exit: { 
      opacity: 0, 
      y: -15, 
      filter: "blur(4px)", 
      transition: { duration: 0.18, ease: "easeInOut" } 
    }
  } as const;

  return (
    <section 
      ref={containerRef} 
      id="achievements" 
      className="relative w-full h-[320vh] bg-[#FAF6F0] dark:bg-[#08111F] border-b border-[var(--color-glass-border)] transition-colors duration-500"
    >
      {/* Section Header */}
      <div className="absolute top-0 left-0 w-full px-6 md:px-16 lg:px-24 pt-12 md:pt-18 pb-8 pointer-events-none z-20">
        <div className="max-w-2xl text-left pointer-events-auto flex flex-col items-start">
          <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold mb-3 text-[var(--color-hero-accent)] flex items-center gap-2 leading-none">
            Achievements
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-hero-accent)]" />
            <span className="w-6 h-[1px] bg-[var(--color-hero-accent)]/50" />
          </span>
          <h2 className="text-4xl md:text-5.5xl lg:text-6xl font-bold tracking-tight text-[var(--color-hero-heading)] mb-2 leading-none font-sans">
            Hall of Honors
          </h2>
          <p className="text-xs sm:text-base md:text-lg leading-relaxed text-[var(--color-hero-subtitle)]/80 transition-colors duration-500 font-sans max-w-xl">
            Milestones that shaped the journey.
          </p>
          <div className="w-16 h-1.5 rounded-full mt-6 bg-[var(--color-hero-accent)]" />
        </div>
      </div>

      {/* Pinned Sticky Box */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col justify-center">

        {/* Inner Content Area */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-16 lg:px-24 flex flex-col h-[92vh] md:h-[90vh] justify-end max-w-[1440px] mx-auto pb-2 md:pb-6">

          {/* Sticky Card Display Wrapper */}
          <div className="flex-grow flex items-center justify-center my-4 overflow-hidden relative w-full pt-16 md:pt-24">
            <div className="flex flex-row w-full h-full items-stretch justify-center gap-4 md:gap-12 max-h-[72dvh] md:max-h-[580px] lg:max-h-[620px] xl:max-h-[640px]">
              
              {/* MOBILE ONLY: Left vertical progress bar with rotated labels */}
              <div className="md:hidden flex flex-col items-center flex-shrink-0 relative w-12 h-[82%] self-center py-4 ml-1">
                {/* Vertical Line */}
                {/* Indicator Nodes */}
                <div className="relative w-full h-full flex flex-col justify-between items-end z-10">
                  {/* Vertical Line Track Container */}
                  <div className="absolute right-[13px] top-4 bottom-4 w-[1.5px] pointer-events-none">
                    {/* Vertical Line */}
                    <div className="w-full h-full bg-[var(--color-glass-border)] opacity-60" />
                    {/* Active Colored Line */}
                    <motion.div 
                      className="w-full bg-[var(--color-hero-accent)] absolute top-0 left-0 origin-top"
                      style={{ height: activeLineHeight }}
                    />
                  </div>
                  {ACHIEVEMENTS.map((ach, idx) => {
                    const isNodeActive = activeIndex === idx;
                    return (
                      <div key={ach.id} className="relative flex items-center justify-end h-8 pr-2">
                        <div 
                          className={`w-3 h-3 rounded-full border border-[var(--color-hero-accent)] bg-[#FAF6F0] dark:bg-[#08111F] transition-all duration-300 ${
                            isNodeActive ? "scale-125 border-2 bg-[var(--color-hero-accent)] shadow-[0_0_8px_var(--color-hero-accent)]" : "opacity-80"
                          }`}
                        />
                        <span 
                          className={`absolute right-6 font-mono text-[10px] font-extrabold tracking-wider transition-colors duration-300 ${
                            isNodeActive ? "text-[var(--color-hero-accent)]" : "text-[var(--color-hero-description)] opacity-60"
                          }`}
                        >
                          {ach.year}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* The Achievements Card */}
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ 
                  rotateX, 
                  rotateY, 
                  perspective: 1000, 
                  transformStyle: "preserve-3d"
                }}
                className="w-full md:max-w-[95%] lg:max-w-[90%] xl:max-w-[1100px] h-full flex flex-col items-stretch bg-[#FDFBF7] dark:bg-[#0A1628]/70 border border-[#EBE1D4]/80 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(181,117,82,0.04),0_1px_3px_rgba(181,117,82,0.02)] relative transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentAchievement.id}
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 w-full h-full flex flex-col p-5 md:p-6 justify-between"
                  >
                    {/* Subtle internal illustration backdrop */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch flex-grow overflow-hidden mb-4 md:mb-5">
                      {/* Left: Image Container */}
                      <div className="w-full md:w-[46%] h-[150px] md:h-auto border border-[#EBE1D4]/40 dark:border-slate-800/30 rounded-2xl flex items-center justify-center relative overflow-hidden bg-[#FAF6F0]/40 dark:bg-slate-900/20 flex-shrink-0">
                        <Image 
                          src={currentAchievement.image}
                          alt={currentAchievement.title}
                          fill
                          className="object-cover object-center transition-all duration-500 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority
                        />
                      </div>                      {/* Right: Content details */}
                      <div className="w-full md:w-[54%] md:h-full min-h-0 flex flex-col justify-between overflow-y-auto pr-1 scrollbar-none z-10">
                        <div className="flex flex-col">
                          {/* Badge + Year */}
                          <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-3">
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold bg-[#FAF5EE] dark:bg-slate-900/50 text-[var(--color-hero-accent)] border border-[#EBE1D4] dark:border-slate-800 uppercase tracking-wider">
                              <FaTrophy className="text-[10px] md:text-xs shrink-0" /> {currentAchievement.badge}
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold font-mono bg-[#FAF5EE] dark:bg-slate-900/50 text-[var(--color-hero-accent)] border border-[#EBE1D4] dark:border-slate-800">
                              <FaCalendarAlt className="text-[10px] md:text-xs shrink-0" /> {currentAchievement.date}
                            </span>
                          </div>
                          
                          {/* Heading */}
                          <h3 className="text-xl md:text-3.5xl font-extrabold text-[#1E293B] dark:text-slate-100 tracking-tight mb-1.5 md:mb-2 leading-tight">
                            {currentAchievement.title}
                          </h3>
                          
                          {/* Feature Subtitle */}
                          <div className="text-xs md:text-sm font-semibold tracking-wide text-[var(--color-hero-accent)] uppercase mb-2">
                            {currentAchievement.project}
                          </div>

                          {/* Description */}
                          <p className="text-xs md:text-[14px] leading-relaxed text-[#475569] dark:text-slate-300 max-w-xl">
                            {currentAchievement.description}
                          </p>

                          {/* Cash Prize Box */}
                          {currentAchievement.prize && (
                            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#FAF5EE] dark:bg-slate-900/40 border border-[#EBE1D4] dark:border-slate-800 w-fit mt-2.5 shadow-sm">
                              <div className="w-8 h-8 rounded-lg bg-[var(--color-hero-accent)]/10 flex items-center justify-center text-[var(--color-hero-accent)]">
                                <FaRupeeSign className="text-lg" />
                              </div>
                              <div className="flex flex-col leading-none gap-0.5">
                                <span className="text-[9px] text-[var(--color-hero-description)] font-bold uppercase tracking-wider">Cash Prize</span>
                                <span className="text-base font-extrabold text-[var(--color-hero-accent)]">{currentAchievement.prize.replace("₹", "")}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Tech Stack Tags Row */}
                    <div className="pt-3 border-t border-[#EBE1D4]/40 dark:border-slate-800/40 flex flex-wrap gap-1.5 md:gap-2">
                      {currentAchievement.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2.5 py-1 rounded-md text-[10px] md:text-xs font-semibold font-mono border border-[#EBE1D4]/60 dark:border-slate-800 bg-[#FAF5EE]/50 dark:bg-slate-900/30 text-[#6B7280] dark:text-slate-400 hover:border-[var(--color-hero-accent)]/40 hover:text-[var(--color-hero-accent)] transition-colors duration-300 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </motion.div>
                </AnimatePresence>
              </motion.div>

            </div>
          </div>

          {/* DESKTOP ONLY: Bottom horizontal progress bar */}
          <div className="hidden md:flex flex-col items-center justify-center w-full gap-4 relative z-20 py-2">
            <div className="relative w-full max-w-xl h-0.5 bg-[#EBE1D4] dark:bg-slate-800 opacity-80">
              {/* Active Completed Line */}
              <motion.div 
                className="absolute left-0 top-0 h-full bg-[var(--color-hero-accent)] origin-left"
                style={{ width: activeLineWidth }}
              />
              
              {/* Dot Nodes */}
              <div className="absolute inset-0 flex justify-between items-center z-10">
                {ACHIEVEMENTS.map((ach, idx) => {
                  const isNodeActive = activeIndex === idx;
                  return (
                    <div 
                      key={ach.id} 
                      onClick={() => {
                        // Smoothly navigate active node based on click
                        const rects = [0, 0.5, 1.0];
                        const scrollPos = rects[idx];
                        if (containerRef.current) {
                          const rect = containerRef.current.getBoundingClientRect();
                          const targetScroll = window.scrollY + rect.top + (scrollPos * rect.height);
                          window.scrollTo({ top: targetScroll, behavior: "smooth" });
                        }
                      }}
                      className="relative flex flex-col items-center cursor-pointer"
                    >
                      <div 
                        className={`w-3.5 h-3.5 rounded-full border border-[var(--color-hero-accent)] bg-[#FAF6F0] dark:bg-[#08111F] transition-all duration-300 ${
                          isNodeActive ? "scale-125 border-2 bg-[var(--color-hero-accent)] shadow-[0_0_8px_var(--color-hero-accent)]" : "opacity-80"
                        }`}
                      />
                      <div 
                        className={`absolute top-6 flex flex-col items-center text-center font-sans text-[10px] md:text-xs font-bold leading-tight transition-colors duration-300 w-36 ${
                          isNodeActive ? "text-[var(--color-hero-accent)] font-extrabold" : "text-[var(--color-hero-description)] opacity-60"
                        }`}
                      >
                        {ach.timelineLabel.map((line, lIdx) => (
                          <span key={lIdx}>{line}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Scroll explore indicator at very bottom */}
          <div className="w-full flex items-center justify-center pointer-events-none mt-10">
            <span className="text-[10px] font-bold font-mono tracking-widest text-[var(--color-hero-accent)]/60 uppercase flex flex-row items-center gap-2">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                <TfiMouse className="w-4 h-5 text-[var(--color-hero-accent)] shrink-0" />
              </motion.div>
              <span>scroll to explore more achievements</span>
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
