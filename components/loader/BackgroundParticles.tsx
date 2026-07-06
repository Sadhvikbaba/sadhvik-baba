"use client";

import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PARTICLE_CONFIG } from "./loaderConstants";
import { particleVariants } from "./loaderMotion";

interface Particle {
  id: number;
  x: number;   // % from left
  y: number;   // % from top
  size: number; // px
  opacity: number;
  delay: number;
  duration: number;
  driftY: number; // px drift
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    opacity: 0.12 + Math.random() * 0.28,
    delay: Math.random() * 1.5,
    duration: 3 + Math.random() * 4,
    driftY: -15 - Math.random() * 25,
  }));
}

export default function BackgroundParticles() {
  const [count, setCount] = useState<number>(PARTICLE_CONFIG.desktop);

  useEffect(() => {
    const w = window.innerWidth;
    if (w < 640) setCount(PARTICLE_CONFIG.mobile);
    else if (w < 1024) setCount(PARTICLE_CONFIG.tablet);
    else setCount(PARTICLE_CONFIG.desktop);
  }, []);

  const particles = useMemo(() => generateParticles(count), [count]);

  // Respect prefers-reduced-motion — skip particles entirely
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          variants={particleVariants}
          initial="hidden"
          animate={{
            opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
            y: [0, p.driftY, 0],
          }}
          transition={{
            opacity: {
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
            y: {
              duration: p.duration * 1.3,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: "var(--hero-accent)",
            opacity: p.opacity,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
