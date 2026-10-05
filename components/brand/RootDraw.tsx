"use client";

import { useReveal } from "@/lib/hooks";
import { cn } from "@/lib/cn";

/**
 * SIGNATURE MOVE 2 — "the root draws itself".
 *
 * The brand's own mark, not a generic flourish: a loc that becomes a root
 * system, drawn on with stroke-dashoffset the first time it enters the
 * viewport. It is the thesis of the business rendered as one line —
 * what you see is grown from something underneath it.
 *
 * Once per page. A looping draw is a screensaver, not a signature.
 * The CSS half lives in globals.css under `.root-draw`; the reduced-motion kill
 * is there too, so this component needs no JS branch of its own.
 */
export default function RootDraw({
  className,
  stroke = "#C9A15A",
  delay = 0,
}: {
  className?: string;
  stroke?: string;
  delay?: number;
}) {
  const ref = useReveal<SVGSVGElement>();

  return (
    <svg
      ref={ref}
      data-reveal=""
      viewBox="0 0 220 320"
      fill="none"
      className={cn("root-draw", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke={stroke} strokeWidth="1.1" strokeLinecap="round" opacity="0.9">
        {/* The loc — three strands twisting down to the soil line */}
        <path style={{ "--len": 340 } as React.CSSProperties}
          d="M110 8c-10 26 10 40 0 66s10 40 0 66" />
        <path style={{ "--len": 340 } as React.CSSProperties}
          d="M110 8c10 26-10 40 0 66s-10 40 0 66" />
        <path style={{ "--len": 200 } as React.CSSProperties}
          d="M110 22c-5 18 5 28 0 46s5 28 0 46" opacity="0.55" />

        {/* The soil line */}
        <line style={{ "--len": 180 } as React.CSSProperties}
          x1="20" y1="148" x2="200" y2="148" opacity="0.45" />

        {/* The root system — where the hair actually comes from */}
        <path style={{ "--len": 260 } as React.CSSProperties}
          d="M110 148c0 34-4 58-4 84" />
        <path style={{ "--len": 300 } as React.CSSProperties}
          d="M110 156c-16 20-34 30-46 56s-14 40-14 56" />
        <path style={{ "--len": 300 } as React.CSSProperties}
          d="M110 156c16 20 34 30 46 56s14 40 14 56" />
        <path style={{ "--len": 190 } as React.CSSProperties}
          d="M96 200c-14 12-22 30-24 52" opacity="0.7" />
        <path style={{ "--len": 190 } as React.CSSProperties}
          d="M124 200c14 12 22 30 24 52" opacity="0.7" />
        <path style={{ "--len": 130 } as React.CSSProperties}
          d="M106 232c-6 16-8 34-6 52" opacity="0.55" />
        <path style={{ "--len": 130 } as React.CSSProperties}
          d="M114 240c8 14 12 32 12 48" opacity="0.55" />

        {/* Three gold blossoms — the crown, above the line */}
        <circle style={{ "--len": 30 } as React.CSSProperties} cx="110" cy="8" r="3.5" fill={stroke} fillOpacity="0.3" />
        <circle style={{ "--len": 24 } as React.CSSProperties} cx="88" cy="52" r="2.4" fill={stroke} fillOpacity="0.25" />
        <circle style={{ "--len": 24 } as React.CSSProperties} cx="132" cy="96" r="2.4" fill={stroke} fillOpacity="0.25" />
      </g>
    </svg>
  );
}

/** A small botanical hairline for section breaks. Max two per section. */
export function Botanical({
  className,
  stroke = "#C9A15A",
  flip,
}: {
  className?: string;
  stroke?: string;
  flip?: boolean;
}) {
  const ref = useReveal<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      data-reveal=""
      viewBox="0 0 160 64"
      fill="none"
      className={cn("root-draw", flip && "-scale-x-100", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke={stroke} strokeWidth="1" strokeLinecap="round" opacity="0.8">
        <path style={{ "--len": 170 } as React.CSSProperties} d="M4 60C36 60 62 44 80 20" />
        <path style={{ "--len": 46 } as React.CSSProperties} d="M34 52c-2-9 2-16 10-19" />
        <path style={{ "--len": 46 } as React.CSSProperties} d="M52 43c-1-9 3-16 11-19" />
        <path style={{ "--len": 46 } as React.CSSProperties} d="M68 31c0-9 4-15 12-18" />
        <circle style={{ "--len": 24 } as React.CSSProperties} cx="82" cy="17" r="3.2" fill={stroke} fillOpacity="0.3" />
      </g>
    </svg>
  );
}
