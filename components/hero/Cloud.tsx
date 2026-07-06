"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CloudProps {
  id: number;
  src: string;
  position: string;
  scrollX: [string, string];
  scrollY: [string, string];
  scrollScale: [number, number];
  mouse: number;
  float: number;
  scale: number;
  opacity: number;
  blur: number;
  zIndex: number;
  priority?: boolean;
  origin: string;
  scrollProgress: MotionValue<number>;
  mouseXSpring: MotionValue<number>;
  mouseYSpring: MotionValue<number>;
  theme: "light" | "dark";
  activeTheme: "light" | "dark";
}

export default function Cloud({
  id,
  src,
  position,
  scrollX,
  scrollY,
  scrollScale,
  mouse,
  float,
  scale,
  opacity,
  blur,
  zIndex,
  priority = false,
  origin,
  scrollProgress,
  mouseXSpring,
  mouseYSpring,
  theme,
  activeTheme,
}: CloudProps) {
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [disableMouse, setDisableMouse] = useState(false);

  useEffect(() => {
    // Respect accessibility settings
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setDisableAnimations(prefersReduced);

    // Disable mouse parallax on mobile/tablet touch screens
    const canHover = window.matchMedia("(hover: hover)").matches;
    setDisableMouse(!canHover || prefersReduced);
  }, []);

  // 1. 3D Scroll Parallax (Outer & Inner Scaling)
  // Under prefers-reduced-motion, lock horizontal parting and scale zooming.
  const animScrollX = useTransform(scrollProgress, [0, 1], disableAnimations ? ["0vw", "0vw"] : scrollX);
  const animScrollY = useTransform(scrollProgress, [0, 1], scrollY);
  const animScrollScale = useTransform(scrollProgress, [0, 1], disableAnimations ? [scale, scale] : scrollScale);

  // 2. Mouse Parallax (Middle Container)
  // Maps normalized mouse coordinates [-0.5, 0.5] to spring-smoothed translation offsets.
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-mouse, mouse]);
  const translateYMouse = useTransform(mouseYSpring, [-0.5, 0.5], [-mouse, mouse]);

  const mouseStyle = disableMouse
    ? {}
    : { x: translateX, y: translateYMouse };

  const isVisible = theme === activeTheme;

  // Setup blur style
  const filterStyle = blur > 0 ? `blur(${blur}px)` : "none";

  return (
    <motion.div
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1.6, ease: "easeInOut" }}
      style={{
        x: animScrollX,
        y: animScrollY,
        zIndex,
        willChange: "transform, opacity",
      }}
      className={`absolute pointer-events-none select-none ${position}`}
    >
      <motion.div
        style={{
          ...mouseStyle,
          transformOrigin: origin,
          willChange: "transform",
        }}
        className="w-full h-full"
      >
        <motion.div
          animate={
            disableAnimations
              ? {}
              : {
                  x: activeTheme === "dark" ? [0, 6, -4, 0] : [0, 5, -4, 0],
                  y: activeTheme === "dark" ? [0, -8, 5, 0] : [0, -8, 4, 0],
                  opacity: [opacity, opacity * 0.96, opacity],
                }
          }
          transition={
            disableAnimations
              ? {}
              : {
                  x: {
                    duration: float,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  y: {
                    duration: float * 0.85,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: 40,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
          style={{
            filter: filterStyle,
            scale: animScrollScale,
            willChange: "transform, opacity",
          }}
          className="w-full h-full relative"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 768px) 80vw, 100vw"
            quality={80}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
