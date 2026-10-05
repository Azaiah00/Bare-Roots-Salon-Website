# DESIGN.md — Bare Roots

### Direction: **Gold in the Air**

> One rule, and it governs every other line in this file: **no colour, size,
> radius, easing or duration may be used that is not a token in
> `tailwind.config.ts`.** If you need a value that does not exist, add it here
> first — with its measured contrast ratio — then add it to the config, then
> use it. An arbitrary value in a `className` is a bug, not a shortcut.

Every ratio in this document was measured with `npm run audit:contrast`, which
reads the hexes straight out of `tailwind.config.ts`. Nothing below was
eyeballed.

---

## 0. The thesis

Bare Roots is a merger of two established practices sharing one studio suite at
8030 W Broad. Iisha treats the root; Sabrina crowns it. That is not company
history — it is the offer, and it is the only thing on this site a competitor
cannot copy by Friday.

Three decisions follow from it, and everything else follows from those.

**1. Two names, everywhere, from the first screen.**
Most salon sites bury the practitioner below a stock hero. Here both artists are
named above the fold, both phone numbers are real and reachable in one tap, and
every service on the menu states which of them performs it. A visitor who leaves
this site should be able to name the two women in it.

**2. Calm is the luxury signal, not gold.**
The brand line is "gold is jewellery, not paint" and it is enforced
mechanically: gold appears as a hairline, a particle, a CTA fill and an accent
word, and nowhere else. The luxury is carried by whitespace, unhurried type and
a long easing curve. Restraint is cheaper than gilt and it does not date.

**3. The honest gap is a feature.**
This is a preview build on demo data with concept imagery, and it says so — on
the gallery, on the product pages, on the reviews, in the booker's
confirmation and in the checkout. Every gap prints the thing that would close
it. A site that hides its gaps hands the client a surprise on launch day; this
one hands them a task list.

---

## 1. Colour

Sampled from the brand package's stated palette, then measured.

### Tokens

```css
/* Light grounds */
--paper:        #FBF8F1;   /* primary */
--cream:        #F5F0E6;   /* secondary */

/* The three dark grounds. There are exactly three. Do not invent a fourth. */
--forest:       #2E3F28;   --forest-deep: #25321F;
--plum:         #372C41;   --plum-deep:   #2B2233;
--ink:          #1C1518;

/* Type */
--ink-soft:     #5C5057;   /* secondary copy on light */
--ink-mid:      #6B6068;   /* disabled control labels */
--cream-dim:    #C9BFB6;   /* secondary copy on dark */

/* The accent, in four registers */
--gold:         #C9A15A;   /* DARK GROUNDS ONLY */
--gilt:         #E7CE9A;   /* highlight and hover, dark grounds */
--bronze:       #A67C33;   /* light grounds, LARGE type only (≥24px) */
--bronze-ink:   #8D6727;   /* light grounds, any size */
--bronze-deep:  #7E5B22;   /* small type on a TINTED light panel */

/* The botanical note — decoration only */
--sage:         #93A052;   --sage-ink: #636D34;

/* The feminine register — wraps and the bloom ground only */
--mauve:        #806172;   --mauve-lift: #C4A3B1;

/* A genuine warning. Never decoration. */
--alert:        #B4533F;

/* Hairlines */
--line:         rgba(28, 21, 24, 0.14);
--line-dark:    rgba(245, 240, 230, 0.16);
```

### 1.1 Measured contrast — do not drift from this table

