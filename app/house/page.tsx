import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";
import { servicesInCategory } from "@/lib/services";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHead, Accent, AccentDark } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import PhotoSlot from "@/components/ui/PhotoSlot";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import RootDraw, { Botanical } from "@/components/brand/RootDraw";

export const metadata: Metadata = {
  title: "The House — Iisha & Sabrina",
  description:
    "Bare Roots is a merger of mastery: Iisha, a holistic hair recovery practitioner, and Sabrina Sutton, a creative loc artist, sharing one studio on West Broad Street in Henrico, VA.",
  alternates: { canonical: "/house" },
};

const VALUES = [
  {
    icon: "leaf" as const,
    title: "Rooted",
    body: "Culture is the foundation here, not a costume. The language, the music and the way you are spoken to are familiar on purpose.",
  },
  {
    icon: "crown" as const,
    title: "Regal",
    body: "Luxury is calm. Unhurried appointments, a private suite, and a chair you are not being rushed out of.",
  },
  {
    icon: "book" as const,
    title: "Knowledgeable",
    body: "We explain the why. You should leave understanding your own hair better than when you came in.",
  },
  {
    icon: "sparkle" as const,
    title: "Warm",
    body: "Nobody is shamed for the state of their hair. We have seen it, and the point of the visit is what happens next.",
  },
];

