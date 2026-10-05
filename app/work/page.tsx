import type { Metadata } from "next";
import { WORK } from "@/lib/content";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHead, Accent } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import WorkGrid from "@/components/work/WorkGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Micro locs, sisterlocs, loc colour, scalp therapy and recovery work from Bare Roots in Henrico, VA. Every image opens, and every image books the service that made it.",
  alternates: { canonical: "/work" },
};

const conceptCount = WORK.filter((w) => !w.real).length;

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
            ]),
          ),
        }}
      />

      <PageHero
        ground="ink"
        eyebrow="Selected work"
        title={
          <>
            Real texture.
            <br />
            <em className="font-display italic text-gold">Real regrowth.</em>
          </>
        }
        lead="Installs, maintenance, colour and recovery. Open any image for the full frame and book the service that made it."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ]}
        actions={
          <ButtonLink href="/book" variant="gold" icon="arrow-right">
            Book an appointment
          </ButtonLink>
        }
      />

      <Section ground="paper" labelledBy="gallery-title">
        <SectionHead
          eyebrow="The portfolio"
          id="gallery-title"
          title={
            <>
              Every tile is a <Accent>service.</Accent>
            </>
          }
        />

        {conceptCount > 0 && (
          <Reveal className="marker mt-10 flex flex-wrap items-start gap-4 p-5" delay={60}>
            <Icon name="alert" className="mt-0.5 size-5 shrink-0" />
            <div className="text-sm2 font-normal">
              <p>
                <strong className="font-medium">
                  {conceptCount} of {WORK.length} images are concept renders,
                </strong>{" "}
                produced for this build and flagged on every tile. They are here to
                show the layout, the grade and the grid — not to pass as the
                salon&rsquo;s portfolio.
              </p>
              <p className="mt-2">
                Replace them with Iisha&rsquo;s and Sabrina&rsquo;s own photographs
                and set <code className="font-mono text-[0.8125rem]">real: true</code> in{" "}
                <code className="font-mono text-[0.8125rem]">lib/content.ts</code>. The
                flags disappear on their own. See ASSETS-OWED.md.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-14">
          <WorkGrid />
        </div>
      </Section>

      <Section ground="forest" labelledBy="work-cta-title">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <SectionHead
            eyebrow="Your turn"
            id="work-cta-title"
            ground="forest"
            title={
              <>
                Bring us your hair as it{" "}
                <em className="font-display italic text-gold">is.</em>
              </>
            }
            lead="Transfers, grow-outs, damage, starting over — none of it is a problem we have not sat with before. Start with a consultation and we will tell you the truth about what is possible."
          />
          <Reveal className="flex flex-wrap gap-4 lg:justify-end" delay={100}>
            <ButtonLink href="/book" variant="gold" icon="arrow-right">
              Book
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              See the menu
            </ButtonLink>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
