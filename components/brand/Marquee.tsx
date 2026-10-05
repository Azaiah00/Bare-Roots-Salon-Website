import { MARQUEE_TERMS } from "@/lib/content";

/**
 * The editorial runway strip. Services set in italic display type, drifting
 * past a gold hairline — the "couture house" cue, in one band.
 *
 * Duplicated once and translated -50%, which is the only way to loop without a
 * visible seam. aria-hidden because it is decoration: every term on it is a
 * real link somewhere else on the page.
 */
export default function Marquee({ dark = true }: { dark?: boolean }) {
  const row = [...MARQUEE_TERMS, ...MARQUEE_TERMS];
  return (
    <div
      aria-hidden="true"
      className={
        // overflow-hidden is load-bearing: the duplicated row is ~2700px wide,
        // and without it the whole document scrolls sideways at every viewport.
        dark
          ? "overflow-hidden border-y border-white/12 bg-forest-deep py-5"
          : "overflow-hidden border-y border-ink/12 bg-cream py-5"
      }
    >
      <div className="flex w-max animate-marquee will-change-transform">
        {row.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span
              className={`px-7 font-display text-[1.375rem] italic ${
                dark ? "text-cream-dim" : "text-ink-soft"
              }`}
            >
              {t}
            </span>
            <span
              className={`size-1.5 rotate-45 ${dark ? "bg-gold" : "bg-bronze"}`}
              style={{ opacity: 0.75 }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
