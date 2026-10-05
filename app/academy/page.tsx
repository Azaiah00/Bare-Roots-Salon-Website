import type { Metadata } from "next";
import Image from "next/image";
import { COURSES, MEMBERSHIP } from "@/lib/services";
import { artistById } from "@/lib/site";
import { jsonLd, breadcrumbSchema, courseListSchema } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHead, Accent, AccentDark } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import WaitlistForm from "@/components/shop/WaitlistForm";

export const metadata: Metadata = {
  title: "The Academy",
  description:
    "Masterclasses, client workshops and certification from Bare Roots in Richmond, VA — micro loc foundations, natural hair care, and the science of hair recovery.",
  alternates: { canonical: "/academy" },
};

export default function AcademyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Academy", path: "/academy" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(courseListSchema()) }}
      />

      <PageHero
        ground="forest"
        eyebrow="The Academy"
        title={
          <>
            We explain the
            <br />
            <em className="font-display italic text-gold">why.</em>
          </>
        }
        lead="Educator energy is in the brand because it is in both artists. Courses for stylists, workshops for the people in the chair, and a certification for anyone adding recovery work to their practice."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Academy", path: "/academy" },
        ]}
        actions={
          <ButtonLink href="#seats" variant="gold" icon="arrow-right">
            See the seats
          </ButtonLink>
        }
      />

      <Section ground="paper" labelledBy="academy-intro-title">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <div>
            <SectionHead
              number="01"
              eyebrow="Why we teach"
              id="academy-intro-title"
              title={
                <>
                  A client who understands her hair is a client for{" "}
                  <Accent>ten years.</Accent>
                </>
              }
            />
            <Reveal className="prose-br mt-9 text-base2 text-ink-soft" delay={70}>
              <p>
                Most of what damages natural hair happens between appointments —
                tension, over-manipulation, the wrong product used with total
                conviction. No amount of skill in the chair survives six weeks of
                that.
              </p>
              <p>
                So we teach. Stylists learn the parts of the craft that are
                usually guarded: sizing, grid design, and the density conversation
                that decides whether an install lasts. Clients learn to cleanse,
                moisturise and style their own hair well enough to keep what they
                paid for.
              </p>
              <p>
                It is also the part of this business that scales without either
                artist standing at a chair — which is what makes the studio
                sustainable rather than merely busy.
              </p>
            </Reveal>
          </div>

          <Reveal className="relative overflow-hidden rounded-panel" delay={120}>
            <div className="relative aspect-[4/3]">
              <Image
                src="/img/academy.webp"
                alt="A teaching session in a bright studio — one educator at the chair, a small group seated with notes."
                fill
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="object-cover"
              />
            </div>
            <span className="badge absolute bottom-4 left-4 border-gilt/70 bg-ink/90 text-gilt backdrop-blur-sm">
              Concept image
            </span>
          </Reveal>
        </div>
      </Section>

      <Section id="seats" ground="cream" labelledBy="courses-title">
        <SectionHead
          number="02"
          eyebrow="Open seats"
          id="courses-title"
          ground="cream"
          title={
            <>
              Three ways to <Accent>learn here.</Accent>
            </>
          }
          lead="Dates are set once each cohort fills. Join a list and you will be told before it is announced anywhere else."
        />

        <ul className="mt-14 flex flex-col gap-6">
          {COURSES.map((c, i) => {
            const artist = artistById(c.artist);
            return (
              <Reveal as="li" key={c.slug} id={c.slug} delay={i * 90}>
                <article className="card-light grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="badge border-bronze-ink/50 text-bronze-ink">
                        {c.kind}
                      </span>
                      <span className="text-xs2 text-ink-soft">
                        {c.length} · with {artist?.name}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-d3 text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm2 text-bronze-ink">{c.who}</p>
                    <p className="mt-4 max-w-prose2 text-base2 text-ink-soft">{c.desc}</p>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-5 lg:items-end lg:text-right">
                    <span>
                      <span className="block font-display text-d2 italic tabular-nums text-bronze">
                        ${c.price}
                      </span>
                      <span className="mt-1 block text-[0.625rem] uppercase tracking-wide2 text-bronze-ink">
                        Price to confirm
                      </span>
                    </span>
                    <ButtonLink href="#academy-list" variant="dark" size="sm" icon="arrow-right">
                      Join the list
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      {/* Membership */}
      <Section ground="plum" labelledBy="membership-title">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              number="03"
              eyebrow="Membership"
              id="membership-title"
              ground="plum"
              title={
                <>
                  <AccentDark>{MEMBERSHIP.name}</AccentDark>
                </>
              }
              lead={MEMBERSHIP.lead}
            />
            <Reveal className="mt-9 flex items-baseline gap-3" delay={70}>
              <span className="font-display text-d1 italic tabular-nums text-gold">
                ${MEMBERSHIP.price}
              </span>
              <span className="text-lead text-cream-dim">/ month</span>
            </Reveal>
            <Reveal className="mt-3" delay={90}>
              <span className="badge border-gilt/50 text-gilt">
                <Icon name="info" className="size-3" />
                Price to confirm
              </span>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <ul className="flex flex-col">
              {MEMBERSHIP.perks.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-4 border-b border-white/14 py-5 text-base2 text-paper"
                >
                  <Icon name="check" className="mt-1 size-4 shrink-0 text-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/book" variant="gold" icon="arrow-right">
                Start with an appointment
              </ButtonLink>
              <ButtonLink href="/portal" variant="ghost">
                See the portal
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The list */}
      <Section id="academy-list" ground="paper" labelledBy="academy-list-title">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHead
            eyebrow="Cohort list"
            id="academy-list-title"
            align="center"
            title={
              <>
                Be told <Accent>first.</Accent>
              </>
            }
            lead="One email when dates open for the course you want. Nothing else."
          />
          <Reveal className="mt-10" delay={80}>
            <WaitlistForm
              slug="academy"
              label="Tell me when seats open"
              note="Preview build — nothing is sent and no address is stored."
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
