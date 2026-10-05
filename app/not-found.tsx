import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import RootDraw from "@/components/brand/RootDraw";

export default function NotFound() {
  return (
    <div className="bg-forest-deep pt-[var(--header-h)] text-paper" data-ground="dark">
      <div className="shell grid gap-14 py-section lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="gold-rule" aria-hidden="true" />
            404
          </p>
          <h1 className="mt-6 text-d1">
            That page has
            <br />
            <em className="font-display italic text-gold">grown out.</em>
          </h1>
          <p className="mt-7 max-w-measure text-lead text-cream-dim">
            The link is broken or the page has moved. Here is where most people
            are actually going.
          </p>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-panel bg-white/14 sm:grid-cols-2">
            {[
              { href: "/services", label: "Services & pricing" },
              { href: "/book", label: "Book an appointment" },
              { href: "/recovery", label: "Hair recovery" },
              { href: "/shop", label: "The shelf" },
            ].map((l) => (
              <li key={l.href} className="bg-forest-deep">
                <Link
                  href={l.href}
                  className="group flex min-h-16 items-center justify-between gap-4 px-6 text-base2 text-paper"
                >
                  {l.label}
                  <Icon
                    name="arrow-right"
                    className="size-4 text-gold transition-transform duration-base ease-brand group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <ButtonLink href="/" variant="gold" iconBefore="arrow-left">
              Back to the house
            </ButtonLink>
          </div>
        </div>

        <div className="hidden justify-center lg:flex">
          <RootDraw className="h-80 w-auto" />
        </div>
      </div>
    </div>
  );
}
