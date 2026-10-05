import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import Reveal from "./Reveal";

/**
 * Every route below the home page opens the same way: breadcrumb, eyebrow, the
 * one h1 for that route, a lead, and optional actions. Consistency here is what
 * makes a 20-route site feel like one house rather than twenty pages.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  actions,
  ground = "root",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: { name: string; path: string }[];
  actions?: React.ReactNode;
  ground?: "root" | "forest" | "plum" | "ink";
}) {
  const GROUND = {
    root: "bg-root",
    forest: "bg-forest",
    plum: "bg-plum",
    ink: "bg-ink",
  } as const;

  return (
    <header
      data-ground="dark"
      className={cn(
        GROUND[ground],
        "relative overflow-hidden pb-section pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))] text-paper",
      )}
    >
      {/* A single gold hairline arc — the house's quiet signature on every page. */}
      <svg
        viewBox="0 0 1200 400"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full opacity-[0.28]"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M0 340 C 240 260, 420 380, 640 300 S 1000 210, 1200 280"
          fill="none"
          stroke="#C9A15A"
          strokeWidth="1"
        />
      </svg>

      <div className="shell relative">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs2 text-cream-dim">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-cream-dim">
                      /
                    </span>
                  )}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-paper">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.path} className="underline-offset-4 hover:underline">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Reveal className="max-w-3xl">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="gold-rule" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="mt-6 text-d1">{title}</h1>
          {lead && <p className="mt-7 max-w-measure text-lead text-cream-dim">{lead}</p>}
          {actions && <div className="mt-10 flex flex-wrap gap-4">{actions}</div>}
        </Reveal>
      </div>
    </header>
  );
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center gap-2 text-sm2 text-ink-soft transition-colors duration-base ease-brand hover:text-bronze-ink"
    >
      <Icon name="arrow-left" className="size-4" />
      {children}
    </Link>
  );
}
