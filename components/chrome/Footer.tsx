import Link from "next/link";
import {
  SITE,
  FOOTER_NAV,
  ADDRESS_ONE_LINE,
  MAPS_URL,
  formatDayHours,
} from "@/lib/site";
import Wordmark from "@/components/brand/Wordmark";
import { Icon } from "@/components/ui/Icon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-ground="dark" className="bg-ink text-paper">
      <div className="shell pb-[calc(theme(spacing.section)+5rem)] pt-section lg:pb-section">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr]">
          {/* The house */}
          <div>
            <Wordmark tone="light" withDescriptor />
            <p className="mt-7 max-w-[34ch] font-display text-d4 italic text-gilt">
              {SITE.tagline}
            </p>

            <address className="mt-9 not-italic">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-3 text-base2 text-cream-dim transition-colors duration-base ease-brand hover:text-paper"
              >
                <Icon name="map-pin" className="mt-0.5 size-5 shrink-0 text-gold" />
                <span>
                  {SITE.address.street} {SITE.address.unit}
                  <br />
                  {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
                </span>
              </a>
            </address>

            <ul className="mt-7 flex flex-col gap-3">
              {SITE.artists.map((a) => (
                <li key={a.id} className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-sm2 text-paper">{a.name}</span>
                  <a
                    href={a.phoneHref}
                    className="inline-flex min-h-11 items-center gap-2 text-sm2 text-cream-dim transition-colors duration-base ease-brand hover:text-gilt"
                  >
                    <Icon name="phone" className="size-4" />
                    {a.phone}
                  </a>
                  <a
                    href={a.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-sm2 text-cream-dim transition-colors duration-base ease-brand hover:text-gilt"
                  >
                    <Icon name="instagram" className="size-4" />
                    {a.instagram}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation + hours */}
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_NAV.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="eyebrow text-gold">{col.title}</h2>
                <ul className="mt-5 flex flex-col gap-1">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="inline-flex min-h-10 items-center text-sm2 text-cream-dim transition-colors duration-base ease-brand hover:text-paper"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div className="mt-16 border-t border-white/12 pt-10">
          <h2 className="eyebrow text-gold">Studio hours</h2>
          <ul className="mt-5 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
            {SITE.hours.map((h) => (
              <li
                key={h.day}
                className="flex items-baseline justify-between gap-4 border-b border-white/8 py-1.5 text-sm2"
              >
                <span className="text-paper">{h.day}</span>
                <span className={h.open ? "text-cream-dim tabular-nums" : "text-cream-dim"}>
                  {formatDayHours(h)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm2 text-cream-dim">
            By appointment. Long services are scheduled in sittings —{" "}
            <Link href="/book" className="text-gilt underline underline-offset-4">
              start with a booking
            </Link>{" "}
            or{" "}
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gilt underline underline-offset-4"
            >
              book with Sabrina on GlossGenius
            </a>
            .
          </p>
        </div>

        {/* Colophon */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/12 pt-8 text-xs2 text-cream-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. {ADDRESS_ONE_LINE}.
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/policies" className="transition-colors hover:text-paper">
              Policies
            </Link>
            <Link href="/faq" className="transition-colors hover:text-paper">
              FAQ
            </Link>
            <Link href="/portal" className="transition-colors hover:text-paper">
              Portal
            </Link>
            <span className="text-cream-dim">
              Site by{" "}
              <a
                href="https://couturehouse.co"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-paper"
              >
                Couture House Co.
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
