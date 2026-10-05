import type { Metadata } from "next";
import Image from "next/image";
import { artistById } from "@/lib/site";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHead, Accent } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import WaitlistForm from "@/components/shop/WaitlistForm";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Custom wraps",
  description:
    "Sabrina's premium satin and silk hair wraps, made to order — the protection layer for the crown you just paid for. Join the waitlist.",
  alternates: { canonical: "/wraps" },
};

export default function WrapsPage() {
  const sabrina = artistById("sabrina")!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Custom wraps", path: "/wraps" },
            ]),
          ),
        }}
      />

      <PageHero
        ground="plum"
        eyebrow={`${sabrina.subBrand} · by ${sabrina.name.split(" ")[0]}`}
        title={
          <>
            The crown you paid for,
            <br />
            <em className="font-display italic text-gold">protected.</em>
          </>
        }
        lead="Premium satin and silk wraps, made to order in the house palette. Not shipping yet — this is the list."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Custom wraps", path: "/wraps" },
        ]}
        actions={
          <ButtonLink href="#wraps-list" variant="gold" icon="arrow-right">
            Join the waitlist
          </ButtonLink>
        }
      />

      <Section ground="paper" labelledBy="wraps-title">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="relative overflow-hidden rounded-panel">
            <div className="relative aspect-[4/3]">
              <Image
                src="/img/wraps.webp"
                alt="Satin wraps in plum, mauve and champagne, folded on linen with a gold botanical sprig."
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-cover"
              />
            </div>
            <span className="badge absolute bottom-4 left-4 border-gilt/70 bg-ink/90 text-gilt backdrop-blur-sm">
              Concept image
            </span>
          </Reveal>

          <div>
            <SectionHead
              number="01"
              eyebrow="Why wraps"
              id="wraps-title"
              title={
                <>
                  Six weeks of work, undone in one{" "}
                  <Accent>night.</Accent>
                </>
              }
              lead="Cotton pillowcases pull moisture out of hair and drag on a fresh retwist. The single cheapest thing you can do to protect an install is cover it properly, every night, with something that does not fight back."
            />

            <Reveal className="mt-10 flex flex-col gap-4" delay={80}>
              {[
                "Made to order in the house palette — plum, mauve, forest and champagne.",
                "Sized for locs and volume, not for a photograph of a wrap.",
                "Satin-lined, with a hold that survives actually sleeping in it.",
              ].map((b) => (
                <p key={b} className="flex items-start gap-3 text-base2 text-ink-soft">
                  <Icon name="check" className="mt-1.5 size-4 shrink-0 text-bronze-ink" />
                  {b}
                </p>
              ))}
            </Reveal>

            <p className="marker mt-9 p-4 text-sm2">
              <strong className="font-medium">Needs confirmation:</strong> fabrics,
              sizes, made-to-order lead time and price. Nothing here is committed
              to until Sabrina sets it.
            </p>
          </div>
        </div>
      </Section>

      <Section id="wraps-list" ground="plum" labelledBy="wraps-list-title">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHead
            eyebrow="The list"
            id="wraps-list-title"
            ground="plum"
            align="center"
            title={
              <>
                First cut, first{" "}
                <em className="font-display italic text-gold">chosen.</em>
              </>
            }
            lead="One email when the first run is ready. No card, no pre-order, nothing charged."
          />
          <Reveal className="mt-10" delay={80}>
            <WaitlistForm slug="custom-wraps" label="Join the wrap list" dark />
          </Reveal>
          <Reveal className="mt-10" delay={140}>
            <ButtonLink href="/shop" variant="ghost" icon="arrow-right">
              Meanwhile, see the shelf
            </ButtonLink>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
