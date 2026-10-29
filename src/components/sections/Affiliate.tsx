"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useTransform } from "motion/react";
import { site } from "@/content/site-content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { Reveal } from "@/components/ui/Reveal";
import { EyebrowBadge } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * Affiliate Programme section:
 * - Top row: left headline + "How the Programme Works" CTA; right floating 3D
 *   video/coupon visual (`affiliate-creator.png`) with mouse parallax + floating
 *   "ASSIGNED CODE · NIMORAI" coupon card
 * - Middle row: 4 step cards (`01`–`04`) that stagger in with hover lift and an
 *   animated horizontal connecting line
 * - Bottom row: "Content support" callout bar + expandable programme details note
 */
export function Affiliate() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const artRef = useRef<HTMLDivElement | null>(null);
  const stepsWrapRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const { x, y, enabled } = useMouseParallax(artRef);
  const artX = useTransform(x, [-1, 1], [-12, 12]);
  const artY = useTransform(y, [-1, 1], [-10, 10]);
  const couponX = useTransform(x, [-1, 1], [16, -16]);
  const couponY = useTransform(y, [-1, 1], [12, -12]);

  useGSAP(
    () => {
      if (reduced || !stepsWrapRef.current || !lineRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsWrapRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );
    },
    { scope: stepsWrapRef, dependencies: [reduced] },
  );

  return (
    <section id="affiliate" className="section-y relative overflow-hidden">
      <div className="container-x">
        <Reveal>
          <GlassCard
            tone="lavender"
            spotlight
            className="space-y-10 sm:space-y-12 p-6 sm:p-10 lg:p-14"
          >
            {/* Top row: copy + 3D creator visual */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5 space-y-6">
                <EyebrowBadge icon="affiliate">
                  {site.affiliate.eyebrow}
                </EyebrowBadge>

                <h2 className="text-h2 text-ink">{site.affiliate.title}</h2>

                <p className="text-lead text-muted">
                  {site.affiliate.description}
                </p>

                <div className="pt-1">
                  <MagneticButton
                    variant="primary"
                    arrow
                    aria-expanded={detailsOpen}
                    aria-controls="affiliate-programme-details"
                    onClick={() => setDetailsOpen((prev) => !prev)}
                  >
                    {site.affiliate.cta}
                  </MagneticButton>
                </div>
              </div>

              {/* Right 3D creator/video/coupon visual with parallax */}
              <div className="lg:col-span-7">
                <div
                  ref={artRef}
                  role="img"
                  aria-label={site.affiliate.artAria}
                  className="relative aspect-[1.42/1] w-full overflow-hidden rounded-card border border-white/90 bg-linear-to-br from-aqua-100/80 via-white/85 to-lime-100/50 p-4 sm:p-6 shadow-[inset_0_1px_0_rgb(255_255_255),0_24px_60px_-24px_rgb(20_80_115/0.2)]"
                >
                  <motion.div
                    aria-hidden="true"
                    style={enabled ? { x: artX, y: artY } : undefined}
                    className="relative z-10 flex h-full w-full items-center justify-center animate-float"
                  >
                    <Image
                      src="/assets/nimorai-art/affiliate-creator.png"
                      alt=""
                      width={1536}
                      height={1024}
                      sizes="(max-width: 1024px) 92vw, 620px"
                      className="h-[96%] w-[96%] object-contain drop-shadow-[0_24px_40px_rgb(25_110_145/0.22)]"
                    />
                  </motion.div>

                  {/* Floating coupon card */}
                  <motion.div
                    aria-hidden="true"
                    style={enabled ? { x: couponX, y: couponY } : undefined}
                    className="glass glass-border absolute right-4 bottom-4 sm:right-7 sm:bottom-6 z-20 w-52 sm:w-64 rotate-3 rounded-2xl bg-linear-to-br from-white/95 via-white/90 to-lime-300/65 p-4 sm:p-5 shadow-lift"
                  >
                    <small className="block text-[10px] font-bold tracking-[0.16em] uppercase text-teal-700">
                      {site.affiliate.coupon.label}
                    </small>
                    <strong className="mt-1 block text-lg sm:text-xl font-bold tracking-[0.08em] text-ink">
                      {site.affiliate.coupon.code}
                    </strong>
                    <span className="mt-0.5 block text-[11px] font-medium text-muted">
                      {site.affiliate.coupon.note}
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Middle row: 4 step cards with animated connecting line */}
            <div ref={stepsWrapRef} className="relative">
              {/* Connecting line (desktop) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-11 right-16 left-16 hidden h-[2px] overflow-hidden rounded-full bg-teal-600/12 lg:block"
              >
                <div
                  ref={lineRef}
                  className="h-full w-full origin-left bg-linear-to-r from-aqua-500 via-teal-400 to-lime-400"
                />
              </div>

              <Reveal
                stagger={0.12}
                staggerSelector="[data-affiliate-step]"
                className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
              >
                {site.affiliate.steps.map((step) => (
                  <div
                    key={step.number}
                    data-affiliate-step
                    className="glass glass-border flex h-full flex-col justify-between rounded-card bg-white/88 p-6 transition-all duration-300 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift"
                  >
                    <span className="inline-grid size-11 place-items-center rounded-2xl border border-ink/10 bg-white font-mono text-xs font-bold text-teal-700 shadow-xs">
                      {step.number}
                    </span>

                    <div className="mt-6 space-y-2">
                      <h3 className="text-base sm:text-lg font-bold tracking-[-0.015em] text-ink">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>

            {/* Content support callout */}
            <div className="border-l-2 border-aqua-500 pl-4 sm:pl-5 space-y-1">
              <span className="block text-sm font-bold text-ink">
                {site.affiliate.support.title}
              </span>
              <p className="text-sm sm:text-base text-muted">
                {site.affiliate.support.text}
              </p>
            </div>

            {/* Expandable programme details note */}
            <AnimatePresence initial={false}>
              {detailsOpen && (
                <motion.div
                  id="affiliate-programme-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="rounded-2xl border border-teal-500/20 bg-white/85 px-5 py-4 text-xs sm:text-sm text-muted">
                    {site.affiliate.details}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

