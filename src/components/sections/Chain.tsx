"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site-content";
import { Reveal } from "@/components/ui/Reveal";
import { EyebrowBadge } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

/**
 * NIMORAI Chain section:
 * - Left copy with eyebrow icon badge, headline, description, bordered note, and
 *   animated "About NIMORAI →" link
 * - Right ecosystem orbital diagram: slowly rotating orbit rings, drifting glass
 *   nodes/particles, and a pulsing 3D `chain-core.png` center node
 */
export function Chain() {
  return (
    <section id="chain" className="section-y relative overflow-hidden">
      <div className="container-x">
        <Reveal>
          <GlassCard
            tone="aqua"
            spotlight
            className="p-6 sm:p-10 lg:p-14"
          >
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left copy */}
              <div className="lg:col-span-5 space-y-6">
                <EyebrowBadge icon="chain">{site.chain.eyebrow}</EyebrowBadge>

                <h2 className="text-h2 text-ink">{site.chain.title}</h2>

                <p className="text-lead text-muted">{site.chain.description}</p>

                <p className="border-l-2 border-aqua-500 pl-4 text-xs sm:text-sm font-medium text-muted">
                  {site.chain.note}
                </p>

                <div className="pt-1">
                  <a
                    href={site.chain.link.href}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-ink transition-colors"
                  >
                    <span className="link-underline">{site.chain.link.label}</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </div>

              {/* Right orbital ecosystem visualization */}
              <div className="lg:col-span-7">
                <div
                  role="img"
                  aria-label={site.chain.aria}
                  className="relative mx-auto aspect-[1.45/1] w-full max-w-[660px]"
                >
                  {/* Radial aqua glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[8%] rounded-full bg-radial from-white/95 via-aqua-400/45 to-transparent blur-2xl animate-pulse-soft"
                  />

                  {/* Outer tilted orbit ring + rotating nodes */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-[4%] inset-y-[16%] -rotate-6 rounded-[50%] border border-white/90"
                  >
                    <div className="absolute inset-0 animate-spin-slow">
                      <span className="absolute -top-4 left-[18%] size-8 rotate-12 rounded-xl border border-white bg-linear-to-br from-white to-aqua-400/80 shadow-md" />
                      <span className="absolute bottom-[10%] -right-3 size-8 -rotate-12 rounded-xl border border-white bg-linear-to-br from-white to-aqua-200 shadow-md" />
                      <i className="absolute top-1/2 -left-1.5 size-3 rounded-md border border-white bg-aqua-400" />
                    </div>
                  </div>

                  {/* Middle tilted orbit ring (reverse rotation) */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-[10%] inset-y-[22%] rotate-12 rounded-[50%] border border-aqua-500/40"
                  >
                    <div className="absolute inset-0 animate-spin-slower">
                      <span className="absolute -top-3.5 right-[16%] size-8 rotate-6 rounded-xl border border-white bg-linear-to-br from-white to-lime-300 shadow-md" />
                      <span className="absolute -bottom-3.5 left-[22%] size-8 -rotate-6 rounded-xl border border-white bg-linear-to-br from-white to-lavender-300 shadow-md" />
                      <i className="absolute -top-1.5 left-1/2 size-3 rounded-md border border-white bg-lime-300" />
                    </div>
                  </div>

                  {/* Inner lime orbit ring */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-[18%] inset-y-[28%] -rotate-12 rounded-[50%] border border-lime-300/75"
                  >
                    <i className="absolute right-[18%] -bottom-1.5 size-3 rounded-md border border-white bg-lavender-300 animate-pulse-soft" />
                    <i className="absolute top-[38%] -right-1.5 size-2.5 rounded-full bg-aqua-400" />
                  </div>

                  {/* Pulsing center node with 3D chain-core render */}
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-aqua-400/35 animate-ping-soft" />
                    <div className="relative grid size-24 sm:size-32 place-items-center animate-float">
                      <Image
                        src="/assets/nimorai-art/chain-core.png"
                        alt=""
                        width={1278}
                        height={1230}
                        sizes="160px"
                        className="h-full w-full scale-125 object-contain drop-shadow-[0_22px_36px_rgb(37_125_154/0.32)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