export default function HousePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "The House", path: "/house" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="The house"
        title={
          <>
            A merger of
            <br />
            <em className="font-display italic text-gold">mastery.</em>
          </>
        }
        lead="Two women, already sharing one studio at 8030 W Broad, joining their crafts under a single crown. One heals the root. One crowns it."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "The House", path: "/house" },
        ]}
        actions={
          <ButtonLink href="/book" variant="gold" icon="arrow-right">
            Book with either artist
          </ButtonLink>
        }
      />

      {/* The thesis */}
      <Section ground="paper" labelledBy="story-title">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.6fr] lg:items-start lg:gap-24">
          <div>
            <SectionHead
              number="01"
              eyebrow="Why it exists"
              id="story-title"
              title={
                <>
                  Where most salons sell a style, we sell a{" "}
                  <Accent>root system.</Accent>
                </>
              }
            />
            <Reveal className="prose-br mt-10 text-base2 text-ink-soft" delay={70}>
              <p>
                The two halves of natural-hair care usually live in different
                buildings and quietly undo each other. The loctician does not know
                what is happening on the scalp. The recovery specialist does not
                know how the hair is actually being worn between visits. The
                client pays twice and is contradicted twice.
              </p>
              <p>
                Bare Roots puts both in one room. Your grid is designed with your
                hairline in mind. Your protocol is written around the style you
                actually want to keep. When the right answer is &ldquo;wait three
                months before we install,&rdquo; both artists say it, because both
                of them are looking at the same head.
              </p>
              <p>
                Heal it, grow it, adorn it, maintain it — and teach you to own it.
                That is the whole offer.
              </p>
            </Reveal>

            <Reveal className="mt-12" delay={130}>
              <p className="border-l-2 border-gold pl-6 font-display text-d3 italic text-forest">
                &ldquo;{SITE.promise}&rdquo;
              </p>
            </Reveal>
          </div>

          <Reveal className="hidden justify-center lg:flex" delay={160}>
            <RootDraw className="h-[380px] w-auto" stroke="#A67C33" />
          </Reveal>
        </div>
      </Section>

      {/* The artists */}
      {SITE.artists.map((a, i) => {
        const dark = i % 2 === 1;
        const disciplines = a.disciplines
          .flatMap((d) => servicesInCategory(d))
          .filter((s) => s.signature)
          .slice(0, 4);

        return (
          <Section
            key={a.id}
            id={a.id}
            ground={dark ? "forest" : "cream"}
            labelledBy={`${a.id}-title`}
          >
            <div
              className={`grid gap-14 lg:grid-cols-[0.62fr_1fr] lg:gap-20 ${
                dark ? "lg:[direction:rtl]" : ""
              }`}
            >
              <Reveal className={dark ? "lg:[direction:ltr]" : ""}>
                <PhotoSlot
                  src={a.photo}
                  alt={`${a.name}, ${a.role} at Bare Roots.`}
                  ratio="3/4"
                  sizes="(min-width: 1024px) 34vw, 92vw"
                />
              </Reveal>

              <div className={dark ? "lg:[direction:ltr]" : ""}>
                <SectionHead
                  number={`0${i + 2}`}
                  eyebrow={a.short}
                  id={`${a.id}-title`}
                  ground={dark ? "forest" : "cream"}
                  title={
                    dark ? (
                      <>
                        {a.name.split(" ")[0]}{" "}
                        <AccentDark>{a.name.split(" ").slice(1).join(" ") || "Sutton"}</AccentDark>
                      </>
                    ) : (
                      <>
                        <Accent>{a.name}</Accent>
                      </>
                    )
                  }
                  lead={a.bio}
                />

                <Reveal className="mt-9" delay={80}>
                  <p className={`eyebrow ${dark ? "text-gold" : "text-bronze-ink"}`}>
                    {a.role}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {disciplines.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/book?service=${s.slug}`}
                          className={`badge transition-colors duration-base ease-brand ${
                            dark
                              ? "border-white/25 text-cream-dim hover:border-gold hover:text-gold"
                              : "border-ink/20 text-ink-soft hover:border-bronze-ink hover:text-bronze-ink"
                          }`}
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-9 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                    <div>
                      <dt className={`eyebrow ${dark ? "text-gold" : "text-bronze-ink"}`}>
                        Direct line
                      </dt>
                      <dd className="mt-2">
                        <a
                          href={a.phoneHref}
                          className={`inline-flex min-h-11 items-center gap-2 tabular-nums ${
                            dark ? "text-paper hover:text-gilt" : "text-ink hover:text-bronze-ink"
                          }`}
                        >
                          <Icon name="phone" className="size-4" />
                          {a.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className={`eyebrow ${dark ? "text-gold" : "text-bronze-ink"}`}>
                        Her work
                      </dt>
                      <dd className="mt-2">
                        <a
                          href={a.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex min-h-11 items-center gap-2 ${
                            dark ? "text-paper hover:text-gilt" : "text-ink hover:text-bronze-ink"
                          }`}
                        >
                          <Icon name="instagram" className="size-4" />
                          {a.instagram}
                        </a>
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className={`eyebrow ${dark ? "text-gold" : "text-bronze-ink"}`}>
                        Building next
                      </dt>
                      <dd className={`mt-2 text-sm2 ${dark ? "text-cream-dim" : "text-ink-soft"}`}>
                        {a.subBrand}
                        {a.id === "iisha"
                          ? " — her own line of tools and scalp care, on the waitlist now."
                          : " — premium satin and silk wraps, made to order."}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-9 flex flex-wrap gap-4">
                    <ButtonLink
                      href={a.id === "iisha" ? "/recovery" : "/work"}
                      variant={dark ? "ghost" : "outline"}
                      icon="arrow-right"
                    >
                      {a.id === "iisha" ? "Her method" : "Her work"}
                    </ButtonLink>
                    <ButtonLink
                      href="/book"
                      variant={dark ? "gold" : "dark"}
                    >
                      Book with {a.name.split(" ")[0]}
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>
            </div>
          </Section>
        );
      })}

      {/* Values */}
      <Section ground="paper" labelledBy="values-title">
        <SectionHead
          number="04"
          eyebrow="How we work"
          id="values-title"
          align="center"
          title={
            <>
              Rooted, regal, warm, <Accent>knowledgeable.</Accent>
            </>
          }
        />
        <ul className="hairline-grid mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 80} className="bg-paper p-8">
              <Icon name={v.icon} className="size-6 text-bronze-ink" strokeWidth={1.2} />
              <h3 className="mt-6 font-display text-d4 text-ink">{v.title}</h3>
              <p className="mt-3 text-sm2 text-ink-soft">{v.body}</p>
            </Reveal>
          ))}
        </ul>
        <Botanical className="mx-auto mt-16 h-14 w-auto text-bronze" />
      </Section>

      {/* Sub-brands */}
      <Section ground="plum" labelledBy="brands-title">
        <SectionHead
          number="05"
          eyebrow="Under the crown"
          id="brands-title"
          ground="plum"
          title={
            <>
              One house, <AccentDark>three registers.</AccentDark>
            </>
          }
          lead="Bare Roots is the house. Two artist brands and one retail partner live beneath it — and each one exists because a client asked for it."
        />
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {[
            {
              name: "DOPE HAIR",
              owner: "Iisha's line",
              body: "Brushes, picks and scalp care in plum and gold. Confident, culture-forward, playful-premium. On the waitlist now.",
              href: "/shop?line=dope",
              cta: "Join the list",
            },
            {
              name: "Custom Wraps",
              owner: "Sabrina's line",
              body: "Premium satin and silk wraps, made to order. Feminine luxury protection for the crown you just paid for.",
              href: "/wraps",
              cta: "See the waitlist",
            },
            {
              name: "Inflúance",
              owner: "In-salon retail",
              body: "The professional line already on our shelf and already in your service. Shoppable, so the result survives the week.",
              href: "/shop?line=influance",
              cta: "Shop the line",
            },
          ].map((b, i) => (
            <Reveal as="li" key={b.name} delay={i * 90}>
              <Link href={b.href} className="card-dark card-hover group flex h-full flex-col p-8">
                <p className="eyebrow text-gold">{b.owner}</p>
                <h3 className="mt-3 font-display text-d3 text-paper">{b.name}</h3>
                <p className="mt-4 flex-1 text-sm2 text-cream-dim">{b.body}</p>
                <p className="mt-7 inline-flex items-center gap-2 text-xs2 uppercase tracking-wide2 text-gold">
                  {b.cta}
                  <Icon
                    name="arrow-right"
                    className="size-3.5 transition-transform duration-base ease-brand group-hover:translate-x-1"
                  />
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
