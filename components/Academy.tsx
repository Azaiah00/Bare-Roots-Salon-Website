import { COURSES } from "@/lib/content";
import Reveal from "./Reveal";

export default function Academy() {
  return (
    <section className="academy pad" id="academy">
      <div className="wrap">
        <Reveal className="sec-head center">
          <div className="eyebrow">
            <span className="gold-line" />
            Bare Roots Academy
            <span className="gold-line" />
          </div>
          <h2>Knowledge is the Root</h2>
          <p>
            Both artists are educators at heart. Learn the craft, master your own crown, or
            become certified.
          </p>
        </Reveal>
        <div className="edu-grid">
          {COURSES.map((c, i) => (
            <Reveal className="edu" key={c.title} delay={i * 0.1}>
              <div className="k">{c.kind}</div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
              <div className="price">{c.price}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
