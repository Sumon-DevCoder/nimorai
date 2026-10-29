"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { site, type ProductId } from "@/content/site-content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NimoraiIcon } from "@/components/ui/NimoraiIcon";
import { Tilt } from "@/components/ui/Tilt";
import { cn } from "@/lib/utils";

/**
 * Product Explorer section:
 * - Accessible ARIA tablist (`Token`, `NFT`, `Coin`) with keyboard navigation
 *   (ArrowLeft/Right/Up/Down, Home, End) and a sliding `layoutId` pill indicator
 * - Cross-fade + slight slide copy panel with sequential 01 / 02 / 03 topic reveal
 * - 3D glass visual swap with scale/blur transition + floating "PROJECT BRIEF" card
 */
export function ProductExplorer() {
  const items = site.products.items;
  const [activeId, setActiveId] = useState<ProductId>("token");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = items.findIndex((item) => item.id === activeId);
  const current = items[activeIndex] ?? items[0];

  const selectByIndex = (nextIndex: number, focus = false) => {
    const wrapped = (nextIndex + items.length) % items.length;
    setDirection(wrapped < activeIndex ? -1 : 1);
    setActiveId(items[wrapped].id);
    setOverviewOpen(false);
    if (focus) {
      requestAnimationFrame(() => tabRefs.current[wrapped]?.focus());
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectByIndex(idx + 1, true);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectByIndex(idx - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectByIndex(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      selectByIndex(items.length - 1, true);
    }
  };

  return (
    <section id="products" className="section-y relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        data-parallax="0.16"
        className="pointer-events-none absolute top-1/4 right-[-8%] -z-10 h-[480px] w-[480px] rounded-full bg-radial from-aqua-400/30 via-lime-300/15 to-transparent blur-3xl"
      />

      <div className="container-x space-y-10 sm:space-y-12">
        <Reveal>
          <SectionHeading
            eyebrow={site.products.eyebrow}
            title={site.products.title}
            description={site.products.description}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <GlassCard
            tone="aqua"
            spotlight
            className="p-5 sm:p-8 lg:p-11"
          >
            {/* Tablist with sliding layoutId pill */}
            <div
              role="tablist"
              aria-label={site.products.tabsAria}
              className="grid w-full max-w-xl grid-cols-3 rounded-2xl border border-ink/8 bg-white/55 p-1 sm:p-1.5 backdrop-blur-md"
            >
              {items.map((tab, idx) => {
                const selected = tab.id === activeId;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    id={`product-tab-${tab.id}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls="product-explorer-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectByIndex(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={cn(
                      "relative z-10 flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-xl px-2 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer",
                      selected ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="product-tab-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="pointer-events-none absolute inset-0 -z-10 rounded-xl border border-white bg-white shadow-[0_6px_20px_-6px_rgb(20_70_100/0.18)]"
                      />
                    )}
                    <NimoraiIcon name={tab.id} size={16} className="sm:hidden" />
                    <NimoraiIcon name={tab.id} size={18} className="hidden sm:block" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tabpanel */}
            <div
              id="product-explorer-panel"
              role="tabpanel"
              aria-labelledby={`product-tab-${current.id}`}
              tabIndex={0}
              className="mt-8 lg:mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12"
            >
              {/* Left copy column */}
              <div className="order-2 lg:order-1 lg:col-span-6">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 22 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -18 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    <span className="inline-grid size-13 place-items-center rounded-2xl border border-white bg-white/90 shadow-xs">
                      <NimoraiIcon name={current.id} size={24} />
                    </span>

                    <div className="space-y-3">
                      <h3 className="text-h3 text-ink">{current.title}</h3>
                      <p className="text-lead text-muted">{current.description}</p>
                    </div>

                    {/* Sequential 01 / 02 / 03 topics */}
                    <ul className="divide-y divide-ink/8 border-y border-ink/8">
                      {current.topics.map((topic, idx) => (
                        <motion.li
                          key={topic}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.08 * idx + 0.08,
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex items-center gap-4 py-4 text-sm sm:text-base font-medium text-ink"
                        >
                          <span className="font-mono text-xs font-semibold tracking-wider text-teal-600">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span>{topic}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="space-y-3 pt-1">
                      <MagneticButton
                        variant="primary"
                        arrow
                        aria-expanded={overviewOpen}
                        aria-controls={`product-overview-${current.id}`}
                        onClick={() => setOverviewOpen((prev) => !prev)}
                      >
                        {site.products.overviewCta}
                      </MagneticButton>

                      <AnimatePresence>
                        {overviewOpen && (
                          <motion.div
                            id={`product-overview-${current.id}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="rounded-2xl border border-teal-500/20 bg-white/80 px-4 py-3 text-xs sm:text-sm text-muted">
                              {site.products.overviewText}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right 3D art showcase */}
              <div className="order-1 lg:order-2 lg:col-span-6">
                <Tilt max={5}>
                  <div
                    role="img"
                    aria-label={site.products.artAria(current.id)}
                    className="relative aspect-[1.2/1] w-full overflow-hidden rounded-card border border-white/90 bg-linear-to-br from-white/85 via-aqua-100/70 to-lime-100/45 p-6 shadow-[inset_0_1px_0_rgb(255_255_255),0_25px_60px_-25px_rgb(20_90_125/0.25)]"
                  >
                    {/* Decorative orbital rings */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[10%] rounded-full border border-aqua-500/25 animate-spin-slow"
                    >
                      <i className="absolute -top-1.5 left-1/3 size-3 rounded-full border-2 border-white bg-aqua-400" />
                      <i className="absolute right-4 bottom-1/4 size-3 rounded-full border-2 border-white bg-lime-300" />
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current.id}
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 flex h-full w-full items-center justify-center animate-float"
                      >
                        <Image
                          src={current.image.src}
                          alt=""
                          width={current.image.width}
                          height={current.image.height}
                          sizes="(max-width: 1024px) 90vw, 520px"
                          className="h-[92%] w-[92%] object-contain drop-shadow-[0_24px_40px_rgb(18_130_155/0.22)]"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Floating Project Brief card */}
                    <motion.div
                      key={`brief-${current.id}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18, duration: 0.45 }}
                      aria-hidden="true"
                      className="glass glass-border absolute right-2 bottom-2 sm:right-4 sm:bottom-4 z-20 w-44 sm:w-60 rounded-xl sm:rounded-2xl bg-white/92 p-3 sm:p-4 shadow-glass"
                    >
                      <span className="block text-[10px] font-bold tracking-[0.16em] uppercase text-teal-700">
                        {site.products.briefLabel}
                      </span>
                      <strong className="mt-1 block text-xs sm:text-sm font-bold text-ink">
                        {current.id.toUpperCase()}
                        {site.products.briefSuffix}
                      </strong>
                      <div className="mt-2.5 space-y-1.5">
                        <i className="skeleton-shine block h-1.5 w-11/12 rounded-full bg-line" />
                        <i className="skeleton-shine block h-1.5 w-3/4 rounded-full bg-line" />
                        <i className="skeleton-shine block h-1.5 w-5/6 rounded-full bg-line" />
                      </div>
                    </motion.div>
                  </div>
                </Tilt>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

