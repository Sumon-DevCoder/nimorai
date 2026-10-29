"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site-content";
import { Reveal } from "@/components/ui/Reveal";
import { EyebrowBadge } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NimoraiIcon } from "@/components/ui/NimoraiIcon";
import { CountUp } from "@/components/ui/CountUp";
import { Tilt } from "@/components/ui/Tilt";
import { useSmoothScroll } from "@/components/ui/SmoothScroll";

/**
 * IDE Access ($700) section:
 * - Cursor-follow spotlight glow on the lavender/aqua glass card
 * - Price counts up to $700 when scrolled into view; bullets reveal one by one
 * - Dark navy IDE concept window on the right with floating 3D glass code blocks
 *   (`ide-supporting-elements.png`) and floating glass icon tiles
 * - "View Purchase Details" accessible modal dialog + "How Access Works" 4-step drawer
 */
export function IdeAccess() {
  const [howOpen, setHowOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const { stop, start } = useSmoothScroll();

  // Accessible focus-trap & Escape handling for the purchase details dialog
  useEffect(() => {
    if (!dialogOpen) {
      start();
      return;
    }
    stop();
    const closeBtn = dialogRef.current?.querySelector<HTMLButtonElement>("button");
    closeBtn?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setDialogOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      start();
    };
  }, [dialogOpen, start, stop]);

  return (
    <section id="ide" className="section-y relative overflow-hidden">
      {/* Ambient aurora behind section */}
      <div
        aria-hidden="true"
        data-parallax="-0.15"
        className="pointer-events-none absolute top-1/3 left-[-8%] -z-10 h-[500px] w-[500px] rounded-full bg-radial from-lavender-300/35 via-aqua-400/20 to-transparent blur-3xl"
      />

      <div className="container-x">
        <Reveal>
          <GlassCard
            tone="lavender"
            spotlight
            className="p-6 sm:p-10 lg:p-14"
          >
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left copy column */}
              <div className="lg:col-span-6 space-y-6">
                <EyebrowBadge>{site.ide.eyebrow}</EyebrowBadge>

                <h2 className="text-h2 text-ink">{site.ide.title}</h2>

                <p className="text-lead text-muted">{site.ide.description}</p>

                {/* Price row with CountUp to $700 */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <span
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-2xl border border-ink/10 bg-white shadow-xs"
                  >
                    <NimoraiIcon name="license" size={22} />
                  </span>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <strong className="text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-ink">
                      <CountUp
                        to={site.ide.priceValue}
                        prefix="$"
                        fallback={site.ide.price}
                      />
                    </strong>
                    <span className="text-xs sm:text-sm font-semibold text-muted">
                      {site.ide.priceNote}
                    </span>
                  </div>
                </div>

                {/* Staggered bullet facts */}
                <Reveal
                  stagger={0.14}
                  staggerSelector="li"
                  className="pt-1"
                >
                  <ul className="space-y-3">
                    {site.ide.facts.map((fact) => (
                      <li
                        key={fact}
                        className="flex items-start gap-3 text-sm sm:text-base text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 grid size-3.5 shrink-0 place-items-center rounded-full bg-aqua-400/25"
                        >
                          <span className="size-1.5 rounded-full bg-teal-500" />
                        </span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <MagneticButton
                    variant="primary"
                    arrow
                    onClick={() => setDialogOpen(true)}
                  >
                    {site.ide.primary}
                  </MagneticButton>
                  <MagneticButton
                    variant="secondary"
                    aria-expanded={howOpen}
                    aria-controls="ide-purchase-process"
                    onClick={() => setHowOpen((prev) => !prev)}
                  >
                    {site.ide.secondary}
                  </MagneticButton>
                </div>
              </div>

              {/* Right column: Dark navy IDE window + 3D glass blocks */}
              <div className="lg:col-span-6">
                <Tilt max={5}>
                  <div
                    role="img"
                    aria-label={site.ide.art.aria}
                    className="relative mx-auto aspect-[1.22/1] w-full max-w-[600px]"
                  >
                    {/* Dark navy IDE concept window */}
                    <div className="glass-border-dark absolute inset-x-[2%] top-[10%] bottom-[8%] z-10 overflow-hidden rounded-card bg-linear-to-br from-navy-800 via-navy-900 to-navy-950 text-white shadow-navy">
                      {/* Glowing teal/lime ambient accents inside dark window */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-16 right-8 h-44 w-44 rounded-full bg-aqua-400/20 blur-2xl"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-16 left-10 h-44 w-44 rounded-full bg-lime-300/15 blur-2xl"
                      />

                      {/* Window header */}
                      <div className="flex h-11 items-center gap-2 border-b border-white/10 px-4">
                        <span className="size-2.5 rounded-full bg-white/25" />
                        <span className="size-2.5 rounded-full bg-aqua-400" />
                        <span className="size-2.5 rounded-full bg-white/25" />
                        <small className="ml-auto font-mono text-[10px] tracking-[0.14em] uppercase text-navy-300">
                          {site.ide.art.windowLabel}
                        </small>
                      </div>

                      {/* Editor body */}
                      <div
                        aria-hidden="true"
                        className="grid h-full grid-cols-[52px_1fr] sm:grid-cols-[64px_1fr]"
                      >
                        <aside className="flex flex-col items-center gap-3.5 border-r border-white/10 py-6">
                          <i className="size-6 rounded-lg border border-white/15 bg-white/4" />
                          <i className="size-6 rounded-lg border border-white/15 bg-white/4" />
                          <i className="size-6 rounded-lg border border-white/15 bg-white/4" />
                        </aside>
                        <div className="space-y-4 p-5 sm:p-7">
                          <span className="block font-mono text-[11px] text-navy-300">
                            {site.ide.art.file}
                          </span>
                          <i className="block h-2 w-4/5 rounded-full bg-linear-to-r from-aqua-400/80 via-lime-300/70 to-white/15" />
                          <i className="block h-2 w-2/3 rounded-full bg-linear-to-r from-aqua-400/70 via-sky-300/50 to-transparent" />
                          <i className="block h-2 w-5/6 rounded-full bg-linear-to-r from-lime-300/70 via-aqua-400/60 to-transparent" />
                          <i className="block h-2 w-3/5 rounded-full bg-linear-to-r from-aqua-400/60 to-transparent" />
                          <i className="block h-2 w-3/4 rounded-full bg-linear-to-r from-sky-300/60 via-lime-300/50 to-transparent" />
                        </div>
                      </div>
                    </div>

                    {/* 3D glass code blocks render overlaying the dark window */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[2%_-4%_0] z-20 flex items-end justify-center animate-float"
                    >
                      <Image
                        src="/assets/nimorai-art/ide-supporting-elements.png"
                        alt=""
                        width={1536}
                        height={1024}
                        sizes="(max-width: 1024px) 92vw, 580px"
                        className="h-[94%] w-full object-contain drop-shadow-[0_30px_50px_rgb(5_10_23/0.45)]"
                      />
                    </div>

                    {/* Floating top-right IDE terminal tile */}
                    <div
                      aria-hidden="true"
                      className="glass glass-border absolute top-[2%] right-0 z-30 grid size-16 sm:size-20 place-items-center rounded-3xl bg-linear-to-br from-white/90 to-aqua-200/75 shadow-lift animate-bob"
                    >
                      <NimoraiIcon name="ide" size={30} />
                    </div>

                    {/* Floating bottom-left license shield tile */}
                    <div
                      aria-hidden="true"
                      className="glass glass-border absolute bottom-[3%] left-0 z-30 grid size-14 sm:size-16 place-items-center rounded-2xl bg-linear-to-br from-white/92 to-lime-300/75 shadow-lift animate-bob [animation-delay:1.4s]"
                    >
                      <NimoraiIcon name="license" size={26} />
                    </div>
                  </div>
                </Tilt>
              </div>
            </div>

            {/* Expandable "How Access Works" 4-step bar */}
            <AnimatePresence initial={false}>
              {howOpen && (
                <motion.div
                  id="ide-purchase-process"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-10 grid grid-cols-1 gap-3 border-t border-ink/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
                    {site.ide.process.map((step, idx) => (
                      <div
                        key={step}
                        className="glass glass-border flex items-center gap-3.5 rounded-2xl bg-white/80 p-4"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-aqua-100 font-mono text-xs font-bold text-teal-700">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <strong className="text-sm font-semibold text-ink">
                          {step}
                        </strong>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </Reveal>
      </div>

      {/* Purchase details modal dialog (matches original content & ARIA) */}
      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDialogOpen(false)}
            className="fixed inset-0 z-60 grid place-items-center bg-navy-950/60 p-4 backdrop-blur-md"
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="ide-dialog-title"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="glass glass-border relative w-full max-w-xl rounded-card-lg bg-white/95 p-6 sm:p-8 shadow-lift"
            >
              <button
                type="button"
                aria-label={site.ide.dialog.closeAria}
                onClick={() => setDialogOpen(false)}
                className="absolute top-5 right-5 grid size-9 place-items-center rounded-full border border-ink/10 bg-white text-lg font-medium text-ink hover:bg-mist cursor-pointer"
              >
                {site.ide.dialog.close}
              </button>

              <span className="inline-grid size-12 place-items-center rounded-2xl border border-ink/10 bg-aqua-100/70">
                <NimoraiIcon name="license" size={22} />
              </span>

              <h2
                id="ide-dialog-title"
                className="mt-4 text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-ink"
              >
                {site.ide.dialog.title}
              </h2>

              <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
                {site.ide.dialog.body}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {site.ide.process.map((step, idx) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 rounded-xl border border-ink/8 bg-mist/70 px-3.5 py-3"
                  >
                    <span className="font-mono text-xs font-bold text-teal-700">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <strong className="text-xs sm:text-sm font-semibold text-ink">
                      {step}
                    </strong>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

