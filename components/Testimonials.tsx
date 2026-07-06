"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/content";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, [paused]);

  const t = TESTIMONIALS[i];

  return (
    <section
      className="testi pad"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="wrap quote">
        <div className="stars" aria-hidden="true">
          ★★★★★
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={mounted && !reduce ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1] }}
          >
            <p className="q">&quot;{t.quote}&quot;</p>
            <div className="who">— {t.who}</div>
          </motion.div>
        </AnimatePresence>
        <div className="testi-dots">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              className={idx === i ? "on" : ""}
              onClick={() => setI(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              aria-current={idx === i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
