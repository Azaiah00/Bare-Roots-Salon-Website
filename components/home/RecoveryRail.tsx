"use client";

import Link from "next/link";
import { RECOVERY_STEPS } from "@/lib/content";
import { useScrollProgress } from "@/lib/hooks";
import Reveal from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

/**
 * SIGNATURE MOVE 3 — "the root fills as you read".
 *
 * A sticky heading column with a gold rule that fills top-to-bottom in step
 * with the reader's progress through the four stages of the method.
 *
 * `position: sticky` plus one passive scroll listener and one rAF — no GSAP,
 * no ScrollTrigger, no pin spacer to get wrong. The hook bails entirely under
 * reduced motion, in which case the rule simply renders at rest and the stack
 * reads as a plain list, which is what it is.
 */
export default function RecoveryRail() {
  const [ref, progress] = useScrollProgress<HTMLDivElement>();

  return (
    <section
      id="method"
      aria-labelledby="method-title"
      data-ground="dark"
      className="bg-wellness py-section text-paper"
    >
      <div ref={ref} className="shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* Sticky column */}
        <div className="lg:sticky lg:top-[calc(var(--header-h)+4rem)] lg:self-start">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span className="tabular-nums">03</span>
              <span className="gold-rule" aria-hidden="true" />
              Hair recovery
            </p>
            <h2 id="method-title" className="mt-5 text-d2">
              The Root Recovery
              <br />
              <em className="font-display italic text-gold">Method</em>
              <span className="align-super text-[0.5em] text-gilt">&trade;</span>
            </h2>
            <p className="mt-6 max-w-measure text-lead text-cream-dim">
              Iisha&rsquo;s protocol for thinning, alopecia and scalp health. Four
              stages, measured rather than promised — and photographed at every
              visit so the progress is something you can see rather than
              something you are told.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/recovery" variant="gold" icon="arrow-right">
                How it works
              </ButtonLink>
              <ButtonLink
                href="/book?service=hair-recovery-consultation"
                variant="ghost"
              >
                Book a consultation
              </ButtonLink>
            </div>

            {/* The rule that fills. */}
            <div className="mt-14 hidden items-center gap-4 lg:flex">
              <div className="relative h-40 w-px bg-white/18">
                <span
                  className="absolute inset-x-0 top-0 bg-gold transition-[height] duration-fast ease-out"
                  style={{ height: `${Math.round(progress * 100)}%` }}
                  aria-hidden="true"
                />
              </div>
              <p className="eyebrow text-cream-dim">
                {Math.min(4, Math.max(1, Math.ceil(progress * 4) || 1))} of 4
              </p>
            </div>
          </Reveal>
        </div>

        {/* The four stages */}
        <ol className="flex flex-col">
          {RECOVERY_STEPS.map((s, i) => (
            <Reveal as="li" key={s.no} delay={i * 80}>
              <article className="border-t border-white/14 py-10 first:border-t-0 first:pt-0">
                <p className="font-display text-[3.5rem] leading-none text-gold/70 tabular-nums">
                  {s.no}
                </p>
                <h3 className="mt-4 font-display text-d3">{s.title}</h3>
                <p className="mt-4 max-w-prose2 text-base2 text-paper/90">{s.desc}</p>
                <p className="mt-4 max-w-prose2 text-sm2 text-cream-dim">{s.detail}</p>
              </article>
            </Reveal>
          ))}

          <Reveal as="li" delay={340}>
            <div className="marker marker-dark mt-4 flex flex-wrap items-center justify-between gap-5 p-6">
              <p className="flex items-start gap-3 text-sm2">
                <Icon name="info" className="mt-0.5 size-4 shrink-0" />
                <span className="max-w-[46ch] font-normal">
                  Hair care is not medicine. When the cause is systemic, you will
                  be told plainly and referred — not sold a twelve-week package.
                </span>
              </p>
              <Link
                href="/faq"
                className="inline-flex min-h-11 items-center gap-2 text-xs2 uppercase tracking-wide2"
              >
                Read the FAQ
                <Icon name="arrow-right" className="size-3.5" />
              </Link>
            </div>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
