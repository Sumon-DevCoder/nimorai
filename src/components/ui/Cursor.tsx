"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Custom desktop cursor (inner dot + spring-lagged outer ring that scales up
 * over interactive elements). Hidden on touch/coarse pointers and reduced motion.
 */
export function Cursor() {
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const enabled = !isTouch && !reduced;

  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.45 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);

      const target = event.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest(
          'a, button, [role="button"], [role="tab"], input, summary, [data-cursor]',
        ),
      );
      setHovered(interactive);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-90 hidden pointer-fine:block"
    >
      <motion.span
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: pressed ? 0.82 : hovered ? 1.65 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 340, damping: 24 }}
        className="fixed top-0 left-0 -mt-5 -ml-5 size-10 rounded-full border border-teal-500/45 bg-aqua-400/10 backdrop-blur-[1px]"
      />
      <motion.span
        style={{ x, y }}
        animate={{
          scale: pressed ? 1.5 : hovered ? 0.5 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 -mt-1 -ml-1 size-2 rounded-full bg-teal-600 shadow-[0_0_12px_rgb(47_191_224/0.9)]"
      />
    </div>
  );
}

