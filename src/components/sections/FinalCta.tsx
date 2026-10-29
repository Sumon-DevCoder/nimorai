"use client";

import Image from "next/image";
import { site } from "@/content/site-content";
import { Reveal } from "@/components/ui/Reveal";
import { EyebrowBadge } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * Final CTA section:
 * - Gradient glass panel with animated aurora blobs, headline reveal, glowing buttons,
 *   and the `closing-cta.png` 3D glass sphere render masked seamlessly on the right
 */
export function FinalCta() {
  return (
    <section className="pt-8 pb-16 sm:pb-24 relative overflow-hidden">
      <div className="container-x">
        <Reveal>
          <div className="glass glass-border relative overflow-hidden rounded-card-lg bg-linear-to-r from-aqua-200/80 via-sky-100/75 to-lime-100/80 p-7 sm:p-12 lg:p-16 shadow-lift">
            {/* Animated aurora highlights */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-aqua-400/35 blur-3xl animate-aurora"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -bottom-24 h-80 w-80 rounded-full bg-lime-300/45 blur-3xl animate-aurora [animation-delay:3s]"
            />

            <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6 space-y-6">
                <EyebrowBadge>{site.cta.eyebrow}</EyebrowBadge>

                <h2 className="text-h2 text-ink">{site.cta.title}</h2>

                <p className="text-lead text-muted max-w-lg">
                  {site.cta.description}
                </p>

                <div className="flex flex-wrap items-center gap-3.5 pt-1">
                  <MagneticButton
                    href={site.cta.primary.href}
                    variant="primary"
                    arrow
                  >
                    {site.cta.primary.label}
                  </MagneticButton>
                  <MagneticButton
                    href={site.cta.secondary.href}
                    variant="secondary"
                  >
                    {site.cta.secondary.label}
                  </MagneticButton>
                </div>
              </div>

              {/* Right 3D glass closing visual */}
              <div
                aria-hidden="true"
                className="lg:col-span-6 relative aspect-[2.1/1] w-full overflow-hidden rounded-card"
              >
                <Image
                  src="/assets/nimorai-art/closing-cta.png"
                  alt=""
                  width={1967}
                  height={799}
                  sizes="(max-width: 1024px) 92vw, 640px"
                  className="h-full w-full object-cover object-right animate-float-slow [mask-image:linear-gradient(90deg,transparent_0%,#000_18%,#000_96%,transparent_100%)]"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

