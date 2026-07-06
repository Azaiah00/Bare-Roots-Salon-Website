"use client";

import { useEffect, useRef } from "react";

/**
 * Sparse gold pollen drifting slowly upward — "gold in the air."
 * Canvas 2D, DPR-aware, pauses when off-screen and under reduced-motion.
 */
export default function GoldParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; r: number; s: number; o: number; d: number };
    let parts: P[] = [];

    const size = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: Math.min(70, Math.floor(W / 22)) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.7 + 0.4,
        s: Math.random() * 0.4 + 0.1,
        o: Math.random() * 0.5 + 0.2,
        d: Math.random() * Math.PI * 2,
      }));
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      parts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = `rgba(201,161,90,${p.o})`;
        ctx.fill();
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      parts.forEach((p) => {
        p.y -= p.s;
        p.x += Math.sin(p.d + p.y * 0.01) * 0.3;
        if (p.y < -5) {
          p.y = H + 5;
          p.x = Math.random() * W;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = `rgba(201,161,90,${p.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    size();
    window.addEventListener("resize", size);

    if (reduce) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(draw);
    }

    // Pause when hero scrolls out of view
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduce) return;
        if (entry.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
    />
  );
}
