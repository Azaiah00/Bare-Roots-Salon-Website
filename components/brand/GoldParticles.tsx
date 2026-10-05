"use client";

import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * SIGNATURE MOVE 1 — "gold in the air".
 *
 * Slow, sparse, upward drift behind the hero. The brand line is that gold is
 * jewellery, not paint, so this is 22 one-pixel motes, not a snowstorm.
 *
 * Pure CSS animation — no canvas, no rAF, no library, nothing to leak. The
 * seeds are a fixed table rather than Math.random() because a random value
 * computed during render produces a different string on the server than in the
 * browser, and React will tear the markup apart rebuilding it.
 */
const MOTES = [
  { l: 4, d: 12.5, delay: 0, s: 2, dx: 18, o: 0.5 },
  { l: 11, d: 16, delay: 2.4, s: 1, dx: -12, o: 0.35 },
  { l: 17, d: 10.5, delay: 5.1, s: 3, dx: 24, o: 0.6 },
  { l: 23, d: 14, delay: 1.2, s: 1, dx: -20, o: 0.3 },
  { l: 29, d: 18, delay: 6.8, s: 2, dx: 10, o: 0.45 },
  { l: 34, d: 11.5, delay: 3.6, s: 1, dx: -8, o: 0.4 },
  { l: 39, d: 15, delay: 8.2, s: 3, dx: 16, o: 0.55 },
  { l: 44, d: 13, delay: 0.8, s: 1, dx: -16, o: 0.3 },
  { l: 49, d: 17.5, delay: 4.4, s: 2, dx: 22, o: 0.5 },
  { l: 54, d: 12, delay: 9.6, s: 1, dx: -10, o: 0.35 },
  { l: 58, d: 16.5, delay: 2, s: 3, dx: 14, o: 0.6 },
  { l: 63, d: 14.5, delay: 7.2, s: 1, dx: -22, o: 0.3 },
  { l: 68, d: 11, delay: 5.6, s: 2, dx: 12, o: 0.45 },
  { l: 72, d: 18.5, delay: 1.6, s: 1, dx: -14, o: 0.35 },
  { l: 77, d: 13.5, delay: 8.8, s: 3, dx: 20, o: 0.55 },
  { l: 82, d: 15.5, delay: 4, s: 1, dx: -18, o: 0.3 },
  { l: 86, d: 10, delay: 6.4, s: 2, dx: 8, o: 0.5 },
  { l: 90, d: 17, delay: 2.8, s: 1, dx: -6, o: 0.4 },
  { l: 94, d: 12.8, delay: 9.2, s: 2, dx: 16, o: 0.45 },
  { l: 97, d: 14.8, delay: 5.9, s: 1, dx: -12, o: 0.3 },
  { l: 7, d: 19, delay: 7.7, s: 1, dx: 10, o: 0.35 },
  { l: 61, d: 20, delay: 3.1, s: 2, dx: -24, o: 0.4 },
];

export default function GoldParticles() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-gilt animate-drift"
          style={
            {
              left: `${m.l}%`,
              width: `${m.s}px`,
              height: `${m.s}px`,
              opacity: m.o,
              boxShadow: `0 0 ${m.s * 3}px rgba(231,206,154,0.75)`,
              "--dur": `${m.d}s`,
              "--delay": `${m.delay}s`,
              "--dx": `${m.dx}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
