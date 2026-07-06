import { RECOVERY_STEPS } from "@/lib/content";
import Reveal from "./Reveal";

export default function Wellness() {
  return (
    <section className="wellness pad" id="wellness">
      <div className="wrap">
        <Reveal className="sec-head center">
          <div className="eyebrow">
            <span className="gold-line" />
            Iisha&apos;s Signature Program
            <span className="gold-line" />
          </div>
          <h2>The Root Recovery Method™</h2>
          <p>
            Thinning edges, alopecia, breakage? We don&apos;t chase symptoms — we rebuild the
            root. A four-phase journey to grow your hair from the inside out.
          </p>
        </Reveal>

        <div className="steps">
          {RECOVERY_STEPS.map((s, i) => (
            <Reveal className="step" key={s.no} delay={i * 0.12}>
              <div className="no">{s.no}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="cta-band">
          <div>
            <h3>Your regrowth starts with one conversation.</h3>
            <p>
              Book a Hair Recovery Consultation — in-studio or virtual — and get your
              personalized plan.
            </p>
          </div>
          <a href="#book" className="btn btn-gold">
            Start My Recovery
          </a>
        </Reveal>
      </div>
    </section>
  );
}
