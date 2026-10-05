"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import { productBySlug } from "@/lib/products";
import { FREE_SHIPPING_OVER } from "@/lib/db";
import { FREE_SHIPPING_COPY } from "@/lib/site";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

const money = (n: number) => `$${n.toFixed(2).replace(/\.00$/, "")}`;

export default function CartPage() {
  const { lines, subtotal, shipping, total, setQty, remove, count } = useCart();
  const toFree = Math.max(0, FREE_SHIPPING_OVER - subtotal);

  return (
    <>
      <PageHero
        ground="ink"
        eyebrow="Your bag"
        title={
          count === 0 ? (
            <>
              Nothing in the bag
              <br />
              <em className="font-display italic text-gold">yet.</em>
            </>
          ) : (
            <>
              {count} {count === 1 ? "item" : "items"},
              <br />
              <em className="font-display italic text-gold">ready when you are.</em>
            </>
          )
        }
        lead={FREE_SHIPPING_COPY}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: "Bag", path: "/cart" },
        ]}
      />

      <Section ground="paper">
        {count === 0 ? (
          <div className="mx-auto max-w-lg text-center">
            <Icon name="bag" className="mx-auto size-10 text-bronze-ink" strokeWidth={1.1} />
            <h2 className="mt-7 font-display text-d3 text-ink">Your bag is empty.</h2>
            <p className="mt-4 text-base2 text-ink-soft">
              The line we use on you in the chair is the line on the shelf — no
              substitutions, and no product we would not put in our own hair.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/shop" variant="dark" icon="arrow-right">
                Open the shop
              </ButtonLink>
              <ButtonLink href="/book" variant="outline">
                Book instead
              </ButtonLink>
            </div>
          </div>
        ) : (
          <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-16">
            <div>
              <h2 className="sr-only">Items in your bag</h2>
              <ul className="flex flex-col border-t border-ink/12">
                {lines.map((l) => {
                  const p = productBySlug(l.slug);
                  if (!p) return null;
                  return (
                    <li key={l.slug} className="flex gap-6 border-b border-ink/12 py-7">
                      <Link
                        href={`/shop/${p.slug}`}
                        className="relative size-28 shrink-0 overflow-hidden rounded-xs2 border border-ink/12 bg-cream"
                      >
                        {p.image ? (
                          <Image src={p.image} alt="" fill sizes="112px" className="object-cover" />
                        ) : (
                          <span className="flex h-full items-center justify-center text-bronze-ink">
                            <Icon name="camera" className="size-6" strokeWidth={1.2} />
                          </span>
                        )}
                      </Link>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="min-w-0">
                            <Link
                              href={`/shop/${p.slug}`}
                              className="font-display text-d4 text-ink hover:text-bronze-ink"
                            >
                              {p.name}
                            </Link>
                            <p className="mt-1 text-sm2 text-ink-soft">
                              {p.blurb}
                              {p.size && ` · ${p.size}`}
                            </p>
                          </div>
                          <span className="font-display text-d4 italic tabular-nums text-bronze-ink">
                            {money(p.price * l.qty)}
                          </span>
                        </div>

                        <div className="mt-5 flex items-center gap-4">
                          <div className="flex items-center rounded-xs2 border border-ink/15">
                            <button
                              type="button"
                              onClick={() => setQty(l.slug, l.qty - 1)}
                              aria-label={`Decrease ${p.name} quantity`}
                              className="inline-flex size-11 items-center justify-center text-ink-soft hover:text-ink"
                            >
                              <Icon name="minus" className="size-4" />
                            </button>
                            <span className="w-10 text-center text-base2 tabular-nums">
                              {l.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(l.slug, l.qty + 1)}
                              aria-label={`Increase ${p.name} quantity`}
                              className="inline-flex size-11 items-center justify-center text-ink-soft hover:text-ink"
                            >
                              <Icon name="plus" className="size-4" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(l.slug)}
                            className="inline-flex min-h-11 items-center gap-2 text-sm2 text-ink-soft underline underline-offset-4 hover:text-bronze-ink"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8">
                <Link
                  href="/shop"
                  className="inline-flex min-h-11 items-center gap-2 text-sm2 text-ink-soft hover:text-bronze-ink"
                >
                  <Icon name="arrow-left" className="size-4" />
                  Keep shopping
                </Link>
              </div>
            </div>

            <aside
              aria-label="Order summary"
              className="card-light p-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)]"
            >
              <h2 className="font-display text-d4 text-ink">Summary</h2>

              {toFree > 0 ? (
                <p className="mt-5 text-sm2 text-ink-soft">
                  {money(toFree)} more for free shipping.
                </p>
              ) : (
                <p className="mt-5 flex items-center gap-2 text-sm2 text-bronze-ink">
                  <Icon name="check" className="size-4" />
                  Free shipping unlocked.
                </p>
              )}

              <dl className="mt-6 flex flex-col gap-2 border-t border-ink/12 pt-6 text-base2">
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Subtotal</dt>
                  <dd className="tabular-nums">{money(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Shipping</dt>
                  <dd className="tabular-nums">
                    {shipping === 0 ? "Free" : money(shipping)}
                  </dd>
                </div>
                <div className="mt-3 flex items-baseline justify-between border-t border-ink/12 pt-4">
                  <dt className="eyebrow text-bronze-ink">Total</dt>
                  <dd className="font-display text-d2 tabular-nums text-ink">
                    {money(total)}
                  </dd>
                </div>
              </dl>

              <ButtonLink href="/checkout" variant="gold" className="mt-7 w-full">
                Checkout
              </ButtonLink>

              <p className="mt-5 text-xs2 text-ink-soft">
                Preview build — checkout runs on demo data and no card is taken.
              </p>
            </aside>
          </div>
        )}
      </Section>
    </>
  );
}
