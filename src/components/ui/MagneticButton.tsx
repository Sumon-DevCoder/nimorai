"use client";

import {
  useRef,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  strength?: number;
  className?: string;
};

type AsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type AsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type MagneticButtonProps = AsButton | AsAnchor;

const variantStyles: Record<Variant, string> = {
  primary:
    "btn-shine bg-ink text-white shadow-button hover:shadow-glow before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:p-px before:bg-linear-to-r before:from-aqua-400/70 before:via-white/25 before:to-lime-300/80 before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] before:[mask-composite:exclude]",
  secondary:
    "bg-white/80 text-ink border border-ink/12 backdrop-blur-md shadow-xs hover:bg-white hover:border-teal-500/40 hover:shadow-glass",
  ghost:
    "bg-transparent text-ink hover:text-teal-600 hover:bg-white/60",
  dark:
    "btn-shine bg-white text-navy-950 shadow-glow hover:bg-aqua-100",
};

/**
 * Pill button / link with subtle magnetic pull, arrow slide, soft glow + lift,
 * press scale (0.97) and a shine sweep on primary variants.
 */
export function MagneticButton(props: MagneticButtonProps) {
  const {
    children,
    variant = "primary",
    arrow = false,
    strength = 0.28,
    className,
    ...rest
  } = props;

  const ref = useRef<HTMLElement | null>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const enabled = !isTouch && !reduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    rawX.set(dx * strength);
    rawY.set(dy * strength);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const sharedClassName = cn(
    "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-medium tracking-[-0.01em] select-none cursor-pointer overflow-hidden transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.97] hover:-translate-y-0.5",
    variantStyles[variant],
    className,
  );

  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-3 left-1/2 h-5 w-2/3 -translate-x-1/2 rounded-full bg-linear-to-r from-aqua-400/70 via-teal-400/60 to-lime-300/80 blur-md opacity-75 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">
        <span>{children}</span>
        {arrow && (
          <ArrowRight
            aria-hidden="true"
            className="size-4 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
          />
        )}
      </span>
    </>
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, onClick, ...anchorRest } = rest;
    return (
      <motion.a
        ref={ref as never}
        href={href}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={enabled ? { x, y } : undefined}
        whileTap={reduced ? undefined : { scale: 0.97 }}
        data-cursor="magnetic"
        className={sharedClassName}
        {...(anchorRest as Record<string, unknown>)}
      >
        {inner}
      </motion.a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <motion.button
      ref={ref as never}
      type={buttonRest.type ?? "button"}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={enabled ? { x, y } : undefined}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      data-cursor="magnetic"
      className={sharedClassName}
      {...(buttonRest as Record<string, unknown>)}
    >
      {inner}
    </motion.button>
  );
}

