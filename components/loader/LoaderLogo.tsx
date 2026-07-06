"use client";

import React from "react";
import { motion } from "framer-motion";
import { logoPathVariants } from "./loaderMotion";

// The "Nexus Node" logo: three overlapping partial-arc rings around a
// central geometric node — representing distributed systems / interconnected services.
// Entirely SVG, no images, no letters.
const SIZE = 80; // viewBox size
const CX = 40;   // center
const CY = 40;

// Three ellipses at 0°, 60°, 120° tilt — overlapping to form an orbital mesh
const RING_CONFIGS = [
  { rx: 22, ry: 11, rotate: 0 },
  { rx: 22, ry: 11, rotate: 60 },
  { rx: 22, ry: 11, rotate: 120 },
];

function ellipsePath(rx: number, ry: number, cx: number, cy: number): string {
  // Full ellipse as an SVG path (two arcs)
  return `
    M ${cx - rx} ${cy}
    A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy}
    A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy}
  `;
}

export default function LoaderLogo() {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width="100%"
      height="100%"
      aria-hidden="true"
      overflow="visible"
    >
      <defs>
        <filter id="glow-logo" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="accent-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--hero-accent)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--hero-accent)" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* Three orbital rings — drawn on with pathLength */}
      {RING_CONFIGS.map((ring, i) => (
        <g
          key={i}
          transform={`rotate(${ring.rotate} ${CX} ${CY})`}
          filter="url(#glow-logo)"
        >
          <motion.path
            d={ellipsePath(ring.rx, ring.ry, CX, CY)}
            fill="none"
            stroke="var(--hero-accent)"
            strokeWidth={0.9}
            strokeLinecap="round"
            strokeOpacity={0.85}
            variants={logoPathVariants}
            initial="hidden"
            animate="visible"
            custom={i}
            transition={{
              pathLength: { duration: 0.9, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
              opacity:    { duration: 0.3, delay: 0.25 + i * 0.12 },
            }}
          />
        </g>
      ))}

      {/* Six equatorial intersection node dots */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = CX + 22 * Math.cos(rad);
        const y = CY + 11 * Math.sin(rad);
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={1.4}
            fill="var(--hero-accent)"
            filter="url(#glow-logo)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.7],
              scale: 1,
            }}
            transition={{
              duration: 0.4,
              delay: 0.8 + i * 0.06,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* Central core node */}
      <motion.circle
        cx={CX}
        cy={CY}
        r={3.5}
        fill="url(#accent-grad)"
        filter="url(#glow-logo)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: [0, 1.3, 1] }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Core pulse ring */}
      <motion.circle
        cx={CX}
        cy={CY}
        r={6}
        fill="none"
        stroke="var(--hero-accent)"
        strokeWidth={0.6}
        strokeOpacity={0.5}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0.5, 1.2, 1], opacity: [0, 0.6, 0.3] }}
        transition={{ duration: 1.2, delay: 0.7, ease: "easeOut", repeat: Infinity, repeatType: "mirror" }}
      />
    </svg>
  );
}
