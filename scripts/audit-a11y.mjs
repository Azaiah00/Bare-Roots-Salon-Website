/**
 * Accessibility and rendering audit.
 *
 * Runs against the RENDERED DOM of a real build at four viewports, because a
 * static analysis of the source cannot see what colour a thing was actually
 * painted on, and a fullPage screenshot cannot tell you a button is 38px tall.
 *
 *   npm run build && npm start        (in one shell)
 *   node scripts/audit-a11y.mjs       (in another)
 *
 * Checks: computed contrast against the real painted background, alt text,
 * heading order, tap-target size, horizontal overflow, landmarks, duplicate
 * ids, shipped placeholder copy, emoji in rendered text, and empty links.
 */

import { chromium } from "playwright";

const BASE = process.env.AUDIT_BASE ?? "http://localhost:3000";

const ROUTES = [
  "/",
  "/services",
  "/recovery",
  "/work",
  "/house",
  "/academy",
  "/shop",
  "/shop/deep-cleansing-shampoo",
  "/shop/dope-root-oil",
  "/wraps",
  "/visit",
  "/faq",
  "/policies",
  "/journal",
  "/journal/before-you-start-locs",
  "/book",
  "/cart",
  "/checkout",
  "/login",
  "/portal",
  "/portal/client",
  "/portal/owner",
  "/portal/stylist",
  "/does-not-exist",
];

const VIEWPORTS = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 900 },
];

/**
 * Copy that must never ship.
 *
 * The machine artefacts are matched case-sensitively and on word boundaries —
 * a naive `includes("NaN")` fires on the word "maintenance", which is how an
 * audit teaches people to ignore it.
 */
const PLACEHOLDERS = [/lorem ipsum/i, /dolor sit amet/i, /\bTODO:/, /\bFIXME\b/];
const ARTEFACTS = [/\bNaN\b/, /\bundefined\b/, /\[object Object\]/];

const EMOJI =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F000}-\u{1F0FF}\u{1F100}-\u{1F1FF}]/u;

const problems = [];
const overImage = [];
const add = (route, vp, kind, detail) =>
  problems.push({ route, vp, kind, detail });

