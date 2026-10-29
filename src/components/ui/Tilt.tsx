"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
  /** Show a soft radial glare that follows the pointer. */
  glare?: boolean;
};

/**
 * 3D perspective tilt wrapper driven by `motion/react` springs.
 * Automatically disabled on touch devices and when reduced motion is enabled.
 */
export function Tilt({ children, className, max = 6, glare = true }: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const enabled = !isTouch && !reduced;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const smoothX = useSpring(px, { stiffness: 180, damping: 20, mass: 0.5 });
  const smoothY = useSpring(py, { stiffness: 180, damping: 20, mass: 0.5 });

  const rotateX = useTransform(smoothY, [0, 1], [max, -max]);
  const rotateY = useTransform(smoothX, [0, 1], [-max, max]);

  const glareX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [0, 1], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.35), transparent 70%)`;

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set(Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)));
    py.set(Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)));
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        enabled
          ? {
              rotateX,
              rotateY,
              transformPerspective: 1100,
              transformStyle: "preserve-3d",
            }
          : undefined
      }
      className={cn("relative will-change-transform", className)}
    >
      {children}
      {enabled && glare && (
        <motion.div
          aria-hidden="true"
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
    </motion.div>
  );
}

