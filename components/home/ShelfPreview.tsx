import Link from "next/link";
import { Section, SectionHead, AccentDark } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import PhotoSlot from "@/components/ui/PhotoSlot";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LINES, productsInLine, priceLabel } from "@/lib/products";

export default function ShelfPreview() {
  return (
    <Section ground="plum" labelledBy="shelf-title">
      <SectionHead
        number="06"
        eyebrow="The shelf"
        id="shelf-title"
        ground="plum"
        title={
          <>
            What we use on you is what you <AccentDark>take home.</AccentDark>
          </>
        }
        lead="One line we already carry, one line Iisha is building. No substitutions, and nothing sold that we would not use in the chair."
        action={
          <ButtonLink href="/shop" variant="ghost" icon="arrow-right">
            Open the shop
          </ButtonLink>
        }
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        {LINES.map((line, li) => {
          const items = productsInLine(line.id).slice(0, 3);
          return (
            <Reveal key={line.id} delay={li * 110}>
              <div className="card-dark flex h-full flex-col p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <p className="eyebrow text-gold">{line.owner}</p>
                    <h3 className="mt-3 font-display text-d3 text-paper">{line.name}</h3>
                  </div>
                  <span
                    className={
                      line.status === "waitlist"
                        ? "badge border-gilt/60 text-gilt"
                        : "badge border-white/30 text-cream-dim"
                    }
                  >
                    {line.status === "waitlist" ? "Waitlist" : "In stock"}
                  </span>
                </div>

                <p className="mt-5 max-w-prose2 text-sm2 text-cream-dim">{line.lead}</p>

                <ul className="mt-8 grid flex-1 grid-cols-3 gap-4">
                  {items.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/shop/${p.slug}`} className="group block">
                        <PhotoSlot
                          src={p.image}
                          alt={`${p.name} — ${p.blurb}.`}
                          brief={p.image ? undefined : "Product photography owed"}
                          ratio="1/1"
                          sizes="(min-width: 1024px) 14vw, 28vw"
                          dark
                        />
                        <p className="mt-3 text-xs2 text-paper transition-colors duration-base ease-brand group-hover:text-gilt">
                          {p.name}
                        </p>
                        <p className="mt-0.5 font-display text-sm2 italic text-gold">
                          {priceLabel(p)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/shop?line=${line.id}`}
                  className="mt-8 inline-flex min-h-11 items-center gap-2 text-xs2 uppercase tracking-wide2 text-gold"
                >
                  {line.status === "waitlist" ? "Join the list" : `Shop ${line.name}`}
                  <Icon name="arrow-right" className="size-3.5" />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
