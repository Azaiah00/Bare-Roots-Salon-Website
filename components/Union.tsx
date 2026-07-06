import Reveal from "./Reveal";

/**
 * Locs flowing into tree roots with gold blossoms + gilt seed-dots.
 * Roots "grow" via a CSS stroke-draw that runs when the parent .rootart
 * enters view (.in) — no JS gate, so the art is always visible.
 */
function RootArt() {
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="unionG" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#806172" stopOpacity=".5" />
          <stop offset="100%" stopColor="#2E3F28" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#unionG)" />
      <g stroke="#C9A15A" fill="none" strokeWidth="1.3">
        <path
          d="M200 90c-18 30-18 54 0 78 18-24 18-48 0-78z"
          fill="#C9A15A"
          stroke="none"
          opacity=".6"
        />
        <path className="grow" d="M200 168c0 40-2 70-30 120" />
        <path className="grow" d="M200 168c0 40 2 70 30 120" />
        <path className="grow" d="M200 175c-30 26-52 54-64 108" />
        <path className="grow" d="M200 175c30 26 52 54 64 108" />
        <path className="grow" d="M200 182c-48 20-78 52-96 106" />
        <path className="grow" d="M200 182c48 20 78 52 96 106" />
        <circle cx="200" cy="150" r="4" fill="#E7CE9A" />
        <circle cx="140" cy="120" r="3" fill="#E7CE9A" />
        <circle cx="264" cy="126" r="3" fill="#E7CE9A" />
        <path
          d="M170 128c-8-8-8-16 0-22 8 6 8 14 0 22zM236 132c8-8 8-16 0-22-8 6-8 14 0 22z"
          fill="#93A052"
          stroke="none"
          opacity=".7"
        />
      </g>
    </svg>
  );
}

export default function Union() {
  return (
    <section className="union pad" id="union">
      <div className="wrap union-grid">
        <Reveal>
          <div className="eyebrow">The Union</div>
          <p className="lead">Two crowns. One root system.</p>
          <p>
            Bare Roots is the coming-together of two Richmond powerhouses. <b>Iisha</b> —
            a holistic hair-recovery practitioner who grows hair from the inside out.{" "}
            <b>Sabrina</b> — a creative loc artist whose micro locs and natural styling
            are studied, not just admired.
          </p>
          <p>
            Under one roof at 8030 W Broad Street, they&apos;ve built a house where
            science meets soul: wellness, artistry, education, and product — all rooted in
            Black culture, all elevated to luxury.
          </p>
          <div className="stat-row">
            <div className="stat">
              <b>2</b>
              <span>Master Artists</span>
            </div>
            <div className="stat">
              <b>1090+</b>
              <span>Followers Served</span>
            </div>
            <div className="stat">
              <b>15+</b>
              <span>Years Combined</span>
            </div>
          </div>
        </Reveal>
        <Reveal className="rootart" delay={0.1}>
          <RootArt />
        </Reveal>
      </div>
    </section>
  );
}
