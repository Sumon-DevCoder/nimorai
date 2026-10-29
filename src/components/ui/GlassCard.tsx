"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useIsTouch } from "@/hooks/useIsTouch";
import { cn } from "@/lib/utils";

type Tone = "light" | "aqua" | "lavender" | "navy";

type GlassCardProps = {
  children: ReactNode;
  tone?: Tone;
  spotlight?: boolean;
  className?: string;
  as?: "div" | "article" | "section";
};

const toneStyles: Record<Tone, string> = {
  light:
    "glass glass-border bg-linear-to-br from-white/85 via-white/70 to-aqua-100/55 text-ink",
  aqua:
    "glass glass-border bg-linear-to-br from-white/90 via-aqua-100/65 to-sky-100/60 text-ink",
  lavender:
    "glass glass-border bg-linear-to-br from-white/90 via-lavender-100/65 to-lime-100/45 text-ink",
  navy:
    "glass-border-dark bg-linear-to-br from-navy-900 via-navy-950 to-navy-800 text-white shadow-navy",
};

/**
 * Reusable glassmorphic card with 1px gradient inner border and optional
 * cursor-following radial spotlight glow.
 */
export function GlassCard({
  children,
  tone = "light",
  spotlight = false,
  className,
  as: Tag = "div",
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isTouch = useIsTouch();
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  const spotlightBg = useMotionTemplate`radial-gradient(560px circle at ${mouseX}px ${mouseY}px, ${
    tone === "navy"
      ? "rgb(90 216 239 / 0.18), rgb(213 239 120 / 0.08) 40%, transparent 75%"
      : "rgb(90 216 239 / 0.22), rgb(255 255 255 / 0.35) 35%, transparent 70%"
  })`;

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!spotlight || isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  return (
    <Tag
      ref={ref as never}
      onMouseMove={spotlight ? handleMove : undefined}
      className={cn(
        "group/card relative overflow-hidden rounded-card-lg",
        toneStyles[tone],
        className,
      )}
    >
      {spotlight && !isTouch && (
        <motion.div
          aria-hidden="true"
          style={{ background: spotlightBg }}
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        />
      )}
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}

