import { cn } from "@/lib/cn";

/**
 * The wordmark, set in type rather than shipped as a PNG.
 *
 * The logo decision is still open — three directions were delivered (tree
 * emblem, BR monogram, wordmark + bloom) and nobody has chosen. Setting the
 * mark in Cormorant means the header is sharp at every density, scales without
 * a second file, recolours per ground, and costs nothing. When the mark is
 * chosen, swap the inside of this component and every surface updates at once.
 * // TODO: replace with the chosen mark — see public/img/logo-options/
 */
export default function Wordmark({
  className,
  tone = "light",
  withDescriptor,
}: {
  className?: string;
  /** "light" = on a dark ground. "dark" = on paper. */
  tone?: "light" | "dark";
  withDescriptor?: boolean;
}) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="flex items-baseline gap-[0.18em]">
        <span
          className={cn(
            "font-display text-[1.375rem] uppercase tracking-[0.2em]",
            tone === "light" ? "text-paper" : "text-ink",
          )}
        >
          Bare
        </span>
        {/* The single gold bloom, at the seam of the two words. */}
        <span
          aria-hidden="true"
          className="relative -top-[0.18em] size-[5px] rotate-45 bg-gold"
        />
        <span
          className={cn(
            "font-display text-[1.375rem] uppercase tracking-[0.2em]",
            tone === "light" ? "text-paper" : "text-ink",
          )}
        >
          Roots
        </span>
      </span>
      {withDescriptor && (
        <span
          className={cn(
            "eyebrow mt-2 text-[0.5625rem]",
            tone === "light" ? "text-gold" : "text-bronze-ink",
          )}
        >
          Natural · Luxury · Culture
        </span>
      )}
    </span>
  );
}
