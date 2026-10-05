import Link from "next/link";
import { SITE } from "@/lib/site";
import { Section, SectionHead, Accent } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import RootDraw from "@/components/brand/RootDraw";
import PhotoSlot from "@/components/ui/PhotoSlot";
import { Icon } from "@/components/ui/Icon";

/**
 * The merger, stated as the offer rather than as company history. Most salons
 * sell a style; this one sells a root system, and this section is where that
 * claim is made and immediately evidenced by the two named practitioners.
 */
export default function Union() {
  return (
    <Section ground="paper" labelledBy="union-title">
      <div className="grid gap-16 lg:grid-cols-[1fr_0.72fr] lg:items-start lg:gap-24">
        <div>
          <SectionHead
            number="01"
            eyebrow="The house"
            id="union-title"
            title={
              <>
                Most salons sell a style. We sell a{" "}
                <Accent>root system.</Accent>
              </>
            }
            lead="Bare Roots is not a startup. It is a merger of mastery — two women already sharing one studio at 8030 W Broad, joining their crafts under a single crown."
          />

          <Reveal className="prose-br mt-12 text-base2 text-ink-soft" delay={80}>
            <p>
              Heal it, grow it, adorn it, maintain it — and teach you to own it
              between visits. Recovery, artistry, education and product under one
              roof, which is the only arrangement that makes any of the four
              work properly.
            </p>
            <p>
              It matters because the two halves of this business usually argue
              with each other. A loc install that ignores a thinning hairline
              will make it worse. A recovery protocol that ignores how you
              actually wear your hair will be abandoned by week three. Here the
              two artists are in the same room, looking at the same head.
            </p>
          </Reveal>

          <Reveal className="mt-12" delay={160}>
            <p className="border-l-2 border-gold pl-6 font-display text-d3 italic text-forest">
              &ldquo;{SITE.promise}&rdquo;
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-panel bg-[var(--line)] sm:grid-cols-2">
            {SITE.artists.map((a, i) => (
              <Reveal as="li" key={a.id} delay={i * 90} className="bg-paper">
                <Link href={`/house#${a.id}`} className="card-hover group block h-full p-7">
                  <div className="flex items-start gap-5">
                    <div className="w-24 shrink-0">
                      <PhotoSlot
                        src={a.photo}
                        alt={`${a.name}, ${a.role} at Bare Roots.`}
                        ratio="3/4"
                        sizes="96px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="eyebrow text-bronze-ink">{a.short}</p>
                      <p className="mt-2 font-display text-d4 text-ink">{a.name}</p>
                      <p className="mt-3 text-sm2 text-ink-soft">{a.role}</p>
                    </div>
                  </div>
                  <p className="mt-6 inline-flex items-center gap-2 text-xs2 uppercase tracking-wide2 text-bronze-ink">
                    Her practice
                    <Icon
                      name="arrow-right"
                      className="size-3.5 transition-transform duration-base ease-brand group-hover:translate-x-1"
                    />
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* The signature mark, drawing itself. */}
        <Reveal className="hidden justify-center lg:flex lg:sticky lg:top-[calc(var(--header-h)+4rem)]">
          <div className="text-center">
            <RootDraw className="h-[420px] w-auto" stroke="#A67C33" />
            <p className="eyebrow mt-8 text-bronze-ink">Grow from the root</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
