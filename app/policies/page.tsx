import type { Metadata } from "next";
import Link from "next/link";
import { POLICIES } from "@/lib/content";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Booking and deposits, cancellations and lateness, preparing for your appointment, products and returns, and how Bare Roots handles your progress photographs.",
  alternates: { canonical: "/policies" },
  robots: { index: true, follow: true },
};

export default function PoliciesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Policies", path: "/policies" },
            ]),
          ),
        }}
      />

      <PageHero
        ground="ink"
        eyebrow="Policies"
        title={
          <>
            No small print,
            <br />
            <em className="font-display italic text-gold">just print.</em>
          </>
        }
        lead="Written the way we would say it to you at the desk. Anything still marked for confirmation is a genuine open item, not a hedge."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Policies", path: "/policies" },
        ]}
      />

      <Section ground="paper">
        <div className="grid gap-14 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
          {/* Index */}
          <nav
            aria-label="Policies"
            className="lg:sticky lg:top-[calc(var(--header-h)+4rem)] lg:self-start"
          >
            <p className="eyebrow text-bronze-ink">On this page</p>
            <ul className="mt-5 flex flex-col">
              {POLICIES.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`#${p.slug}`}
                    className="flex min-h-12 items-center justify-between gap-4 border-b border-ink/12 text-base2 text-ink-soft transition-colors duration-base ease-brand hover:text-bronze-ink"
                  >
                    {p.title}
                    <Icon name="arrow-right" className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bodies */}
          <div className="flex flex-col gap-14">
            {POLICIES.map((p, i) => (
              <Reveal as="section" key={p.slug} delay={(i % 3) * 70}>
                <div id={p.slug} className="scroll-mt-32">
                  <p className="eyebrow text-bronze-ink">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-4 font-display text-d3 text-ink">{p.title}</h2>
                  <div className="prose-br mt-6">
                    {p.body.map((line) =>
                      line.startsWith("NEEDS CLIENT CONFIRMATION") ? (
                        <p key={line} className="marker inline-flex items-start gap-3 p-4 text-sm2">
                          <Icon name="alert" className="mt-0.5 size-4 shrink-0" />
                          <span className="font-normal">{line}</span>
                        </p>
                      ) : (
                        <p key={line} className="text-base2 text-ink-soft">
                          {line}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal className="marker p-6 text-sm2" delay={120}>
              <p className="font-normal">
                <strong className="font-medium">Draft policies.</strong> These were
                written for the preview build from how the studio actually
                operates. They are not legal advice and have not been reviewed by a
                lawyer — Iisha and Sabrina should confirm every figure and every
                window before this page is published.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
