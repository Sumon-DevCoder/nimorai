"use client";

import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site-content";
import { Reveal } from "@/components/ui/Reveal";
import { EyebrowBadge } from "@/components/ui/SectionHeading";

/**
 * About section:
 * - Two-column layout: left eyebrow + tight-tracked headline, right body paragraph +
 *   three numbered principle rows (`01`, `02`, `03`)
 * - Each row highlights on hover with an animated gradient border + arrow reveal
 */
export function About() {
  return (
    <section id="about" className="section-y relative overflow-hidden">
      <div className="container-x">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left headline */}
          <Reveal className="lg:col-span-6 space-y-5">
            <EyebrowBadge>{site.about.eyebrow}</EyebrowBadge>
            <h2 className="text-h2 text-ink max-w-xl">{site.about.title}</h2>
          </Reveal>

          {/* Right description + 3 interactive numbered rows */}
          <div className="lg:col-span-6 space-y-8">
            <Reveal delay={0.08}>
              <p className="text-lead text-muted">{site.about.body}</p>
            </Reveal>

            <Reveal delay={0.14} stagger={0.1} staggerSelector="[data-principle]">
              <div
                aria-label={site.about.principlesAria}
                className="glass glass-border divide-y divide-ink/8 overflow-hidden rounded-card bg-white/85"
              >
                {site.about.principles.map((item) => (
                  <div
                    key={item.number}
                    data-principle
                    className="group relative flex items-center justify-between gap-4 px-6 py-5 sm:px-7 sm:py-6 transition-colors duration-300 hover:bg-aqua-100/45"
                  >
                    {/* Animated left accent bar on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-2 left-0 w-1 origin-center scale-y-0 rounded-r-full bg-linear-to-b from-aqua-500 via-teal-500 to-lime-400 transition-transform duration-300 ease-out-expo group-hover:scale-y-100"
                    />

                    <div className="flex items-center gap-4 sm:gap-5">
                      <span className="font-mono text-xs font-bold tracking-wider text-teal-600 transition-transform duration-300 group-hover:translate-x-0.5">
                        {item.number}
                      </span>
                      <strong className="text-base sm:text-lg font-semibold tracking-[-0.015em] text-ink transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
                        {item.label}
                      </strong>
                    </div>

                    <span
                      aria-hidden="true"
                      className="grid size-8 place-items-center rounded-full border border-teal-500/20 bg-white text-teal-700 opacity-0 -translate-x-2 transition-all duration-300 ease-out-expo group-hover:opacity-100 group-hover:translate-x-0"
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

