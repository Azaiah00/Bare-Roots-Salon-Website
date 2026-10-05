"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/**
 * Accordion via grid-template-rows: 0fr → 1fr, so the panel animates to its own
 * height with no measurement, no ResizeObserver and no max-height guess that
 * clips the one long answer.
 */
export default function Accordion({
  items,
  dark,
}: {
  items: { q: string; a: string }[];
  dark?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className={cn("border-t", dark ? "border-white/15" : "border-ink/12")}>
      {items.map((item, i) => {
        const on = open === i;
        const id = `${base}-${i}`;
        return (
          <div key={item.q} className={cn("border-b", dark ? "border-white/15" : "border-ink/12")}>
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`${id}-panel`}
                id={`${id}-button`}
                onClick={() => setOpen(on ? null : i)}
                className={cn(
                  "flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-base ease-brand",
                  dark ? "hover:text-gilt" : "hover:text-bronze-ink",
                )}
              >
                <span className="font-display text-d4">{item.q}</span>
                <Icon
                  name="chevron-down"
                  className={cn(
                    "size-5 shrink-0 transition-transform duration-base ease-brand",
                    on && "rotate-180",
                    dark ? "text-gold" : "text-bronze-ink",
                  )}
                />
              </button>
            </h3>
            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-button`}
              className={cn(
                "grid transition-[grid-template-rows] duration-base ease-brand",
                on ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "max-w-prose2 pb-7 text-base2",
                    dark ? "text-cream-dim" : "text-ink-soft",
                  )}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
