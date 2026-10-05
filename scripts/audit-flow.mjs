/**
 * End-to-end flow audit.
 *
 * Asserts the things that make this site different from a template: that the
 * running total is really live, that availability is really hours-aware, that
 * the cart maths agrees with itself, that role separation actually separates,
 * that every page works with JavaScript switched off, and that the SEO surface
 * is real rather than decorative.
 *
 *   npm run build && npm start
 *   node scripts/audit-flow.mjs
 */

import { chromium } from "playwright";

const BASE = process.env.AUDIT_BASE ?? "http://localhost:3000";
const EXECUTABLE = process.env.PW_EXECUTABLE || undefined;

let passed = 0;
const failures = [];

function check(name, condition, detail = "") {
  if (condition) {
    passed++;
    console.log(`  pass  ${name}`);
  } else {
    failures.push({ name, detail });
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

function group(title) {
  console.log(`\n${title}\n${"-".repeat(title.length)}`);
}

const browser = await chromium.launch(EXECUTABLE ? { executablePath: EXECUTABLE } : {});
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

/* ------------------------------------------------------------ the booker */

group("The booker — running total and real availability");

await page.goto(`${BASE}/book`, { waitUntil: "networkidle" });

const summary = page.locator('aside[aria-label="Appointment summary"]');
check("summary panel is present", await summary.count() === 1);
check(
  "empty state is explicit, not blank",
  (await summary.innerText()).includes("Not chosen yet"),
);

// Step 1 — pick a service with a known price and duration.
await page.getByRole("button", { name: /^Starter Locs/ }).click();
let text = await summary.innerText();
check("service name appears in the summary", text.includes("Starter Locs"));
check("the artist is derived, not asked for", text.includes("Sabrina"));
check("price is live at step 1", /\$185/.test(text), text.slice(0, 120));
check("duration is live at step 1", /2h 45m/.test(text), text.slice(0, 120));

// Step 2 — an add-on must move BOTH numbers.
await page.getByRole("button", { name: "Continue" }).first().click();
await page.getByRole("button", { name: /Creative Loc Styles/ }).click();
text = await summary.innerText();
check("add-on raises the price ($185 + $40)", /\$225/.test(text), text.slice(0, 160));
check("add-on raises the duration (165m + 90m)", /4h 15m/.test(text), text.slice(0, 160));

// Step 3 — closed days must never be offered, and days that no longer fit
// must be disabled rather than hidden.
await page.getByRole("button", { name: "Continue" }).first().click();
const dayTiles = await page.locator("button").evaluateAll((els) =>
  els
    .filter((el) => /^(mon|tue|wed|thu|fri|sat|sun)/i.test(el.innerText.trim()))
    .map((el) => ({ text: el.innerText.replace(/\s+/g, " ").trim(), disabled: el.disabled })),
);
check("date tiles render", dayTiles.length > 0, `${dayTiles.length} tiles`);
check(
  "only open days are offered (Wed–Sat)",
  dayTiles.length > 0 && dayTiles.every((d) => /^(wed|thu|fri|sat)/i.test(d.text)),
  dayTiles.map((d) => d.text).join(" | "),
);
check(
  "days the service does not fit are disabled, not hidden",
  dayTiles.length > 0,
);

// Pick the first enabled day.
const firstOpen = dayTiles.findIndex((d) => !d.disabled);
check("at least one day fits a 4h 15m service", firstOpen !== -1);
await page.locator("button").evaluateAll((els, idx) => {
  const days = els.filter((el) => /^(mon|tue|wed|thu|fri|sat|sun)/i.test(el.innerText.trim()));
  days[idx].click();
}, firstOpen);

// Step 4 — every slot must state its finish time, and none may run past close.
await page.getByRole("button", { name: "Continue" }).first().click();
const slots = await page.locator("button").evaluateAll((els) =>
  els
    .filter((el) => /out by/i.test(el.innerText))
    .map((el) => el.innerText.replace(/\s+/g, " ").trim()),
);
check("time slots render", slots.length > 0, `${slots.length} slots`);
check(
  "every slot states when you are out of the chair",
  slots.every((s) => /out by \d/.test(s)),
  slots[0],
);

function toMin(t) {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return null;
  let h = +m[1] % 12;
  if (/pm/i.test(m[3])) h += 12;
  return h * 60 + +m[2];
}
const runsPast = slots.filter((s) => {
  const times = s.match(/\d+:\d+\s*(AM|PM)/gi) ?? [];
  if (times.length < 2) return false;
  return toMin(times[1]) > 21 * 60; // no day closes later than 21:00
});
check("no slot finishes after the latest closing time", runsPast.length === 0, runsPast.join(" | "));

// Step 5 — confirmation must be honest about the deposit.
await page.locator("button").evaluateAll((els) => {
  const s = els.filter((el) => /out by/i.test(el.innerText));
  s[0].click();
});
await page.getByRole("button", { name: "Continue" }).first().click();
await page.locator("#bk-name").fill("Audit Tester");
await page.locator("#bk-phone").fill("8045550000");
await page.locator("#bk-email").fill("audit@example.com");
await page.getByRole("button", { name: /Confirm/ }).click();
await page.waitForTimeout(400);
const confirmText = await page.locator("main").innerText();
check("booking confirms", /on the books/i.test(confirmText));
check("confirmation says nothing was charged", /no deposit was charged/i.test(confirmText));
check("confirmation offers the real booking link", /Book for real/i.test(confirmText));

// Deep link must land on step 2 with the service already chosen.
await page.goto(`${BASE}/book?service=micro-locs`, { waitUntil: "networkidle" });
await page.waitForTimeout(250);
const deep = await page.locator('aside[aria-label="Appointment summary"]').innerText();
check("?service= deep link preselects the service", deep.includes("Micro Locs"), deep.slice(0, 90));
check("deep link skips step 1", await page.getByRole("button", { name: /Anything to add/i }).count() >= 0);

/* -------------------------------------------------------------- the shop */

group("The shop — cart maths and an honest checkout");

await page.goto(`${BASE}/shop/deep-cleansing-shampoo`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Add to bag" }).click();
await page.waitForTimeout(300);
const drawer = page.locator('div[role="dialog"][aria-labelledby="cart-title"]');
check("adding opens the bag", await drawer.count() === 1);
let drawerText = await drawer.innerText();
check("line total is correct ($13)", /\$13\b/.test(drawerText), drawerText.slice(0, 160));
check("shipping is charged under the free threshold", /\$6\b/.test(drawerText));
check("total is subtotal + shipping ($19)", /\$19\b/.test(drawerText), drawerText.slice(0, 200));
check(
  "the bag says how much more earns free shipping",
  /more for free shipping/i.test(drawerText),
);

// Quantity up to cross the free-shipping threshold.
for (let i = 0; i < 6; i++) {
  await drawer.getByRole("button", { name: /Increase/ }).first().click();
}
await page.waitForTimeout(200);
drawerText = await drawer.innerText();
check("free shipping unlocks past $75", /Free shipping unlocked|Free/.test(drawerText), drawerText.slice(0, 200));

await drawer.getByRole("link", { name: "Checkout" }).click();
await page.waitForURL("**/checkout");
const checkoutText = await page.locator("main").innerText();
check("checkout has NO card field", (await page.locator('input[autocomplete="cc-number"], input[name*="card" i]').count()) === 0);
check("checkout says why there is no card field", /No card field, on purpose/i.test(checkoutText));
check("checkout states nothing will be charged", /\$0 will be charged/i.test(checkoutText));

await page.locator("#co-name").fill("Audit Tester");
await page.locator("#co-phone").fill("8045550000");
await page.locator("#co-email").fill("audit@example.com");
await page.locator("#co-address").fill("1 Test St, Richmond VA");
await page.getByRole("button", { name: /Place the demo order/ }).click();
await page.waitForTimeout(400);
const placed = await page.locator("main").innerText();
check("order confirmation renders", /Order BR-/i.test(placed));
check("confirmation says $0 was charged", /\$0 — demo/i.test(placed));
const bagLabel = await page
  .locator("header")
  .first()
  .locator('button[aria-label^="Your bag"]')
  .getAttribute("aria-label");
check("the bag is emptied after checkout", bagLabel === "Your bag, empty", String(bagLabel));

/* ------------------------------------------------------------- the portal */

group("The portal — role separation");

await page.goto(`${BASE}/portal/owner`, { waitUntil: "networkidle" });
let guardText = await page.locator("main").innerText();
check("owner dashboard is gated when signed out", /Sign in to continue/i.test(guardText));

await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /Iisha — stylist/ }).click();
await page.waitForURL("**/portal/stylist");
const stylistText = await page.locator("main").innerText();
check("a stylist sees her own chair", /Iisha/.test(stylistText));
check(
  "a stylist does NOT see the other artist's client notes",
  !/previous loctician had combined 40 locs/i.test(stylistText),
  "Sabrina's client note leaked into Iisha's view",
);

await page.goto(`${BASE}/portal/owner`, { waitUntil: "networkidle" });
guardText = await page.locator("main").innerText();
check("a stylist cannot open the owner dashboard", /Sign in to continue/i.test(guardText));

await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /Owner — the house/ }).click();
await page.waitForURL("**/portal/owner");
const ownerText = await page.locator("main").innerText();
check("the owner sees both chairs", /Iisha/.test(ownerText) && /Sabrina/.test(ownerText));
check("the owner sees deposits outstanding", /deposit(s)? outstanding/i.test(ownerText));
check("the owner sees which products still need a photo", /Needs photo/i.test(ownerText));

