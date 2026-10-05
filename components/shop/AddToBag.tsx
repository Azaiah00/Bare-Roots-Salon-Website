"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/lib/products";
import { Icon } from "@/components/ui/Icon";
import WaitlistForm from "./WaitlistForm";

export default function AddToBag({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  if (!product.available) {
    return (
      <div>
        <p className="badge mb-5 border-bronze-ink/50 text-bronze-ink">
          <Icon name="clock" className="size-3" />
          Not shipping yet
        </p>
        <p className="mb-5 max-w-prose2 text-sm2 text-ink-soft">
          DOPE HAIR is Iisha&rsquo;s own line and it is still in development. Join
          the list and you will hear before it is announced anywhere else — no
          card, no pre-order, nothing charged.
        </p>
        <WaitlistForm slug={product.slug} label="Tell me when it drops" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center rounded-xs2 border border-ink/15">
        <button
          type="button"
          onClick={() => setQty((n) => Math.max(1, n - 1))}
          aria-label="Decrease quantity"
          className="inline-flex size-12 items-center justify-center text-ink-soft transition-colors hover:text-ink"
        >
          <Icon name="minus" className="size-4" />
        </button>
        <span className="w-10 text-center text-base2 tabular-nums" aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((n) => Math.min(12, n + 1))}
          aria-label="Increase quantity"
          className="inline-flex size-12 items-center justify-center text-ink-soft transition-colors hover:text-ink"
        >
          <Icon name="plus" className="size-4" />
        </button>
      </div>

      <button type="button" onClick={() => add(product.slug, qty)} className="btn btn-gold">
        <Icon name="bag" className="size-4" />
        Add to bag
      </button>
    </div>
  );
}
