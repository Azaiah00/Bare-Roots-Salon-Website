"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartProvider";
import { productBySlug } from "@/lib/products";
import { FREE_SHIPPING_OVER } from "@/lib/db";
import { useDialog } from "@/lib/hooks";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const money = (n: number) => `$${n.toFixed(2).replace(/\.00$/, "")}`;

export default function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, shipping, total, setQty, remove } =
    useCart();
  const { dialogRef, firstRef } = useDialog(isOpen, closeCart);

  if (!isOpen) return null;

  const toFreeShipping = Math.max(0, FREE_SHIPPING_OVER - subtotal);

  return (
    <div
      className="fixed inset-0 z-[70] flex justify-end bg-ink/65 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && closeCart()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="flex h-full w-full max-w-[26rem] flex-col border-l border-white/12 bg-ink text-paper"
        data-ground="dark"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/12 px-6 py-5">
          <h2 id="cart-title" className="font-display text-d4">
            Your bag
          </h2>
          <button
            ref={firstRef}
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="inline-flex size-11 items-center justify-center rounded-xs2 text-cream-dim transition-colors hover:text-paper"
          >
            <Icon name="close" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <Icon name="bag" className="size-8 text-gold" strokeWidth={1.1} />
            <p className="text-base2 text-cream-dim">
              Nothing in the bag yet. The line we use on you in the studio is the
              line you can take home.
            </p>
            <Link href="/shop" onClick={closeCart} className="btn btn-ghost btn-sm">
              Open the shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto overscroll-contain px-6 py-5">
              {lines.map((l) => {
                const p = productBySlug(l.slug);
                if (!p) return null;
                return (
                  <li
                    key={l.slug}
                    className="flex gap-4 border-b border-white/10 py-5 first:pt-0"
                  >
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xs2 border border-white/12 bg-plum-deep">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center text-gold">
                          <Icon name="camera" className="size-5" strokeWidth={1.2} />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/shop/${p.slug}`}
                        onClick={closeCart}
                        className="text-sm2 text-paper hover:text-gilt"
                      >
                        {p.name}
                      </Link>
                      {p.size && (
                        <p className="mt-0.5 text-xs2 text-cream-dim">{p.size}</p>
                      )}

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center rounded-xs2 border border-white/15">
                          <button
                            type="button"
                            onClick={() => setQty(l.slug, l.qty - 1)}
                            aria-label={`Decrease ${p.name} quantity`}
                            className="inline-flex size-10 items-center justify-center text-cream-dim hover:text-paper"
                          >
                            <Icon name="minus" className="size-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm2 tabular-nums">
                            {l.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(l.slug, l.qty + 1)}
                            aria-label={`Increase ${p.name} quantity`}
                            className="inline-flex size-10 items-center justify-center text-cream-dim hover:text-paper"
                          >
                            <Icon name="plus" className="size-3.5" />
                          </button>
                        </div>
                        <span className="font-display text-base2 italic tabular-nums text-gold">
                          {money(p.price * l.qty)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(l.slug)}
                      aria-label={`Remove ${p.name}`}
                      className="inline-flex size-10 shrink-0 items-center justify-center self-start text-cream-dim transition-colors hover:text-paper"
                    >
                      <Icon name="close" className="size-4" />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-white/12 px-6 py-5">
              {toFreeShipping > 0 ? (
                <p className="mb-4 text-xs2 text-cream-dim">
                  {money(toFreeShipping)} more for free shipping.
                </p>
              ) : (
                <p className="mb-4 flex items-center gap-2 text-xs2 text-gilt">
                  <Icon name="check" className="size-3.5" />
                  Free shipping unlocked.
                </p>
              )}

              <dl className="flex flex-col gap-1.5 text-sm2">
                <div className="flex justify-between">
                  <dt className="text-cream-dim">Subtotal</dt>
                  <dd className="tabular-nums">{money(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-cream-dim">Shipping</dt>
                  <dd className="tabular-nums">
                    {shipping === 0 ? "Free" : money(shipping)}
                  </dd>
                </div>
                <div className="mt-2 flex items-baseline justify-between border-t border-white/12 pt-3">
                  <dt className="eyebrow text-gold">Total</dt>
                  <dd className={cn("font-display text-d4 tabular-nums text-paper")}>
                    {money(total)}
                  </dd>
                </div>
              </dl>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn btn-gold mt-5 w-full"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-3 flex min-h-11 items-center justify-center text-sm2 text-cream-dim underline underline-offset-4 hover:text-paper"
              >
                View the full bag
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
