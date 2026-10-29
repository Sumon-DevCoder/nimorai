"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import { useIsTouch } from "./useIsTouch";
import { useReducedMotion } from "./useReducedMotion";

type Options = {
  /** Spring stiffness / damping for the smoothed values. */
  stiffness?: number;
  damping?: number;
};

/**
 * Tracks the pointer relative to `ref` (or the window when no ref is given)
 * and returns smoothed motion values normalised to the range -1 … 1.
 * Disabled on touch devices and when reduced motion is preferred.
 */
export function useMouseParallax(
  ref?: RefObject<HTMLElement | null>,
  { stiffness = 90, damping = 20 }: Options = {},
): { x: MotionValue<number>; y: MotionValue<number>; enabled: boolean } {
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const enabled = !isTouch && !reduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping, mass: 0.6 });
  const y = useSpring(rawY, { stiffness, damping, mass: 0.6 });

  useEffect(() => {
    if (!enabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref?.current;
        const rect = el
          ? el.getBoundingClientRect()
          : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
        const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        rawX.set(Math.max(-1, Math.min(1, nx)));
        rawY.set(Math.max(-1, Math.min(1, ny)));
      });
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, ref, rawX, rawY]);

  return { x, y, enabled };
}

