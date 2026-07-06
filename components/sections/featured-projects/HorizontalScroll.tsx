"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HorizontalScrollProps {
  children: React.ReactNode;
  itemCount: number;
  scrollYProgress: MotionValue<number>;
  overlay?: (progress: MotionValue<number>) => React.ReactNode;
}

export default function HorizontalScroll({ children, itemCount, scrollYProgress, overlay }: HorizontalScrollProps) {
  // The total width of the horizontal strip is itemCount * 100vw.
  // We need to translate by -(itemCount - 1) * 100vw.
  const xPercent = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((itemCount - 1) / itemCount) * 100}%`]
  );

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
      <motion.div
        style={{ x: xPercent, width: `${itemCount * 100}vw` }}
        className="flex h-full items-center"
      >
        {children}
      </motion.div>

      {overlay && overlay(scrollYProgress)}
    </div>
  );
}
