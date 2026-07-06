# Bare Roots Salon Website
### Natural · Luxury · Culture — Richmond, VA
Repo: https://github.com/Azaiah00/Bare-Roots-Salon-Website

The luxury natural-hair & wellness salon site for **Bare Roots** — the merger of Iisha's hair-recovery practice and Sabrina's loc artistry (8030 W Broad St #117, Henrico, VA).

---

## ⚠️ STEP 1 — Download the images FIRST (do this before anything else)

The site references images in `assets/` that are wired but not yet downloaded. Run the downloader once:

- **Windows (recommended):** right-click **`download-assets.ps1`** → **Run with PowerShell**
  *(or:* `powershell -ExecutionPolicy Bypass -File .\download-assets.ps1` *)*
- **Mac/Linux:** `bash download-assets.sh`

This pulls ~30 images into `assets/` (hero, artists, gallery, DOPE HAIR + Inflúance products, wraps, salon, academy, and all logo options).
**If you skip this, the deployed site will show empty image slots.** Commit the downloaded `assets/` with the repo so Netlify serves them.

---

## STEP 2 — Preview locally
Open `index.html` in any browser. That's the full working demo (animated, live cart, both stores, booking). It's also the **visual source of truth** for the production build.

## STEP 3 — Production site (already built ✅)
The full Next.js 14 app is built in this repo (Prompts 0 → 9 complete). Run it:

```bash
npm install
npm run dev        # http://localhost:3000  (use -- -p 3100 if 3000 is busy)
npm run build && npm run start   # production
```

**Stack:** Next.js 14 (App Router) + TypeScript · Tailwind (brand tokens) · Framer Motion · CSS/IntersectionObserver scroll reveals (robust, no-JS-safe) · `next/font` (Cormorant Garamond + Jost).
**Structure:** sections live in `components/`; content/data in `lib/`; images served from `public/assets/`.
**Features:** real localStorage cart + drawer + demo checkout, tabbed service menus, two-store shop, gallery lightbox, rotating testimonials, Google Map, LocalBusiness/HairSalon JSON-LD, `sitemap.xml` + `robots.txt`.

The single-file `index.html` remains the visual source of truth. To re-scaffold from scratch, paste **Prompt 0 → 9** from `BARE-ROOTS-Build-Prompts.md`.

## STEP 4 — Push to GitHub
```bash
git init
git add .
git commit -m "Bare Roots — initial site + brand + assets"
git branch -M main
git remote add origin https://github.com/Azaiah00/Bare-Roots-Salon-Website.git
git push -u origin main
```

## STEP 5 — Deploy to Netlify
1. Netlify → **Add new site → Import from Git → GitHub → Bare-Roots-Salon-Website**.
2. `netlify.toml` is already configured. **Static demo as-is:** publish `.`, no build command → Deploy. Done.
3. **After you rebuild as Next.js:** update the `[build]` block in `netlify.toml` (instructions are inside the file), then redeploy.

---

## 📂 Repo contents

| Path | What it is |
|---|---|
| `index.html` | Full working demo site (single file, no build step) — the design source of truth. |
| `assets/` | All site images + `assets-manifest.json`. **Populate via the downloader (Step 1).** |
| `download-assets.ps1` / `.sh` | One-click image downloaders. |
| `BARE-ROOTS-Brand-Identity.md` | Complete brand system: story, voice, color, type, motion, logo + sub-brand architecture. |
| `BARE-ROOTS-Build-Prompts.md` | Paste-in-order Prompt 0→9 for Cursor/Claude Code/Lovable. |
| `Couture-House-Services.html` | Couture House Co. services one-pager (client-facing pitch). |
| `netlify.toml` | Netlify deploy config (static now, Next.js-ready). |
| `.gitignore` | Ignores node_modules, .next, env, etc. |

---

## 🎨 Brand quick-reference
- **Colors:** forest `#2E3F28` · sage `#93A052` · mauve `#806172` · plum `#372C41` · gold `#C9A15A`
- **Type:** Cormorant Garamond (display) + Jost (UI)
- **Rule of gold:** gold is jewelry, not paint — thin lines, particles, CTAs only.
- **Tagline:** *Rooted in culture. Crowned in gold.*

## 🧭 Logo — pick one before launch
`assets/` has three directions (two variants each): `logo-tree-*`, `logo-monogram-*`, `logo-wordmark-*`, plus `logo-dopehair-*`. Recommended: **wordmark** as everyday mark, **monogram** as favicon/icon, **tree** as ceremonial seal. Drop your pick in as `assets/logo.png` and swap the header SVG in `index.html`.

## 🎞️ Motion assets (Higgsfield)
The downloader also pulls these looping videos into `assets/` (generated from the matching stills):

| File | Use |
|---|---|
| `hero-loop.mp4` | Hero background loop (locs + drifting gold dust). Already wired into `index.html` — it plays automatically once the file is present, otherwise the hero shows `hero.png`. Muted, autoplay, loop. |
| `locs-growth.mp4` | Close-up "growth" clip for the Root Recovery Method section (scroll storytelling). |
| `reel-creativeloc.mp4` · `reel-sisterlocs.mp4` | Vertical 9:16 social Reels (IG/TikTok) built from gallery stills. |
| `dope-spin.mp4` | DOPE HAIR flagship-brush product spin (add to the DOPE storefront card). |

For production (Next.js), use `hero-loop.mp4` as a `<video autoPlay muted loop playsInline poster="/assets/hero.png">` background; lazy-load the section videos.

## 📸 Note on photography
The `artist-iisha` / `artist-sabrina` images and gallery shots are **AI editorial placeholders** in-palette. Swap in real photos of Iisha & Sabrina before launch.

## 📍 Business facts (already in the site)
- **Studio:** 8030 W Broad St #117, Henrico, VA 23294
- **Hours:** Wed 1–6 · Thu 11–9 · Fri 11–6:30 · Sat 11–6
- **Iisha** — Holistic Hair Recovery · @i.c.beautybrand · (804) 397-3340
- **Sabrina** — Creative Loc Artist · @ladyybri_xo · 50secretsofhair.glossgenius.com · (804) 615-4054
- **Retail:** Inflúance Hair Care · **Sub-brands:** DOPE HAIR (Iisha), Custom Wraps (Sabrina)

*Built by Couture House Co. · 2026*
