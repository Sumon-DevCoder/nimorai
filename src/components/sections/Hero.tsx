"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useTransform } from "motion/react";
import { site, type ProductId } from "@/content/site-content";
import { EyebrowBadge } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NimoraiIcon } from "@/components/ui/NimoraiIcon";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { cn } from "@/lib/utils";

const CHIP_POSITIONS: Record<
  ProductId,
  { wrapper: string; float: string; factor: number }
> = {
  token: {
    wrapper: "top-[12%] left-[1%] sm:top-[16%] sm:left-[2%]",
    float: "animate-bob",
    factor: 18,
  },
  nft: {
    wrapper: "top-[10%] right-[1%] sm:top-[12%] sm:right-[1%]",
    float: "animate-float [animation-delay:1.1s]",
    factor: -22,
  },
  coin: {
    wrapper: "bottom-[13%] right-[2%] sm:bottom-[15%] sm:right-[3%]",
    float: "animate-bob [animation-delay:2.1s]",
    factor: 15,
  },
};

/**
 * Hero section:
 * - Page-load masked word reveal + gradient shimmer on "ideas to life."
 * - Layered 3D glass crystal scene (`hero-light-background`, `hero-orbit-elements`,
 *   `hero-floating-tile`, `hero-core`) with continuous sine float and mouse parallax tilt
 * - Independent bobbing chips (Token, NFT, Coin) + bottom "Create · Build · Explore" pill
 */
