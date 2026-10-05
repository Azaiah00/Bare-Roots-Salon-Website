/**
 * Viewport frames.
 *
 * Captures each route at 375 / 768 / 1024 / 1440 at several scroll depths.
 *
 * THIS IS NOT OPTIONAL and it is deliberately NOT a fullPage screenshot. A
 * fullPage capture renders a sticky element at its unscrolled position and a
 * reveal that never fired as a blank band, so it shows you a page nobody will
 * ever see. Frames at real scroll depths are the only way to check that text
 * over a photograph is actually legible.
 *
 *   npm run build && npm start
 *   node scripts/frames.mjs
 *
 * Output: .frames/<route>__<width>__<depth>.png
 */

import { chromium } from "playwright";
import { mkdirSync, rmSync } from "node:fs";

const BASE = process.env.AUDIT_BASE ?? "http://localhost:3000";
const EXECUTABLE = process.env.PW_EXECUTABLE || undefined;
const OUT = process.env.FRAMES_DIR ?? ".frames";

const ROUTES = process.env.FRAMES_ROUTES
  ? process.env.FRAMES_ROUTES.split(",")
  : [
      "/",
      "/services",
      "/recovery",
      "/work",
      "/house",
      "/academy",
      "/shop",
      "/shop/dope-root-oil",
      "/wraps",
      "/visit",
      "/faq",
      "/journal",
      "/book",
      "/portal",
      "/does-not-exist",
    ];

const WIDTHS = (process.env.FRAMES_WIDTHS ?? "375,768,1024,1440")
  .split(",")
  .map(Number);

/** Fractions of the scrollable height to capture. */
const DEPTHS = [0, 0.28, 0.55, 0.82, 1];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch(EXECUTABLE ? { executablePath: EXECUTABLE } : {});
let count = 0;

for (const width of WIDTHS) {
  const ctx = await browser.newContext({
    viewport: { width, height: width < 500 ? 812 : 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });

    for (const d of DEPTHS) {
      await page.evaluate((frac) => {
        const max = document.body.scrollHeight - window.innerHeight;
        window.scrollTo(0, Math.round(max * frac));
      }, d);
      // Reveals run for 820ms and lazy images only start loading once they are
      // near the viewport, so a short wait captures a half-faded page with
      // empty image boxes — which looks like a bug that is not there.
      await page.waitForTimeout(1000);
      await page.evaluate(async () => {
        const imgs = [...document.images].filter((i) => !i.complete);
        await Promise.all(
          imgs.map(
            (i) =>
              new Promise((res) => {
                i.addEventListener("load", res, { once: true });
                i.addEventListener("error", res, { once: true });
                setTimeout(res, 4000);
              }),
          ),
        );
      });
      await page.waitForTimeout(500);

      const name = `${route === "/" ? "home" : route.replace(/\//g, "_").replace(/^_/, "")}__${width}__${Math.round(d * 100)}.png`;
      await page.screenshot({ path: `${OUT}/${name}` });
      count++;
    }
  }

  await ctx.close();
}

await browser.close();
console.log(`\n${count} frames written to ${OUT}/\n`);
