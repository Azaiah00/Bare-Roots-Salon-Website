"use client";

import { createElement } from "react";
import { useReveal } from "@/lib/hooks";
import { cn } from "@/lib/cn";

/**
 * Wraps children in the reveal contract. `delay` feeds --reveal-delay, which
 * is how a grid staggers without a timeline or a library.
 */
export default function Reveal({
  as = "div",
  delay = 0,
  className,
  id,
  children,
}: {
  as?: "div" | "li" | "section" | "article" | "header" | "figure" | "ol" | "ul";
  delay?: number;
  className?: string;
  id?: string;
  children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      id,
      "data-reveal": "",
      style: delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined,
      className: cn(className),
    },
    children,
  );
}
