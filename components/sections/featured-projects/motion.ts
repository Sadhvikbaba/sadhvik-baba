import { Variants } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Featured Projects — Motion Variants
// GPU-friendly: only animate transform and opacity, never layout properties.
// All transitions respect prefers-reduced-motion via Framer Motion's global
// reducedMotion setting (set in the provider or per-variant where needed).
// ─────────────────────────────────────────────────────────────────────────────

/** Ease curve shared across the section — matches the rest of the portfolio */
export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// ── Section Header ────────────────────────────────────────────────────────────

export const sectionHeaderVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_PREMIUM },
  },
};

// ── Project Card Content ──────────────────────────────────────────────────────

export const staggerCardContent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

export const cardContentVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
};

// ── Engineering Highlights ────────────────────────────────────────────────────

export const staggerHighlights: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

export const highlightVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ── Tech Pills ────────────────────────────────────────────────────────────────

export const staggerPills: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
};

export const techPillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.78, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.38, ease: EASE_PREMIUM },
  },
};

// ── Metric Cards ──────────────────────────────────────────────────────────────

export const staggerMetrics: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

export const metricCardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
