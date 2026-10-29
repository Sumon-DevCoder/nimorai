"use client";

import { ArrowUp } from "lucide-react";
import { site } from "@/content/site-content";
import { useSmoothScroll } from "@/components/ui/SmoothScroll";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Dark navy footer:
 * - Glowing teal/lime ambient accents
 * - Brand + tagline on the left, "Explore" and "NIMORAI" link columns on the right
 *   with animated link underlines
 * - Bottom bar with "© 2026 NIMORAI" and a Lenis-powered "Back to top ↑" pill button
 */
export function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      {/* Top gradient hairline */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-linear-to-r from-transparent via-aqua-400/50 to-transparent"
      />

      {/* Ambient glow inside dark footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 h-72 w-72 rounded-full bg-aqua-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-lime-300/8 blur-3xl"
      />

      <div className="container-x relative z-10 pt-16 pb-12 sm:pt-20 sm:pb-14">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 pb-14 lg:grid-cols-12">
            {/* Brand column */}
            <div className="lg:col-span-6 space-y-4">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(0);
                }}
                className="group inline-flex items-center gap-2.5 text-sm font-bold tracking-[0.18em] text-white"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex flex-col items-center gap-0.5"
                >
                  <span className="size-1.5 rounded-full bg-lime-300" />
                  <span className="h-2.5 w-1.5 rounded-full bg-linear-to-b from-lime-300 to-aqua-400" />
                </span>
                <span>{site.brand}</span>
              </a>

              <p className="max-w-xs text-sm text-navy-300 leading-relaxed">
                {site.footer.tagline}
              </p>
            </div>

            {/* Footer navigation groups */}
            <nav
              aria-label={site.footer.navAria}
              className="lg:col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-2"
            >
              {site.footer.groups.map((group) => (
                <div key={group.label} className="space-y-4">
                  <span className="block text-[11px] font-bold tracking-[0.2em] uppercase text-navy-300">
                    {group.label}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                    {group.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="w-fit text-sm text-white/85 hover:text-aqua-200 transition-colors link-underline"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
            <span className="text-xs text-navy-300">
              {site.footer.copyright}
            </span>

            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollTo(0);
              }}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:border-aqua-400/50 hover:bg-white/10 cursor-pointer"
            >
              <span>{site.footer.backToTop}</span>
              <ArrowUp
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

