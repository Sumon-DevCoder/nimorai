"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the animation begins. */
  delay?: number;
  /** Initial vertical offset in pixels (24–40px recommended). */
  y?: number;
  /** If set, animates direct children (or matching selector) with a stagger. */
  stagger?: number;
  staggerSelector?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "span";
};

/**
 * Scroll-triggered entrance reveal using GSAP + ScrollTrigger (`power3.out`, once-only).
 * Animates only `transform` and `opacity` and respects `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  stagger,
  staggerSelector = ":scope > *",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const targets = stagger
        ? Array.from(el.querySelectorAll<HTMLElement>(staggerSelector))
        : [el];
      if (targets.length === 0) return;

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          delay,
          stagger: stagger ?? 0,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [reduced, delay, y, stagger, staggerSelector] },
  );

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}

