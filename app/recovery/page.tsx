import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RECOVERY_STEPS, FAQS } from "@/lib/content";
import { servicesInCategory, formatDuration } from "@/lib/services";
import { SITE, artistById } from "@/lib/site";
import { jsonLd, breadcrumbSchema, howToSchema, faqSchema } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHead, Accent, AccentDark } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import PhotoSlot from "@/components/ui/PhotoSlot";
import PriceTag from "@/components/ui/PriceTag";
import Accordion from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import RootDraw from "@/components/brand/RootDraw";

export const metadata: Metadata = {
  title: "Hair recovery — the Root Recovery Method",
  description:
    "Holistic hair recovery in Richmond, VA. Iisha's four-stage Root Recovery Method for thinning, traction alopecia and scalp health — assessment first, protocol second, product third.",
  alternates: { canonical: "/recovery" },
};

const RECOVERY_FAQS = FAQS.filter((f) =>
  /thinning|alopecia|consultation|children/i.test(f.q),
);

export default function RecoveryPage() {
  const iisha = artistById("iisha")!;
  const services = servicesInCategory("recovery");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Hair recovery", path: "/recovery" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            howToSchema(
              "The Root Recovery Method",
              "A four-stage protocol for thinning, alopecia and scalp health.",
              RECOVERY_STEPS.map((s) => ({ name: s.title, text: `${s.desc} ${s.detail}` })),
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(RECOVERY_FAQS)) }}
      />

      <PageHero
        ground="plum"
        eyebrow="Hair recovery"
        title={
          <>
            We speak to the crown,
            <br />
            <em className="font-display italic text-gold">not the flaw.</em>
          </>
        }
        lead="Thinning, traction alopecia and scalp health, treated from the inside out by Iisha. Nothing here is a promise — it is a method, a cadence, and a photograph at every visit."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Hair recovery", path: "/recovery" },
        ]}
        actions={
          <>
            <ButtonLink
              href="/book?service=hair-recovery-consultation"
              variant="gold"
              icon="arrow-right"
            >
              Book a consultation
            </ButtonLink>
            <ButtonLink href="#method" variant="ghost">
              Read the method
            </ButtonLink>
          </>
        }
      />

      {/* Iisha */}
      <Section ground="paper" labelledBy="practitioner-title">
        <div className="grid gap-14 lg:grid-cols-[0.62fr_1fr] lg:items-start lg:gap-20">
          <Reveal>
            <PhotoSlot
              src={iisha.photo}
              alt={`${iisha.name}, ${iisha.role}.`}
              ratio="3/4"
              sizes="(min-width: 1024px) 34vw, 92vw"
            />
            <p className="marker mt-4 p-3 text-xs2">
              Low-resolution source (390&nbsp;&times;&nbsp;755). A studio portrait
              is owed — see ASSETS-OWED.md.
            </p>
          </Reveal>

          <div>
            <SectionHead
              number="01"
              eyebrow="Your practitioner"
              id="practitioner-title"
              title={
                <>
                  {iisha.name} grows hair from the{" "}
                  <Accent>inside out.</Accent>
                </>
              }
              lead={iisha.bio}
            />

            <Reveal className="prose-br mt-10 text-base2 text-ink-soft" delay={80}>
              <p>
                The distinction matters. Most of what is sold for hair loss treats
                the strand — a thickening spray, a fibre powder, a wig. This
                practice treats the skin the hair grows out of, the tension the
                hair is under, and the body the follicle is being fed by. Then it
                measures whether any of it worked.
              </p>
              <p>
                It also means being told the truth. Some causes of hair loss are
                not a stylist&rsquo;s to fix, and you will be referred rather than
                enrolled. An honest &ldquo;this needs a doctor&rdquo; is worth more
                than a twelve-week package.
              </p>
            </Reveal>

            <Reveal className="mt-10 flex flex-wrap gap-4" delay={140}>
              <ButtonLink
                href="/book?service=hair-recovery-consultation"
                variant="dark"
                icon="arrow-right"
              >
                Start with an assessment
              </ButtonLink>
              <a
                href={iisha.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <Icon name="instagram" className="size-4" />
                {iisha.instagram}
              </a>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* The method */}
      <Section id="method" ground="plum" labelledBy="method-title">
        <SectionHead
          number="02"
          eyebrow="The protocol"
          id="method-title"
          ground="plum"
          title={
            <>
              The Root Recovery <AccentDark>Method</AccentDark>
              <span className="align-super text-[0.45em] text-gilt">&trade;</span>
            </>
          }
          lead="Four stages. Each one has an exit condition, which is what keeps a recovery plan from becoming a subscription."
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-panel bg-white/14 lg:grid-cols-2">
          {RECOVERY_STEPS.map((s, i) => (
            <Reveal as="li" key={s.no} delay={i * 90} className="bg-plum p-9">
              <article>
                <p className="font-display text-[3rem] leading-none tabular-nums text-gold/70">
                  {s.no}
                </p>
                <h3 className="mt-4 font-display text-d3 text-paper">{s.title}</h3>
                <p className="mt-4 text-base2 text-paper/90">{s.desc}</p>
                <p className="mt-4 text-sm2 text-cream-dim">{s.detail}</p>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center" delay={340}>
          <div className="marker marker-dark p-7">
            <h3 className="flex items-center gap-3 font-display text-d4">
              <Icon name="camera" className="size-5" />
              Photographed at every visit
            </h3>
            <p className="mt-4 max-w-prose2 text-sm2 font-normal">
              Same angle, same distance, same light, every appointment — filed in
              your portal so month nine can be measured against month one rather
              than remembered against it. It is the single thing that gets people
              through the stretch where nothing appears to be happening.
            </p>
            <Link
              href="/portal"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs2 uppercase tracking-wide2"
            >
              See the client portal
              <Icon name="arrow-right" className="size-3.5" />
            </Link>
          </div>
          <RootDraw className="mx-auto hidden h-64 w-auto lg:block" />
        </Reveal>
      </Section>

      {/* Recovery services */}
      <Section ground="paper" labelledBy="recovery-services-title">
        <SectionHead
          number="03"
          eyebrow="Recovery services"
          id="recovery-services-title"
          title={
            <>
              What the work actually <Accent>looks like.</Accent>
            </>
          }
          lead="Every recovery client starts at the consultation. What follows is prescribed from what is found there, not chosen from a list."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 2) * 90}>
              <article className="card-light card-hover flex h-full flex-col p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h3 className="font-display text-d4 text-ink">{s.name}</h3>
                  <PriceTag service={s} size="sm" />
                </div>
                <p className="mt-4 flex-1 text-sm2 text-ink-soft">{s.blurb}</p>
                {s.note && (
                  <p className="mt-4 border-l-2 border-bronze/40 pl-4 text-sm2 text-ink-soft">
                    {s.note}
                  </p>
                )}
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-ink/12 pt-5">
                  <span className="inline-flex items-center gap-2 text-xs2 text-ink-soft">
                    <Icon name="clock" className="size-3.5 text-bronze-ink" />
                    {formatDuration(s.duration)}
                  </span>
                  <Link href={`/book?service=${s.slug}`} className="btn btn-outline btn-sm">
                    Book
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Honest limits + FAQ */}
      <Section ground="cream" labelledBy="recovery-faq-title">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHead
              number="04"
              eyebrow="Honest limits"
              id="recovery-faq-title"
              ground="cream"
              title={
                <>
                  What this <Accent>cannot</Accent> do
                </>
              }
              lead="A recovery practice that will not say this out loud is selling you something."
            />
            <Reveal className="prose-br mt-8 text-sm2 text-ink-soft" delay={80}>
              <p>
                Hair care is not medicine. Scarring alopecias, thyroid disease,
                iron deficiency, autoimmune conditions and medication side effects
                are medical matters, and the right move is a referral.
              </p>
              <p>
                A follicle that has closed does not reopen. Early traction
                thinning is reversible; a hairline that has been gone for a decade
                is not, and you will be told which one you have.
              </p>
              <p>
                Nothing here works in four weeks. The first honest checkpoint is
                month three, and the first visible one is usually month six.
              </p>
            </Reveal>
            <Reveal className="mt-9" delay={140}>
              <ButtonLink
                href={`${SITE.artists[0].smsHref}`}
                variant="outline"
                iconBefore="message"
              >
                Text Iisha a question
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <Accordion items={RECOVERY_FAQS} />
            <Link
              href="/faq"
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm2 text-bronze-ink underline underline-offset-4"
            >
              Every question we get asked
              <Icon name="arrow-right" className="size-4" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* Close */}
      <section
        data-ground="dark"
        aria-labelledby="recovery-cta-title"
        className="relative overflow-hidden bg-ink py-section text-paper"
      >
        <Image
          src="/img/wellness.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(95deg,rgba(28,21,24,0.95),rgba(55,44,65,0.7))]"
        />
        <div className="shell relative">
          <Reveal className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span className="gold-rule" aria-hidden="true" />
              Start here
            </p>
            <h2 id="recovery-cta-title" className="mt-5 text-d2">
              Your regrowth starts with{" "}
              <em className="font-display italic text-gold">one conversation.</em>
            </h2>
            <p className="mt-6 text-lead text-cream-dim">
              A full assessment, a plan you can read, and no obligation to buy
              anything at the end of it.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink
                href="/book?service=hair-recovery-consultation"
                variant="gold"
                icon="arrow-right"
              >
                Book a consultation
              </ButtonLink>
              <ButtonLink
                href="/book?service=virtual-hair-health"
                variant="ghost"
              >
                Not local? Go virtual
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
