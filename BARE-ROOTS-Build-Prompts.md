# BARE ROOTS — Production Build Prompt Package
### For Cursor · Claude Code · Lovable · v0
*Paste these in order. The `assets/` folder is already populated (run `download-assets` first). Prompt 0 sets the foundation; each following prompt builds one system.*

---

## HOW TO USE THIS PACKAGE
1. Run the `download-assets` script so `/assets/` is full of the generated imagery.
2. Open the folder in Cursor / Claude Code (or start a Lovable project and upload `/assets/`).
3. Paste **Prompt 0** first (sets stack, tokens, structure).
4. Paste **Prompts 1–9** in order. Each is self-contained.
5. The included `index.html` is the **visual source of truth** — tell the tool to match its look and feel.

**Reference the design system:** point the tool at `BARE-ROOTS-Brand-Identity.md` and `index.html` in this folder.

---

## PROMPT 0 — Foundation, Stack & Design Tokens

```
You are building "Bare Roots" — a luxury natural-hair & wellness salon website for Richmond, VA. It is the merger of two artists: Iisha (holistic hair recovery) and Sabrina (creative loc artist). Brand essence: NATURAL · LUXURY · CULTURE — rooted in Black culture, elevated to luxury, with rare gold accents and botanical/root motifs.

STACK:
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with custom design tokens (below)
- Framer Motion for section reveals + micro-interactions
- GSAP + ScrollTrigger for scroll storytelling
- Optional: React Three Fiber for a subtle gold-dust hero field
- Commerce: Shopify Storefront API (or Snipcart for a lighter start) — cart must be real, checkout demo-ready
- Booking: embed/deeplink to GlossGenius (Sabrina) + a consultation form (Iisha)
- Fonts: Cormorant Garamond (display) + Jost (UI) via next/font

DESIGN TOKENS (Tailwind theme.extend.colors):
forest:#2E3F28  sage:#93A052  mauve:#806172  plum:#372C41
gold:#C9A15A  gilt:#E7CE9A  bronze:#A67C33
paper:#FBF8F1  cream:#F5F0E6  ink:#1C1518

RULES:
- Gold is jewelry, not paint: thin lines, particles, CTA fills, adornment ONLY. Never big flat gold fills.
- Luxury = whitespace + calm motion. Reveals rise 40px + fade; never bouncy.
- Serif for emotion/headlines, sans for UI. Prices in italic serif gold.
- Fully responsive, AA accessible, semantic HTML, fast (LCP < 2.5s).
- Use the images already in /assets (hero.png, artist-*.png, gal-*.png, dope-*.png, inf-*.jpg, wellness.png, salon-interior.png, academy.png, wraps.png).

Set up the project, tokens, fonts, global layout, and a sticky glass nav (transparent → dark on scroll) with links: The House, Artists, Services, Hair Recovery, Shop, Academy + a Bag icon (cart count) and a gold "Book Now" button. Match the aesthetic of the provided index.html exactly.
```

---

## PROMPT 1 — Hero + Brand Motion

```
Build the hero section:
- Full-viewport, background gradient radial from plum→forest.
- Layer 1: a slow, sparse GOLD PARTICLE field drifting upward (canvas or R3F). Subtle.
- Layer 2 (right ~46%): assets/hero.png, masked with a left-to-transparent gradient so it melts into the background.
- Eyebrow: "Richmond, Virginia · Est. 2026"
- H1 (Cormorant, huge): "Rooted in culture." / "Crowned in gold." — with "gold" in italic gilt.
- Sub: "Two master artists. One rooted experience. Bare Roots is where holistic hair recovery meets loc artistry — a luxury natural-hair house built for the crown you were born with."
- CTAs: gold "Book Your Seat", ghost "Explore Services".
- Bottom-left location chip: "📍 8030 W Broad St #117 · Henrico, VA". Animated scroll cue.
- A marquee ribbon under the hero (italic serif) scrolling: Micro Locs · Sisterlocs · Holistic Hair Recovery · Traditional Locs · Silk Press · Color · Loc Artistry · Wellness.
Framer Motion: hero text staggers in on load.
```

