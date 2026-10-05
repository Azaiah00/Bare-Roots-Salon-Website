import { cn } from "@/lib/cn";
import Reveal from "./Reveal";

/**
 * Ground rhythm. There are exactly six grounds and they alternate to a fixed
 * rhythm set out in DESIGN.md §1.3 — never more than two light grounds in a
 * row, and a dark ground always earns its place by holding imagery or a number.
 */
export type Ground = "paper" | "cream" | "forest" | "plum" | "ink" | "root";

const GROUND: Record<Ground, string> = {
  paper: "bg-paper text-ink",
  cream: "bg-cream text-ink",
  forest: "bg-forest text-paper",
  plum: "bg-plum text-paper",
  ink: "bg-ink text-paper",
  root: "bg-root text-paper",
};

export const isDark = (g: Ground) => g !== "paper" && g !== "cream";

export function Section({
  id,
  ground = "paper",
  className,
  children,
  labelledBy,
  label,
  tight,
}: {
  id?: string;
  ground?: Ground;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
  label?: string;
  tight?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      data-ground={isDark(ground) ? "dark" : "light"}
      className={cn(GROUND[ground], tight ? "py-16" : "py-section", className)}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

/** Eyebrow + heading + lead. The heading always carries one italic accent word. */
export function SectionHead({
  eyebrow,
  id,
  title,
  lead,
  ground = "paper",
  align = "left",
  number,
  action,
}: {
  eyebrow: string;
  id?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  ground?: Ground;
  align?: "left" | "center";
  number?: string;
  action?: React.ReactNode;
}) {
  const dark = isDark(ground);
  return (
    <Reveal
      as="header"
      className={cn(
        "flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center",
      )}
    >
      <div className={cn("max-w-measure", align === "center" && "text-center")}>
        <p
          className={cn(
            "eyebrow flex items-center gap-3",
            align === "center" && "justify-center",
            dark ? "text-gold" : "text-bronze-ink",
          )}
        >
          {number && <span className="tabular-nums">{number}</span>}
          <span className="gold-rule" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 id={id} className="mt-5 text-d2">
          {title}
        </h2>
        {lead && (
          <p
            className={cn(
              "mt-5 text-lead",
              dark ? "text-cream-dim" : "text-ink-soft",
            )}
          >
            {lead}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

/** The one heading rule: a phrase plus one italic accent word. */
export function Accent({ children }: { children: React.ReactNode }) {
  return <em className="font-display italic text-bronze">{children}</em>;
}

/** The same device on a dark ground, where gold is legible. */
export function AccentDark({ children }: { children: React.ReactNode }) {
  return <em className="font-display italic text-gold">{children}</em>;
}
