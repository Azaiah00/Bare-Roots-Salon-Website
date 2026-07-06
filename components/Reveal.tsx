"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";

type RevealProps = {
  as?: "div" | "section" | "li" | "article" | "span";
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
  children: React.ReactNode;
};

/**
 * Scroll reveal — rises 40px + fades on entering view (RULES: calm, never bouncy).
 * CSS-driven with a per-instance IntersectionObserver: content degrades to fully
 * visible without JS (see the .reveal base + noscript rules), and it is robust to
 * fast scrolling in a way Framer's whileInView is not.
 */
export default function Reveal({
  as = "div",
  delay = 0,
  className,
  style,
  id,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as ElementType;
  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal${inView ? " in" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { ...style, transitionDelay: `${delay}s` } : style}
    >
      {children}
    </Tag>
  );
}
