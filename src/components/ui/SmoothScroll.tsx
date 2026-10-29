"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";

type ScrollTarget = number | string | HTMLElement;

type SmoothScrollContextValue = {
  scrollTo: (target: ScrollTarget, options?: { offset?: number; immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

/** Access the Lenis-backed scroll helpers (falls back to native scrolling). */
export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used inside <SmoothScroll>");
  return ctx;
}

/**
 * Lenis provider synced with GSAP ScrollTrigger.
 * - Disabled entirely when `prefers-reduced-motion` is set.
 * - Handles in-page anchor links (`href="#id"`) with smooth scrolling.
 * - Drives `[data-parallax="0.2"]` decorative elements (fine pointers only).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();

  // Lenis lifecycle
  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // Decorative parallax layers
  useEffect(() => {
    if (reduced || isTouch) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax ?? 0.15);
        const trigger = el.closest("section") ?? el;
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [reduced, isTouch]);

  const scrollTo = useCallback<SmoothScrollContextValue["scrollTo"]>(
    (target, options = {}) => {
      const offset = options.offset ?? -12;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset, immediate: options.immediate, duration: 1.4 });
        return;
      }
      let top = 0;
      if (typeof target === "number") top = target;
      else {
        const el = typeof target === "string" ? document.querySelector(target) : target;
        if (!el) return;
        top = el.getBoundingClientRect().top + window.scrollY + offset;
      }
      window.scrollTo({ top, behavior: reduced || options.immediate ? "auto" : "smooth" });
    },
    [reduced],
  );

  // Intercept in-page anchor links
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      scrollTo(hash === "#top" ? 0 : target);
      // Move focus for keyboard / screen-reader users without jumping.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  const value = useMemo<SmoothScrollContextValue>(
    () => ({
      scrollTo,
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [scrollTo],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </SmoothScrollContext.Provider>
  );
}

