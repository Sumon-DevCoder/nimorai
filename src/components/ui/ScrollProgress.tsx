"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin gradient scroll-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed top-0 right-0 left-0 z-80 h-[2.5px] origin-left bg-linear-to-r from-teal-500 via-aqua-400 to-lime-300 shadow-[0_0_12px_rgb(90_216_239/0.8)]"
    />
  );
}

