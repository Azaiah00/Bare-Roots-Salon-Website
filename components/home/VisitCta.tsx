import Image from "next/image";
import { SITE, MAPS_URL, formatDayHours, HOURS_SUMMARY } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Botanical } from "@/components/brand/RootDraw";

export default function VisitCta() {
  return (
    <section
      aria-labelledby="visit-title"
      data-ground="dark"
      className="relative overflow-hidden bg-ink py-section text-paper"
    >
      <Image
        src="/img/studio-detail.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(28,21,24,0.96)_0%,rgba(28,21,24,0.82)_50%,rgba(46,63,40,0.62)_100%)]"
      />

      <div className="shell relative grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="tabular-nums">08</span>
            <span className="gold-rule" aria-hidden="true" />
            Visit
          </p>
          <h2 id="visit-title" className="mt-5 text-d2">
            Come and sit in the chair on{" "}
            <em className="font-display italic text-gold">West Broad.</em>
          </h2>
          <p className="mt-6 max-w-measure text-lead text-cream-dim">
            One studio suite, two artists, free parking and a consultation that
            starts with listening. Bring your hair as it is — we have seen it,
            and we are not going to make you feel bad about it.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/book" variant="gold" icon="arrow-right">
              Book an appointment
            </ButtonLink>
            <ButtonLink href={MAPS_URL} variant="ghost" external>
              Get directions
            </ButtonLink>
          </div>

          <Botanical className="mt-14 hidden h-14 w-auto text-gold lg:block" />
        </Reveal>

        <Reveal delay={120}>
          <div className="card-dark bg-ink/70 p-8 backdrop-blur-sm">
            <h3 className="eyebrow text-gold">The studio</h3>
            <address className="mt-5 not-italic">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 font-display text-d4 text-paper transition-colors duration-base ease-brand hover:text-gilt"
              >
                <Icon name="map-pin" className="mt-1.5 size-5 shrink-0 text-gold" />
                <span>
                  {SITE.address.street} {SITE.address.unit}
                  <br />
                  {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
                </span>
              </a>
            </address>

            <h3 className="eyebrow mt-9 text-gold">Hours</h3>
            <ul className="mt-4 flex flex-col">
              {SITE.hours
                .filter((h) => h.open !== null)
                .map((h) => (
                  <li
                    key={h.day}
                    className="flex items-baseline justify-between gap-4 border-b border-white/10 py-2 text-sm2"
                  >
                    <span>{h.day}</span>
                    <span className="tabular-nums text-cream-dim">{formatDayHours(h)}</span>
                  </li>
                ))}
            </ul>
            <p className="mt-4 text-xs2 text-cream-dim">{HOURS_SUMMARY}.</p>

            <h3 className="eyebrow mt-9 text-gold">Reach an artist directly</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {SITE.artists.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-4">
                  <span className="text-sm2">{a.name}</span>
                  <a
                    href={a.phoneHref}
                    className="inline-flex min-h-11 items-center gap-2 text-sm2 tabular-nums text-gilt hover:text-gold"
                  >
                    <Icon name="phone" className="size-4" />
                    {a.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
