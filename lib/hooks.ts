"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The media queries live here, exported, because markup and script MUST use the
 * exact same string. When they drift, a sticky section and its spacer disagree
 * and the layout collapses into empty space.
 *
 * Height is part of the pin query on purpose: a pinned section on a 600px-tall
 * laptop window is a worse experience than a plain stack.
 */
export const PIN_QUERY = "(min-width: 1024px) and (min-height: 700px)";
export const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

/** False on the server and on first paint, so hydration is stable. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery(MOTION_QUERY);
}

/**
 * Reveal on enter. Two CSS transitions and an IntersectionObserver — no motion
 * library. Shipping 38 KB gzipped to do one fade and an 18px translate is how
 * a Lighthouse score quietly dies.
 */
export function useReveal<T extends Element = HTMLElement>(options?: {
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia(MOTION_QUERY).matches) {
      el.setAttribute("data-reveal", "in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-reveal", "in");
          if (options?.once !== false) io.unobserve(e.target);
        }
      },
      { threshold: options?.threshold ?? 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [options?.threshold, options?.once]);

  return ref;
}

/**
 * How far through an element the viewport has scrolled, 0..1.
 * rAF-coalesced, passive listeners, cleaned up properly.
 */
export function useScrollProgress<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia(MOTION_QUERY).matches) return;

    let raf = 0;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const seen = vh - r.top;
      setP(Math.min(1, Math.max(0, seen / total)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return [ref, p] as const;
}

/** True once the page has been scrolled past `after` pixels. */
export function useScrolled(after = 24): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setOn(window.scrollY > after);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [after]);
  return on;
}

/**
 * Locks body scroll while a dialog or drawer is open, and restores focus to
 * whatever opened it. `scrollbar-gutter: stable` in globals.css is what stops
 * the lock shifting the page sideways.
 */
export function useDialog(open: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    firstRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prev?.focus();
    };
  }, [open, close]);

  return { dialogRef, firstRef };
}
