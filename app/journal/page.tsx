import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JOURNAL } from "@/lib/content";
import { artistById } from "@/lib/site";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";
import { plainDate } from "@/lib/dates";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHead, Accent } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Education from the chair — the budding stage, thinning edges, and why the consultation is the service. Written by Iisha and Sabrina at Bare Roots, Richmond VA.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const [lead, ...rest] = JOURNAL;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Journal", path: "/journal" },
            ]),
          ),
        }}
      />

      <PageHero
        ground="forest"
        eyebrow="Journal"
        title={
          <>
            Education from
            <br />
            <em className="font-display italic text-gold">the chair.</em>
          </>
        }
        lead="The conversations we have most often, written down — so you can have them before you book rather than halfway through the appointment."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
        ]}
      />

      <Section ground="paper" labelledBy="journal-title">
        <SectionHead
          eyebrow="Latest"
          id="journal-title"
          title={
            <>
              Written by the people doing the <Accent>work.</Accent>
            </>
          }
        />

        {/* Lead article */}
        <Reveal className="mt-14" delay={60}>
          <Link
            href={`/journal/${lead.slug}`}
            className="group grid gap-10 lg:grid-cols-2 lg:items-center"
          >
            {lead.image && (
              <div className="relative aspect-[3/2] overflow-hidden rounded-panel">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 48vw, 92vw"
                  className="object-cover transition-transform duration-slow ease-brand group-hover:scale-[1.03]"
                />
              </div>
            )}
            <div>
              <p className="eyebrow text-bronze-ink">
                {artistById(lead.author)?.name} · {plainDate(lead.date)} ·{" "}
                {lead.readMins} min read
              </p>
              <h3 className="mt-5 font-display text-d2 text-ink transition-colors duration-base ease-brand group-hover:text-bronze-ink">
                {lead.title}
              </h3>
              <p className="mt-5 max-w-prose2 text-lead text-ink-soft">{lead.dek}</p>
              <p className="mt-7 inline-flex items-center gap-2 text-xs2 uppercase tracking-wide2 text-bronze-ink">
                Read it
                <Icon
                  name="arrow-right"
                  className="size-3.5 transition-transform duration-base ease-brand group-hover:translate-x-1"
                />
              </p>
            </div>
          </Link>
        </Reveal>

        {/* The rest */}
        <ul className="mt-16 grid gap-8 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 90}>
              <Link href={`/journal/${p.slug}`} className="card-light card-hover group flex h-full flex-col overflow-hidden">
                {p.image && (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 46vw, 92vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7">
                  <p className="eyebrow text-bronze-ink">
                    {artistById(p.author)?.name} · {p.readMins} min
                  </p>
                  <h3 className="mt-4 font-display text-d4 text-ink">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm2 text-ink-soft">{p.dek}</p>
                  <p className="mt-6 text-xs2 text-ink-soft">{plainDate(p.date)}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