| Foreground | Background | Ratio | Allowed use |
|---|---|---:|---|
| ink | paper | 16.92 | body copy, primary light ground |
| ink | cream | 15.80 | body copy, secondary light ground |
| ink-soft | paper | 7.23 | leads, secondary copy, table cells |
| ink-mid | paper | 5.66 | disabled control labels |
| bronze-ink | paper | 4.83 | eyebrows, small labels, links on light |
| bronze-ink | cream | 4.51 | the same, on the secondary light ground |
| bronze-deep | marker panel | 5.2 | small copy inside a `.marker` |
| **bronze** | paper | **3.57** | **LARGE display type only — ≥24px** |
| forest | paper | 10.66 | display headings on light |
| plum | paper | 12.38 | display headings on light |
| cream | forest | 9.95 | body copy on dark |
| cream | forest-deep | 11.89 | body copy on dark |
| cream | plum | 11.56 | body copy on plum |
| cream | plum-deep | 13.40 | body copy on deep plum |
| cream | ink | 15.80 | body copy on ink |
| paper | forest | 10.66 | display headings on dark |
| paper | ink | 16.92 | display headings on ink |
| cream-dim | forest | 6.25 | secondary copy on dark |
| cream-dim | plum | 7.26 | secondary copy on plum |
| cream-dim | ink | 9.93 | secondary copy on ink |
| gold | forest | 4.70 | eyebrows, accents, links — dark grounds only |
| gold | forest-deep | 5.61 | the same |
| gold | plum | 5.46 | the same |
| gold | plum-deep | 6.33 | the same |
| gold | ink | 7.46 | the same |
| gilt | forest | 7.37 | hover and highlight on dark |
| gilt | plum | 8.56 | hover and highlight on plum |
| gilt | ink | 11.71 | hover and highlight on ink |
| ink | gold | 7.46 | the gold CTA's own label |
| mauve-lift | plum | 5.77 | copy on the bloom ground |
| alert | paper | 4.66 | deposit-outstanding warnings only |

### 1.1b Pairings that are permanently illegal

| Pairing | Ratio | Why it is banned |
|---|---:|---|
| gold on paper | **2.27** | Gold is a dark-ground colour. It is not "a bit low"; it is unreadable. |
| sage on paper | **2.68** | Sage is a botanical line colour. It is never type. |
| mauve on plum | **2.42** | Use `mauve-lift`. |
| bronze on forest | **2.99** | Bronze is a light-ground colour. |

`npm run audit:contrast` asserts both tables, including that the illegal four
*stay* illegal — so a future token tweak that quietly "fixes" one of them still
raises a flag rather than sliding through.

### 1.2 Accent discipline — gold has exactly seven jobs

1. The hairline rule beside an eyebrow (`.gold-rule`).
2. The eyebrow itself, on a dark ground.
3. One italic accent word inside an `h1`/`h2` on a dark ground.
4. The primary CTA fill (`.btn-gold`), where the label is ink on gold.
5. The left-edge bar that grows on card hover.
6. The drifting motes in the hero, and the self-drawing root mark.
7. The focus ring.

Nowhere else. On a light ground the equivalent role is `bronze-ink`, and a
large display numeral may use `bronze`. Sage is reserved to botanical line art;
mauve to the wraps surfaces; `alert` to a real outstanding-money warning.

### 1.3 Ground rhythm

Home runs: `dark hero → forest → paper → forest → wellness → paper → cream →
plum → paper → ink`. Every other route alternates from its dark `PageHero`.

Two rules: **never more than two light grounds in a row**, and **a dark ground
must earn its place** by holding either imagery or a number. A dark band with
nothing but body copy on it is decoration, and decoration costs scroll.

### 1.4 Hierarchy is never expressed by opacity

A dimmed element is a contrast failure that is hard to find later. Secondary
copy uses `ink-soft` or `cream-dim`; a disabled control uses `ink-mid` and its
`disabled` attribute. The only opacity in the type system is on decorative
numerals, and those are measured too (`gold/70` on plum = 3.46:1, which clears
AA-large at 48px).

---

## 2. Type

**Self-hosted, not fetched.** `next/font/google` reaches fonts.googleapis.com at
build time and takes the whole build down with it in an offline or firewalled
CI container. Two woff2 files in the repo cost 103 KB, are content-hashed, are
cached for a year by `netlify.toml`, and cannot fail.

