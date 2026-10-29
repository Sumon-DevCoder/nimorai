"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site-content";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";

const CARD_ACCENTS = [
  {
    aura: "from-aqua-400/35 via-sky-300/20 to-transparent",
    bar: "from-aqua-500 via-teal-400 to-sky-400",
    dot: "bg-aqua-500 shadow-[0_0_8px_rgb(47_191_224/0.9)]",
  },
  {
    aura: "from-lavender-300/40 via-aqua-300/20 to-transparent",
    bar: "from-teal-500 via-aqua-400 to-lavender-400",
    dot: "bg-teal-500 shadow-[0_0_8px_rgb(18_150_157/0.9)]",
  },
  {
    aura: "from-lime-300/40 via-aqua-300/25 to-transparent",
    bar: "from-aqua-500 via-lime-400 to-teal-500",
    dot: "bg-lime-400 shadow-[0_0_8px_rgb(196_227_83/0.95)]",
  },
] as const;

/**
 * Concept Team section (3 fictional profiles):
 * - Awwwards / Framer-inspired double-layered glassmorphic portrait cards
 * - 2-column layout on small devices (`grid-cols-2`), 3-column on desktop (`md:grid-cols-3`)
 * - Frosted index badge (`01`–`03`), interactive corner orb, slow portrait zoom,
 *   and a floating frosted-glass identity dock that lifts on hover.
 */
export function Team() {
  return (
    <section className="pb-10 sm:pb-14 lg:pb-16 relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-[-8%] -z-10 h-[420px] w-[420px] rounded-full bg-radial from-aqua-400/20 via-lavender-300/15 to-transparent blur-3xl"
      />

      <div className="container-x space-y-8 sm:space-y-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-3">
              <span className="eyebrow block text-teal-700">
                {site.team.eyebrow}
              </span>
              <h3 className="text-h3 text-ink">{site.team.title}</h3>
            </div>
            <p className="text-xs sm:text-sm font-medium text-muted">
              {site.team.note}
            </p>
          </div>
        </Reveal>

        <Reveal
          stagger={0.14}
          staggerSelector="article"
          className="grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 lg:gap-8"
        >
          {site.team.members.map((member, idx) => {
            const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
            const indexLabel = String(idx + 1).padStart(2, "0");

            return (
              <Tilt key={member.name} max={5} className="group h-full">
                <article className="glass glass-border relative flex h-full flex-col overflow-hidden rounded-card-lg bg-linear-to-b from-white/95 via-white/80 to-aqua-100/50 p-2 sm:p-3 shadow-glass transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift">
                  {/* Ambient radial aura on hover */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-12 -right-12 size-48 rounded-full bg-radial ${accent.aura} blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  {/* Portrait Stage */}
                  <div className="relative aspect-[1/1.06] w-full overflow-hidden rounded-2xl sm:rounded-[20px] bg-linear-to-b from-sky-100 via-aqua-100/80 to-mist">
                    {/* Top-left frosted index pill */}
                    <span
                      aria-hidden="true"
                      className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/75 px-2.5 py-1 font-mono text-[10px] sm:text-xs font-bold tracking-wider text-teal-700 shadow-xs backdrop-blur-md"
                    >
                      <span className={`size-1.5 rounded-full ${accent.dot}`} />
                      <span>{indexLabel}</span>
                    </span>

                    {/* Top-right interactive glass orb */}
                    <span
                      aria-hidden="true"
                      className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 grid size-7 sm:size-9 place-items-center rounded-full border border-white/90 bg-white/75 text-ink shadow-xs backdrop-blur-md transition-all duration-300 ease-out-expo group-hover:scale-110 group-hover:bg-ink group-hover:text-white"
                    >
                      <ArrowUpRight className="size-3.5 sm:size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>

                    {/* Portrait Image */}
                    <Image
                      src={member.portrait}
                      alt={`${site.team.altPrefix}${member.name}`}
                      width={member.width}
                      height={member.height}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
                    />

                    {/* Subtle bottom vignette inside portrait */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-navy-950/35 via-navy-950/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-85"
                    />
                  </div>

                  {/* Floating Frosted Glass Identity Dock */}
                  <div className="relative z-20 -mt-6 sm:-mt-8 mx-1 sm:mx-1.5 flex flex-1 flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-white/95 bg-white/90 p-3.5 sm:p-5 shadow-[0_12px_32px_-12px_rgb(16_42_70/0.18)] backdrop-blur-xl transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
                    {/* Top animated accent line */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-0 top-0 h-[2.5px] bg-linear-to-r ${accent.bar} opacity-75 transition-opacity duration-300 group-hover:opacity-100`}
                    />

                    <div>
                      <strong className="block text-sm sm:text-lg lg:text-xl font-bold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-teal-700">
                        {member.name}
                      </strong>
                      <span className="mt-0.5 block text-xs sm:text-sm font-medium text-muted">
                        {member.role}
                      </span>
                    </div>

                    <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2 border-t border-ink/8 pt-2.5 sm:pt-3">
                      <small className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-teal-700">
                        <span
                          aria-hidden="true"
                          className={`size-1.5 rounded-full ${accent.dot}`}
                        />
                        <span>{site.team.tag}</span>
                      </small>
                    </div>
                  </div>
                </article>
              </Tilt>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
