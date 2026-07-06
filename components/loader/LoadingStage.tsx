"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stageTextVariants } from "./loaderMotion";
import { LOADING_STAGES, LoadingStage } from "./loaderConstants";

interface LoadingStageProps {
  stage: LoadingStage;
  stageIndex: number;
}

export default function LoadingStageDisplay({ stage, stageIndex }: LoadingStageProps) {
  const isLast = stageIndex === LOADING_STAGES.length - 1;

  return (
    <div
      className="flex flex-col items-center gap-2.5"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Stage dots */}
      <div className="flex gap-1.5 items-center" aria-hidden="true">
        {LOADING_STAGES.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === stageIndex ? "20px" : "5px",
              height: "5px",
              borderRadius: "9999px",
              background: i <= stageIndex ? "var(--hero-accent)" : "var(--glass-card-border)",
              transition: "all 0.3s ease",
              opacity: i <= stageIndex ? 1 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Stage text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={stage}
          variants={stageTextVariants}
          initial="enter"
          animate="visible"
          exit="exit"
          className="font-mono text-xs tracking-[0.2em] uppercase select-none"
          style={{
            color: isLast ? "var(--hero-accent)" : "var(--hero-description)",
            fontWeight: isLast ? 700 : 400,
          }}
        >
          {stage}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
