"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WORK, type WorkItem } from "@/lib/content";
import { serviceBySlug } from "@/lib/services";
import { useDialog } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import Reveal from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

/**
 * The work grid, with a lightbox.
 *
 * Alt text doubles as the lightbox caption, which is why every entry in
 * content.ts is written as a sentence rather than as keywords.
 *
 * Every tile carries a "Concept image" flag while `real` is false. It is meant
 * to be visible: these are renders made for the pitch, and the grid stops being
 * honest the moment that flag is quietly removed instead of the photograph
 * being taken.
 */
export default function WorkGrid({
  items = WORK,
  limit,
  dark,
}: {
  items?: WorkItem[];
  limit?: number;
  dark?: boolean;
}) {
  const shown = limit ? items.slice(0, limit) : items;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = () => setOpenIndex(null);
  const { dialogRef, firstRef } = useDialog(openIndex !== null, close);

  const current = openIndex === null ? null : shown[openIndex];
  const service = current?.serviceSlug ? serviceBySlug(current.serviceSlug) : undefined;

  return (
    <>
      {/*
        A fixed row track plus spans, not aspect ratios.

        Mixing `aspect-[3/5]` with `row-span-2` and `auto-rows-[minmax(0,1fr)]`
        looks reasonable and is not: the intrinsic aspect fights the equal-height
        track, every row inflates to the tallest tile, and the grid grows to
        three times its intended height with a column of empty space beside it.
        An explicit track and `grid-flow-dense` gives a real mosaic that fills.
      */}
      <ul className="grid gap-4 [grid-auto-flow:dense] [grid-auto-rows:11rem] sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((w, i) => (
          <Reveal
            as="li"
            key={w.slug}
            delay={(i % 3) * 90}
            className={cn(
              "row-span-2",
              w.span === "tall" && "sm:row-span-3",
              w.span === "wide" && "sm:col-span-2",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className={cn(
                "group relative block h-full w-full overflow-hidden rounded-panel border text-left",
                dark ? "border-white/12" : "border-ink/12",
              )}
              aria-label={`View ${w.caption}`}
            >
              <Image
                src={w.image}
                alt={w.alt}
                fill
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                className="object-cover transition-transform duration-slow ease-brand group-hover:scale-[1.04]"
              />

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,21,24,0.86),rgba(28,21,24,0.06)_52%,transparent)]"
              />

              {!w.real && (
                <span className="badge absolute right-3 top-3 border-gilt/60 bg-ink/90 text-[0.625rem] text-gilt backdrop-blur-sm">
                  Concept image
                </span>
              )}

              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <span>
                  <span className="eyebrow block text-gold">
                    {w.artist === "iisha" ? "Iisha" : "Sabrina"}
                  </span>
                  <span className="mt-1.5 block font-display text-d4 text-paper">
                    {w.caption}
                  </span>
                </span>
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-pill border border-gold/50 text-gold transition-transform duration-base ease-brand group-hover:rotate-45">
                  <Icon name="plus" className="size-4" />
                </span>
              </span>
            </button>
          </Reveal>
        ))}

        {/* The mosaic ends on an odd count, which leaves a hole. Rather than
            padding it with another photograph, the hole becomes the one thing
            a portfolio is for. */}
        {!limit && (
          <Reveal as="li" delay={120} className="row-span-2">
            <Link
              href="/book"
              className={cn(
                "group flex h-full flex-col justify-between rounded-panel border border-dashed p-7",
                dark ? "border-gold/40 bg-white/[0.03]" : "border-bronze-ink/40 bg-cream",
              )}
            >
              <Icon
                name="sparkle"
                className={cn("size-6", dark ? "text-gold" : "text-bronze-ink")}
                strokeWidth={1.2}
              />
              <span>
                <span
                  className={cn(
                    "block font-display text-d3",
                    dark ? "text-paper" : "text-ink",
                  )}
                >
                  Yours next.
                </span>
                <span
                  className={cn(
                    "mt-3 inline-flex items-center gap-2 text-xs2 uppercase tracking-wide2",
                    dark ? "text-gold" : "text-bronze-ink",
                  )}
                >
                  Book a consultation
                  <Icon
                    name="arrow-right"
                    className="size-3.5 transition-transform duration-base ease-brand group-hover:translate-x-1"
                  />
                </span>
              </span>
            </Link>
          </Reveal>
        )}
      </ul>

      {current && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/88 p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            data-ground="dark"
            className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-4xl flex-col overflow-y-auto overscroll-contain rounded-panel border border-white/14 bg-plum-deep text-paper"
          >
            <button
              ref={firstRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 inline-flex size-11 items-center justify-center rounded-pill bg-ink/70 text-paper backdrop-blur-sm"
            >
              <Icon name="close" className="size-4" />
            </button>

            <div className="relative aspect-[4/3] w-full">
              <Image
                src={current.image}
                alt={current.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 96vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-wrap items-end justify-between gap-6 p-7">
              <div>
                <p className="eyebrow text-gold">
                  {current.artist === "iisha" ? "Iisha" : "Sabrina"}
                  {!current.real && " · concept image"}
                </p>
                <h3 className="mt-3 font-display text-d3">{current.caption}</h3>
                <p className="mt-3 max-w-prose2 text-sm2 text-cream-dim">{current.alt}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex((n) => (n === null ? null : (n - 1 + shown.length) % shown.length))
                  }
                  aria-label="Previous"
                  className="inline-flex size-11 items-center justify-center rounded-pill border border-white/20 text-paper hover:border-gold hover:text-gold"
                >
                  <Icon name="arrow-left" className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpenIndex((n) => (n === null ? null : (n + 1) % shown.length))}
                  aria-label="Next"
                  className="inline-flex size-11 items-center justify-center rounded-pill border border-white/20 text-paper hover:border-gold hover:text-gold"
                >
                  <Icon name="arrow-right" className="size-4" />
                </button>
                {service && (
                  <Link
                    href={`/book?service=${service.slug}`}
                    onClick={close}
                    className="btn btn-gold btn-sm"
                  >
                    Book {service.name}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