---

## PROMPT 2 — The Union (Story) + Root SVG

```
Build the "Union" story section on warm paper:
- Left: eyebrow "The Union", italic serif lead "Two crowns. One root system.", 2 paragraphs telling the merger story (Iisha grows hair from the inside out; Sabrina is a creative loc artist; together at 8030 W Broad St they built a house where science meets soul — wellness, artistry, education, product, rooted in Black culture).
- A stat row: "2 Master Artists", "1090+ Followers Served", "15+ Years Combined".
- Right: an animated SVG artwork of locs flowing into tree roots with small gold blossoms and gilt seed-dots, on a plum→forest tile. Roots gently "grow" (stroke-dashoffset animation) on scroll.
```

---

## PROMPT 3 — The Artists

```
Build "Behind the Crown" on a forest gradient (cream text). Two luxury cards:
CARD A — Iisha: tag "Holistic Hair Recovery", image assets/artist-iisha.png, role "Hair Recovery Practitioner · Educator", bio ("I'll grow it — from the inside out." restoring thinning/alopecia/scalp health holistically; founder of DOPE HAIR), chips [Hair Loss Recovery, Scalp Therapy, Wellness, Education], buttons "Recovery Program" + IG @i.c.beautybrand.
CARD B — Sabrina: tag "Creative Loc Artist", image assets/artist-sabrina.png, role "Creative Loc Artist · Educator", bio (meticulous micro locs, sisterlocs, traditional locs, statement styling; premium custom wraps coming), chips [Micro Locs, Sisterlocs, Traditional Locs, Color · Silk Press], buttons "Book Sabrina" + IG @ladyybri_xo.
Cards lift on hover with a growing gold left-edge bar.
```

---

## PROMPT 4 — Services (3 tabbed menus)

```
Build "Signature Services" with 3 tabs (pill toggles): Loc Artistry / Hair Recovery & Wellness / Natural Styling & Color. Each tab = a 3-col grid of service cards (name, italic-gold price, uppercase duration/detail line, short description). A hovering gold bar grows on the card's left edge.

LOC ARTISTRY: Micro Locs (From $1,000 · Consultation First), Starter Locs (From $185 · 165 min), Traditional Retwist (From $120 · 90 min), Loc Scalp Therapy ($140 · 150 min), Loc Detox Soak (From $150 · 165 min), Creative Loc Styles (From $40).

HAIR RECOVERY & WELLNESS: Hair Recovery Consultation (Book), Virtual Hair Health (Book), Scalp Therapy Ritual ($140), Scalp Scrub ($30), Specialty Treatments (From $30), Wellness + Product Plan (Custom).

NATURAL STYLING & COLOR: Silk Press / Blow Out (From $110), Two-Strand Twist (From $115), Keratin Treatment (From $135), Color Services (Varies · Consultation First), Basic Crochet (From $115), Mini Twist (From $360).

(Full live menu is deeper — pull from 50secretsofhair.glossgenius.com. Every "Book" opens GlossGenius/consultation.)
```

---

## PROMPT 5 — The Root Recovery Method™ (Iisha's funnel)

```
Build the signature wellness funnel on a plum gradient. Header: eyebrow "Iisha's Signature Program", H2 "The Root Recovery Method™", sub about thinning/alopecia/breakage — "we rebuild the root, growing hair from the inside out."
4 numbered steps (big gilt numerals): 01 Scan & Assess, 02 Recovery Plan, 03 Restore, 04 Grow & Maintain — each with a short description.
Then a gold-bordered CTA band: "Your regrowth starts with one conversation." + "Book a Hair Recovery Consultation — in-studio or virtual." + gold button "Start My Recovery" → consultation form.
Add optional GSAP scroll-pinned progress line connecting the 4 steps.
```

---

## PROMPT 6 — Shop (real cart, 2 stores + wraps teaser)

