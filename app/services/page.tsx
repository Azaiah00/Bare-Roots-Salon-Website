import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import {
  SERVICE_CATEGORIES,
  servicesInCategory,
  formatDuration,
  DEPOSIT,
  CANCELLATION_HOURS,
  RESCHEDULE_HOURS,
} from "@/lib/services";
import { artistById } from "@/lib/site";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHead, Accent } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import PriceTag from "@/components/ui/PriceTag";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Botanical } from "@/components/brand/RootDraw";

export const metadata: Metadata = {
  title: "Services & pricing",
  description:
    "The full Bare Roots menu — micro locs, starter locs, retwists, loc colour, scalp therapy, hair recovery, silk press and natural styling in Henrico, VA. Durations and prices for every service.",
  alternates: { canonical: "/services" },
};

const GROUND = ["paper", "cream", "paper"] as const;

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Services"
        title={
          <>
            The whole menu,
            <br />
            <em className="font-display italic text-gold">priced in the open.</em>
          </>
        }
        lead="Durations are real — they are what the booker uses to decide whether a service fits inside a day. Anything quoted at consultation is quoted at consultation because the honest number depends on your head."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        actions={
          <>
            <ButtonLink href="/book" variant="gold" icon="arrow-right">
              Book an appointment
            </ButtonLink>
            <ButtonLink href="#recovery" variant="ghost">
              Recovery services
            </ButtonLink>
          </>
        }
      />

      {SERVICE_CATEGORIES.map((cat, ci) => {
        const items = servicesInCategory(cat.id);
        const artist = artistById(cat.artistId);
        const ground = GROUND[ci % GROUND.length];

        return (
          <Section key={cat.id} id={cat.id} ground={ground} labelledBy={`${cat.id}-title`}>
            <SectionHead
              number={`0${ci + 1}`}
              eyebrow={`With ${artist?.name}`}
              id={`${cat.id}-title`}
              ground={ground}
              title={
                <>
                  {cat.name.split(" ").slice(0, -1).join(" ")}{" "}
                  <Accent>{cat.name.split(" ").slice(-1)}</Accent>
                </>
              }
              lead={cat.lead}
              action={
                <ButtonLink href={`/house#${cat.artistId}`} variant="outline" size="sm">
                  About {artist?.name.split(" ")[0]}
                </ButtonLink>
              }
            />

            <ul className="mt-14 flex flex-col">
              {items.map((s, i) => (
                <Reveal as="li" key={s.slug} delay={(i % 4) * 70}>
                  <article className="group border-t border-ink/12 py-8">
                    <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-d3 text-ink">{s.name}</h3>
                          {s.signature && (
                            <span className="badge border-bronze-ink/50 text-bronze-ink">
                              <Icon name="sparkle" className="size-3" />
                              Signature
                            </span>
                          )}
                          {s.consultationFirst && (
                            <span className="badge border-ink/20 text-ink-soft">
                              Consultation first
                            </span>
                          )}
                        </div>

                        <p className="mt-3 max-w-prose2 text-base2 text-ink-soft">{s.blurb}</p>

                        {s.note && (
                          <p className="mt-4 max-w-prose2 border-l-2 border-bronze/40 pl-4 text-sm2 text-ink-soft">
                            {s.note}
                          </p>
                        )}

                        <p className="mt-4 inline-flex items-center gap-2 text-sm2 text-ink-soft">
                          <Icon name="clock" className="size-4 text-bronze-ink" />
                          <span className="tabular-nums">{formatDuration(s.duration)}</span>
                          <span aria-hidden="true" className="text-ink/25">
                            ·
                          </span>
                          <span>{artist?.name}</span>
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col items-start gap-4 md:items-end">
                        <PriceTag service={s} />
                        <Link
                          href={`/book?service=${s.slug}`}
                          className="btn btn-outline btn-sm"
                        >
                          {s.consultationFirst ? "Book a consultation" : "Book"}
                          <Icon name="arrow-right" className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>

            {ci === SERVICE_CATEGORIES.length - 1 && (
              <Botanical className="mt-16 h-14 w-auto text-bronze" />
            )}
          </Section>
        );
      })}

      {/* Booking terms — stated once, in full, where the prices are. */}
      <Section ground="forest" labelledBy="terms-title">
        <SectionHead
          eyebrow="Before you book"
          id="terms-title"
          ground="forest"
          title={
            <>
              The terms, said{" "}
              <em className="font-display italic text-gold">plainly.</em>
            </>
          }
        />

        <ul className="hairline-grid on-dark mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "wallet" as const,
              label: "Deposit",
              value: `$${DEPOSIT}`,
              sub: "Holds the chair, comes off your balance on the day.",
              pending: true,
            },
            {
              icon: "calendar" as const,
              label: "To cancel",
              value: `${CANCELLATION_HOURS}h`,
              sub: "Notice we ask for. Long services book weeks ahead.",
            },
            {
              icon: "clock" as const,
              label: "To reschedule",
              value: `${RESCHEDULE_HOURS}h`,
              sub: "Text your artist directly — we would rather move it than lose you.",
            },
            {
              icon: "users" as const,
              label: "Transfers",
              value: "Welcome",
              sub: "Start with a consultation so the grid can be seen first.",
            },
          ].map((t, i) => (
            <Reveal as="li" key={t.label} delay={i * 70} className="bg-forest p-7">
              <Icon name={t.icon} className="size-5 text-gold" />
              <p className="mt-5 font-display text-[2.25rem] leading-none tabular-nums text-paper">
                {t.value}
              </p>
              <p className="eyebrow mt-4 text-gold">{t.label}</p>
              <p className="mt-2 text-sm2 text-cream-dim">{t.sub}</p>
              {t.pending && (
                <p className="mt-3 text-[0.625rem] uppercase tracking-wide2 text-gilt">
                  To confirm
                </p>
              )}
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-wrap items-center gap-4" delay={220}>
          <ButtonLink href="/book" variant="gold" icon="arrow-right">
            Book an appointment
          </ButtonLink>
          <ButtonLink href={SITE.booking} variant="ghost" external>
            {SITE.bookingLabel}
          </ButtonLink>
          <Link
            href="/policies"
            className="inline-flex min-h-11 items-center text-sm2 text-cream-dim underline underline-offset-4 hover:text-paper"
          >
            Full policies
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
