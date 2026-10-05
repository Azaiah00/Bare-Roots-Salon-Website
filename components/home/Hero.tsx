import Image from "next/image";
import Link from "next/link";
import { SITE, HOURS_SUMMARY } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import GoldParticles from "@/components/brand/GoldParticles";

/**
 * One h1, one primary CTA, and the two names above the fold — because the
 * single most persuasive fact about this business is that there are two
 * masters in it, and a visitor who scrolls past that has missed the offer.
 *
 * The hero image is the LCP element, so it carries `priority` and no other
 * image on this page does.
 */
export default function Hero() {
  return (
    <section
      data-ground="dark"
      className="relative flex min-h-[92svh] items-end overflow-hidden bg-forest-deep pt-[var(--header-h)]"
    >
      <Image
        src="/img/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[60%_center]"
      />
      {/* Two scrims: one for the type, one to hold the gold in the air. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(105deg,rgba(28,21,24,0.94)_0%,rgba(46,63,40,0.82)_42%,rgba(46,63,40,0.28)_78%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(28,21,24,0.85),transparent)]"
      />
      <GoldParticles />

      <div className="shell relative w-full pb-16 pt-24 sm:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="gold-rule" aria-hidden="true" />
            {SITE.descriptor}
          </p>

          <h1 className="mt-7 text-d1 text-paper">
            Two masters.
            <br />
            One house.
            <br />
            <em className="font-display italic text-gold">Your crown.</em>
          </h1>

          <p className="mt-8 max-w-measure text-lead text-cream-dim">
            Bare Roots is Richmond&rsquo;s luxury natural-hair house, where
            holistic hair recovery meets master loc artistry. One artist heals
            the root. One crowns it. Both are in the same studio on West Broad.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/book" variant="gold" icon="arrow-right">
              Book an appointment
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              See the full menu
            </ButtonLink>
          </div>

          {/* The two names, stated plainly, above the fold. */}
          <ul className="mt-14 grid max-w-2xl gap-px overflow-hidden rounded-panel bg-white/14 sm:grid-cols-2">
            {SITE.artists.map((a) => (
              <li key={a.id} className="bg-forest-deep/80 p-6 backdrop-blur-sm">
                <Link href={`/house#${a.id}`} className="group block">
                  <p className="font-display text-d4 text-paper">{a.name}</p>
                  <p className="mt-1.5 text-sm2 text-cream-dim">{a.short}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-xs2 text-gold">
                    Meet her
                    <Icon
                      name="arrow-right"
                      className="size-3.5 transition-transform duration-base ease-brand group-hover:translate-x-1"
                    />
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs2 text-cream-dim">
            <span className="inline-flex items-center gap-2">
              <Icon name="map-pin" className="size-4 text-gold" />
              {SITE.address.street} {SITE.address.unit}, {SITE.address.city}
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="clock" className="size-4 text-gold" />
              {HOURS_SUMMARY}
            </span>
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden h-10 w-px -translate-x-1/2 origin-bottom animate-cue bg-gold/70 lg:block"
      />
    </section>
  );
}