| Role | Face | File | Axis |
|---|---|---|---|
| Display | Cormorant Garamond | `cormorant-garamond-latin.woff2` (37 KB) | 300–700 |
| Display italic | Cormorant Garamond Italic | `cormorant-garamond-latin-italic.woff2` (38 KB) | 300–700 |
| UI / body | Jost | `jost-latin.woff2` (26 KB) | 300–600 |

**Why these.** Cormorant is a high-contrast old-style serif — the thin strokes
are what make a headline read as editorial rather than as a sign, and its
italic is genuinely cursive rather than a slanted roman, which is what makes
the one-accent-word device work. Jost is a geometric sans with a circular `o`
that sits quietly under it and letterspaces cleanly to 0.3em for the eyebrows.
Together they are a fashion-house pairing, not a salon-template pairing.

### 2.1 Scale (fluid)

| Token | Spec | Use |
|---|---|---|
| `text-d1` | `clamp(2.75rem, 7vw, 5.5rem)` / 0.98 / −0.015em | the one `h1` per route |
| `text-d2` | `clamp(2.125rem, 4.8vw, 3.75rem)` / 1.04 | section headings |
| `text-d3` | `clamp(1.625rem, 3vw, 2.5rem)` / 1.1 | card and panel headings |
| `text-d4` | `clamp(1.25rem, 2vw, 1.625rem)` / 1.2 | list and tile headings |
| `text-lead` | `clamp(1.0625rem, 1.3vw, 1.25rem)` / 1.62 | the paragraph under a heading |
| `text-base2` | 1rem / 1.68 | body |
| `text-sm2` | 0.875rem / 1.6 | secondary |
| `text-xs2` | 0.75rem / 1.5 | fine print |
| `.eyebrow` | 0.6875rem / 500 / 0.3em / uppercase | the couture detail line |

Body weight is 300. Headings are 500. There is no 700 anywhere — a bold
Cormorant is a different typeface with a different argument.

### 2.2 The one heading rule

Every `h1` and `h2` is **a phrase plus one italic accent word**, and the accent
word carries the accent colour for its ground.

```tsx
<h2>Most salons sell a style. We sell a <Accent>root system.</Accent></h2>
<h2>Three disciplines, <AccentDark>one head of hair.</AccentDark></h2>
```

`Accent` is bronze (light grounds); `AccentDark` is gold (dark grounds). Using
the wrong one is a contrast failure, which is why they are two components and
not one prop.

Section numbers (`01`, `02`…) are data, passed to `SectionHead`, never typed
into the markup — so inserting a section renumbers the page rather than
starting an argument.

---

## 3. Space, layout, shape

```css
--shell:      1240px;                        /* max content width */
--gutter:     clamp(1.25rem, 4vw, 2.5rem);
--section-y:  clamp(4.5rem, 9vw, 8.5rem);
--header-h:   74px;

--radius-xs:    2px;    /* everything typographic */
--radius-panel: 10px;   /* cards and dialogs */
--radius-pill:  999px;  /* badges, chips, the step rail */
```

**Typography is square.** Buttons, inputs and section edges use the 2px radius;
only a container or a chip curves. A rounded heading is a SaaS landing page.

**Lopsided grids, not twelve columns.** The recurring ratios are
`1fr / 0.72fr` (body beside a sticky mark), `1.55fr / 1fr` (booker beside its
summary), `0.62fr / 1fr` (portrait beside prose) and `1.4fr / 1fr` (the primary
card beside its two stacked siblings). A 50/50 split appears only where the two
halves are genuinely peers.

**Hairline grids.** Tile grids use `gap: 1px` over a `--line` parent with
`overflow: hidden` — no border arithmetic, no doubled edges, no `:last-child`
exception. The `.hairline-grid` class is the whole implementation.

---

## 4. Motion

**One easing curve for the entire site:** `cubic-bezier(0.22, 1, 0.36, 1)`.
Three durations: 180ms (fast), 360ms (base), 820ms (slow). Nothing else.

### 4.0 The library decision