```
Build the Shop with a store switcher: "Inflúance · In-Salon Line" and "DOPE HAIR · by Iisha".
- Product grid (4-col) of cards: image, name, one-line desc, italic-gold price, round "+" add-to-cart (rotates on hover).
- INFLÚANCE products use assets/inf-*.jpg (the retail line they sell in-salon; connect the full catalog from influancehaircare.com/shop later).
- DOPE HAIR: branded header with the DOPE HAIR gold wordmark; products use assets/dope-*.png (The Detangler $34, Gold Pick $18, The Root Oil $28, DOPE Collection $74) + text-tile fallbacks for the rest.
- A slide-in CART DRAWER: line items, qty +/−, remove, live subtotal, "Checkout" → confirmation modal (demo-safe: no charge). Persist cart in localStorage.
- Below: a "Coming Soon" teaser for Sabrina's Custom Hair Wraps (assets/wraps.png, bloom gradient, waitlist button).
Wire to Shopify Storefront API (or Snipcart) so checkout is production-ready; keep a demo mode flag.
```

---

## PROMPT 7 — Academy (upsell) + Gallery + Testimonials

```
ACADEMY on a forest gradient: eyebrow "Bare Roots Academy", H2 "Knowledge is the Root", 3 course cards — Micro Loc Foundations (Masterclass $497), Loving Your Natural Hair (Workshop $97), Hair Recovery Basics (Certification $297). Cards lift on hover. Each → a course/checkout page (stub the routes).

GALLERY: a masonry grid (mix of tall/wide tiles) using assets/gal-*.png with hover captions (Micro Locs · Gold Adorned, Sisterlocs, Silk Press Perfection, Loc Color, Scalp Therapy, Creative Loc Styling, Recovery Journey · Regrowth, Two-Strand Twists). Lightbox on click.

TESTIMONIALS: full-width plum section, 5 gold stars, a large italic serif quote about regrowth + loc artistry, attributed to a Richmond client. Make it a rotating slider (3–5 quotes).
```

---

## PROMPT 8 — Booking + Footer + SEO

```
BOOKING section on paper, 2 columns:
- Left: "Come Get Rooted", copy, and detail rows — Studio: 8030 W Broad St #117, Henrico, VA 23294; Hours: Wed 1–6, Thu 11–9, Fri 11–6:30, Sat 11–6; Call/Text: (804) 397-3340 / (804) 615-4054.
- Right: a luxe booking card — "Book With Sabrina" (→ GlossGenius) and "Book Recovery With Iisha" (→ consultation form). Show deposit note.
Embed a Google Map for the address.

FOOTER (ink): brand blurb + "Natural · Luxury · Culture", link columns (Explore / Shop / Visit), IG links, "© 2026 Bare Roots Salon", credit "Experience by Couture House Co."

SEO/LOCAL: Next Metadata API — title/description targeting "micro locs Richmond VA", "loc salon Henrico", "hair loss / alopecia recovery Richmond", "sisterlocs RVA". Add LocalBusiness + HairSalon JSON-LD (name, address, geo, hours, phone, sameAs IG), OpenGraph using assets/hero.png, sitemap, robots, alt text on all images. Fast Core Web Vitals.
```

---

## PROMPT 9 — Polish Pass

```
Final polish:
- Add tasteful botanical gold line-art dividers between sections.
- Framer Motion page transitions; respect prefers-reduced-motion.
- Hover states on every interactive element; focus-visible rings in gold.
- Mobile: hamburger drawer nav; verify all grids collapse cleanly; tap targets ≥44px.
- Lighthouse pass (Perf/A11y/SEO/Best Practices ≥ 95). Lazy-load below-the-fold images.
- Add a subtle sticky "Book" button on mobile.
- QA the cart end-to-end and both booking paths.
Deliver a build that feels like a fashion house, not a template.
```

---

## OPTIONAL — Higgsfield Motion Upgrades (post-launch)
- Hero background: a 4–6s looping Higgsfield video of locs in warm gold light / drifting gold dust (Kling or Seedance), muted, poster = assets/hero.png.
- Root Recovery Method: frame-by-frame scroll sequence of a root/loc growing.
- DOPE HAIR: a 360° product spin (Seedance product-360) for the flagship brush.
- Social: vertical Reels from the gallery stills (see caption-pack / content-repurposer).

*Bare Roots build package © 2026 · Couture House Co.*
