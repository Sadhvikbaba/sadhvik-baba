"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { TECH_NODES } from "./loaderConstants";
import { networkVariants, lineVariants } from "./loaderMotion";
import NetworkNode from "./NetworkNode";

interface NetworkGraphProps {
  networkRadius: number; // px — clamp(140, 17.5vw, 210) → half of clamp(280, 35vw, 420)
  isCollapsing: boolean;
}

export default function NetworkGraph({ networkRadius, isCollapsing }: NetworkGraphProps) {
  const CENTER = networkRadius; // The SVG is 2×radius square, center at (r, r)
  const SIZE = networkRadius * 2;

  // Pre-compute each node's (x, y) position from its angle and radius factor
  const nodes = useMemo(() =>
    TECH_NODES.map((node) => {
      const rad = ((node.angle - 90) * Math.PI) / 180; // -90° so 0° = top
      const r = networkRadius * node.radiusFactor;
      return {
        ...node,
        nodeX: CENTER + r * Math.cos(rad),
        nodeY: CENTER + r * Math.sin(rad),
      };
    }),
    [networkRadius, CENTER]
  );

  return (
    <motion.div
      variants={networkVariants}
      initial="hidden"
      animate={isCollapsing ? "collapse" : "visible"}
      style={{
        position: "absolute",
        width: SIZE,
        height: SIZE,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      {/* SVG layer for connection lines */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ position: "absolute", inset: 0 }}
        overflow="visible"
      >
        <defs>
          <filter id="glow-line">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {nodes.map((node, i) => (
          <motion.line
            key={`line-${node.id}`}
            x1={CENTER}
            y1={CENTER}
            x2={node.nodeX}
            y2={node.nodeY}
            stroke="var(--hero-accent)"
            strokeWidth={0.7}
            filter="url(#glow-line)"
            variants={lineVariants}
            custom={i}
            initial="hidden"
            animate={isCollapsing ? "collapse" : "visible"}
          />
        ))}

        {/* Slow-rotating outer orbit hint ring */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={networkRadius * 0.92}
          fill="none"
          stroke="var(--glass-card-border)"
          strokeWidth={0.5}
          strokeDasharray="3 6"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isCollapsing ? 0 : 0.3,
            rotate: 360,
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.5 },
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />
      </svg>

      {/* DOM layer for icon nodes */}
      {nodes.map((node, i) => (
        <NetworkNode
          key={node.id}
          node={node}
          index={i}
          networkRadius={networkRadius}
          isCollapsing={isCollapsing}
          centerX={CENTER}
          centerY={CENTER}
          nodeX={node.nodeX}
          nodeY={node.nodeY}
        />
      ))}
    </motion.div>
  );
}
