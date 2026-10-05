"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useDialog } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import { Icon, Seal } from "@/components/ui/Icon";

/**
 * The capture offer, from the agency Gamified Popup Library.
 *
 * MECHANIC: break a seal. Chosen over scratch-off and spin-the-wheel because
 * the brand already has a ceremonial seal — the tree-of-life emblem is
 * specified for loyalty, packaging and certificates — so the game is the
 * brand's own object rather than a carnival bolted onto a luxury salon.
 *
 * Fires on exit intent (desktop) or sustained scroll depth (touch), once per
 * session, and never on the booker, the bag, the checkout or the portal — the
 * four screens where a modal costs more than it earns.
 */

const SEALS = [
  {
    id: "rooted",
    label: "The Root Seal",
    prize: "A complimentary scalp scrub with your first appointment",
    code: "ROOTED",
    detail: "New clients. Added to your service, not to your deposit.",
    cta: { href: "/book", label: "Book an appointment" },
  },
  {
    id: "crowned",
    label: "The Crown Seal",
    prize: "15% off your first order from the shelf",
    code: "CROWNED",
    detail: "Any single order. One use, and it stacks with free shipping.",
    cta: { href: "/shop", label: "Open the shop" },
  },
  {
    id: "grown",
    label: "The Grove Seal",
    prize: "$25 off any Academy seat",
    code: "GROWN",
    detail: "Workshops, masterclasses and certifications. One seat.",
    cta: { href: "/academy", label: "See the Academy" },
  },
] as const;

const SUPPRESS = ["/book", "/cart", "/checkout", "/portal", "/login"];
const KEY = "br-offer-seen";

export default function ExitOffer() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [claimed, setClaimed] = useState(false);
  const [email, setEmail] = useState("");
  const firedRef = useRef(false);

  const close = useCallback(() => setOpen(false), []);
  const { dialogRef, firstRef } = useDialog(open, close);

  const shouldSuppress = useCallback(() => {
    if (typeof window === "undefined") return true;
    const p = window.location.pathname;
    if (SUPPRESS.some((s) => p.startsWith(s))) return true;
    // Once per session, latched in storage so a client-side navigation or a
    // refresh does not re-open it. Wrapped because private mode throws.
    try {
      if (window.sessionStorage.getItem(KEY)) return true;
    } catch {
      /* storage unavailable — fall through and rely on firedRef */
    }
    return false;
  }, []);

  useEffect(() => {
    const fire = () => {
      if (firedRef.current || shouldSuppress()) return;
      firedRef.current = true;
      try {
        window.sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      setOpen(true);
    };

    // Desktop: the pointer leaves through the TOP edge only. Sliding sideways
    // toward a bookmark is not an exit.
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };

    // Touch: 62% of the way down, then a 1.4s pause. "Read most of it and
    // stopped", not "flicked to the footer".
    let deep = false;
    let timer = 0;
    const onScroll = () => {
      if (deep) return;
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      if (window.scrollY / max > 0.62) {
        deep = true;
        timer = window.setTimeout(fire, 1400);
      }
    };

    document.addEventListener("mouseout", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("scroll", onScroll);
      if (timer) window.clearTimeout(timer);
    };
  }, [shouldSuppress]);

  if (!open) return null;

  const prize = picked === null ? null : SEALS[picked];

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-title"
        data-ground="dark"
        className="short:p-6 relative max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto overscroll-contain rounded-panel border border-gold/35 bg-plum-deep p-8 text-paper shadow-lift sm:p-10"
      >
        <button
          ref={firstRef}
          type="button"
          onClick={close}
          aria-label="Close offer"
          className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-xs2 text-cream-dim transition-colors hover:text-paper"
        >
          <Icon name="close" className="size-4" />
        </button>

        {claimed && prize ? (
          <div className="text-center">
            <p className="eyebrow text-gold">Your code</p>
            <h2 id="offer-title" className="mt-4 font-display text-d3">
              {prize.prize}
            </h2>
            <p className="mt-7">
              <span className="inline-block rounded-xs2 border border-dashed border-gold px-6 py-4 font-display text-[2rem] tracking-[0.12em] text-gold">
                {prize.code}
              </span>
            </p>
            <p className="mt-6 text-sm2 text-cream-dim">
              {prize.detail} Preview build — no email was actually sent.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={prize.cta.href} onClick={close} className="btn btn-gold">
                {prize.cta.label}
              </Link>
              <button type="button" onClick={close} className="btn btn-ghost">
                Keep reading
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="eyebrow text-gold">Before you go</p>
            <h2 id="offer-title" className="mt-4 font-display text-d3">
              {prize ? prize.prize : "Break a seal."}
            </h2>
            <p className="mt-4 max-w-measure text-base2 text-cream-dim">
              {prize
                ? prize.detail
                : "Three seals, one is yours. We press a real one into every certificate and every box that leaves the house — this is the digital version."}
            </p>

            <ul className="mt-8 grid grid-cols-3 gap-3">
              {SEALS.map((s, i) => {
                const on = picked === i;
                const dimmed = picked !== null && !on;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      disabled={picked !== null}
                      onClick={() => setPicked(i)}
                      aria-pressed={on}
                      className={cn(
                        "group flex min-h-[132px] w-full flex-col items-center justify-center gap-3 rounded-panel border p-4 text-center transition-all duration-base ease-brand",
                        on && "border-gold bg-plum",
                        dimmed && "border-white/10 bg-plum-deep text-cream-dim/45",
                        picked === null &&
                          "border-gold/40 bg-plum hover:-translate-y-1 hover:border-gold",
                      )}
                    >
                      <Seal
                        className={cn(
                          "size-11 transition-transform duration-base ease-brand",
                          on ? "text-gold" : "text-gilt",
                          picked === null && "group-hover:scale-110",
                        )}
                      />
                      <span className="text-xs2 leading-tight">{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {prize && (
              <form
                className="mt-8 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: newsletter provider. Demo only — nothing is sent.
                  setClaimed(true);
                }}
              >
                <label htmlFor="offer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="offer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="field field-dark rounded-pill flex-1"
                />
                <button type="submit" className="btn btn-gold">
                  Send my code
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
