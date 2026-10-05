import Image from "next/image";
import Link from "next/link";
import { COURSES } from "@/lib/services";
import { artistById } from "@/lib/site";
import { Section, SectionHead, Accent } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function AcademyPreview() {
  return (
    <Section ground="paper" labelledBy="academy-title">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <Reveal className="relative overflow-hidden rounded-panel">
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

        <div>
          <SectionHead
            number="07"
            eyebrow="The Academy"
            id="academy-title"
            title={
              <>
                Clients leave <Accent>smarter.</Accent>
              </>
            }
            lead="Educator energy is in the brand because it is in both artists. Courses for stylists, workshops for the people in the chair, and a certification for anyone adding recovery work to their practice."
          />

          <ul className="mt-11 flex flex-col">
            {COURSES.map((c, i) => {
              const artist = artistById(c.artist);
              return (
                <Reveal as="li" key={c.slug} delay={i * 90}>
                  <Link
                    href={`/academy#${c.slug}`}
                    className="group flex items-start justify-between gap-6 border-t border-ink/12 py-6"
                  >
                    <div className="min-w-0">
                      <p className="eyebrow text-bronze-ink">
                        {c.kind} · {artist?.name}
                      </p>
                      <p className="mt-2 font-display text-d4 text-ink transition-colors duration-base ease-brand group-hover:text-bronze-ink">
                        {c.title}
                      </p>
                      <p className="mt-2 text-sm2 text-ink-soft">{c.who}</p>
                    </div>
                    <span className="shrink-0 text-right">
                      <span className="block font-display text-d4 italic tabular-nums text-bronze-ink">
                        ${c.price}
                      </span>
                      <span className="mt-1 block text-[0.625rem] uppercase tracking-wide2 text-bronze-ink">
                        To confirm
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="mt-10" delay={280}>
            <ButtonLink href="/academy" variant="dark" icon="arrow-right">
              See the Academy
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
