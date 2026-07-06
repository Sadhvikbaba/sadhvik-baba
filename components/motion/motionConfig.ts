import { Variants } from "framer-motion";

export const motionConfig = {
  fadeUp: {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as Variants,

  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  } as Variants,

  cardHover: {
    scale: 1,
    y: 0,
    hover: {
      y: -6,
      scale: 1.01,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  },

  pillHover: {
    hover: {
      scale: 1.05,
      y: -1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    tap: {
      scale: 0.98,
    },
  } as Variants,
};