There is **no motion library** in this build. No GSAP, no Lenis, no
framer-motion import. Everything below is IntersectionObserver, CSS transitions,
`position: sticky` and one rAF loop.

This is a deliberate reversal of the house default and it is worth stating why.
The three signature moves here need a scroll observer, a `stroke-dashoffset`
transition and a scroll-progress number. That is about 90 lines of code. The
libraries that do it weigh roughly 38 KB gzipped between them and would have to
be installed into a OneDrive-synced folder, which is a documented trap on this
machine. The site ships at **113 KB first-load JS on its heaviest route** and
every route works with JavaScript switched off. If a later brief genuinely needs
a pinned, scrubbed timeline, add GSAP then — and wire `ScrollTrigger.update`
properly at the same time.

### 4.1 Signature moves — three, all theirs

**Move 1 — "gold in the air."** Twenty-two one-pixel motes drift slowly upward
behind the hero. The brand line is that gold is jewellery, not paint, so this is
sparse by design. Pure CSS animation, fixed seed table (a `Math.random()` at
render time produces different markup on the server than in the browser and
React tears the page apart rebuilding it), and it does not render at all under
reduced motion.

**Move 2 — "the root draws itself."** The brand's own mark — a loc that becomes
a root system — draws on with `stroke-dashoffset` the first time it enters the
viewport. It is the thesis of the business as one line: what you see is grown
from something underneath it. Once per page. A looping draw is a screensaver.

**Move 3 — "the root fills as you read."** On the Root Recovery Method, a gold
rule in the sticky column fills top-to-bottom in step with progress through the
four stages. `position: sticky` plus one passive listener and one rAF — no pin
spacer to get wrong.

### 4.2 Supporting motion

Reveal on enter (20px rise + fade, 820ms, staggered by `--reveal-delay`);
card hover lift of 6px with a gold bar growing down the left edge; the service
marquee; the header condensing on scroll; the `+` on a work tile rotating to a
`×`; the accordion's `grid-template-rows: 0fr → 1fr`.

### 4.3 Reduced motion — belt and braces

The CSS kill block in `globals.css` forces every `[data-reveal]` to its finished
state and collapses all animation and transition durations. **Separately**, the
JavaScript bails: `useReveal` sets the finished state and never constructs an
observer, `useScrollProgress` returns 0 and never starts a rAF, and
`GoldParticles` returns `null`. Either half alone would be a bug waiting for the
other to be edited.

A `<noscript>` block in `<head>` does the same for JavaScript being off.

---

## 5. Components

- **Buttons** — 52px minimum height (44px for `btn-sm`), 2px radius, four
  variants: `gold` (primary), `dark`, `outline` (light grounds), `ghost` (dark
  grounds). Disabled state changes colour, never opacity.
- **Tap targets** — every interactive element clears 44×44px. Inline links
  inside a paragraph are the only exception, because they flow with the text.
  `npm run audit:a11y` measures this on the rendered page at four viewports.
- **PhotoSlot** — the honest-gap component. `src={null}` renders a dashed marker
  at the correct size printing the shooting brief, so a missing photograph
  becomes a task with an owner rather than a hole in the layout. An image that
  exists but is a concept render carries a corner flag.
- **PriceTag** — price in italic display type, with a visible "to confirm"
  marker whenever `priceStatus === "needs-confirmation"`. Removing that marker
  to make a screenshot look cleaner defeats the entire mechanism.
- **Icons** — a hand-drawn 24×24 stroke set in `components/ui/Icon.tsx`. No
  emoji anywhere in client-facing content, ever; `npm run audit:a11y` fails the
  build if one reaches rendered text.
- **Dialogs** — the cart drawer, the lightbox and the exit offer share
  `useDialog`: focus moved in, focus restored on close, Escape closes, a
  hand-rolled Tab trap, body scroll locked, backdrop click closes. `html {
  scrollbar-gutter: stable }` is what stops the scroll lock shifting the page.
