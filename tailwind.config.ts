import type { Config } from "tailwindcss";

/**
 * Tokens only. Every value here is measured in DESIGN.md §1.
 * If you need a colour, size, radius, easing or duration that is not in this
 * file, add it to DESIGN.md first — with its contrast ratio — then add it here.
 * An arbitrary value in a className is a bug, not a shortcut.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Light grounds */
        paper: "#FBF8F1",
        cream: "#F5F0E6",

        /* The three dark grounds. There are exactly three. Do not invent a fourth. */
        forest: { DEFAULT: "#2E3F28", deep: "#25321F" },
        plum: { DEFAULT: "#372C41", deep: "#2B2233" },
        ink: { DEFAULT: "#1C1518", soft: "#5C5057", mid: "#6B6068" },

        /* Type on dark grounds */
        "cream-dim": "#C9BFB6",

        /* The accent, in three registers.
           gold  — DARK GROUNDS ONLY (2.27:1 on paper — it fails, badly)
           gilt  — highlight and hover on dark
           bronze      — large display type on light grounds only (3.57:1)
           bronze-ink  — small type on light grounds (4.83:1 on paper)
           bronze-deep — small type on a TINTED light panel, e.g. .marker,
                         where the panel's own wash eats bronze-ink's headroom */
        gold: "#C9A15A",
        gilt: "#E7CE9A",
        bronze: { DEFAULT: "#A67C33", ink: "#8D6727", deep: "#7E5B22" },

        /* The botanical note. Decoration only — 2.68:1 on paper as text. */
        sage: { DEFAULT: "#93A052", ink: "#636D34" },

        /* The feminine register. Wraps and the bloom ground, nowhere else. */
        mauve: { DEFAULT: "#806172", lift: "#C4A3B1" },

        /* Only for a genuine warning. Never decoration. */
        alert: "#B4533F",
      },
      fontFamily: {
        display: ["var(--font-serif)", "Iowan Old Style", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        /* Fluid display scale */
        d1: ["clamp(2.75rem, 7vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.015em" }],
        d2: ["clamp(2.125rem, 4.8vw, 3.75rem)", { lineHeight: "1.04", letterSpacing: "-0.01em" }],
        d3: ["clamp(1.625rem, 3vw, 2.5rem)", { lineHeight: "1.1" }],
        d4: ["clamp(1.25rem, 2vw, 1.625rem)", { lineHeight: "1.2" }],
        lead: ["clamp(1.0625rem, 1.3vw, 1.25rem)", { lineHeight: "1.62" }],
        base2: ["1rem", { lineHeight: "1.68" }],
        sm2: ["0.875rem", { lineHeight: "1.6" }],
        xs2: ["0.75rem", { lineHeight: "1.5" }],
      },
      letterSpacing: {
        eyebrow: "0.3em",
        wide2: "0.14em",
      },
      maxWidth: {
        shell: "1240px",
        prose2: "68ch",
        measure: "42rem",
      },
      spacing: {
        section: "clamp(4.5rem, 9vw, 8.5rem)",
        gutter: "clamp(1.25rem, 4vw, 2.5rem)",
      },
      borderRadius: {
        /* Typography is square. Only pills and panels curve. */
        xs2: "2px",
        panel: "10px",
        pill: "999px",
      },
      boxShadow: {
        lift: "0 18px 46px -22px rgba(28,21,24,0.42)",
        gold: "0 14px 34px -14px rgba(166,124,51,0.62)",
      },
      transitionTimingFunction: {
        /* ONE easing curve for the entire site. */
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        fast: "180ms",
        base: "360ms",
        slow: "820ms",
      },
      backgroundImage: {
        root: "linear-gradient(158deg, #2E3F28 0%, #372C41 100%)",
        wellness: "linear-gradient(180deg, #372C41 0%, #2B2233 100%)",
        bloom: "linear-gradient(135deg, #806172 0%, #372C41 100%)",
        "gold-cta": "linear-gradient(135deg, #A67C33 0%, #C9A15A 52%, #E7CE9A 100%)",
        "gold-rule": "linear-gradient(90deg, transparent, #C9A15A, transparent)",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translate3d(0,0,0)", opacity: "0" },
          "12%": { opacity: "0.9" },
          "88%": { opacity: "0.55" },
          "100%": { transform: "translate3d(var(--dx,14px),-120px,0)", opacity: "0" },
        },
        marquee: { to: { transform: "translateX(-50%)" } },
        cue: {
          "0%,100%": { opacity: "0.25", transform: "scaleY(0.55)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
      },
      animation: {
        drift: "drift var(--dur,11s) linear var(--delay,0s) infinite",
        marquee: "marquee 34s linear infinite",
        cue: "cue 2.4s ease-in-out infinite",
      },
      screens: {
        /* Landscape phones: short viewports need tighter dialog padding. */
        short: { raw: "(max-height: 620px)" },
      },
    },
  },
  plugins: [],
};

export default config;
