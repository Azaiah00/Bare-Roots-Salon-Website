"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import { productBySlug } from "@/lib/products";
import { createOrder } from "@/lib/db";
import { SITE } from "@/lib/site";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

const money = (n: number) => `$${n.toFixed(2).replace(/\.00$/, "")}`;

/**
 * Demo checkout.
 *
 * THERE IS NO CARD FIELD, ON PURPOSE. A fake PAN input is the one thing on a
 * preview site that can genuinely mislead someone — and a real one needs a
 * payment processor, which is exactly the decision this build is deferring.
 * The order is summarised, the disclosure is explicit, and the button says what
 * it does.
 * // TODO: Stripe / Shopify checkout
 */
export default function CheckoutPage() {
  const { lines, subtotal, shipping, total, count, clear } = useCart();
  const [placed, setPlaced] = useState<{ id: string; total: number } | null>(null);
  const [collect, setCollect] = useState<"ship" | "studio">("ship");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const effectiveShipping = collect === "studio" ? 0 : shipping;
  const effectiveTotal = subtotal + effectiveShipping;

  if (placed) {
    return (
      <>
        <PageHero
          ground="forest"
          eyebrow="Order placed"
          title={
            <>
              That&rsquo;s it —
              <br />
              <em className="font-display italic text-gold">in the demo.</em>
            </>
          }
          lead="Nothing was charged and no order was created. This screen exists so you can see exactly what a real customer would see."
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: "Checkout", path: "/checkout" },
          ]}
        />
        <Section ground="paper">
          <div className="mx-auto max-w-2xl">
            <Icon name="circle-check" className="size-12 text-bronze-ink" strokeWidth={1} />
            <h2 className="mt-7 font-display text-d2 text-ink">Order {placed.id}</h2>

            <dl className="hairline-grid mt-9 sm:grid-cols-3">
              <div className="bg-paper p-6">
                <dt className="eyebrow text-bronze-ink">Reference</dt>
                <dd className="mt-2 text-base2 tabular-nums">{placed.id}</dd>
              </div>
              <div className="bg-paper p-6">
                <dt className="eyebrow text-bronze-ink">Total</dt>
                <dd className="mt-2 text-base2 tabular-nums">{money(placed.total)}</dd>
              </div>
              <div className="bg-paper p-6">
                <dt className="eyebrow text-bronze-ink">Charged</dt>
                <dd className="mt-2 text-base2">$0 — demo</dd>
              </div>
            </dl>

            <p className="marker mt-9 p-6 text-sm2 font-normal">
              <strong className="font-medium">This was a preview.</strong> No
              payment method was taken and no order exists. To buy for real today,
              call the studio on{" "}
              <a href={SITE.artists[0].phoneHref} className="underline underline-offset-4">
                {SITE.artists[0].phone}
              </a>{" "}
              or pick it up at your next appointment.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/portal/client" variant="dark" icon="arrow-right">
                See it in the portal
              </ButtonLink>
              <ButtonLink href="/shop" variant="outline">
                Back to the shelf
              </ButtonLink>
            </div>
          </div>
        </Section>
      </>
    );
  }

  if (count === 0) {
    return (
      <>
        <PageHero
          ground="ink"
          eyebrow="Checkout"
          title="Nothing to check out."
          lead="Your bag is empty — add something from the shelf first."
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: "Checkout", path: "/checkout" },
          ]}
        />
        <Section ground="paper">
          <ButtonLink href="/shop" variant="dark" icon="arrow-right">
            Open the shop
          </ButtonLink>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero
        ground="ink"
        eyebrow="Checkout"
        title={
          <>
            Almost
            <br />
            <em className="font-display italic text-gold">yours.</em>
          </>
        }
        lead="Preview build — there is no card field, nothing is charged, and no order is created."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: "Checkout", path: "/checkout" },
        ]}
      />

      <Section ground="paper">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-16">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const res = createOrder(lines);
              setPlaced({ id: res.id, total: effectiveTotal });
              clear();
            }}
          >
            <h2 className="font-display text-d3 text-ink">Where is it going?</h2>

            <fieldset className="mt-8">
              <legend className="eyebrow text-bronze-ink">Delivery</legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {(
                  [
                    { id: "ship", label: "Ship it to me" },
                    { id: "studio", label: "Collect in studio — free" },
                  ] as const
                ).map((o) => (
                  <label
                    key={o.id}
                    className={`inline-flex min-h-12 cursor-pointer items-center rounded-pill border px-6 text-sm2 transition-colors duration-base ease-brand ${
                      collect === o.id
                        ? "border-bronze-ink bg-cream text-ink"
                        : "border-ink/15 text-ink-soft hover:border-bronze-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="collect"
                      value={o.id}
                      checked={collect === o.id}
                      onChange={() => setCollect(o.id)}
                      className="sr-only"
                    />
                    {o.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="co-name" className="eyebrow text-bronze-ink">
                  Full name
                </label>
                <input
                  id="co-name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="field mt-2"
                />
              </div>
              <div>
                <label htmlFor="co-phone" className="eyebrow text-bronze-ink">
                  Mobile
                </label>
                <input
                  id="co-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="field mt-2"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="co-email" className="eyebrow text-bronze-ink">
                  Email
                </label>
                <input
                  id="co-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="field mt-2"
                />
              </div>
              {collect === "ship" && (
                <div className="sm:col-span-2">
                  <label htmlFor="co-address" className="eyebrow text-bronze-ink">
                    Shipping address
                  </label>
                  <textarea
                    id="co-address"
                    required
                    rows={3}
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="field mt-2"
                  />
                </div>
              )}
            </div>

            <div className="marker mt-9 flex items-start gap-3 p-5 text-sm2">
              <Icon name="lock" className="mt-0.5 size-4 shrink-0" />
              <p className="font-normal">
                <strong className="font-medium">No card field, on purpose.</strong>{" "}
                This is a preview build with no payment processor behind it. A
                realistic-looking card form would be the one thing here capable of
                genuinely misleading someone, so there isn&rsquo;t one.
              </p>
            </div>

            <button type="submit" className="btn btn-gold mt-8 w-full sm:w-auto">
              Place the demo order — {money(effectiveTotal)}
            </button>
          </form>

          <aside
            aria-label="Order summary"
            className="card-light p-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)]"
          >
            <h2 className="font-display text-d4 text-ink">Your order</h2>

            <ul className="mt-6 flex flex-col border-t border-ink/12">
              {lines.map((l) => {
                const p = productBySlug(l.slug);
                if (!p) return null;
                return (
                  <li key={l.slug} className="flex items-center gap-4 border-b border-ink/12 py-4">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xs2 border border-ink/12 bg-cream">
                      {p.image ? (
                        <Image src={p.image} alt="" fill sizes="56px" className="object-cover" />
                      ) : (
                        <span className="flex h-full items-center justify-center text-bronze-ink">
                          <Icon name="camera" className="size-4" strokeWidth={1.2} />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm2 text-ink">{p.name}</p>
                      <p className="text-xs2 text-ink-soft">Qty {l.qty}</p>
                    </div>
                    <span className="text-sm2 tabular-nums text-ink">
                      {money(p.price * l.qty)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <dl className="mt-6 flex flex-col gap-2 text-base2">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="tabular-nums">{money(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">
                  {collect === "studio" ? "Studio collection" : "Shipping"}
                </dt>
                <dd className="tabular-nums">
                  {effectiveShipping === 0 ? "Free" : money(effectiveShipping)}
                </dd>
              </div>
              <div className="mt-3 flex items-baseline justify-between border-t border-ink/12 pt-4">
                <dt className="eyebrow text-bronze-ink">Total</dt>
                <dd className="font-display text-d2 tabular-nums text-ink">
                  {money(effectiveTotal)}
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-xs2 text-ink-soft">
              $0 will be charged.{" "}
              <Link href="/cart" className="underline underline-offset-4">
                Edit your bag
              </Link>
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
