import { BUSINESS } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          <div className="fbrand">
            <div className="name">Bare Roots</div>
            <p>
              Richmond&apos;s home for luxury natural hair. Rooted in culture, crowned in gold —
              where holistic recovery meets loc artistry.
            </p>
            <div className="eyebrow" style={{ color: "var(--gold)" }}>
              Natural · Luxury · Culture
            </div>
          </div>
          <div>
            <h5>Explore</h5>
            <div className="flinks">
              <a href="#services">Services</a>
              <a href="#wellness">Hair Recovery</a>
              <a href="#academy">Academy</a>
              <a href="#gallery">Portfolio</a>
            </div>
          </div>
          <div>
            <h5>Shop</h5>
            <div className="flinks">
              <a href="#shop">Inflúance Line</a>
              <a href="#shop">DOPE HAIR</a>
              <a href="#shop">Hair Wraps</a>
              <a href="#book">Gift Cards</a>
            </div>
          </div>
          <div>
            <h5>Visit</h5>
            <div className="flinks">
              <a href="#book">{BUSINESS.street}</a>
              <a href="#book">
                {BUSINESS.city}, {BUSINESS.region} {BUSINESS.zip}
              </a>
              <a href={`tel:${BUSINESS.phones[0].replace(/[^\d]/g, "")}`}>
                {BUSINESS.phones[0]}
              </a>
              <a
                href="https://instagram.com/i.c.beautybrand"
                target="_blank"
                rel="noopener noreferrer"
              >
                {BUSINESS.iishaIG}
              </a>
              <a
                href="https://instagram.com/ladyybri_xo"
                target="_blank"
                rel="noopener noreferrer"
              >
                {BUSINESS.sabrinaIG}
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Bare Roots Salon · All rights reserved</span>
          <span>
            Demo experience crafted by <a href="#top">Couture House Co.</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
