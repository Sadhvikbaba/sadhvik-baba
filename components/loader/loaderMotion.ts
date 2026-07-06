import { Variants } from "framer-motion";

// ── Background & container ────────────────────────────────────────────────────
export const loaderContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    filter: "blur(12px)",
    scale: 1.04,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

// ── Particles ────────────────────────────────────────────────────────────────
export const particleVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ── Central glow spark ────────────────────────────────────────────────────────
export const sparkVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: [0, 1, 0.6],
    scale: [0, 1.4, 1],
    transition: { duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
  },
  collapse: {
    opacity: 0,
    scale: 2,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

// ── Logo ────────────────────────────────────────────────────────────────────
export const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    scale: 0.85,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

export const logoPathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Progress ring ────────────────────────────────────────────────────────────
export const progressRingVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// ── Network graph container ───────────────────────────────────────────────────
export const networkVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay: 0.5 },
  },
  collapse: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

// ── Individual network node ───────────────────────────────────────────────────
export const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: 0.8 + i * 0.07,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  collapse: (i: number) => ({
    opacity: 0,
    x: 0,
    y: 0,
    scale: 0,
    transition: {
      duration: 0.35,
      delay: i * 0.03,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

// ── Connection line ───────────────────────────────────────────────────────────
export const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 0.35,
    transition: {
      duration: 0.5,
      delay: 1.1 + i * 0.06,
      ease: "easeOut",
    },
  }),
  collapse: {
    pathLength: 0,
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

// ── Loading stage text ─────────────────────────────────────────────────────────
export const stageTextVariants: Variants = {
  enter: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};
