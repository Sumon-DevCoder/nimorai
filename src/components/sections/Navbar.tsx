"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { site } from "@/content/site-content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSmoothScroll } from "@/components/ui/SmoothScroll";
import { cn } from "@/lib/utils";

/**
 * Sticky floating glass navbar:
 * - Transparent at top → blurred glass pill once scrolled
 * - Hides on scroll down, reveals on scroll up
 * - Active section tracking with sliding `layoutId` underline
 * - Magnetic "Sign Up" button + unavailable toast notice (matching original behavior)
 * - Mobile hamburger with animated full-screen glass overlay
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const { stop, start } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (mobileOpen) {
      setHidden(false);
      return;
    }
    if (latest > 180 && latest > prev + 6) setHidden(true);
    else if (latest < prev - 6 || latest < 120) setHidden(false);
  });

  // Track active section in viewport
  useEffect(() => {
    const ids = ["products", "ide", "about"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0.05 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock scroll & Escape key when mobile overlay is open
  useEffect(() => {
    if (!mobileOpen) {
      start();
      return;
    }
    stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      start();
    };
  }, [mobileOpen, start, stop]);

  const triggerUnavailable = () => {
    setMobileOpen(false);
    setNoticeOpen(true);
  };

  const currentIndicator = hovered ?? active;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 right-0 left-0 z-50 pt-3 sm:pt-4"
      >
        <div className="container-x">
          <div
            className={cn(
              "relative flex items-center justify-between rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out-expo",
              scrolled
                ? "glass glass-border bg-white/82 shadow-glass"
                : "bg-white/68 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_-16px_rgb(20_60_90/0.12)]",
            )}
          >
            {/* Brand */}
            <a
              href="#top"
              onClick={() => setMobileOpen(false)}
              className="group inline-flex items-center gap-2.5 py-1 text-sm font-bold tracking-[0.18em] text-ink"
            >
              <span
                aria-hidden="true"
                className=" inline-flex flex-col items-center gap-0.5"
              >
                <span className="size-1.5 rounded-full bg-lime-400 transition-transform duration-300 group-hover:scale-125" />
                <span className="h-2.5 w-1.5 rounded-full bg-linear-to-b from-lime-300 to-aqua-400" />
              </span>
              <span>{site.brand}</span>
            </a>

            {/* Desktop navigation */}
            <nav
              aria-label={site.nav.aria}
              onMouseLeave={() => setHovered(null)}
              className="hidden md:flex items-center gap-1 lg:gap-2"
            >
              {site.nav.links.map((link) => {
                const isActive = currentIndicator === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    onFocus={() => setHovered(link.href)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                      isActive ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-linear-to-r from-teal-500 via-aqua-400 to-lime-400"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                aria-label={site.nav.signInUnavailable}
                onClick={triggerUnavailable}
                className="hidden md:inline-flex items-center px-3.5 py-2 text-sm font-semibold text-ink/85 hover:text-teal-600 transition-colors cursor-pointer"
              >
                {site.nav.signIn}
              </button>

              <MagneticButton
                variant="primary"
                arrow
                aria-label={site.nav.signUpUnavailable}
                onClick={triggerUnavailable}
                className="hidden sm:inline-flex px-5 py-2.5 text-xs sm:text-sm"
              >
                {site.nav.signUp}
              </MagneticButton>

              {/* Mobile menu trigger */}
              <button
                ref={triggerRef}
                type="button"
                aria-label={mobileOpen ? site.nav.closeMenu : site.nav.openMenu}
                aria-controls="nimorai-mobile-navigation"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((prev) => !prev)}
                className="inline-flex md:hidden size-10 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-ink shadow-xs transition hover:bg-white cursor-pointer"
              >
                <span className="relative block h-3.5 w-4">
                  <span
                    className={cn(
                      "absolute left-0 h-0.5 w-4 rounded-full bg-current transition-transform duration-300",
                      mobileOpen ? "top-1.5 rotate-45" : "top-0.5",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 h-0.5 w-4 rounded-full bg-current transition-transform duration-300",
                      mobileOpen ? "top-1.5 -rotate-45" : "bottom-0.5",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile glass overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="nimorai-mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-mist/92 px-6 pt-28 pb-10 backdrop-blur-2xl md:hidden"
          >
            <nav aria-label={site.nav.mobileAria} className="space-y-3">
              {site.nav.links.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx + 0.08 }}
                  className="flex items-center justify-between rounded-2xl border border-white/80 bg-white/75 px-5 py-4 text-xl font-semibold text-ink shadow-glass"
                >
                  <span>{link.label}</span>
                  <ArrowRight aria-hidden="true" className="size-5 text-teal-600" />
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <MagneticButton
                variant="secondary"
                aria-label={site.nav.signInUnavailable}
                onClick={triggerUnavailable}
                className="w-full py-4"
              >
                {site.nav.signIn}
              </MagneticButton>
              <MagneticButton
                variant="primary"
                arrow
                aria-label={site.nav.signUpUnavailable}
                onClick={triggerUnavailable}
                className="w-full py-4"
              >
                {site.nav.signUp}
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unavailable action toast (matches original site behavior & exact copy) */}
      <AnimatePresence>
        {noticeOpen && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="fixed right-4 bottom-4 left-4 z-60 mx-auto flex max-w-md items-center justify-between gap-4 rounded-2xl border border-white/80 bg-ink/95 px-5 py-3.5 text-xs sm:text-sm text-white shadow-navy backdrop-blur-xl"
          >
            <span>{site.notice.text}</span>
            <button
              type="button"
              aria-label={site.notice.dismissAria}
              onClick={() => setNoticeOpen(false)}
              className="inline-flex items-center gap-1 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-aqua-200 hover:bg-white/20 cursor-pointer"
            >
              <span>{site.notice.dismiss}</span>
              <X aria-hidden="true" className="size-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