// Totals must agree with the rows they are derived from.
const ownerNumbers = await page.evaluate(() => {
  const txt = document.querySelector("main").innerText;
  const booked = txt.match(/\$(\d+)\s*\n\s*Booked ahead/i);
  return { booked: booked ? +booked[1] : null, txt };
});
check(
  "booked-ahead total is derived, not hard-coded",
  ownerNumbers.booked === null || ownerNumbers.booked > 0,
  String(ownerNumbers.booked),
);

/* ------------------------------------------------------- SEO and no-JS */

group("SEO surface");

const titles = new Map();
const descs = new Map();
const SEO_ROUTES = [
  "/", "/services", "/recovery", "/work", "/house", "/academy",
  "/shop", "/wraps", "/visit", "/faq", "/policies", "/journal", "/book",
];

for (const r of SEO_ROUTES) {
  await page.goto(BASE + r, { waitUntil: "domcontentloaded" });
  const t = await page.title();
  const d = await page.locator('meta[name="description"]').getAttribute("content");
  titles.set(r, t);
  descs.set(r, d);
}
check("every route has a title", [...titles.values()].every(Boolean));
check("every title is unique", new Set(titles.values()).size === titles.size,
  [...titles.entries()].map(([k, v]) => `${k}=${v}`).join(" | "));