export function Hero() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const { x, y, enabled } = useMouseParallax(sceneRef);

  const rotateY = useTransform(x, [-1, 1], [-8, 8]);
  const rotateX = useTransform(y, [-1, 1], [7, -7]);
  const coreX = useTransform(x, [-1, 1], [-16, 16]);
  const coreY = useTransform(y, [-1, 1], [-14, 14]);
  const orbitX = useTransform(x, [-1, 1], [12, -12]);
  const orbitY = useTransform(y, [-1, 1], [10, -10]);
  const tileX = useTransform(x, [-1, 1], [-22, 22]);
  const tileY = useTransform(y, [-1, 1], [16, -16]);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28"
    >
      {/* Background aurora blobs + faint grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-lines mask-radial absolute inset-0 opacity-75" />
        <div
          data-parallax="0.18"
          className="animate-aurora absolute -top-24 right-[-8%] h-[540px] w-[540px] rounded-full bg-radial from-aqua-400/40 via-sky-300/25 to-transparent blur-3xl"
        />
        <div
          data-parallax="-0.14"
          className="animate-aurora [animation-delay:4s] absolute top-1/3 left-[-10%] h-[440px] w-[440px] rounded-full bg-radial from-teal-400/20 via-lavender-300/20 to-transparent blur-3xl"
        />
      </div>

      <div className="container-x">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left copy column */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-7">
            <div
              style={{ ["--d" as string]: "60ms" }}
              className="intro-fade"
            >
              <EyebrowBadge>{site.hero.eyebrow}</EyebrowBadge>
            </div>

            <h1 className="text-display text-ink">
              {site.hero.headlineLines.map((line, lineIdx) => (
                <span key={line} className="block">
                  {line.split(" ").map((word, wordIdx) => (
                    <span key={word} className="intro-mask mr-[0.22em]">
                      <span
                        style={{ ["--i" as string]: lineIdx * 2 + wordIdx }}
                        className="intro-word"
                      >
                        {word}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
              <span className="intro-mask block">
                <span
                  style={{ ["--i" as string]: 4 }}
                  className="intro-word text-gradient"
                >
                  {site.hero.headlineAccent}
                </span>
              </span>
            </h1>

            <p
              style={{ ["--d" as string]: "420ms" }}
              className="intro-fade text-lead max-w-xl text-muted"
            >
              {site.hero.description}
            </p>

            <div
              style={{ ["--d" as string]: "540ms" }}
              className="intro-fade flex flex-wrap items-center gap-3.5 pt-1"
            >
              <MagneticButton href={site.hero.primary.href} variant="primary" arrow>
                {site.hero.primary.label}
              </MagneticButton>
              <MagneticButton href={site.hero.secondary.href} variant="secondary">
                {site.hero.secondary.label}
              </MagneticButton>
            </div>
          </div>

          {/* Right 3D glass scene */}
          <div className="lg:col-span-6 xl:col-span-7">
            <motion.div
              ref={sceneRef}
              role="img"
              aria-label={site.hero.sceneAria}
              style={
                enabled
                  ? {
                      rotateX,
                      rotateY,
                      transformPerspective: 1200,
                      transformStyle: "preserve-3d",
                    }
                  : undefined
              }
              className="intro-scene relative mx-auto aspect-[1.08/1] w-full max-w-[680px] select-none"
            >
              {/* Soft glass halo backdrop */}
              <div
                aria-hidden="true"
                className=" absolute inset-[6%_2%_4%] rounded-[46%_54%_48%_52%] border border-white/85 bg-radial from-white/95 via-aqua-100/70 to-sky-100/20 shadow-[inset_0_0_90px_rgb(255_255_255/0.9),0_40px_90px_-20px_rgb(47_191_224/0.28)]"
              />

              {/* Ambient light wash */}
              <Image
                src="/assets/nimorai-art/hero-light-background.png"
                alt=""
                width={1672}
                height={941}
                sizes="(max-width: 1024px) 100vw, 58vw"
                aria-hidden="true"
                className="pointer-events-none absolute inset-[5%_0_2%] h-[92%] w-full rounded-[44%] object-cover opacity-65 mix-blend-multiply"
              />

              {/* Floating glass tile behind the core */}
              <motion.div
                aria-hidden="true"
                style={enabled ? { x: tileX, y: tileY } : undefined}
                className="pointer-events-none absolute top-[2%] right-[-6%] z-10 h-[50%] w-[58%] animate-float-slow opacity-85"
              >
                <Image
                  src="/assets/nimorai-art/hero-floating-tile.png"
                  alt=""
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1024px) 55vw, 380px"
                  className="h-full w-full object-contain"
                />
              </motion.div>

              {/* Orbiting glass rings */}
              <motion.div
                aria-hidden="true"
                style={enabled ? { x: orbitX, y: orbitY } : undefined}
                className="pointer-events-none absolute inset-[1%_-4%] z-20 animate-drift"
              >
                <Image
                  src="/assets/nimorai-art/hero-orbit-elements.png"
                  alt=""
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1024px) 100vw, 680px"
                  preload
                  className="h-full w-full object-contain"
                />
              </motion.div>

              {/* Luminous 3D glass core */}
              <motion.div
                aria-hidden="true"
                style={enabled ? { x: coreX, y: coreY } : undefined}
                className="pointer-events-none absolute top-[15%] left-[14%] z-30 h-[70%] w-[72%] animate-float"
              >
                <Image
                  src="/assets/nimorai-art/hero-core.png"
                  alt=""
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1024px) 80vw, 520px"
                  preload
                  fetchPriority="high"
                  className="h-full w-full object-contain drop-shadow-[0_30px_50px_rgb(18_150_157/0.25)]"
                />
              </motion.div>

              {/* Floating chips: Token, NFT, Coin */}
              {site.hero.chips.map((chip) => {
                const pos = CHIP_POSITIONS[chip.kind];
                return (
                  <div
                    key={chip.kind}
                    className={cn(
                      "absolute z-40",
                      pos.wrapper,
                      pos.float,
                    )}
                  >
                    <div className="glass glass-border flex items-center gap-3 rounded-2xl bg-white/88 px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-glass backdrop-blur-xl transition-transform duration-300 hover:scale-105">
                      <span className="grid size-9 sm:size-10 place-items-center rounded-xl border border-aqua-400/25 bg-linear-to-br from-aqua-100/90 to-white">
                        <NimoraiIcon name={chip.kind} size={20} />
                      </span>
                      <span className="pr-1">
                        <strong className="block text-xs sm:text-sm font-semibold text-ink leading-tight">
                          {chip.label}
                        </strong>
                        <small className="block text-[11px] sm:text-xs text-muted leading-tight mt-0.5">
                          {chip.detail}
                        </small>
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Scene bottom pill: Create · Build · Explore */}
              <div
                aria-hidden="true"
                className="glass glass-border absolute bottom-[4%] left-1/2 z-40 -translate-x-1/2 inline-flex items-center gap-2.5 rounded-full bg-white/90 px-4 py-2 text-[11px] sm:text-xs font-semibold tracking-[0.06em] text-teal-700 shadow-glass"
              >
                <span>{site.hero.sceneLabel[0]}</span>
                <i className="size-1 rounded-full bg-aqua-500" />
                <span>{site.hero.sceneLabel[1]}</span>
                <i className="size-1 rounded-full bg-lime-400" />
                <span>{site.hero.sceneLabel[2]}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

