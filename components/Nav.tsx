"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

const LINKS = [
  { href: "#union", label: "The House" },
  { href: "#artists", label: "Artists" },
  { href: "#services", label: "Services" },
  { href: "#wellness", label: "Hair Recovery" },
  { href: "#shop", label: "Shop" },
  { href: "#academy", label: "Academy" },
];

/** Root / tree-of-life seal — locs flowing into roots, gold on transparent. */
function BrandMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="47" stroke="#C9A15A" strokeWidth="1.5" />
      <path d="M50 20c-6 10-6 18 0 26 6-8 6-16 0-26z" fill="#C9A15A" />
      <path
        d="M50 46c0 10 0 22-8 34M50 46c0 10 0 22 8 34M50 46c-9 8-15 16-18 30M50 46c9 8 15 16 18 30"
        stroke="#C9A15A"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count: cartCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <div className="wrap nav-wrap">
        <a href="#top" className="brand" aria-label="Bare Roots — home">
          <BrandMark />
          <span className="brand-name">
            Bare Roots
            <small>NATURAL · LUXURY · CULTURE</small>
          </span>
        </a>

        <nav className="navlinks" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-cta">
          <button
            type="button"
            className="cart-btn"
            aria-label={`Open bag, ${cartCount} items`}
            onClick={openCart}
          >
            Bag <span className="cart-count">{cartCount}</span>
          </button>
          <a href="#book" className="btn btn-gold nav-book">
            Book Now
          </a>
          <button
            type="button"
            className="burger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer menu */}
      <div className={`mobile-menu${menuOpen ? " on" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href="#book"
          className="btn btn-gold"
          onClick={() => setMenuOpen(false)}
        >
          Book Now
        </a>
      </div>

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 120;
          transition: 0.5s;
          padding: 20px 0;
        }
        .nav.scrolled {
          background: rgba(30, 21, 24, 0.86);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 12px 0;
          box-shadow: 0 12px 40px -20px rgba(0, 0, 0, 0.7);
        }
        .nav-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--cream);
        }
        .brand-mark {
          width: 40px;
          height: 40px;
          flex: none;
        }
        .brand-name {
          font-family: var(--serif);
          font-size: 23px;
          letter-spacing: 0.14em;
          line-height: 1;
        }
        .brand-name small {
          display: block;
          font-family: var(--sans);
          font-size: 8.5px;
          letter-spacing: 0.42em;
          color: var(--gold);
          margin-top: 3px;
        }
        .navlinks {
          display: flex;
          gap: 30px;
          align-items: center;
        }
        .navlinks a {
          color: var(--cream);
          font-size: 12.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 400;
          position: relative;
          opacity: 0.9;
        }
        .navlinks a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: 0.4s;
        }
        .navlinks a:hover {
          opacity: 1;
        }
        .navlinks a:hover::after {
          width: 100%;
        }
        .nav-cta {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .cart-btn {
          position: relative;
          color: var(--cream);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: none;
          border: none;
          font-family: var(--sans);
        }
        .cart-count {
          position: absolute;
          top: -9px;
          right: -12px;
          background: var(--gold);
          color: #241a0b;
          font-size: 10px;
          font-weight: 600;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-family: var(--sans);
        }
        .nav-book {
          padding: 12px 22px;
        }
        .burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .burger span {
          width: 26px;
          height: 2px;
          background: var(--cream);
          display: block;
        }
        .mobile-menu {
          display: none;
        }
        @media (max-width: 960px) {
          .navlinks,
          .nav-book {
            display: none;
          }
          .burger {
            display: flex;
          }
          .mobile-menu {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 0 28px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.45s ease, padding 0.45s ease;
            background: rgba(30, 21, 24, 0.96);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
          }
          .mobile-menu.on {
            max-height: 420px;
            padding: 18px 28px 26px;
          }
          .mobile-menu a {
            color: var(--cream);
            font-size: 13px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 12px 0;
            border-bottom: 1px solid rgba(201, 161, 90, 0.14);
          }
          .mobile-menu a.btn {
            border-bottom: none;
            justify-content: center;
            margin-top: 14px;
            color: #241a0b;
          }
        }
      `}</style>
    </header>
  );
}
