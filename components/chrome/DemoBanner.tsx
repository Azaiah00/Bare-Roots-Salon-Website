"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { DEMO_MODE } from "@/lib/db";

/**
 * The honesty bar. Nobody should be able to click through the booking portal
 * and wonder afterwards whether a card was charged.
 *
 * Desktop only, pinned to the bottom. On phones the bottom edge already belongs
 * to the book bar, so the same disclosure is carried inline on the two screens
 * where it actually matters — the booker's confirmation and the checkout.
 *
 * It disappears entirely when DEMO_MODE goes false, which is the one line that
 * changes on go-live.
 */
export default function DemoBanner() {
  const [open, setOpen] = useState(true);
  if (!DEMO_MODE || !open) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden justify-center px-6 pb-4 lg:flex">
      <div data-ground="dark" className="pointer-events-auto flex items-center gap-4 rounded-pill border border-gold/45 bg-ink py-2 pl-5 pr-2 shadow-lift">
        <p className="flex items-center gap-2.5 text-xs2 text-cream-dim">
          <Icon name="info" className="size-4 shrink-0 text-gold" />
          <span>
            <strong className="font-medium text-paper">Preview build.</strong>{" "}
            Booking and checkout run on demo data — nothing is charged.
          </span>
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss preview notice"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-pill text-cream-dim transition-colors hover:bg-white/10 hover:text-paper"
        >
          <Icon name="close" className="size-4" />
        </button>
      </div>
    </div>
  );
}
