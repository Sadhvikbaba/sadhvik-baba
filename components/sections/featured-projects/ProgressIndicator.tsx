"use client";

import React, { useState, useEffect } from "react";
import { motion, MotionValue } from "framer-motion";

interface ProgressIndicatorProps {
  items: { id: string; title: string }[];
  scrollYProgress: MotionValue<number>;
}

export default function ProgressIndicator({ items, scrollYProgress }: ProgressIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Divide the scroll progress into equal chunks for each item
      const index = Math.round(latest * (items.length - 1));
      setActiveIndex(Math.min(Math.max(index, 0), items.length - 1));
    });
  }, [scrollYProgress, items.length]);

  return (
    <div className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 pointer-events-none">
      {items.map((item, idx) => {
        const isActive = activeIndex === idx;
        const isPast = activeIndex > idx;
        
        return (
          <div key={item.id} className="flex flex-col gap-1.5 transition-all duration-500">
            <div 
              className={`text-[10px] font-mono font-bold tracking-widest transition-colors duration-300 
                ${isActive ? "text-[var(--color-hero-accent)]" : isPast ? "text-[var(--color-hero-subtitle)]" : "text-[var(--color-hero-description)] opacity-50"}
              `}
            >
              {item.id}
            </div>
            
            <div 
              className={`text-xs font-sans font-bold tracking-wide transition-all duration-300 whitespace-nowrap 
                ${isActive ? "text-[var(--color-hero-heading)] translate-x-1" : isPast ? "text-[var(--color-hero-subtitle)]" : "text-[var(--color-hero-description)] opacity-50"}
              `}
            >
              {item.title}
            </div>

            {/* Linear-style line indicator */}
            <div className="relative w-12 h-[2px] rounded-full overflow-hidden bg-[var(--color-glass-border)]">
              {isActive && (
                <motion.div 
                  layoutId="activeProgressLine"
                  className="absolute inset-0 bg-[var(--color-hero-accent)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {isPast && (
                <div className="absolute inset-0 bg-[var(--color-hero-accent)]/40" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
