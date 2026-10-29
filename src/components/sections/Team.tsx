"use client";

import Image from "next/image";
import { site } from "@/content/site-content";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";

/**
 * Concept Team section (3 fictional profiles):
 * - Header row with eyebrow, headline, and right-aligned "Illustrative profiles for design review."
 * - 3 portrait cards (Arian Vale, Maya Sen, Elias Noor) with slow image zoom on hover,
 *   soft gradient overlay, name/role slide-up micro-interaction, and subtle 3D tilt
 */
export function Team() {
  return (
    <section className="pb-10 sm:pb-14 lg:pb-16 relative overflow-hidden">
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
          className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8"
        >
          {site.team.members.map((member) => (
            <Tilt key={member.name} max={4} className="group h-full">
              <article className="glass glass-border flex h-full flex-col overflow-hidden rounded-card bg-white/90 transition-shadow duration-500 hover:shadow-lift">
                <div className="relative aspect-[1.09/1] w-full overflow-hidden bg-linear-to-b from-sky-100 to-aqua-100">
                  <Image
                    src={member.portrait}
                    alt={`${site.team.altPrefix}${member.name}`}
                    width={member.width}
                    height={member.height}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-950/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between bg-white/92 p-3.5 sm:p-6 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5">
                  <div>
                    <strong className="block text-sm sm:text-lg lg:text-xl font-bold tracking-[-0.02em] text-ink">
                      {member.name}
                    </strong>
                    <span className="mt-0.5 block text-xs sm:text-sm font-medium text-muted">
                      {member.role}
                    </span>
                  </div>
                  <small className="mt-3 sm:mt-4 block text-[10px] sm:text-xs font-semibold text-teal-700">
                    {site.team.tag}
                  </small>
                </div>
              </article>
            </Tilt>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

