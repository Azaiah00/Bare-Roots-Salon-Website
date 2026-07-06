import GoldParticles from "./GoldParticles";

/**
 * Hero — the LCP surface. Entrance is a pure-CSS staggered fade-up so the
 * headline paints immediately and animates without waiting for hydration.
 */
export default function Hero() {
  return (
    <section className="hero" id="top">
      <GoldParticles />
      <div
        className="hero-photo"
        style={{ backgroundImage: "url('/assets/hero.png')" }}
        aria-hidden="true"
      />
      <div className="hero-veil" aria-hidden="true" />

      <div className="wrap">
        <div className="hero-inner">
          <div className="eyebrow h-rise" style={{ color: "var(--gold-deep)" }}>
            Richmond, Virginia · Est. 2026
          </div>
          <h1 className="h-rise">
            Rooted in culture.
            <br />
            Crowned in <em>gold.</em>
          </h1>
          <p className="sub h-rise">
            Two master artists. One rooted experience. Bare Roots is where holistic hair
            recovery meets loc artistry — a luxury natural-hair house built for the crown you
            were born with.
          </p>
          <div className="actions h-rise">
            <a href="#book" className="btn btn-gold">
              Book Your Seat
            </a>
            <a href="#services" className="btn btn-ghost">
              Explore Services
            </a>
          </div>
        </div>
      </div>

      <div className="loc">📍 8030 W Broad St #117 · Henrico, VA</div>
      <a href="#union" className="scrollcue" aria-label="Scroll to content">
        Scroll
        <div className="l" />
      </a>
    </section>
  );
}
