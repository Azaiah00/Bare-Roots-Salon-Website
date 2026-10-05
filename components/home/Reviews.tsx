import { REVIEWS, HAS_VERIFIED_REVIEWS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Section, SectionHead, Accent } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

/**
 * Reviews.
 *
 * THE MARKERS STAY UNTIL THE REVIEWS ARE REAL. Everything below carries
 * `status: "placeholder"` in content.ts, so every card renders flagged. The
 * component is finished; the content is not. Paste Iisha's and Sabrina's real
 * Google and Instagram reviews into REVIEWS, set status to "verified", add the
 * source link, and the flags disappear on their own.
 *
 * Writing plausible-sounding reviews under invented names would look better in
 * a screenshot and would be a fabricated endorsement on a page selling $1,000
 * installs. It is also the single easiest thing for a search engine to catch.
 */
export default function Reviews() {
  return (
    <Section ground="cream" labelledBy="reviews-title">
      <SectionHead
        number="05"
        eyebrow="In their words"
        id="reviews-title"
        title={
          <>
            The proof is in the <Accent>regrowth.</Accent>
          </>
        }
        lead={
          HAS_VERIFIED_REVIEWS
            ? "What clients say, quoted from their own public reviews."
            : "Bare Roots is a new house, so its review page starts empty — and we would rather show you an empty page than someone else's words with a name invented on top."
        }
      />

      {!HAS_VERIFIED_REVIEWS && (
        <Reveal className="marker mt-10 flex flex-wrap items-center gap-4 p-5 text-sm2" delay={60}>
          <Icon name="alert" className="size-5 shrink-0" />
          <p className="font-normal">
            <strong className="font-medium">Placeholder copy.</strong> These are
            written examples showing the layout, not real clients. Replace them
            with verified reviews from {SITE.artists[0].instagram} and{" "}
            {SITE.artists[1].instagram} before launch — see ASSETS-OWED.md.
          </p>
        </Reveal>
      )}

      <ul className="mt-12 grid gap-6 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Reveal as="li" key={i} delay={i * 90}>
            <figure className="card-light flex h-full flex-col p-8">
              <span className="gold-rule" aria-hidden="true" />
              <blockquote className="mt-6 flex-1">
                <p className="font-display text-d4 italic leading-snug text-forest">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-2 text-xs2">
                {r.status === "placeholder" ? (
                  <span className="badge border-dashed text-bronze-ink">
                    <Icon name="alert" className="size-3" />
                    {r.who}
                  </span>
                ) : (
                  <span className="text-ink-soft">
                    {r.who}
                    {r.source && ` · ${r.source}`}
                  </span>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