const IN_PAGE = `(() => {
  const lin = (c) => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const parse = (s) => {
    const m = s && s.match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(/[,\\s/]+/).filter(Boolean).map(Number);
    return { rgb: [p[0], p[1], p[2]], a: p.length > 3 ? p[3] : 1 };
  };
  const over = (fg, bg, a) => fg.map((c, i) => c * a + bg[i] * (1 - a));

  /**
   * Resolving the real painted background is the whole difficulty of measuring
   * contrast on a rendered page, and getting it wrong in either direction makes
   * the audit worthless.
   *
   *  - An opaque background-color on an ancestor is the answer.
   *  - A gradient has no single colour, so every stop is extracted and the
   *    WORST one for this text is used.
   *  - Text sitting over a photograph cannot be measured this way at all. Those
   *    are collected separately as "over-image" and reported for a human to
   *    look at rather than silently passed or silently failed.
   */
  const HEX = /#([0-9a-f]{3,8})\b/gi;
  const RGB = /rgba?\(([^)]+)\)/gi;

  function stopsFrom(bgImage) {
    const stops = [];
    let m;
    HEX.lastIndex = 0;
    while ((m = HEX.exec(bgImage))) {
      let h = m[1];
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      if (h.length >= 6) {
        stops.push([0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)));
      }
    }
    RGB.lastIndex = 0;
    while ((m = RGB.exec(bgImage))) {
      const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
      if (p.length >= 3 && (p.length < 4 || p[3] > 0.55)) stops.push([p[0], p[1], p[2]]);
    }
    return stops;
  }

  /** next/image fill mode renders an absolutely-positioned <img>. Text above one
   *  of those cannot be measured from the DOM at all. */
  function hasFillImage(node) {
    const cs = getComputedStyle(node);
    if (cs.position === "static") return false;   // not a containing block
    for (const img of node.querySelectorAll("img")) {
      const ip = getComputedStyle(img).position;
      if (ip !== "absolute" && ip !== "fixed") continue;
      const a = node.getBoundingClientRect();
      const b = img.getBoundingClientRect();
      // Does it actually sit behind this box?
      if (b.width >= a.width * 0.8 && b.height >= a.height * 0.8) return true;
    }
    return false;
  }

  function resolveBg(el) {
    const layers = [];   // semi-transparent colours, innermost first
    let base = null;
    let node = el;

    while (node && node !== document.documentElement) {
      if (hasFillImage(node)) return { kind: "image", stops: [] };

      const cs = getComputedStyle(node);
      const bi = cs.backgroundImage;
      if (bi && bi !== "none") {
        if (bi.includes("url(")) return { kind: "image", stops: [] };
        const stops = stopsFrom(bi);
        if (stops.length) { base = stops; break; }
      }

      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) {
        if (c.a === 1) { base = [c.rgb]; break; }
        layers.push({ rgb: c.rgb, a: c.a });
      }
      node = node.parentElement;
    }

    if (!base) {
      const html = parse(getComputedStyle(document.documentElement).backgroundColor);
      base = [html && html.a === 1 ? html.rgb : [255, 255, 255]];
    }

    // A light base found while sitting inside a dark ground means the walk
    // passed through a photograph or a scrim it could not see. Do not guess.
    const ground = el.closest("[data-ground]");
    if (ground?.getAttribute("data-ground") === "dark" && !layers.length) {
      const lum = L(base[0]);
      if (lum > 0.4) return { kind: "image", stops: [] };
    }

    // Composite the semi-transparent layers, outermost first.
    const stops = base.map((stop) =>
      layers.reduceRight((acc, l) => over(l.rgb, acc, l.a), stop),
    );
    return { kind: "solid", stops };
  }

  const out = {
    contrast: [], overImage: [], alts: [], headings: [], targets: [], emptyLinks: [],
    dupIds: [], text: "", landmarks: {}, h1s: 0,
  };

  // Text contrast on visible text nodes
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  let n;
  while ((n = walker.nextNode())) {
    const t = n.textContent.trim();
    if (!t || t.length < 2) continue;
    const el = n.parentElement;
    if (!el || seen.has(el)) continue;
    seen.add(el);
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || cs.opacity === "0") continue;
    if (el.closest('[aria-hidden="true"], .sr-only, [hidden]')) continue;
    const fgp = parse(cs.color);
    if (!fgp) continue;

    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const min = large ? 3 : 4.5;

    const bg = resolveBg(el);

    if (bg.kind === "image") {
      out.overImage.push({ text: t.slice(0, 48), color: cs.color, size, tag: el.tagName.toLowerCase() });
      continue;
    }

    // Worst stop wins.
    let worst = Infinity;
    let worstBg = null;
    for (const stop of bg.stops) {
      const fg = fgp.a < 1 ? over(fgp.rgb, stop, fgp.a) : fgp.rgb;
      const lf = L(fg), lb = L(stop);
      const r2 = (Math.max(lf, lb) + 0.05) / (Math.min(lf, lb) + 0.05);
      if (r2 < worst) { worst = r2; worstBg = stop; }
    }
    if (worst < min - 0.02) {
      out.contrast.push({
        text: t.slice(0, 48), ratio: +worst.toFixed(2), min,
        color: cs.color, bg: worstBg ? "rgb(" + worstBg.map(Math.round).join(",") + ")" : "?",
        size, weight, tag: el.tagName.toLowerCase(), kind: bg.kind,
      });
    }
  }

  // Images
  for (const img of document.querySelectorAll("img")) {
    if (img.getAttribute("alt") === null) {
      out.alts.push(img.currentSrc || img.src || "(no src)");
    }
  }

  // Heading order + h1 count
  const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(
    (h) => !h.closest('[aria-hidden="true"]')
  );
  out.h1s = hs.filter((h) => h.tagName === "H1").length;
  let prev = 0;
  for (const h of hs) {
    const lvl = +h.tagName[1];
    if (prev && lvl > prev + 1) {
      out.headings.push({ from: prev, to: lvl, text: h.textContent.trim().slice(0, 42) });
    }
    prev = lvl;
  }

  // Tap targets
  for (const el of document.querySelectorAll('a[href], button, input:not([type="hidden"]), select, textarea, [role="button"]')) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    if (el.closest(".sr-only") || el.classList.contains("sr-only")) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    // Inline links inside a paragraph are exempt — they flow with the text.
    const inProse = el.tagName === "A" && ["P", "LI", "SPAN", "DD"].includes(el.parentElement?.tagName);
    if (inProse) continue;
    if (r.height < 43.5 || r.width < 43.5) {
      out.targets.push({
        tag: el.tagName.toLowerCase(),
        label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 36),
        w: +r.width.toFixed(1), h: +r.height.toFixed(1),
      });
    }
  }

  // Links with no accessible name
  for (const a of document.querySelectorAll("a[href]")) {
    const name = (a.getAttribute("aria-label") || a.textContent || "").trim();
    const hasImg = a.querySelector("img[alt]:not([alt=''])") || a.querySelector("svg[aria-label]");
    if (!name && !hasImg) out.emptyLinks.push(a.getAttribute("href"));
  }

  // Duplicate ids
  const ids = {};
  for (const el of document.querySelectorAll("[id]")) {
    ids[el.id] = (ids[el.id] || 0) + 1;
  }
  out.dupIds = Object.entries(ids).filter(([, c]) => c > 1).map(([id]) => id);

  out.landmarks = {
    main: document.querySelectorAll("main").length,
    header: document.querySelectorAll("header").length,
    footer: document.querySelectorAll("footer").length,
    nav: document.querySelectorAll("nav").length,
  };

  out.text = document.body.innerText;
  out.overflow = document.documentElement.scrollWidth > window.innerWidth + 1
    ? { scrollWidth: document.documentElement.scrollWidth, inner: window.innerWidth }
    : null;

  return out;
})()`;