- **Mobile book bar** — fixed, above `env(safe-area-inset-bottom)`, suppressed
  on `/book`, `/cart`, `/checkout`, `/portal` and `/login` where the page has a
  better primary action already on screen.
- **One `h1` per route**, and a single `<main>` landmark. Both asserted.

---

## 6. Photography

Everything currently in `public/img/` is a concept render produced for the
pitch, **except the two artist portraits**, which are real photographs of Iisha
and Sabrina pulled from their own public profiles.

The pipeline applied to the set: resize to a sensible maximum (1400px for
full-bleed, 1000–1100px for tiles), convert to WebP at quality 80–86, and crop
anything carrying another brand's name out of frame. **31.2 MB of PNG became
1.5 MB of WebP — a 95% reduction** — which is the single largest performance
change in this build.

Rules: `object-cover` always, `next/image` always, exactly one `priority` image
per route (the LCP element), and `sizes` set honestly so the browser is not
handed a 1400px file for a 300px tile.

Nothing in the pipeline lightens or desaturates skin.

---

## 7. Honest-gap markers (required pattern)

```ts
type PriceStatus = "confirmed" | "from-booking-system" | "needs-confirmation";
```

- `confirmed` — signed off by the artist. Renders plain.
- `from-booking-system` — captured from her live booking page. Renders plain.
- `needs-confirmation` — a placeholder we chose. Renders with a visible "to
  confirm" chip.

The same idea appears as `WorkItem.real` (concept image vs. real work),
`Review.status` (`placeholder` vs. `verified`), `Product.image === null`
(prints the shot it needs) and `NEEDS CLIENT CONFIRMATION` lines in the
policies. Every one of them is listed in `ASSETS-OWED.md`.

---

## 8. Performance budget

| Metric | Budget | Measured |
|---|---|---|
| First-load JS, heaviest route | < 130 KB | **119 KB** (`/portal/client`) |
| First-load JS, home | < 120 KB | **113 KB** |
| Shared chunk | < 95 KB | **87.3 KB** |
| Total photography | < 2.5 MB | **1.5 MB** across 27 images |
| Fonts | < 120 KB | **103 KB**, self-hosted, 3 files |
| Motion libraries | 0 | **0** |
| Static routes | — | **40** prerendered |

---

## 9. Known traps

1. **`Math.random()` during render.** Produces different markup on the server
   than in the browser; React discards and rebuilds. The hero particles use a
   fixed seed table for exactly this reason.
2. **`searchParams` read on the server** makes a page dynamic and kills Next's
   prefetch of the most important link on the site. The booker reads
   `?service=` with `useSyncExternalStore` on the client instead.
3. **A deep link applied in an effect** causes two render passes and a visible
   flash of step one. Apply it during render.
4. **`aspect-*` mixed with `row-span-*` and `auto-rows-[minmax(0,1fr)]`.** The
   intrinsic aspect fights the equal-height track, every row inflates to the
   tallest tile, and the work grid grows to three times its intended height with
   a column of empty space beside it. This shipped, and only the frames caught
   it. Use an explicit row track plus spans.
5. **A marquee without `overflow-hidden` on its wrapper.** `body { overflow-x:
   hidden }` hides the scrollbar but `documentElement.scrollWidth` is still
   2,700px and the page really does scroll sideways on touch. This shipped too.
6. **Translucent fixed bars.** A 97%-opaque summary bar lets page content bleed
   through the running total and reads as a rendering fault. Fixed bars over
   content get an opaque ground.
7. **`npm install` inside a OneDrive-synced folder** hangs and leaves lock files
   git cannot unlink. Clone to `C:\dev\` if it misbehaves.
8. **A stale `next start`** serves an old build whose CSS chunk no longer
   exists, and every page then reports phantom contrast and tap-target
   failures. Kill the old server before auditing.
9. **`fullPage: true` screenshots.** They render a sticky element at its
   unscrolled position and a reveal that never fired as a blank band — a page
   nobody will ever see. `npm run frames` captures at real scroll depths, and it
   is not optional.
