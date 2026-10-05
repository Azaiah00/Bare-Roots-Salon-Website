# Assets & confirmations still owed by the client

Everything below is a real gap. Each one is **visible on the site right now** as
a dashed marker, a "to confirm" chip or a "Concept image" flag — nothing is
hidden, and nothing is invented to paper over it.

Ordered by what it costs the business to leave undone.

---

## 1. Blocking — do not publish without these

### 1.1 Two product renders carry other brands' names

Three images delivered with the brand package have another company's name
printed inside them. They are **withheld from the build**; the product pages
render an honest photo brief instead.

| File | What it actually says | Where it was going |
|---|---|---|
| `dope-detangler.png` | **"LUXE LOCKS"** on the handle | DOPE HAIR — The Detangler |
| `dope-oil.png` | **"NOURÉVA"** on the label | DOPE HAIR — The Root Oil |
| `salon-interior.png` | **"MELANIN & BLOOM"** on the back wall | the studio photograph |

The banner render (`dope-banner.png`) is correctly branded DOPE HAIR and is in
use. The gold pick is unbranded and is in use. `salon-interior.png` survives
only as a tight bottom-left crop (`studio-detail.webp`) with the signage out of
frame.

**Needed:** two new DOPE HAIR renders. The exact briefs are printed on
`/shop/dope-detangler` and `/shop/dope-root-oil`.

### 1.2 Real client reviews

`lib/content.ts` ships three reviews marked `status: "placeholder"`. They render
with a visible **"Placeholder — replace with a real review"** chip, and the
whole section carries a warning panel.

They were written by us. They are not real people. **They must be replaced
before this site is published** — a fabricated testimonial on a page selling
$1,000 installs is dishonest, and it is the single easiest thing for a search
engine to catch.

**Needed:** five to eight real reviews from @i.c.beautybrand, @ladyybri_xo, the
Google listing or the GlossGenius page, with the reviewer's first name and last
initial and a link to the source. Then set `status: "verified"` and add
`source` / `sourceUrl`; the flags disappear on their own.

### 1.3 Confirm the deposit

`DEPOSIT` is set to **$50** as a placeholder, flagged `needs-confirmation`, and
it appears on the booker, the services page and the policies page.

**Needed:** the real deposit amount, whether it is refundable, and whether it
differs by service (a $1,000 micro loc install and a $30 scalp scrub almost
certainly should not hold the chair with the same figure).

---

## 2. Photography

| What | Where it shows now | The shot |
|---|---|---|
| **The real studio** | `/visit` — a `PhotoSlot` marker | Wide shot from the door, both chairs in frame, lights on, no people. Landscape. Twenty minutes with a phone would replace the whole section. |
| **Studio portrait of Iisha** | `/house`, `/recovery`, journal byline — the current file is **390×755**, a low-resolution crop from a step-and-repeat | Head and shoulders, plain or studio ground, natural light, landscape and portrait crops. |
| **Studio portrait of Sabrina** | `/house`, journal byline — usable at 630×1000 but not shot for this | Same set-up as Iisha's, so the two read as a pair. |
| **Eight Inflúance product shots** | `/shop` — each renders its own brief | Bottle or jar, three-quarter view, single soft window light from the left, on the warm-paper ground. They must photograph as a family. |
| **Seven pieces of real work** | `/work` — every tile is flagged **"Concept image"** | Micro locs, sisterlocs, loc colour, scalp therapy, creative styling, a recovery before/after, two-strand twists. Phone photos in good light beat renders. |
| **Recovery progress photographs** | `/portal/client` — four `PhotoSlot` markers | Same angle, same distance, same light, every visit. Each card prints the exact brief. Written client permission required before any of them is published. |

Every image currently in `public/img/` except the two artist portraits is a
concept render. Replacing one is a two-step change: drop the file in and set
`real: true` in `lib/content.ts`.

---

## 3. Facts to confirm

### Prices flagged `needs-confirmation`
- Hair Recovery Consultation — currently "quoted at consultation"
- Virtual Hair Health Session — currently "quoted at consultation"
- Specialty Treatment — currently "from $30"
- Colour Services — currently "quoted at consultation"
- All three Academy courses — $497 / $97 / $297
- The Crown Circle membership — $65/month, and whether it exists at all
- Every DOPE HAIR price — the line is not shipping, so all four are guesses

Prices marked `from-booking-system` were taken from the live booking page and
are believed correct, but a second pair of eyes costs nothing.

### Policies
Every `NEEDS CLIENT CONFIRMATION` line on `/policies`: deposit refundability,
late fees, the no-show policy, the returns window and the shipping policy.
**These are drafts written from how the studio appears to operate. They have not
been reviewed by a lawyer.**

### The business
- **Map pin.** `SITE.geo` is approximate, derived from the West Broad corridor
  rather than a surveyed point. Confirm against the Google Business listing.
- **Accessibility.** Step-free entry? A lift to suite 117? Currently unstated
  on `/visit` because we do not know.
- **Hours.** Wed 1–6, Thu 11–9, Fri 11–6:30, Sat 11–6 — these drive real
  availability in the booker, so an error here is a double booking.
- **The domain.** The build assumes `bareroots.salon`. If it is something else,
  change `SITE.url` in `lib/site.ts` — it feeds every canonical, the sitemap,
  robots and all JSON-LD.
- **Iisha's surname**, for the schema and the byline.
- **Credentials.** No licence or certification is claimed anywhere on the site
  or in the structured data, deliberately. If either artist holds one she wants
  stated, send the documentation and it goes in properly.

---

## 4. Decisions the client owes

1. **Choose the logo.** Three directions, two variants each, in
   `public/img/logo-options/`. The header currently sets the wordmark in type,
   which is sharp at any density and costs nothing — but the mark should be
   chosen before launch. Recommendation from the brand package stands:
   wordmark as the everyday mark, monogram as the icon and favicon,
   tree-of-life as the ceremonial seal.
2. **Does The Crown Circle membership exist?** It is fully built on `/academy`
   and in the client portal. If it is not real, it comes out in one commit.
3. **Is DOPE HAIR a waitlist or a store?** Built as a waitlist, because the
   brand package describes it as forthcoming. If it ships, the products become
   purchasable by flipping `available` and adding real photographs.
4. **Sabrina's custom wraps** — fabrics, sizes, lead time, price. `/wraps` is a
   waitlist page until those exist.
5. **Booking on launch day.** The custom portal is a demo. Every CTA currently
   falls back to Sabrina's live GlossGenius page, so the site converts from day
   one. The decision is whether to go live on GlossGenius and build the real
   backend after, or to hold launch for Supabase and Stripe.

---

## 5. What is NOT owed

For completeness, because it is as useful to know what is finished:

- Every route, every layout, all copy, the full service menu, the booker, both
  portal sides, the shop, the cart, the demo checkout, the exit offer.
- All JSON-LD, sitemap, robots, canonicals, per-route titles and descriptions.
- Accessibility: 0 problems across 24 routes × 4 viewports.
- Performance: 113 KB first-load JS on the home page, 1.5 MB of photography in
  total, no motion libraries.
- The two real phone numbers, both Instagram handles, the address, the hours and
  the GlossGenius link — all verified and live.