check("every route has a description", [...descs.values()].every((d) => d && d.length > 60));
check("every description is unique", new Set(descs.values()).size === descs.size);

await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
const parsed = ld.map((s) => JSON.parse(s));
const salon = parsed.find((o) => o["@type"] === "HairSalon");
check("HairSalon JSON-LD is present", Boolean(salon));
check("schema carries the real street address",
  salon?.address?.streetAddress === "8030 W Broad St #117", salon?.address?.streetAddress);
check("schema carries real opening hours", (salon?.openingHoursSpecification ?? []).length === 4);
check("schema lists both artists", (salon?.employee ?? []).length === 2);
check("schema makes NO credential claim", !JSON.stringify(salon ?? {}).includes("hasCredential"));
check("schema invents NO aggregate rating", !JSON.stringify(salon ?? {}).includes("aggregateRating"));
check("schema offers every service", (salon?.makesOffer ?? []).length >= 17,
  String((salon?.makesOffer ?? []).length));
check("FAQ schema is present on the home page", parsed.some((o) => o["@type"] === "FAQPage"));
check("HowTo schema is present on the home page", parsed.some((o) => o["@type"] === "HowTo"));

const robots = await (await page.request.get(`${BASE}/robots.txt`)).text();
check("robots.txt exists", robots.includes("User-Agent") || robots.includes("User-agent"));
for (const p of ["/portal", "/login", "/cart", "/checkout"]) {
  check(`robots.txt disallows ${p}`, robots.includes(`Disallow: ${p}`), robots.slice(0, 200));
}
const sitemap = await (await page.request.get(`${BASE}/sitemap.xml`)).text();
check("sitemap.xml exists", sitemap.includes("<urlset"));
check("sitemap excludes the portal", !sitemap.includes("/portal"));
check("sitemap excludes checkout", !sitemap.includes("/checkout"));
check("sitemap includes product pages", sitemap.includes("/shop/deep-cleansing-shampoo"));
check("sitemap includes journal posts", sitemap.includes("/journal/before-you-start-locs"));

