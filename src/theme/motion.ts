import type { Transition, Variants } from "framer-motion";

/** Shared motion personality — calm instrument chrome (corporate / premium). */
export const easeOut = [0.2, 0, 0, 1] as const;
export const easeStandard = [0.4, 0, 0.2, 1] as const;

export const duration = {
  instant: 0,
  fast: 0.14,
  base: 0.22,
  slow: 0.35,
  enter: 0.45,
} as const;

export function fadeUpVariants(reduceMotion: boolean | null): Variants {
  if (reduceMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      show: { opacity: 1, y: 0 },
      exit: { opacity: 0 },
    };
  }
  return {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98 },
  };
}

export function listStagger(reduceMotion: boolean | null, stagger = 0.05): Variants {
  return {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: stagger, delayChildren: 0.02 },
    },
  };
}

export function itemTransition(reduceMotion: boolean | null, delay = 0): Transition {
  if (reduceMotion) return { duration: 0 };
  return {
    duration: duration.base,
    ease: easeOut,
    delay,
  };
}

export function springSnappy(reduceMotion: boolean | null): Transition {
  if (reduceMotion) return { duration: 0 };
  return {
    type: "spring",
    stiffness: 480,
    damping: 38,
    mass: 0.7,
  };
}
