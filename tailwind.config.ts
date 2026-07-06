import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#2E3F28",
        "forest-2": "#25321F",
        sage: "#93A052",
        mauve: "#806172",
        plum: "#372C41",
        "plum-2": "#2B2233",
        gold: "#C9A15A",
        gilt: "#E7CE9A",
        bronze: "#A67C33",
        paper: "#FBF8F1",
        cream: "#F5F0E6",
        ink: "#1C1518",
      },
      fontFamily: {
        // Bound to next/font CSS variables set in app/layout.tsx
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        // Signature brand gradients
        root: "linear-gradient(160deg, #2E3F28, #372C41)",
        wellness: "linear-gradient(180deg, #372C41, #2B2233)",
        bloom: "linear-gradient(135deg, #806172, #372C41)",
        "gold-cta":
          "linear-gradient(135deg, #A67C33, #C9A15A, #E7CE9A)",
      },
      maxWidth: {
        wrap: "1240px",
      },
      letterSpacing: {
        eyebrow: "0.32em",
      },
      keyframes: {
        cue: {
          "0%,100%": { opacity: "0.3", transform: "scaleY(0.6)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
        scrollx: {
          to: { transform: "translateX(-50%)" },
        },
        fade: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        cue: "cue 2s infinite",
        scrollx: "scrollx 26s linear infinite",
        fade: "fade 0.5s",
      },
    },
  },
  plugins: [],
};

export default config;
