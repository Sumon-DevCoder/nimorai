"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CountUpProps = {
  /** Final numeric value (e.g. 700). */
  to: number;
  /** Prefix such as "$". */
  prefix?: string;
  /** Fallback text rendered on the server and for screen readers (e.g. "$700"). */
  fallback: string;
  className?: string;
};

/**
 * Scroll-triggered number counter that animates from 0 to `to` once in view.
 * Renders the exact `fallback` string for SSR and accessibility (`aria-label`).
 */
export function CountUp({ to, prefix = "$", fallback, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const state = { value: 0 };
      gsap.to(state, {
        value: to,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(state.value)}`;
        },
        onComplete: () => {
          el.textContent = fallback;
        },
      });
    },
    { scope: ref, dependencies: [to, prefix, fallback, reduced] },
  );

  return (
    <span ref={ref} aria-label={fallback} className={className}>
      {fallback}
    </span>
  );
}

