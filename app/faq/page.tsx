import type { Metadata } from "next";
import Link from "next/link";
import { FAQS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { jsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHead, Accent } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "Consultations, micro loc timelines, transfers, thinning and alopecia, deposits and cancellations — the questions Bare Roots gets asked most, answered plainly.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Questions", path: "/faq" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQS)) }}
      />

      <PageHero
        ground="plum"
        eyebrow="Questions"
        title={
          <>
            Asked and
            <br />
            <em className="font-display italic text-gold">answered.</em>
          </>
        }
        lead="If the answer you need is not here, text the artist directly. Both numbers are real and both of them reply."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Questions", path: "/faq" },
        ]}
      />

      <Section ground="paper" labelledBy="faq-title">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+4rem)] lg:self-start">
            <SectionHead
              eyebrow="The short answers"
              id="faq-title"
              title={
                <>
                  Most of it comes down to the{" "}
                  <Accent>consultation.</Accent>
                </>
              }
              lead="It is not a sales call. It is the part of the service that decides whether the rest of it works."
            />
            <Reveal className="mt-9 flex flex-col gap-3" delay={80}>
              {SITE.artists.map((a) => (
                <a
                  key={a.id}
                  href={a.smsHref}
                  className="card-light card-hover flex items-center justify-between gap-4 p-5"
                >
                  <span>
                    <span className="eyebrow block text-bronze-ink">{a.short}</span>
                    <span className="mt-1.5 block text-base2 text-ink">
                      Text {a.name.split(" ")[0]}
                    </span>
                  </span>
                  <Icon name="message" className="size-5 shrink-0 text-bronze-ink" />
                </a>
              ))}
            </Reveal>
          </div>

          <Reveal delay={100}>
            <Accordion items={FAQS} />

            <div className="marker mt-12 flex flex-wrap items-center justify-between gap-5 p-6">
              <p className="max-w-[46ch] text-sm2 font-normal">
                Still not answered? Ask it in the booking notes — every booker
                submission goes to the artist who would be doing the work.
              </p>
              <ButtonLink href="/book" variant="outline" size="sm" icon="arrow-right">
                Book
              </ButtonLink>
            </div>

            <p className="mt-8 text-sm2 text-ink-soft">
              Looking for deposits, lateness or returns in full?{" "}
              <Link href="/policies" className="text-bronze-ink underline underline-offset-4">
                Read the policies
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
