"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site-content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NimoraiIcon } from "@/components/ui/NimoraiIcon";
import { Tilt } from "@/components/ui/Tilt";

/**
 * Platform & Workflow section:
 * - 3 steps (Choose / Configure / Review) that reveal sequentially while a vertical
 *   progress line scrubs with scroll via GSAP ScrollTrigger
 * - 3D glass workflow elements render at the bottom of the steps card
 * - Interactive workspace preview card with shimmering/filling skeleton bars,
 *   3D glass frame overlay, tilt on hover, and expandable review state
 */
export function Workflow() {
  const [expanded, setExpanded] = useState(false);
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const lineFillRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !stepsRef.current || !lineFillRef.current) return;

      gsap.fromTo(
        lineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        },
      );

      const stepNodes = stepsRef.current.querySelectorAll<HTMLElement>(
        "[data-workflow-step]",
      );
      gsap.fromTo(
        stepNodes,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { scope: stepsRef, dependencies: [reduced] },
  );

  return (
    <section id="platform" className="section-y relative overflow-hidden">
      <div className="container-x space-y-10 sm:space-y-12">
        <Reveal>
          <SectionHeading
            eyebrow={site.workflow.eyebrow}
            title={site.workflow.title}
            description={site.workflow.description}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left column: 3 steps + scrubbed line + 3D workflow render */}
          <div className="lg:col-span-5">
            <GlassCard
              tone="light"
              className="flex h-full flex-col justify-between p-6 sm:p-8 lg:p-9"
            >
              <div ref={stepsRef} className="relative space-y-8 pl-2">
                {/* Track + GSAP scrubbed progress line */}
                <div
                  aria-hidden="true"
                  className="absolute top-6 bottom-6 left-[27px] w-[2px] overflow-hidden rounded-full bg-teal-600/12"
                >
                  <div
                    ref={lineFillRef}
                    className="h-full w-full origin-top bg-linear-to-b from-aqua-500 via-teal-500 to-lime-400"
                  />
                </div>

                {site.workflow.steps.map((step) => (
                  <div
                    key={step.number}
                    data-workflow-step
                    className="relative z-10 flex items-start gap-4 sm:gap-5"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-teal-600/15 bg-white font-mono text-xs font-bold text-teal-700 shadow-xs">
                      {step.number}
                    </span>
                    <div className="space-y-1 pt-0.5">
                      <h3 className="text-lg sm:text-xl font-semibold tracking-[-0.02em] text-ink">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3D glass workflow elements */}
              <div
                aria-hidden="true"
                className="mt-10 flex items-center justify-center pt-4"
              >
                <Image
                  src="/assets/nimorai-art/workflow-elements.png"
                  alt=""
                  width={1942}
                  height={809}
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="h-20 sm:h-24 w-auto object-contain animate-float-slow drop-shadow-[0_18px_28px_rgb(20_110_140/0.18)]"
                />
              </div>
            </GlassCard>
          </div>

          {/* Right column: workspace preview card */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <GlassCard
              tone="aqua"
              spotlight
              className="flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10"
            >
              <Tilt max={4} className="group">
                <div
                  aria-label={site.workflow.preview.title}
                  className="relative overflow-hidden rounded-card border border-white/95 bg-white/92 shadow-[0_24px_60px_-24px_rgb(16_74_105/0.22)]"
                >
                  {/* Decorative 3D glass frame */}
                  <Image
                    src="/assets/nimorai-art/platform-frame.png"
                    alt=""
                    width={1536}
                    height={1024}
                    sizes="(max-width: 1024px) 95vw, 680px"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-multiply"
                  />

                  {/* Top window bar */}
                  <div className="relative z-10 flex items-center justify-between border-b border-ink/8 px-5 py-4 sm:px-6">
                    <span className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-ink">
                      <NimoraiIcon name="platform" size={18} />
                      <span>{site.workflow.preview.title}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="size-2.5 rounded-full bg-lime-400 shadow-[0_0_10px_rgb(196_227_83/0.9)]"
                    />
                  </div>

                  {/* Body: left icon rail + configuration bars */}
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[72px_1fr]">
                    <div
                      aria-hidden="true"
                      className="hidden sm:flex flex-col items-center gap-3.5 border-r border-ink/8 py-7"
                    >
                      <i className="size-9 rounded-xl bg-mist border border-ink/6" />
                      <i className="size-9 rounded-xl bg-mist border border-ink/6" />
                      <i className="size-9 rounded-xl bg-mist border border-ink/6" />
                    </div>

                    <div className="space-y-6 p-6 sm:p-8 lg:p-10">
                      <div className="space-y-1">
                        <span className="text-xs font-medium text-muted">
                          {site.workflow.preview.projectType}
                        </span>
                        <strong className="block text-xl sm:text-2xl font-bold tracking-[-0.02em] text-ink">
                          {site.workflow.preview.projectConfig}
                        </strong>
                      </div>

                      <div className="divide-y divide-ink/8 border-t border-ink/8">
                        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-3 py-4">
                          <span className="text-xs sm:text-sm font-medium text-muted">
                            {site.workflow.preview.identity}
                          </span>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-mist">
                            <motion.div
                              initial={{ width: "0%" }}
                              whileInView={{ width: expanded ? "88%" : "68%" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                              className="skeleton-shine h-full rounded-full bg-linear-to-r from-aqua-400 via-sky-300 to-teal-400"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-3 py-4">
                          <span className="text-xs sm:text-sm font-medium text-muted">
                            {site.workflow.preview.requirements}
                          </span>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-mist">
                            <motion.div
                              initial={{ width: "0%" }}
                              whileInView={{ width: expanded ? "92%" : "68%" }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1.2,
                                delay: 0.12,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="skeleton-shine h-full rounded-full bg-linear-to-r from-aqua-400 via-sky-300 to-lime-300"
                            />
                          </div>
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="rounded-2xl border border-teal-500/20 bg-aqua-100/50 p-4">
                              <span className="block text-[11px] font-bold tracking-wider uppercase text-teal-700">
                                {site.workflow.preview.reviewLabel}
                              </span>
                              <strong className="mt-0.5 block text-sm font-semibold text-ink">
                                {site.workflow.preview.reviewValue}
                              </strong>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </Tilt>

              <div className="mt-7 flex flex-col items-start gap-3">
                <MagneticButton
                  variant="secondary"
                  aria-expanded={expanded}
                  aria-controls="workspace-preview-note"
                  onClick={() => setExpanded((prev) => !prev)}
                >
                  {expanded ? site.workflow.closeCta : site.workflow.cta}
                </MagneticButton>
                <span
                  id="workspace-preview-note"
                  className="text-xs text-muted"
                >
                  {site.workflow.note}
                </span>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

