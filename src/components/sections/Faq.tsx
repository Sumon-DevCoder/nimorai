"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site-content";
import { Reveal } from "@/components/ui/Reveal";
import { EyebrowBadge } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/**
 * FAQ section:
 * - Left column: eyebrow badge, headline, and subtitle
 * - Right column: accessible 6-item accordion (`aria-expanded`, `aria-controls`,
 *   `role="region"`), smooth height animation, plus/minus morph, and a glass
 *   highlight on the active item (first item open by default as in the screenshot)
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-y relative overflow-hidden">
      <div className="container-x">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column */}
          <Reveal className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
            <EyebrowBadge>{site.faq.eyebrow}</EyebrowBadge>
            <h2 className="text-h2 text-ink">{site.faq.title}</h2>
            <p className="text-lead text-muted">{site.faq.description}</p>
          </Reveal>

          {/* Right accordion list */}
          <Reveal
            delay={0.08}
            stagger={0.08}
            staggerSelector="[data-faq-item]"
            className="lg:col-span-8 divide-y divide-ink/10 border-y border-ink/10"
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
                    "transition-colors duration-300",
                    isOpen
                      ? "bg-white/65 backdrop-blur-md px-5 sm:px-6 rounded-2xl my-2 border border-white shadow-glass"
                      : "px-2 sm:px-3",
                  )}
                >
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left text-base sm:text-lg font-semibold tracking-[-0.015em] text-ink cursor-pointer"
                    >
                      <span className="transition-colors group-hover:text-teal-700">
                        {item.question}
                      </span>

                      {/* Plus / minus morph button */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "relative grid size-9 shrink-0 place-items-center rounded-xl border transition-colors duration-300",
                          isOpen
                            ? "border-teal-500/30 bg-aqua-100 text-teal-700"
                            : "border-ink/10 bg-white text-ink group-hover:border-teal-500/30",
                        )}
                      >
                        <span className="block h-0.5 w-3.5 rounded-full bg-current" />
                        <span
                          className={cn(
                            "absolute block h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300 ease-out-expo",
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
                        <p className="pb-6 pr-8 text-sm sm:text-base text-muted leading-relaxed">
                          {item.answer}
                        </p>
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