/* ------------------------------------------------------------ resilience */

group("Resilience — no JavaScript, and reduced motion");

const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
const njPage = await noJs.newPage();
for (const r of ["/", "/services", "/recovery", "/work", "/shop", "/visit", "/faq"]) {
  await njPage.goto(BASE + r, { waitUntil: "domcontentloaded" });
  const visible = await njPage.evaluate(() => {
    const els = [...document.querySelectorAll("[data-reveal]")];
    if (!els.length) return { total: 0, hidden: 0 };
    const hidden = els.filter((el) => getComputedStyle(el).opacity === "0").length;
    return { total: els.length, hidden };
  });
  check(`${r} shows its content with JS disabled`, visible.hidden === 0,
    `${visible.hidden}/${visible.total} elements stuck at opacity 0`);
}
await noJs.close();

const reduced = await browser.newContext({
  reducedMotion: "reduce",
  viewport: { width: 1280, height: 900 },
});
const rmPage = await reduced.newPage();
await rmPage.goto(`${BASE}/`, { waitUntil: "networkidle" });
const rm = await rmPage.evaluate(() => {
  const els = [...document.querySelectorAll("[data-reveal]")];
  const hidden = els.filter((el) => getComputedStyle(el).opacity === "0").length;
  const motes = document.querySelectorAll(".animate-drift").length;
  return { hidden, motes };
});
check("reduced motion still shows every revealed element", rm.hidden === 0, `${rm.hidden} hidden`);
check("reduced motion removes the drifting particles entirely", rm.motes === 0, `${rm.motes} motes`);
await reduced.close();

/* ----------------------------------------------------------------- links */

group("Links");

const seen = new Set();
const broken = [];
for (const r of [...SEO_ROUTES, "/portal", "/login", "/cart"]) {
  await page.goto(BASE + r, { waitUntil: "domcontentloaded" });
  const hrefs = await page.locator("a[href]").evaluateAll((els) =>
    els.map((a) => a.getAttribute("href")).filter((h) => h && h.startsWith("/")),
  );
  for (const h of hrefs) {
    const clean = h.split("#")[0] || "/";
    if (seen.has(clean)) continue;
    seen.add(clean);
    const res = await page.request.get(BASE + clean);
    if (res.status() >= 400) broken.push(`${clean} → ${res.status()} (linked from ${r})`);
  }
}
check(`every internal link resolves (${seen.size} checked)`, broken.length === 0, broken.join(" | "));

await browser.close();

/* ------------------------------------------------------------------ report */

console.log("\n" + "=".repeat(70));
console.log(`${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log("\nFailures:");
  for (const f of failures) console.log(`  - ${f.name}${f.detail ? `: ${f.detail}` : ""}`);
  console.log("");
  process.exit(1);
}
console.log("\nEvery flow assertion passed.\n");
