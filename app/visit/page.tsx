import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  SITE,
  ADDRESS_ONE_LINE,
  MAPS_URL,
  formatDayHours,
  HOURS_SUMMARY,
} from "@/lib/site";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHead, Accent, AccentDark } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import PhotoSlot from "@/components/ui/PhotoSlot";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Visit the studio",
  description:
    "Bare Roots is at 8030 W Broad St #117, Henrico, VA 23294 — free parking, a private studio suite, open Wednesday to Saturday by appointment.",
  alternates: { canonical: "/visit" },
};

const PREP = [
  {
    icon: "clock" as const,
    title: "Arrive as you are",
    body: "No need to wash, detangle or 'get it presentable' first. We have seen every state of hair there is, and pre-work at home often makes the appointment harder, not easier.",
  },
  {
    icon: "info" as const,
    title: "Bring what you are taking",
    body: "For recovery work, bring your prescriptions, supplements and any treatments you are using. It changes the plan more often than people expect.",
  },
  {
    icon: "users" as const,
    title: "Tell us about guests",
    body: "Company is welcome in the waiting area, but the suite is small. A heads-up means we can set the room up for it.",
  },
  {
    icon: "message" as const,
    title: "Running late? Text",
    body: "Your artist's mobile is on this page. Twenty minutes late may mean shortening the service — but telling us beats arriving quietly late.",
  },
];

