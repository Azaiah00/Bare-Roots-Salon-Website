"use client";

import { useCallback, useEffect, useState } from "react";
import { GALLERY } from "@/lib/content";
import Reveal from "./Reveal";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpen((cur) => (cur === null ? cur : (cur + dir + GALLERY.length) % GALLERY.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  const current = open === null ? null : GALLERY[open];

  return (
    <section className="gallery pad" id="gallery">
      <div className="wrap">
        <Reveal className="sec-head center">
          <div className="eyebrow">
            <span className="gold-line" />
            The Portfolio
            <span className="gold-line" />
          </div>
          <h2>Crowns We&apos;ve Built</h2>
        </Reveal>
        <div className="gal-grid">
          {GALLERY.map((g, i) => (
            <button
              key={g.img}
              className={`gal${g.span ? ` ${g.span}` : ""}`}
              style={{ backgroundImage: `url('${g.img}')` }}
              onClick={() => setOpen(i)}
              aria-label={`View ${g.cap}`}
            >
              <span className="cap">
                <span>{g.cap}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lb-x" onClick={close} aria-label="Close">
            ×
          </button>
          <button
            className="lb-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.img} alt={current.cap} onClick={(e) => e.stopPropagation()} />
          <button
            className="lb-nav next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next"
          >
            ›
          </button>
          <div className="lb-cap">{current.cap}</div>
        </div>
      )}
    </section>
  );
}
