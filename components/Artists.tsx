import Reveal from "./Reveal";

type Artist = {
  name: string;
  tag: string;
  role: string;
  photo: string;
  bio: React.ReactNode;
  chips: string[];
  cta: { href: string; label: string };
  ig: string;
};

const ARTISTS: Artist[] = [
  {
    name: "Iisha",
    tag: "Holistic Hair Recovery",
    role: "Hair Recovery Practitioner · Educator",
    photo: "/assets/artist-iisha.png",
    bio: (
      <>
        &quot;I&apos;ll grow it — from the inside out.&quot; Iisha specializes in restoring
        thinning hair, alopecia and scalp health through a holistic, wellness-first approach
        that pairs science with soul. She&apos;s also the founder of <b>DOPE HAIR</b>.
      </>
    ),
    chips: ["Hair Loss Recovery", "Scalp Therapy", "Wellness", "Education"],
    cta: { href: "#wellness", label: "Recovery Program" },
    ig: "@i.c.beautybrand",
  },
  {
    name: "Sabrina",
    tag: "Creative Loc Artist",
    role: "Creative Loc Artist · Educator",
    photo: "/assets/artist-sabrina.png",
    bio: (
      <>
        All things natural hair. Sabrina is a creative loc artist known for meticulous micro
        locs, sisterlocs, traditional locs and statement styling. Premium custom hair wraps are
        coming soon to her collection.
      </>
    ),
    chips: ["Micro Locs", "Sisterlocs", "Traditional Locs", "Color · Silk Press"],
    cta: { href: "#book", label: "Book Sabrina" },
    ig: "@ladyybri_xo",
  },
];

export default function Artists() {
  return (
    <section className="artists pad" id="artists">
      <div className="wrap">
        <Reveal className="sec-head center">
          <div className="eyebrow">
            <span className="gold-line" />
            The Artists
            <span className="gold-line" />
          </div>
          <h2>Behind the Crown</h2>
          <p>
            Every root has a keeper. Meet the two women whose hands, hearts and expertise built
            Bare Roots.
          </p>
        </Reveal>
        <div className="art-grid">
          {ARTISTS.map((a, i) => (
            <Reveal className="art-card" key={a.name} delay={i * 0.1}>
              <div
                className="art-photo"
                style={{ backgroundImage: `url('${a.photo}')` }}
                role="img"
                aria-label={`${a.name}, ${a.role}`}
              >
                <div className="tag">{a.tag}</div>
              </div>
              <div className="art-body">
                <h3>{a.name}</h3>
                <div className="role">{a.role}</div>
                <p>{a.bio}</p>
                <div className="chips">
                  {a.chips.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
                <div className="row">
                  <a href={a.cta.href} className="btn btn-ghost" style={{ padding: "12px 20px" }}>
                    {a.cta.label}
                  </a>
                  <span className="ig">{a.ig}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
