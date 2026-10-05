import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, productBySlug, productsInLine, priceLabel, LINES } from "@/lib/products";
import { FREE_SHIPPING_COPY, SITE } from "@/lib/site";
import { jsonLd, breadcrumbSchema, productSchema } from "@/lib/schema";
import { Section } from "@/components/ui/Section";
import PageHero, { BackLink } from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import PhotoSlot from "@/components/ui/PhotoSlot";
import ProductCard from "@/components/shop/ProductCard";
import AddToBag from "@/components/shop/AddToBag";
import { Icon } from "@/components/ui/Icon";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = productBySlug(params.slug);
  if (!p) return { title: "Not found" };
  return {
    title: p.name,
    description: p.detail,
    alternates: { canonical: `/shop/${p.slug}` },
    openGraph: {
      title: `${p.name} — ${priceLabel(p)}`,
      description: p.detail,
      ...(p.image ? { images: [{ url: p.image }] } : {}),
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productBySlug(params.slug);
  if (!product) notFound();

  const line = LINES.find((l) => l.id === product.line)!;
  const related = productsInLine(product.line)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: product.name, path: `/shop/${product.slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(productSchema(product)) }}
      />

      <PageHero
        ground={product.line === "dope" ? "plum" : "forest"}
        eyebrow={`${line.name} · ${line.owner}`}
        title={product.name}
        lead={product.blurb}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: product.name, path: `/shop/${product.slug}` },
        ]}
      />

      <Section ground="paper">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <PhotoSlot
              src={product.image}
              alt={`${product.name} — ${product.blurb}.`}
              brief={product.image ? undefined : product.photoBrief}
              ratio="1/1"
              sizes="(min-width: 1024px) 46vw, 92vw"
              priority
              concept={Boolean(product.image)}
            />
          </Reveal>

          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-d2 italic tabular-nums text-bronze">
                  {priceLabel(product)}
                </span>
                {product.size && (
                  <span className="badge border-ink/20 text-ink-soft">{product.size}</span>
                )}
                {product.priceStatus === "needs-confirmation" && (
                  <span className="badge border-bronze-ink/50 text-bronze-ink">
                    <Icon name="info" className="size-3" />
                    Price to confirm
                  </span>
                )}
              </div>

              <p className="mt-7 max-w-prose2 text-lead text-ink-soft">{product.detail}</p>

              <div className="mt-9">
                <AddToBag product={product} />
              </div>

              <ul className="mt-10 flex flex-col gap-3 border-t border-ink/12 pt-8 text-sm2 text-ink-soft">
                <li className="flex items-start gap-3">
                  <Icon name="package" className="mt-0.5 size-4 shrink-0 text-bronze-ink" />
                  {FREE_SHIPPING_COPY}
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="info" className="mt-0.5 size-4 shrink-0 text-bronze-ink" />
                  Unopened product can be returned within 14 days.{" "}
                  <Link href="/policies#products-returns" className="underline underline-offset-4">
                    Read the policy
                  </Link>
                </li>
                {product.line === "influance" && (
                  <li className="flex items-start gap-3">
                    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-bronze-ink" />
                    Used in the studio on your service, and priced from{" "}
                    <a
                      href={SITE.retailPartner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      {SITE.retailPartner.name}
                    </a>
                    .
                  </li>
                )}
              </ul>

              {!product.image && (
                <p className="marker mt-8 p-4 text-sm2">
                  <strong className="font-medium">Photography owed.</strong>{" "}
                  {product.photoBrief}
                </p>
              )}

              <div className="mt-10">
                <BackLink href="/shop">Back to the shelf</BackLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section ground="cream" label={`More from ${line.name}`}>
          <h2 className="eyebrow text-bronze-ink">More from {line.name}</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