export default function VisitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Visit", path: "/visit" },
            ]),
          ),
        }}
      />

      <PageHero
        ground="root"
        eyebrow="Visit"
        title={
          <>
            8030 West Broad,
            <br />
            <em className="font-display italic text-gold">suite 117.</em>
          </>
        }
        lead="A private studio suite on the West Broad corridor, just outside Richmond. Free parking, Wednesday to Saturday, by appointment."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Visit", path: "/visit" },
        ]}
        actions={
          <>
            <ButtonLink href="/book" variant="gold" icon="arrow-right">
              Book an appointment
            </ButtonLink>
            <ButtonLink href={MAPS_URL} variant="ghost" external>
              Get directions
            </ButtonLink>
          </>
        }
      />

      {/* Where and when */}
      <Section ground="paper" labelledBy="where-title">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              number="01"
              eyebrow="Where"
              id="where-title"
              title={
                <>
                  Find us on <Accent>West Broad.</Accent>
                </>
              }
            />
            <address className="mt-9 not-italic">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 font-display text-d3 text-ink transition-colors duration-base ease-brand hover:text-bronze-ink"
              >
                <Icon name="map-pin" className="mt-2 size-6 shrink-0 text-bronze-ink" />
                <span>
                  {SITE.address.street} {SITE.address.unit}
                  <br />
                  {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
                </span>
              </a>
            </address>

            <ul className="mt-9 flex flex-col gap-3 text-base2 text-ink-soft">
              <li className="flex items-start gap-3">
                <Icon name="check" className="mt-1.5 size-4 shrink-0 text-bronze-ink" />
                Free parking on site.
              </li>
              <li className="flex items-start gap-3">
                <Icon name="check" className="mt-1.5 size-4 shrink-0 text-bronze-ink" />
                Suite 117 — enter the building and follow the signs to the studio
                suites.
              </li>
              <li className="flex items-start gap-3">
                <Icon name="check" className="mt-1.5 size-4 shrink-0 text-bronze-ink" />
                Serving {SITE.areaServed.slice(0, -1).join(", ")} and{" "}
                {SITE.areaServed.slice(-1)}.
              </li>
            </ul>

            <p className="marker mt-8 p-4 text-sm2">
              <strong className="font-medium">Needs client confirmation:</strong>{" "}
              accessibility (step-free entry, lift), and whether the map pin on the
              Google listing is exact. See ASSETS-OWED.md.
            </p>
          </div>

          <div>
            <SectionHead
              number="02"
              eyebrow="When"
              title={
                <>
                  Four days, <Accent>by appointment.</Accent>
                </>
              }
              lead={`${HOURS_SUMMARY}. Long services are scheduled in sittings, agreed in writing before the first one.`}
            />
            <Reveal className="mt-9" delay={70}>
              <ul className="hairline-grid">
                {SITE.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-baseline justify-between gap-6 bg-paper px-6 py-4"
                  >
                    <span
                      className={
                        h.open ? "text-base2 text-ink" : "text-base2 text-ink-soft"
                      }
                    >
                      {h.day}
                    </span>
                    <span
                      className={
                        h.open
                          ? "tabular-nums text-base2 text-ink-soft"
                          : "text-sm2 uppercase tracking-wide2 text-ink-soft"
                      }
                    >
                      {formatDayHours(h)}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* The room */}
      <Section ground="ink" labelledBy="room-title">
        <SectionHead
          number="03"
          eyebrow="The room"
          id="room-title"
          ground="ink"
          title={
            <>
              A suite, not a <AccentDark>salon floor.</AccentDark>
            </>
          }
          lead="One chair at a time per artist, which is why appointments run unhurried and why the calendar is honest about what fits in a day."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-panel">
              <Image
                src="/img/studio-detail.webp"
                alt="Studio detail — a green leather chair on a brass base, brass mirror frames and a monstera in the foreground."
                fill
                sizes="(min-width: 1024px) 62vw, 92vw"
                className="object-cover"
              />
              <span className="badge absolute bottom-4 left-4 border-gilt/70 bg-ink/90 text-gilt backdrop-blur-sm">
                Concept image
              </span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <PhotoSlot
              src={null}
              alt=""
              brief="The real suite: wide shot from the door, both chairs in frame, lights on, no people. Landscape, natural light if possible."
              ratio="16/9"
              dark
            />
            <p className="mt-4 text-sm2 text-cream-dim">
              Two photographs of the actual studio would replace everything on this
              section. Nothing else on the site is a better use of twenty minutes
              with a phone.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Preparing */}
      <Section ground="cream" labelledBy="prep-title">
        <SectionHead
          number="04"
          eyebrow="Before you come"
          id="prep-title"
          title={
            <>
              Four things, and none of them are{" "}
              <Accent>rules.</Accent>
            </>
          }
        />
        <ul className="hairline-grid mt-14 sm:grid-cols-2">
          {PREP.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 80} className="bg-cream p-8">
              <Icon name={p.icon} className="size-5 text-bronze-ink" />
              <h3 className="mt-5 font-display text-d4 text-ink">{p.title}</h3>
              <p className="mt-3 text-sm2 text-ink-soft">{p.body}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 grid gap-6 sm:grid-cols-2" delay={200}>
          {SITE.artists.map((a) => (
            <div key={a.id} className="card-light flex flex-wrap items-center justify-between gap-5 p-7">
              <div>
                <p className="eyebrow text-bronze-ink">{a.short}</p>
                <p className="mt-2 font-display text-d4 text-ink">{a.name}</p>
              </div>
              <div className="flex gap-2">
                <a
                  href={a.phoneHref}
                  className="inline-flex size-12 items-center justify-center rounded-xs2 border border-ink/15 text-ink transition-colors hover:border-bronze-ink hover:text-bronze-ink"
                  aria-label={`Call ${a.name} on ${a.phone}`}
                >
                  <Icon name="phone" />
                </a>
                <a
                  href={a.smsHref}
                  className="inline-flex size-12 items-center justify-center rounded-xs2 border border-ink/15 text-ink transition-colors hover:border-bronze-ink hover:text-bronze-ink"
                  aria-label={`Text ${a.name}`}
                >
                  <Icon name="message" />
                </a>
                <a
                  href={a.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-12 items-center justify-center rounded-xs2 border border-ink/15 text-ink transition-colors hover:border-bronze-ink hover:text-bronze-ink"
                  aria-label={`${a.name} on Instagram, ${a.instagram}`}
                >
                  <Icon name="instagram" />
                </a>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap items-center gap-4" delay={260}>
          <ButtonLink href="/book" variant="dark" icon="arrow-right">
            Book an appointment
          </ButtonLink>
          <Link
            href="/policies"
            className="inline-flex min-h-11 items-center text-sm2 text-ink-soft underline underline-offset-4 hover:text-bronze-ink"
          >
            Deposits, cancellations and policies
          </Link>
          <span className="text-xs2 text-ink-soft">{ADDRESS_ONE_LINE}</span>
        </Reveal>
      </Section>
    </>
  );
}
