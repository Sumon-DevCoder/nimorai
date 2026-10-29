"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site-content";
import { useSmoothScroll } from "@/components/ui/SmoothScroll";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Modern architectural dark navy footer (Linear / Stripe / Vercel inspired):
 * - Strictly 100% original text from `site-content.ts`
 * - Clean framed glass container inside deep navy with architectural grid lines,
 *   organized vertical link columns, subtle hover micro-interactions, and a
 *   refined bottom bar with Lenis smooth "Back to top" button.
 */
export function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      {/* Top luminous gradient hairline */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-linear-to-r from-transparent via-aqua-400/55 to-transparent"
      />

      {/* Ambient radial lighting + faint architectural grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
        <div className="absolute -top-36 left-1/2 h-72 w-[680px] -translate-x-1/2 rounded-full bg-radial from-aqua-400/16 via-teal-500/8 to-transparent blur-3xl" />
        <div className="absolute -bottom-28 right-[12%] h-64 w-64 rounded-full bg-lime-300/10 blur-3xl" />
      </div>

      <div className="container-x relative z-10 py-12 sm:py-16">
        <Reveal>
          {/* Structured glassmorphic footer frame */}
          <div className="glass-border-dark relative overflow-hidden rounded-card-lg bg-linear-to-b from-navy-900/90 via-navy-950/95 to-navy-950 shadow-navy backdrop-blur-xl">
            {/* Subtle top highlight inside the card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-aqua-400/40 to-transparent"
            />

            {/* Main architectural grid: Brand on left, organized vertical columns on right */}
            <div className="grid grid-cols-1 divide-y divide-white/8 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
              {/* Brand & Tagline column */}
              <div className="flex flex-col justify-between gap-6 p-7 sm:p-10 lg:col-span-6">
                <div className="space-y-4">
                  <a
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(0);
                    }}
                    className="group inline-flex items-center gap-3 text-sm font-bold tracking-[0.2em] text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="grid size-8 place-items-center rounded-xl border border-white/12 bg-white/5 shadow-[inset_0_1px_0_rgb(255_255_255/0.15)] transition-colors duration-300 group-hover:border-aqua-400/50 group-hover:bg-aqua-400/10"
                    >
                      <span className="inline-flex flex-col items-center gap-0.5">
                        <span className="size-1.5 rounded-full bg-lime-300 shadow-[0_0_8px_rgb(213_239_120/0.9)]" />
                        <span className="h-2.5 w-1.5 rounded-full bg-linear-to-b from-lime-300 to-aqua-400" />
                      </span>
                    </span>
                    <span className="transition-colors duration-300 group-hover:text-aqua-200">
                      {site.brand}
                    </span>
                  </a>

                  <p className="max-w-sm text-sm leading-relaxed text-navy-300">
                    {site.footer.tagline}
                  </p>
                </div>

                {/* Decorative subtle gradient bar */}
                <div
                  aria-hidden="true"
                  className="h-1 w-16 rounded-full bg-linear-to-r from-aqua-400 via-teal-400 to-lime-300 opacity-75"
                />
              </div>

              {/* Navigation columns — clean 2-column vertical lists */}
              <nav
                aria-label={site.footer.navAria}
                className="grid grid-cols-2 divide-x divide-white/8 lg:col-span-6"
              >
                {site.footer.groups.map((group) => (
                  <div
                    key={group.label}
                    className="flex flex-col justify-between p-7 sm:p-10"
                  >
                    <div className="space-y-5">
                      <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-aqua-200/80">
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-aqua-400"
                        />
                        <span>{group.label}</span>
                      </span>

                      <ul className="space-y-3">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
                            >
                              <span className="link-underline">{link.label}</span>
                              <ArrowUpRight
                                aria-hidden="true"
                                className="size-3.5 text-aqua-400 opacity-0 -translate-x-1 translate-y-0.5 transition-all duration-200 ease-out-expo group-hover/link:opacity-100 group-hover/link:translate-x-0 group-hover/link:translate-y-0"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* Bottom bar inside the frame */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/8 bg-navy-950/60 px-7 py-5 sm:px-10">
              <span className="text-xs font-medium text-navy-300">
                {site.footer.copyright}
              </span>

              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(0);
                }}
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/14 bg-white/6 py-2 pr-2.5 pl-4 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua-400/50 hover:bg-white/10 hover:shadow-[0_0_24px_-4px_rgb(90_216_239/0.35)] cursor-pointer"
              >
                <span>{site.footer.backToTop}</span>
                <span className="grid size-6 place-items-center rounded-full bg-linear-to-br from-aqua-400/25 to-lime-300/25 text-aqua-200 transition-transform duration-300 ease-out-expo group-hover:scale-105">
                  <ArrowUp
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
