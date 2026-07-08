"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingStageDisplay from "./LoadingStage";
import { LOADING_STAGES, LOADER_TIMING, LoadingStage } from "./loaderConstants";
import { loaderContainerVariants } from "./loaderMotion";

interface PortfolioLoaderProps {
  onComplete: () => void;
}

export default function PortfolioLoader({ onComplete }: PortfolioLoaderProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const currentStage = LOADING_STAGES[stageIndex] as LoadingStage;

  // ── Text stage cycling ─────────────────────────────────────────────────────
  useEffect(() => {
    const stages = LOADING_STAGES.length;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < stages) {
        setStageIndex(i);
      } else {
        clearInterval(interval);
      }
    }, LOADER_TIMING.stageDuration + 50);
    return () => clearInterval(interval);
  }, []);

  // ── Progress animation ─────────────────────────────────────────────────────
  useEffect(() => {
    const start = performance.now();
    const duration = LOADER_TIMING.minDisplay;
    let rafId: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── Collapse + exit sequence ───────────────────────────────────────────────
  const triggerExit = useCallback(() => {
    setIsExiting(true);
    setTimeout(onComplete, 650);
  }, [onComplete]);

  useEffect(() => {
    const minTimer = setTimeout(triggerExit, LOADER_TIMING.minDisplay);
    const hardTimer = setTimeout(() => {
      clearTimeout(minTimer);
      triggerExit();
    }, LOADER_TIMING.hardTimeout);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(hardTimer);
    };
  }, [triggerExit]);

  // SVG parameters for progress ring
  const radius = 55;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          role="status"
          aria-label="Loading portfolio"
          aria-busy={!isExiting}
          variants={loaderContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none h-[100dvh] w-screen"
          style={{ background: "var(--site-bg)" }}
        >
          {/* Centerpiece container */}
          <div className="relative flex items-center justify-center w-40 h-40">
            
            {/* Circular Progress Loader */}
            <svg className="absolute w-[130px] h-[130px] -rotate-90">
              {/* Background Ring */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="stroke-[var(--glass-card-border)] fill-none"
                strokeWidth={strokeWidth}
                style={{ opacity: 0.5 }}
              />
              {/* Foreground Progress */}
              <motion.circle
                cx="65"
                cy="65"
                r={radius}
                className="stroke-[var(--hero-accent)] fill-none"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transition={{ ease: "easeInOut" }}
              />
            </svg>

            {/* Monogram Logo (in the middle of the progress circle) */}
            <div className="relative font-serif text-4xl font-semibold text-[var(--footer-title)] leading-none h-16 w-16 flex items-center justify-center select-none z-10">
              <span className="absolute -translate-y-1.5 -translate-x-1.5">S</span>
              <span className="absolute translate-y-1.5 translate-x-1.5">B</span>
              {/* Star on top right of the monogram logo */}
              <div className="absolute top-0 right-[-8px]">
                <svg className="w-3.5 h-3.5 text-[var(--footer-accent)] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
                </svg>
              </div>
            </div>

          </div>

          {/* Bottom text + dots area */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute bottom-12 flex flex-col items-center gap-4"
            style={{ zIndex: 1 }}
          >
            <LoadingStageDisplay stage={currentStage} stageIndex={stageIndex} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
