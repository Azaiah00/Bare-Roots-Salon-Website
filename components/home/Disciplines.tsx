import Link from "next/link";
import { Section, SectionHead, AccentDark } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import PhotoSlot from "@/components/ui/PhotoSlot";
import PriceTag from "@/components/ui/PriceTag";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  SERVICE_CATEGORIES,
  servicesInCategory,
  formatDuration,
} from "@/lib/services";
import { artistById } from "@/lib/site";

const IMAGE: Record<string, { src: string; alt: string }> = {
  loc: {
    src: "/img/work-microlocs.webp",
    alt: "Micro locs finished with gold cuffs, resting across plum and sage satin.",
  },
  recovery: {
    src: "/img/wellness.webp",
    alt: "A client reclined for scalp therapy, warm towels and herbal infusions on the tray beside her.",
  },
  natural: {
    src: "/img/work-loccolor.webp",
    alt: "Locs graduating from deep brown at the root to warm copper through the length.",
  },
};

/**
 * Three disciplines, three signature services each, priced honestly. The point
 * of showing the price on the home page is that a $1,000 install should
 * qualify the visitor before they book, not after.
 */
export default function Disciplines() {
  return (
    <Section ground="forest" labelledBy="disciplines-title">
      <SectionHead
        number="02"
        eyebrow="What we do"
        id="disciplines-title"
        ground="forest"
        title={
          <>
            Three disciplines, <AccentDark>one head of hair.</AccentDark>
          </>
        }
        lead="Every service starts with the same question — what is this hair actually doing? — and the answer decides which side of the house you sit on."
        action={
          <ButtonLink href="/services" variant="ghost" icon="arrow-right">
            Full menu
          </ButtonLink>
        }
      />

      <ul className="mt-16 grid gap-8 lg:grid-cols-3">
        {SERVICE_CATEGORIES.map((cat, i) => {
          const all = servicesInCategory(cat.id);
          const picks = all.filter((s) => s.signature).slice(0, 3);
          const shown = picks.length > 0 ? picks : all.slice(0, 3);
          const artist = artistById(cat.artistId);
          const img = IMAGE[cat.id];

          return (
            <Reveal as="li" key={cat.id} delay={i * 110}>
              <article className="card-dark card-hover flex h-full flex-col overflow-hidden">
                <PhotoSlot
                  src={img.src}
                  alt={img.alt}
                  ratio="3/2"
                  sizes="(min-width: 1024px) 30vw, 92vw"
                  concept
                  className="rounded-none"
                />

                <div className="flex flex-1 flex-col p-7">
                  <p className="eyebrow text-gold">With {artist?.name}</p>
                  <h3 className="mt-3 font-display text-d3 text-paper">{cat.name}</h3>
                  <p className="mt-4 flex-1 text-sm2 text-cream-dim">{cat.lead}</p>

                  <ul className="mt-7 flex flex-col">
                    {shown.map((s) => (
                      <li key={s.slug} className="border-t border-white/12 py-4">
                        <Link
                          href={`/book?service=${s.slug}`}
                          className="group flex items-baseline justify-between gap-4"
                        >
                          <span className="min-w-0">
                            <span className="block text-base2 text-paper transition-colors duration-base ease-brand group-hover:text-gilt">
                              {s.name}
                            </span>
                            <span className="mt-0.5 flex items-center gap-1.5 text-xs2 text-cream-dim">
                              <Icon name="clock" className="size-3.5" />
                              {formatDuration(s.duration)}
                              {s.consultationFirst && " · consultation first"}
                            </span>
                          </span>
                          <PriceTag service={s} dark size="sm" />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services#${cat.id}`}
                    className="mt-7 inline-flex min-h-11 items-center gap-2 text-xs2 uppercase tracking-wide2 text-gold"
                  >
                    All {all.length} services
                    <Icon name="arrow-right" className="size-3.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
