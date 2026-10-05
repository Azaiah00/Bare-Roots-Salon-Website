# BARE ROOTS

### Natural · Luxury · Culture — Henrico / Richmond, VA

A Next.js 14 site and booking portal for Bare Roots, the merger of Iisha's
holistic hair-recovery practice and Sabrina Sutton's loc artistry.
Built by Couture House Co.

---

## Run it

```bash
npm install          # no new dependencies were added — the lockfile is unchanged
npm run dev          # http://localhost:3000
```

If `npm install` hangs, you are in a OneDrive-synced folder. Clone to `C:\dev\`.

## Read these first

| File | What it is |
|---|---|
| `DESIGN.md` | The design contract. Tokens, measured contrast, motion, components. **Read before touching styling.** |
| `RESEARCH-DOSSIER.md` | Where every fact on the site came from. **Read before touching copy.** |
| `ASSETS-OWED.md` | What the client still has to supply. Start here on the call. |
| `CLAUDE.md` | Repo guide for whoever picks this up next, human or otherwise. |

---

## What is in the build

**40 static routes.** Home, services, hair recovery, work, the house, academy,
shop + 12 product pages, custom wraps, visit, FAQ, policies, journal + 3 posts,
the booker, the bag, checkout, and a four-role portal.

**The booker** — five steps, the price and time in the chair visible at every
one, per-artist availability that refuses to offer a slot the service cannot
finish inside, and every time slot states when you are *out* of the chair.

**The portal** — a client side with the photo progress journey, a stylist side
showing only her own chair, and an owner side showing both books, revenue by
chair and deposits outstanding. Role separation is enforced in the data layer.

**The shop** — Inflúance shoppable with a real cart and a demo checkout;
DOPE HAIR presented as a waitlist because the line does not ship yet.

**Everything runs on demo data.** No backend, no payment processor, no card
field anywhere. `lib/db.ts` is the seam — going live is a change to that file,
not to the interface.

---

## Where it stands

| | |
|---|---|
| Production build | compiles clean, 40 static routes |
| First-load JS | 113 KB home, 119 KB heaviest route |
| Photography | 1.5 MB total — down from 31.2 MB of PNG |
| Accessibility | **0 problems** across 24 routes × 4 viewports |
| Flow assertions | **73 passed, 0 failed** |
| Motion libraries | none |

---

## Before showing it to the client

Read `ASSETS-OWED.md`. Three things are genuinely blocking:

1. **Two product renders carry other brands' names** (LUXE LOCKS, NOURÉVA) and
   are withheld from the build.
2. **The three reviews are placeholders** and are flagged as such on the page.
   They must be replaced with real ones before publication.
3. **The deposit amount is a guess** and appears in three places.

---

## Auditing

```bash
npm run build && npm start     # one shell
npm run audit                  # another: lint + contrast + a11y + flow
npm run frames                 # then LOOK at .frames/
```

The audits need Playwright, which is not a dependency:

```bash
npm i -D playwright && npx playwright install chromium
```

`npm run frames` is not optional. The two worst bugs in this build were
invisible to every other check and obvious in a screenshot.

---

## Files you can delete

The rebuild was delivered over the top of the existing folder, so a few things
from the first single-page build are still sitting there. None of them is
referenced and all are safe to remove:

- **`public/assets/`** — 31 MB of the original PNGs. Every image now lives in
  `public/img/` as WebP. Deleting this folder removes 31 MB from every deploy.
- **`assets/`** (repo root) — the same images again, for the old standalone
  `index.html`.
- **`components/*.tsx` at the top level** — `Nav.tsx`, `Hero.tsx`, `Footer.tsx`
  and sixteen others. Each has been emptied to a one-line deprecation note so
  the build stays green; their replacements are in `components/chrome/`,
  `components/home/`, `components/brand/`, `components/ui/`, `components/cart/`
  and `components/work/`.
- **`index.html`, `download-assets.ps1`, `download-assets.sh`** — the original
  single-file demo and its asset downloader.
- **`BARE-ROOTS-Build-Prompts.md`** — superseded by this build.

Keep `BARE-ROOTS-Brand-Identity.md` and `Couture-House-Services.html`.

---

## Deploying

Netlify, `@netlify/plugin-nextjs`, Node 20, no publish directory set — the
plugin decides. Security headers, immutable asset caching and `X-Robots-Tag`
on the private routes are all in `netlify.toml`.

Set `SITE.url` in `lib/site.ts` to the real domain before the first deploy. It
feeds every canonical, the sitemap, robots and all the structured data.

---

*Bare Roots © 2026 · Site by Couture House Co.*
