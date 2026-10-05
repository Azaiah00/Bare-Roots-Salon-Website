# RESEARCH-DOSSIER.md — Bare Roots

Provenance for every fact on the site. **If a fact is not in this document it
does not belong on the site.** Anything uncertain carries a flag in the code and
a line in `ASSETS-OWED.md`.

Captured 2026-09-20 from the Bare Roots brand package prepared by Couture House
Co. (`BARE-ROOTS-Brand-Identity.md`, `README.md`) and from the two artists'
own public profiles.

---

## 1. The business

| Fact | Value | Source | Confidence |
|---|---|---|---|
| Trading name | Bare Roots | Brand package §1 | Verified |
| Descriptor | Natural · Luxury · Culture | Brand package §1 | Verified |
| Primary tagline | Rooted in culture. Crowned in gold. | Brand package §4, approved set | Verified |
| Street | 8030 W Broad St | Brand package README | Verified |
| Unit | #117 | Brand package README | Verified |
| City / region / postcode | Henrico, VA 23294 | Brand package README | Verified |
| Hours | Wed 1–6 · Thu 11–9 · Fri 11–6:30 · Sat 11–6 | Brand package README | Verified — **drives real availability** |
| Latitude / longitude | 37.6478, −77.5502 | Derived from the W Broad corridor | **Approximate** — confirm against the Google listing |
| Domain | bareroots.salon | Assumed for the build | **Unconfirmed** |
| Legal entity | — | Not supplied | **Unknown** — absent from the schema on purpose |

The address is decomposed into atoms in `lib/site.ts` (`street`, `unit`, `city`,
`region`, `regionName`, `postalCode`) because JSON-LD, the footer and the
one-line string each need a different recombination.

`hours` is **Sunday-first, seven entries, `"HH:MM"` or `null`**. The ordering is
load-bearing: `lib/db.ts` indexes the array directly by `getUTCDay()`. Do not
sort it and do not start it on Monday.

---

## 2. The two artists

### Iisha
| Fact | Value | Source |
|---|---|---|
| Role | Holistic Hair Recovery Practitioner & Educator | Brand package §2 |
| Background | Brooklyn-born, Richmond-rooted | Brand package §2 |
| Phone | (804) 397-3340 | Brand package README |
| Instagram | @i.c.beautybrand | Brand package README |
| Own brand | DOPE HAIR — **forthcoming** | Brand package §2, §9 |
| Surname | — | **Not supplied** |
| Credentials | **None claimed** | See §5 |

Her photograph shows a white coat embroidered "Hair and Scalp Spec…". That is
**not** treated as a credential claim anywhere in the copy or the structured
data, because an embroidered coat is not documentation.

### Sabrina Sutton
| Fact | Value | Source |
|---|---|---|
| Role | Creative Loc Artist & Educator | Brand package §2 |
| Specialisms | Micro locs, sisterlocs, traditional locs, colour, silk press | Brand package §2 |
| Phone | (804) 615-4054 | Brand package README |
| Instagram | @ladyybri_xo | Brand package README |
| Live booking | 50secretsofhair.glossgenius.com | Brand package README |
| Own brand | Custom Wraps — **coming soon** | Brand package §9 |

Her GlossGenius page is used as the real fallback on every booking CTA, so the
site converts on day one regardless of the custom portal's status.

---

## 3. Services and prices

The menu in `lib/services.ts` derives from the service list in the earlier
build's `lib/content.ts`, which itself was captured from Sabrina's live booking
system. Durations were carried across unchanged because they drive real
availability.

Each service carries a `priceStatus`:

- **`from-booking-system`** — captured from the live booking page. Believed
  correct; worth a second pair of eyes. *(Starter Locs $185, Retwist $120, Loc
  Scalp Therapy $140, Detox Soak $150, Creative Styles $40, Scalp Therapy
  Ritual $140, Scalp Scrub $30, Silk Press $110, Two-Strand Twist $115,
  Keratin $135, Basic Crochet $115, Mini Twist $360.)*
- **`confirmed`** — Micro Locs from **$1,000**, stated in the brand package's
  price posture (§3).
- **`needs-confirmation`** — a placeholder we chose, rendered with a visible
  chip. *(Both consultations, Specialty Treatment, Colour Services, all three
  Academy courses, the membership, every DOPE HAIR price, the deposit.)*

The artist assignment (`artist: "iisha" | "sabrina"`) follows the discipline
split in brand package §2 and is what routes the booker's availability to the
right chair.

---

## 4. Products

**Inflúance** is the professional line already carried in the studio (brand
package §9, "IN-SALON RETAIL"). The eight products and their prices were
captured from influancehaircare.com in the earlier build and carried across as
`from-partner`. They need confirming against what the studio actually charges.

**DOPE HAIR** is described in the brand package as forthcoming, so it is built
as a **waitlist, not a store** — nothing is purchasable, nothing is charged.
Selling a product that does not ship is how a salon loses a client it had
already won. All four prices are placeholders.

---

## 5. What is deliberately absent

These are omissions, not oversights:

- **No `hasCredential` in the structured data.** No licence or certification is
  asserted anywhere on the site. Both artists are described the way the brand
  package describes them — "Practitioner", "Educator", "Artist" — which are
  self-descriptions, not regulated titles.
- **No `aggregateRating`.** Bare Roots is a new merged entity with no review
  corpus of its own. Inventing a rating in JSON-LD is a written claim to a
  search engine.
- **No medical claims.** The recovery copy states what the practice does, names
  its limits explicitly on `/recovery` §4, and says plainly that a systemic
  cause is a referral rather than a package.
- **No real client names, anywhere.** The three portal clients are "Demo
  Client", "Demo Client Two", "Demo Client Three" with `(804) 555-01xx` numbers.
  The three reviews are flagged placeholders.
- **No legal entity name**, because none was supplied.

---

## 6. Copy that is ours, not theirs

Written for this build in the brand voice (package §4: rooted, regal, warm,
knowledgeable, educator energy; avoid "bald", avoid clinical coldness, speak to
the crown not the flaw):

- All page copy, section headings and leads.
- The three journal articles — **written by us in each artist's voice and
  attributed to her.** They are professionally accurate but they are not her
  words. Either artist should read hers before publication and change anything
  that does not sound like her.
- The FAQ answers and the draft policies.
- The Root Recovery Method's four-stage structure, expanded from the four-step
  outline in the earlier build with the "exit condition" framing added.
- The Crown Circle membership — **invented for this build.** It is a commercial
  proposal, not a fact. See ASSETS-OWED §4.2.

---

## 7. Imagery provenance

| Asset | What it is |
|---|---|
| `artist-iisha.webp` | **Real photograph** of Iisha, from her public profile. 390×755 — low resolution. |
| `artist-sabrina.webp` | **Real photograph** of Sabrina, from her public profile. 630×1000. |
| `hero.webp`, all `work-*`, `wellness`, `academy`, `wraps`, `dope-banner`, `dope-pick` | AI concept renders produced for the pitch. Flagged "Concept image" wherever they appear. |
| `studio-detail.webp` | Bottom-left crop of a concept render of a salon interior. The original carries another brand's signage on the back wall; the crop excludes it. |
| `dope-detangler.png`, `dope-oil.png` | **Withheld.** Branded LUXE LOCKS and NOURÉVA respectively. |
| `logo-options/*` | The three logo directions from the brand package, for the client to choose between. |

No image on this site is a photograph of a Bare Roots client, and none claims to
be.
