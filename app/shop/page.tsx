import type { Metadata } from "next";
import Link from "next/link";
import { LINES, productsInLine, PRODUCTS } from "@/lib/products";
import { SITE, FREE_SHIPPING_COPY } from "@/lib/site";
import { FREE_SHIPPING_OVER } from "@/lib/db";
import { jsonLd, breadcrumbSchema, itemListSchema } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHead, Accent, AccentDark } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/shop/ProductCard";
import WaitlistForm from "@/components/shop/WaitlistForm";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "The shelf",
  description:
    "Shop the Inflúance professional line carried at Bare Roots, and join the waitlist for DOPE HAIR — Iisha's own tools and scalp care. Free shipping over $75.",
  alternates: { canonical: "/shop" },
};

const missingPhotos = PRODUCTS.filter((p) => !p.image).length;

export default function ShopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(itemListSchema()) }}
      />

      <PageHero
        ground="plum"
        eyebrow="The shelf"
        title={
          <>
            What we use on you
            <br />
            <em className="font-display italic text-gold">is what you take home.</em>
          </>
        }
        lead={`One line already on our shelf, one line Iisha is building. ${FREE_SHIPPING_COPY}`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ]}
        actions={
          <>
            <ButtonLink href="#influance" variant="gold" icon="arrow-right">
              Shop Inflúance
            </ButtonLink>
            <ButtonLink href="#dope" variant="ghost">
              DOPE HAIR waitlist
            </ButtonLink>
          </>
        }
      />

      {LINES.map((line, li) => {
        const items = productsInLine(line.id);
        const dark = li % 2 === 1;

        return (
          <Section
            key={line.id}
            id={line.id}
            ground={dark ? "ink" : "paper"}
            labelledBy={`${line.id}-title`}
          >
            <SectionHead
              number={`0${li + 1}`}
              eyebrow={line.owner}
              id={`${line.id}-title`}
              ground={dark ? "ink" : "paper"}
              title={
                dark ? (
                  <>
                    <AccentDark>{line.name}</AccentDark>
                  </>
                ) : (
                  <>
                    <Accent>{line.name}</Accent>
                  </>
                )
              }
              lead={line.lead}
              action={
                line.status === "waitlist" ? (
                  <span className="badge border-gilt/60 text-gilt">
                    <Icon name="clock" className="size-3" />
                    Waitlist
                  </span>
                ) : (
                  <span
                    className={
                      dark ? "badge border-white/28 text-cream-dim" : "badge border-ink/20 text-ink-soft"
                    }
                  >
                    In stock in studio
                  </span>
                )
              }
            />

            <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={(i % 4) * 80}>
                  <ProductCard product={p} dark={dark} />
                </Reveal>
              ))}
            </ul>

            {line.status === "waitlist" && (
              <Reveal className="mt-14 card-dark p-8" delay={200}>
                <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                  <div>
                    <h3 className="font-display text-d3 text-paper">
                      Hear about it first.
                    </h3>
                    <p className="mt-4 max-w-prose2 text-sm2 text-cream-dim">
                      One email when the line ships. Nothing charged, no card
                      taken, and the list is not sold or shared.
                    </p>
                  </div>
                  <WaitlistForm slug="dope-hair" label="Join the DOPE list" dark />
                </div>
              </Reveal>
            )}
          </Section>
        );
      })}

      {/* Honest note about photography + shipping */}
      <Section ground="cream" labelledBy="shop-notes-title">
        <SectionHead
          eyebrow="Straight answers"
          id="shop-notes-title"
          title={
            <>
              How the shop actually <Accent>works.</Accent>
            </>
          }
        />

        <ul className="hairline-grid mt-14 sm:grid-cols-3">
          {[
            {
              icon: "package" as const,
              title: "Shipping",
              body: `Flat $6, free over $${FREE_SHIPPING_OVER}. Collect in studio at your next appointment and it is always free.`,
            },
            {
              icon: "info" as const,
              title: "Returns",
              body: "Unopened product within 14 days. Opened product cannot come back for hygiene reasons — but tell us if it reacted badly.",
            },
            {
              icon: "camera" as const,
              title: "Photography",
              body:
                missingPhotos > 0
                  ? `${missingPhotos} products are still showing a photo brief instead of a photograph. Each one names the shot it needs.`
                  : "Every product on the shelf is photographed.",
            },
          ].map((n, i) => (
            <Reveal as="li" key={n.title} delay={i * 80} className="bg-cream p-8">
              <Icon name={n.icon} className="size-5 text-bronze-ink" />
              <h3 className="mt-5 font-display text-d4 text-ink">{n.title}</h3>
              <p className="mt-3 text-sm2 text-ink-soft">{n.body}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="marker mt-12 flex flex-wrap items-start gap-4 p-6" delay={200}>
          <Icon name="alert" className="mt-0.5 size-5 shrink-0" />
          <div className="max-w-[62ch] text-sm2 font-normal">
            <p>
              <strong className="font-medium">Preview build.</strong> Checkout runs
              on demo data — no card is taken and no order is placed. Product
              prices for the Inflúance line were captured from{" "}
              <a
                href={SITE.retailPartner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                {SITE.retailPartner.name}
              </a>{" "}
              and need confirming against what the studio actually charges.
            </p>
            <p className="mt-2">
              Two DOPE HAIR concept renders were withheld because they carry other
              brands&rsquo; names printed on the product. See ASSETS-OWED.md.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap gap-4" delay={240}>
          <ButtonLink href="/cart" variant="dark" icon="arrow-right">
            View your bag
          </ButtonLink>
          <Link
            href="/wraps"
            className="inline-flex min-h-11 items-center gap-2 text-sm2 text-ink-soft underline underline-offset-4 hover:text-bronze-ink"
          >
            Sabrina&rsquo;s custom wraps
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
