"use client";

import { BUSINESS } from "@/lib/content";
import { useCart } from "./CartProvider";
import Reveal from "./Reveal";

const MAP_SRC =
  "https://www.google.com/maps?q=8030+W+Broad+St+%23117,+Henrico,+VA+23294&output=embed";

export default function Booking() {
  const { showModal } = useCart();

  const consult = () =>
    showModal({
      title: "Booking Started",
      msg: "In the live site this opens secure GlossGenius booking with your chosen artist, service and deposit — or Iisha's Hair Recovery consultation form.",
    });

  return (
    <section className="book pad" id="book">
      <div className="wrap book-grid">
        <Reveal className="info">
          <div className="eyebrow">Visit Us</div>
          <h2>Come Get Rooted</h2>
          <p>
            Reserve your seat with Sabrina or begin your recovery journey with Iisha. Your crown
            is waiting.
          </p>
          <div className="detail">
            <div className="ic">📍</div>
            <div>
              <b>The Studio</b>
              <br />
              <span>{BUSINESS.addressFull}</span>
            </div>
          </div>
          <div className="detail">
            <div className="ic">🕑</div>
            <div>
              <b>Hours</b>
              <br />
              <span>{BUSINESS.hours}</span>
            </div>
          </div>
          <div className="detail">
            <div className="ic">✆</div>
            <div>
              <b>Call / Text</b>
              <br />
              <span>{BUSINESS.phones.join(" · ")}</span>
            </div>
          </div>
          <div className="book-map">
            <iframe
              src={MAP_SRC}
              title="Bare Roots studio location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <Reveal className="book-card" delay={0.1}>
          <h3>Reserve Your Ritual</h3>
          <p>Select your artist — booking is quick and secure.</p>
          <div className="line">
            <span>Sabrina · Loc Artistry</span>
            <span>via GlossGenius</span>
          </div>
          <div className="line">
            <span>Iisha · Hair Recovery</span>
            <span>Consultation</span>
          </div>
          <div className="line">
            <span>Deposit</span>
            <span>Applied to service</span>
          </div>
          <a
            href={BUSINESS.glossgenius}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            Book With Sabrina
          </a>
          <button
            className="btn btn-ghost"
            style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
            onClick={consult}
          >
            Book Recovery With Iisha
          </button>
        </Reveal>
      </div>
    </section>
  );
}
