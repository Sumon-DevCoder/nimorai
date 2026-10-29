"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site-content";
import { Reveal } from "@/components/ui/Reveal";
import { EyebrowBadge } from "@/components/ui/SectionHeading";
import { Tilt } from "@/components/ui/Tilt";
import { cn } from "@/lib/utils";

/**
 * FAQ section:
 * - Left column: eyebrow badge, headline, subtitle + 3D glass crystal artwork showcase
 *   filling the left column space with floating motion and perspective tilt.
 * - Right column: framed glass card accordions (`aria-expanded`, `aria-controls`),
 *   smooth spring height animation, morphing plus/minus, and glass highlight.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-y relative overflow-hidden">
      {/* Background soft ambient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-[-10%] -z-10 h-[480px] w-[480px] rounded-full bg-radial from-aqua-400/20 via-sky-300/10 to-transparent blur-3xl"
      />

      <div className="container-x">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Heading + 3D Glass Crystal Visual */}
          <Reveal className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-4">
              <EyebrowBadge>{site.faq.eyebrow}</EyebrowBadge>
              <h2 className="text-h2 text-ink">{site.faq.title}</h2>
              <p className="text-lead text-muted">{site.faq.description}</p>
            </div>

            {/* 3D Glass Crystal Image Showcase filling the left column */}
            <Tilt max={5} className="pt-1">
              <div
                aria-hidden="true"
                className="glass glass-border relative aspect-[1.22/1] w-full overflow-hidden rounded-card bg-linear-to-br from-white/90 via-aqua-100/70 to-lime-100/50 p-6 shadow-glass"
              >
                {/* Ambient radial glow */}
                <div className="pointer-events-none absolute inset-[10%] rounded-full bg-radial from-white/95 via-aqua-400/35 to-transparent blur-2xl" />

                {/* Subtle rotating orbital ring */}
                <div className="pointer-events-none absolute inset-[12%] rounded-full border border-aqua-500/25 animate-spin-slow">
                  <i className="absolute -top-1.5 left-1/3 size-3 rounded-full border-2 border-white bg-aqua-400" />
                  <i className="absolute right-4 bottom-1/4 size-3 rounded-full border-2 border-white bg-lime-300" />
                </div>

                {/* Floating 3D glass crystal tile behind */}
                <Image
                  src="/assets/nimorai-art/hero-floating-tile.png"
                  alt=""
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1024px) 60vw, 320px"
                  className="pointer-events-none absolute -top-2 -right-6 h-[58%] w-[62%] object-contain opacity-80 animate-float-slow"
                />

                {/* Main floating 3D glass crystal core */}
                <div className="relative z-10 flex h-full w-full items-center justify-center animate-float">
                  <Image
                    src="/assets/nimorai-art/product-coin.png"
                    alt=""
                    width={1330}
                    height={1182}
                    sizes="(max-width: 1024px) 85vw, 440px"
                    className="h-[92%] w-[92%] object-contain drop-shadow-[0_24px_40px_rgb(18_130_155/0.24)]"
                  />
                </div>
              </div>
            </Tilt>
          </Reveal>

          {/* Right accordion list: Individual framed glass cards */}
          <Reveal
            delay={0.08}
            stagger={0.08}
            staggerSelector="[data-faq-item]"
            className="lg:col-span-7 space-y-3.5"
          >
            {site.faq.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              const triggerId = `faq-trigger-${idx}`;
              const panelId = `faq-panel-${idx}`;

              return (
                <div
                  key={item.question}
                  data-faq-item
                  data-open={isOpen}
                  className={cn(
                    "glass glass-border rounded-2xl transition-all duration-300",
                    isOpen
                      ? "bg-white/95 shadow-glass border-aqua-400/40 ring-1 ring-aqua-400/25"
                      : "bg-white/70 hover:bg-white/90 hover:shadow-xs",
                  )}
                >
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="group flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left text-sm sm:text-base font-semibold tracking-[-0.015em] text-ink cursor-pointer"
                    >
                      <span className="transition-colors group-hover:text-teal-700">
                        {item.question}
                      </span>

                      {/* Plus / minus morph button */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "relative grid size-8 sm:size-9 shrink-0 place-items-center rounded-xl border transition-all duration-300",
                          isOpen
                            ? "border-teal-500/40 bg-aqua-100 text-teal-700 shadow-xs"
                            : "border-ink/10 bg-white text-ink group-hover:border-teal-500/30",
                        )}
                      >
                        <span className="block h-0.5 w-3 rounded-full bg-current" />
                        <span
                          className={cn(
                            "absolute block h-3 w-0.5 rounded-full bg-current transition-transform duration-300 ease-out-expo",
                            isOpen ? "scale-y-0 rotate-90" : "scale-y-100 rotate-0",
                          )}
                        />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-ink/6 px-5 sm:px-6 pt-3 pb-5">
                          <p className="text-xs sm:text-sm text-muted leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
