"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "./BackgroundParticles";
import LoaderLogo from "./LoaderLogo";
import NetworkGraph from "./NetworkGraph";
import ProgressRing from "./ProgressRing";
import LoadingStageDisplay from "./LoadingStage";
import { loaderContainerVariants, sparkVariants, logoVariants } from "./loaderMotion";
import { LOADING_STAGES, LOADER_TIMING, LoadingStage } from "./loaderConstants";

interface PortfolioLoaderProps {
  onComplete: () => void;
}

// Responsive network radius using a clamp calculation
function useNetworkRadius(): number {
  const [radius, setRadius] = useState(210);
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      // clamp(140px, 17.5vw, 210px) — half of network diameter
      const r = Math.max(140, Math.min(Math.round(vw * 0.175), 210));
      setRadius(r);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  return radius;
}

// Logo container size: clamp(100px, 11vw, 140px)
function useLogoSize(): number {
  const [size, setSize] = useState(140);
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const s = Math.max(100, Math.min(Math.round(vw * 0.11), 140));
      setSize(s);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

// Progress ring size: fits between logo and network nodes
function useProgressRingSize(networkRadius: number): number {
  return Math.round(networkRadius * 0.62);
}

export default function PortfolioLoader({ onComplete }: PortfolioLoaderProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const networkRadius = useNetworkRadius();
  const logoSize = useLogoSize();
  const ringSize = useProgressRingSize(networkRadius);

  const currentStage = LOADING_STAGES[stageIndex] as LoadingStage;

  // ── Text stage cycling ─────────────────────────────────────────────────────
  useEffect(() => {
    if (isCollapsing) return;
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
  }, [isCollapsing]);

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
    setIsCollapsing(true);
    // After 400ms collapse, begin full loader fade-out
    setTimeout(() => {
      setIsExiting(true);
      // After fade-out completes, call onComplete
      setTimeout(onComplete, 650);
    }, 400);
  }, [onComplete]);

  useEffect(() => {
    // Minimum display time
    const minTimer = setTimeout(triggerExit, LOADER_TIMING.minDisplay);
    // Hard safety cap
    const hardTimer = setTimeout(() => {
      clearTimeout(minTimer);
      triggerExit();
    }, LOADER_TIMING.hardTimeout);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(hardTimer);
    };
  }, [triggerExit]);

  // ── Reduced motion: simplified version ────────────────────────────────────
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduced) {
    return (
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            role="status"
            aria-label="Loading portfolio"
            aria-busy={!isExiting}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: "var(--sky-main)" }}
          >
            <div style={{ width: logoSize, height: logoSize }}>
              <LoaderLogo />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: "var(--sky-main)" }}
        >
          {/* ── Background radial glow ─────────────────────────────────────── */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, var(--hero-accent) 6%, transparent) 0%, transparent 70%)",
            }}
          />

          {/* ── Particles ─────────────────────────────────────────────────── */}
          <BackgroundParticles />

          {/* ── Main centerpiece ──────────────────────────────────────────── */}
          <div className="relative flex items-center justify-center" style={{ zIndex: 1 }}>
            {/* Network graph (behind logo) */}
            <NetworkGraph
              networkRadius={networkRadius}
              isCollapsing={isCollapsing}
            />

            {/* Progress ring (between network and logo) */}
            <ProgressRing
              progress={progress}
              size={ringSize * 2}
            />

            {/* Central spark (appears first, then becomes the logo) */}
            <motion.div
              variants={sparkVariants}
              initial="hidden"
              animate={isCollapsing ? "collapse" : "visible"}
              aria-hidden="true"
              style={{
                position: "absolute",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "var(--hero-accent)",
                boxShadow: "0 0 20px var(--hero-accent), 0 0 40px var(--hero-accent)",
              }}
            />

            {/* Logo */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate={isCollapsing ? "exit" : "visible"}
              style={{
                width: logoSize,
                height: logoSize,
                position: "relative",
                zIndex: 2,
                flexShrink: 0,
              }}
            >
              <LoaderLogo />
            </motion.div>
          </div>

          {/* ── Bottom text area ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isCollapsing ? 0 : 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
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
