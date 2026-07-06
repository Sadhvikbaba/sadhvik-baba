"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

export const NAV_ITEMS = [
  { id: "01", title: "HERO", href: "#hero" },
  { id: "02", title: "ABOUT", href: "#about" },
  { id: "03", title: "LEETCODE", href: "#leetcode" },
  { id: "04", title: "TECH STACK", href: "#toolbox" },
  { id: "05", title: "PROJECTS", href: "#projects" },
  { id: "06", title: "EXPERIENCE", href: "#experience" },
  { id: "07", title: "CERTIFICATIONS", href: "#certifications" },
  { id: "08", title: "CONTACT", href: "#contact" },
];

export default function PageNavigation() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const { scrollY } = useScroll();
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  // Intersection Observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is intersecting the most
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio to find the most visible one
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const targetId = visibleEntries[0].target.getAttribute("id");
          if (targetId) {
            setActiveSection(targetId);
          }
        }
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // Observe all sections
    NAV_ITEMS.forEach(item => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Detect scroll direction for mobile hide/show behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 50) {
      setIsScrollingDown(true);
    } else {
      setIsScrollingDown(false);
    }
  });

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      <>
        {/* ── DESKTOP: Glass Sidebar (Hover to Expand) ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          className="hidden md:flex fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-50 py-6 px-2 rounded-[2rem] bg-[#F5F2EB]/60 dark:bg-[#0A1424]/60 backdrop-blur-xl border border-[#E6E1D3]/50 dark:border-slate-800/60 shadow-[0_8px_32px_rgba(0,0,0,0.05)] group transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] flex-col gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <div 
                key={item.id} 
                onClick={() => scrollToSection(item.href)}
                className="relative flex items-center gap-4 cursor-pointer px-4 py-3 rounded-full transition-colors duration-300"
              >
                {/* Subtle active background */}
                {isActive && (
                  <motion.div 
                    layoutId="desktopActiveNavIndicator"
                    className="absolute inset-0 bg-[var(--color-hero-accent)]/10 dark:bg-[var(--color-hero-accent)]/15 rounded-full pointer-events-none"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Number */}
                <span className={`relative z-10 font-mono text-sm font-bold transition-colors duration-300 ${isActive ? 'text-[var(--color-hero-accent)]' : 'text-slate-400 dark:text-slate-500'}`}>
                  {item.id}
                </span>
                
                {/* Line and Title (Revealed on Group Hover) */}
                <div className="flex items-center gap-4 overflow-hidden max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div className={`h-[1px] w-6 shrink-0 transition-colors duration-300 ${isActive ? 'bg-[var(--color-hero-accent)]' : 'bg-slate-300 dark:bg-slate-600'}`} />
                  <span className={`text-xs font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[var(--color-hero-heading)]' : 'text-slate-400 dark:text-slate-500'}`}>
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ── MOBILE: Bottom Pill (Hides on Scroll Down) ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: isScrollingDown ? 0 : 1, 
            y: isScrollingDown ? 50 : 0 
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-1.5 rounded-full bg-[#F5F2EB]/90 dark:bg-[#0A1424]/90 backdrop-blur-xl border border-[#E6E1D3]/80 dark:border-slate-700 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-x-auto max-w-[90vw]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <div 
                key={item.id} 
                onClick={() => scrollToSection(item.href)}
                className="relative px-4 py-2 cursor-pointer shrink-0"
              >
                {isActive && (
                  <motion.div 
                    layoutId="mobileActiveNavIndicator"
                    className="absolute inset-0 bg-[var(--color-hero-accent)]/15 dark:bg-[var(--color-hero-accent)]/20 rounded-full shadow-inner"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 font-mono text-sm font-bold transition-colors duration-300 ${isActive ? 'text-[var(--color-hero-accent)]' : 'text-slate-500 dark:text-slate-400'}`}>
                  {item.id}
                </span>
              </div>
            );
          })}
        </motion.div>
      </>
    </AnimatePresence>
  );
}
