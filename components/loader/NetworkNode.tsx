"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaAws,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiGo,
  SiDocker,
  SiMongodb,
  SiRedis,
  SiPostgresql,
  SiWebrtc,
} from "react-icons/si";
import { TechNode } from "./loaderConstants";
import { nodeVariants } from "./loaderMotion";

// Map icon string names to actual components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  FaReact:        FaReact,
  SiNextdotjs:    SiNextdotjs,
  SiNodedotjs:    SiNodedotjs,
  SiGo:           SiGo,
  SiDocker:       SiDocker,
  SiAmazonaws:    FaAws,
  SiMongodb:      SiMongodb,
  SiRedis:        SiRedis,
  SiPostgresql:   SiPostgresql,
  SiWebrtc:       SiWebrtc,
};

interface NetworkNodeProps {
  node: TechNode;
  index: number;
  networkRadius: number; // px
  isCollapsing: boolean;
  centerX: number;
  centerY: number;
  nodeX: number;
  nodeY: number;
}

export default function NetworkNode({
  node,
  index,
  isCollapsing,
  nodeX,
  nodeY,
}: NetworkNodeProps) {
  const Icon = ICON_MAP[node.iconName] || FaReact;

  return (
    <motion.div
      key={node.id}
      custom={index}
      variants={nodeVariants}
      initial="hidden"
      animate={isCollapsing ? "collapse" : "visible"}
      style={{
        position: "absolute",
        left: nodeX,
        top: nodeY,
        transform: "translate(-50%, -50%)",
        willChange: "transform, opacity",
      }}
    >
      {/* Pulse ring behind icon */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid var(--hero-accent)",
          opacity: 0.3,
          width: "100%",
          height: "100%",
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{
          duration: 2.5,
          delay: 1.1 + index * 0.08,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Icon container */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "var(--glass-card-bg)",
          border: "1px solid var(--glass-card-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 12px color-mix(in srgb, var(--hero-accent) 20%, transparent)",
        }}
      >
        <Icon
          style={{ color: "var(--hero-accent)", width: 16, height: 16 }}
        />
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 4px)",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "8px",
          letterSpacing: "0.1em",
          color: "var(--hero-description)",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      >
        {node.label}
      </div>
    </motion.div>
  );
}
