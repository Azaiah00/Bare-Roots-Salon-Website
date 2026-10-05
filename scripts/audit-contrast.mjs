/**
 * Contrast audit.
 *
 * Reads the hex values straight out of tailwind.config.ts and re-measures every
 * pairing DESIGN.md §1.1 claims. The point is that the table in DESIGN.md
 * cannot silently drift from what actually ships — if someone nudges a token,
 * this fails before a client ever sees it.
 *
 *   node scripts/audit-contrast.mjs
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(resolve(root, "tailwind.config.ts"), "utf8");

/** Pull every `name: "#RRGGBB"` out of the config, nested keys flattened. */
function readTokens(text) {
  const out = {};
  const re = /["']?([A-Za-z0-9_-]+)["']?\s*:\s*["'](#[0-9A-Fa-f]{6})["']/g;
  let m;
  while ((m = re.exec(text))) out[m[1]] = m[2];
  return out;
}

const T = readTokens(src);

// Nested tokens share a key name (`DEFAULT`, `deep`, `ink`…), so the ones the
// table needs are named explicitly here against their config position.
function grab(section, key) {
  const block = src.slice(src.indexOf(`${section}:`));
  const re = new RegExp(`["']?${key}["']?\\s*:\\s*["'](#[0-9A-Fa-f]{6})["']`);
  const m = block.match(re);
  return m ? m[1] : null;
}

const C = {
  paper: T.paper,
  cream: T.cream,
  forest: grab("forest", "DEFAULT"),
  "forest-deep": grab("forest", "deep"),
  plum: grab("plum", "DEFAULT"),
  "plum-deep": grab("plum", "deep"),
  ink: grab("ink", "DEFAULT"),
  "ink-soft": grab("ink", "soft"),
  "ink-mid": grab("ink", "mid"),
  "cream-dim": T["cream-dim"],
  gold: T.gold,
  gilt: T.gilt,
  bronze: grab("bronze", "DEFAULT"),
  "bronze-ink": grab("bronze", "ink"),
  sage: grab("sage", "DEFAULT"),
  mauve: grab("mauve", "DEFAULT"),
  "mauve-lift": grab("mauve", "lift"),
  alert: T.alert,
};

const lin = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const L = (hex) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [x, y] = [L(a), L(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

/** [foreground, background, minimum, what it is allowed to be used for] */
const PAIRS = [
  ["ink", "paper", 4.5, "body copy on the primary light ground"],
  ["ink", "cream", 4.5, "body copy on the secondary light ground"],
  ["ink-soft", "paper", 4.5, "secondary copy, leads, table cells"],
  ["ink-mid", "paper", 4.5, "disabled button label"],
  ["bronze-ink", "paper", 4.5, "eyebrows, small labels, links on light"],
  ["bronze-ink", "cream", 4.5, "the same, on the secondary light ground"],
  ["bronze", "paper", 3.0, "LARGE display type only — prices, numerals"],
  ["forest", "paper", 4.5, "display headings on light"],
  ["cream", "forest", 4.5, "body copy on the forest ground"],
  ["cream", "forest-deep", 4.5, "body copy on the deep forest ground"],
  ["cream", "plum", 4.5, "body copy on the plum ground"],
  ["cream", "plum-deep", 4.5, "body copy on the deep plum ground"],
  ["cream", "ink", 4.5, "body copy on the ink ground"],
  ["paper", "forest", 4.5, "display headings on dark"],
  ["paper", "ink", 4.5, "display headings on ink"],
  ["cream-dim", "forest", 4.5, "secondary copy on dark"],
  ["cream-dim", "plum", 4.5, "secondary copy on plum"],
  ["cream-dim", "ink", 4.5, "secondary copy on ink"],
  ["gold", "forest", 4.5, "eyebrows, accents and links on dark — DARK ONLY"],
  ["gold", "forest-deep", 4.5, "the same, on the deep forest ground"],
  ["gold", "plum", 4.5, "the same, on plum"],
  ["gold", "plum-deep", 4.5, "the same, on deep plum"],
  ["gold", "ink", 4.5, "the same, on ink"],
  ["gilt", "forest", 4.5, "hover and highlight on dark"],
  ["gilt", "plum", 4.5, "hover and highlight on plum"],
  ["gilt", "ink", 4.5, "hover and highlight on ink"],
  ["ink", "gold", 4.5, "the gold CTA's own label"],
  ["mauve-lift", "plum", 4.5, "copy on the bloom ground"],
  ["alert", "paper", 4.5, "deposit-outstanding warnings"],
];

/** Pairings that MUST fail — the reason the rules exist. Recorded so a future
 *  change that silently makes one 'pass' still gets noticed. */
const FORBIDDEN = [
  ["gold", "paper", "gold as text on a light ground"],
  ["sage", "paper", "sage as text on a light ground"],
  ["mauve", "plum", "mauve as text on the plum ground"],
  ["bronze", "forest", "bronze as text on a dark ground"],
];

let failures = 0;
console.log("\nBARE ROOTS — contrast audit\n" + "=".repeat(78));
console.log(
  `${"foreground".padEnd(13)}${"background".padEnd(13)}${"ratio".padStart(6)}  ${"min".padStart(4)}  verdict`,
);
console.log("-".repeat(78));

for (const [fg, bg, min, use] of PAIRS) {
  if (!C[fg] || !C[bg]) {
    console.log(`${fg.padEnd(13)}${bg.padEnd(13)}${"—".padStart(6)}        TOKEN MISSING`);
    failures++;
    continue;
  }
  const r = ratio(C[fg], C[bg]);
  const ok = r >= min;
  if (!ok) failures++;
  console.log(
    `${fg.padEnd(13)}${bg.padEnd(13)}${r.toFixed(2).padStart(6)}  ${String(min).padStart(4)}  ${
      ok ? "pass" : "FAIL"
    }  ${use}`,
  );
}

console.log("\nPairings that must stay illegal:");
for (const [fg, bg, why] of FORBIDDEN) {
  const r = ratio(C[fg], C[bg]);
  const stillFails = r < 4.5;
  if (!stillFails) {
    console.log(`  UNEXPECTED: ${why} now measures ${r.toFixed(2)} — update DESIGN.md §1.2`);
    failures++;
  } else {
    console.log(`  ok — ${why} measures ${r.toFixed(2)}, still banned`);
  }
}

console.log("=".repeat(78));
if (failures > 0) {
  console.error(`\n${failures} contrast problem(s). Fix the token or fix the rule.\n`);
  process.exit(1);
}
console.log("\nAll measured pairings pass.\n");