/**
 * The container ships a pinned Chromium; PW_EXECUTABLE lets CI point at it.
 * Locally, Playwright's own download is used.
 */
const EXECUTABLE = process.env.PW_EXECUTABLE || undefined;
const browser = await chromium.launch(EXECUTABLE ? { executablePath: EXECUTABLE } : {});

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
    const status = res?.status() ?? 0;
    if (route !== "/does-not-exist" && status >= 400) {
      add(route, vp.name, "http", `status ${status}`);
      continue;
    }
    // Let reveals settle so nothing is measured at opacity 0.
    await page.evaluate(() =>
      document.querySelectorAll("[data-reveal]").forEach((el) => el.setAttribute("data-reveal", "in")),
    );
    await page.waitForTimeout(120);

    const r = await page.evaluate(IN_PAGE);

    for (const c of r.contrast) {
      add(route, vp.name, "contrast", `${c.ratio}:1 (needs ${c.min}) — <${c.tag}> ${c.size}px/${c.weight} ${c.color} on ${c.bg} [${c.kind}] "${c.text}"`);
    }
    // Reported, never failed: a human has to look at text over a photograph.
    if (r.overImage.length) {
      overImage.push({ route, vp: vp.name, count: r.overImage.length, sample: r.overImage.slice(0, 3) });
    }
    for (const a of r.alts) add(route, vp.name, "alt", `img with no alt attribute: ${a}`);
    for (const h of r.headings) add(route, vp.name, "heading", `h${h.from} → h${h.to} "${h.text}"`);
    for (const t of r.targets) add(route, vp.name, "target", `<${t.tag}> ${t.w}×${t.h} "${t.label}"`);
    for (const l of r.emptyLinks) add(route, vp.name, "link", `link with no accessible name → ${l}`);
    for (const id of r.dupIds) add(route, vp.name, "dupe-id", `duplicate id "${id}"`);

    if (r.h1s !== 1) add(route, vp.name, "h1", `${r.h1s} <h1> elements (expected exactly 1)`);
    if (r.landmarks.main !== 1) add(route, vp.name, "landmark", `${r.landmarks.main} <main>`);
    if (r.overflow) add(route, vp.name, "overflow", `page scrolls sideways: ${r.overflow.scrollWidth}px in ${r.overflow.inner}px`);

    for (const re of [...PLACEHOLDERS, ...ARTEFACTS]) {
      const m = r.text.match(re);
      if (m) add(route, vp.name, "placeholder", `rendered text contains "${m[0]}"`);
    }
    if (EMOJI.test(r.text)) {
      const m = r.text.match(EMOJI);
      add(route, vp.name, "emoji", `emoji in rendered text: ${m?.[0]}`);
    }
  }

  await ctx.close();
}

await browser.close();

/* ------------------------------------------------------------------ report */

console.log(`\nBARE ROOTS — accessibility audit (${ROUTES.length} routes × ${VIEWPORTS.length} viewports)\n` + "=".repeat(78));

const imageTotal = overImage.reduce((n, o) => n + o.count, 0);
if (imageTotal) {
  console.log(
    `\nNOTE — ${imageTotal} text nodes sit over a photograph or an image-backed ground.` +
    `\nContrast there cannot be computed from the DOM; they are scrimmed by design and` +
    `\nmust be checked by eye in the frames from \`npm run frames\`.\n`,
  );
}

if (problems.length === 0) {
  console.log("No problems found.\n");
  process.exit(0);
}

// Collapse identical findings that repeat across viewports.
const grouped = new Map();
for (const p of problems) {
  const key = `${p.route}|${p.kind}|${p.detail}`;
  if (!grouped.has(key)) grouped.set(key, { ...p, vps: [] });
  grouped.get(key).vps.push(p.vp);
}

const byKind = {};
for (const g of grouped.values()) (byKind[g.kind] ||= []).push(g);

for (const [kind, list] of Object.entries(byKind).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n${kind.toUpperCase()} — ${list.length}`);
  for (const g of list.slice(0, 25)) {
    console.log(`  ${g.route.padEnd(34)} [${g.vps.join(",")}]  ${g.detail}`);
  }
  if (list.length > 25) console.log(`  … and ${list.length - 25} more`);
}

console.log("\n" + "=".repeat(78));
console.log(`${grouped.size} distinct problem(s).\n`);
process.exit(1);
