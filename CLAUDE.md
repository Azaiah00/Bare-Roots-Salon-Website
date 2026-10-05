# Bare Roots — repo guide

Bare Roots is a luxury natural-hair house at **8030 W Broad St #117, Henrico, VA
23294**, formed by the merger of two established practices sharing one studio
suite: **Iisha** (holistic hair recovery) and **Sabrina Sutton** (creative loc
artistry). Built by Couture House Co.

**Read `DESIGN.md` before touching any styling, and `RESEARCH-DOSSIER.md` before
touching any copy or fact. Both live at the repo root.** `ASSETS-OWED.md` is the
list of everything the client still has to supply before this can be published.

---

## Stack

Next.js 14 App Router, TypeScript, Tailwind v3 with tokens in
`tailwind.config.ts`, self-hosted variable fonts via `next/font/local`.

**There is no motion library and that is deliberate** — motion is
IntersectionObserver plus CSS transitions, `position: sticky` and one rAF loop,
which keeps the heaviest route at 119 KB of first-load JS. `framer-motion` is
still listed as a dependency from the earlier build and is imported nowhere, so
it costs nothing in the bundle; removing it from `package.json` is safe and
optional. See DESIGN.md §4.0 for the full argument, including when to reverse it.

**No new dependency was added to this build.** `npm install` on an unchanged
lockfile is all that is needed to run it.

---

## The rules that matter

1. **Token-only values.** No colour, size, radius, easing or duration outside
   `tailwind.config.ts`. `gold #C9A15A` is a **dark-ground colour** — it
   measures 2.27:1 on paper and is unreadable there. On light grounds use
   `bronze-ink`, or `bronze` for display type at 24px and above.
2. **One easing curve**, `cubic-bezier(.22,1,.36,1)`, and three durations.
3. **Every `h1`/`h2` is a phrase plus one italic accent word** — `<Accent>` on
   light grounds, `<AccentDark>` on dark. Two components, not one prop, because
   picking the wrong one is a contrast failure.
4. **Section numbers are data**, passed to `SectionHead`, never typed inline.
5. **Real facts only.** Nothing invented. A fact we do not have gets a
   `needs-confirmation` flag, a `PhotoSlot` with the shot it needs, or a line in
   `ASSETS-OWED.md` — never a plausible guess.
6. **No invented reviews, ever.** The three in `lib/content.ts` are marked
   `status: "placeholder"` and render with a visible flag. A fabricated
   testimonial on a site selling $1,000 installs is both dishonest and E-E-A-T
   poison. Replace them with real ones and flip the flag.
7. **No emoji in client-facing content**, anywhere. `npm run audit:a11y` fails
   the build if one reaches rendered text. Use `components/ui/Icon.tsx`.
8. **Reduced motion is honoured twice** — a CSS kill block *and* a JS bail.
   Either alone is a bug waiting for the other to be edited.
9. **Hierarchy is never expressed by opacity.** Use `ink-soft`, `cream-dim`,
   `ink-mid`.
10. **Alt text doubles as the lightbox caption**, so it is written as a sentence.

---

## Where things live

```
app/
  layout.tsx            Fonts, metadata, JSON-LD, the provider stack
  page.tsx              Home — the ground rhythm is set here
  services/ recovery/ work/ house/ academy/ visit/ faq/ policies/ journal/
  shop/ shop/[slug]/ wraps/ cart/ checkout/
  book/                 The five-step booker
  login/ portal/ portal/client/ portal/stylist/ portal/owner/
  globals.css           The machine-readable twin of DESIGN.md §1–§4
  fonts/                Three self-hosted woff2 files

lib/
  site.ts               NAP, hours, the two artists, nav — the single source of truth
  services.ts           The real menu: price, priceStatus, duration, artist
  products.ts           Inflúance (shoppable) and DOPE HAIR (waitlist)
  content.ts            Work, reviews, the method, FAQs, policies, journal
  db.ts                 THE DATA LAYER — demo data, availability, cart maths
  schema.ts             All JSON-LD builders
  auth.tsx              Demo role context. No persistence, by design.
  hooks.ts dates.ts cn.ts

components/
  ui/                   Section, PageHero, Button, Reveal, PhotoSlot, PriceTag,
                        Accordion, Icon (the hand-drawn icon set)
  brand/                Wordmark, GoldParticles, RootDraw, Marquee
  chrome/               Header, Footer, MobileBookBar, DemoBanner
  home/ work/ book/ shop/ cart/ portal/
  ExitOffer.tsx         The gamified capture offer

scripts/                audit-contrast · audit-a11y · audit-flow · frames
public/img/             All photography, WebP, versioned by filename
public/img/logo-options/ The three logo directions, for the client to choose
```

---

## The booking portal

`/book` is a five-step booker with the price and duration visible at every step
— in a sticky panel on desktop and a fixed bar on mobile. Availability is real:
hours-aware, **per-artist** (two chairs run independently), and it refuses to
offer a start the service cannot finish inside. Add an add-on and the days it no
longer fits into grey out on their own. Every slot states when you are *out* of
the chair.

`/login` offers four one-click demo accounts — client, Iisha, Sabrina, owner.
No password is checked. `/portal/client` is the client view with the photo
progress journey. `/portal/stylist` is one artist's own chair. `/portal/owner`
is both books, every client, revenue by chair and deposits outstanding.

**Role separation is enforced in the data layer, not the layout.**
`listAppointments({ clientId?, artist? })` is the whole mechanism: the client
portal passes a `clientId`, a stylist passes an `artist`, the owner passes
neither. That is the same shape a row-level security policy will take.

`lib/auth.tsx` is a React context with **no persistence by design** — a fake
credential should never be written to anyone's device, and a session that
survives a refresh invites someone to mistake this for a real login.
`Guard.tsx` gates the private routes. Neither is security; both are shaped so
that swapping in Supabase Auth is a change to `auth.tsx` alone.

Every portal route is `noindex` in its own metadata, excluded in `robots.ts`,
absent from `sitemap.ts`, and carries an `X-Robots-Tag` header from
`netlify.toml`. Four locks, because a dashboard in a search result is the kind
of mistake nobody notices for six months.

**Going live is a backend-only change.** Replace the arrays in `lib/db.ts` with
queries and keep every exported signature identical. Look for `TODO: Supabase`,
`TODO: Stripe` and `TODO: Shopify`. There is deliberately **no card field
anywhere** — the deposit is stated as three numbers and the checkout explains
why the field is absent.

---

## Definition of done

```bash
npm run build          # must compile with zero errors
npm start              # in one shell
npm run audit          # lint + contrast + a11y + flow, in another
npm run frames         # then LOOK at .frames/
```

- `audit:contrast` re-reads the hexes out of `tailwind.config.ts` so the table
  in DESIGN.md cannot silently drift from what ships.
- `audit:a11y` runs against the rendered DOM at 375/768/1024/1440: computed
  contrast against the real painted background, alt text, heading order, one
  `h1`, one `<main>`, tap targets, horizontal overflow, duplicate ids, shipped
  placeholder copy and emoji. **Currently: 0 problems.**
- `audit:flow` is 73 end-to-end assertions: the booker's running total, real
  availability, the cart maths, the demo checkout, role separation, unique
  titles and descriptions, the JSON-LD contents, sitemap, robots, reduced
  motion, every page with JS disabled, and every internal link.
  **Currently: 73 passed, 0 failed.**
- `frames` captures each route at four widths and five scroll depths.
  **This is not optional.** The two worst bugs in this build — the inflated work
  grid and the sideways-scrolling marquee — were invisible to every other check
  and obvious in a frame.

The audit scripts need Playwright, which is **not** a dependency:
`npm i -D playwright && npx playwright install chromium`. They accept
`AUDIT_BASE` and `PW_EXECUTABLE` environment variables.

---

## Known traps on this machine

- **`npm install` inside a OneDrive-synced folder** hangs and leaves lock files
  git cannot unlink. Clone to `C:\dev\` if it misbehaves.
- **A stale `next start`** serves an old build whose CSS chunk no longer exists;
  every page then reports phantom contrast and tap-target failures. Kill it
  first.
- **`next/font/google` fetches at build time** and fails in an offline or
  firewalled container. The fonts here are local files for that reason.
- See DESIGN.md §9 for the framework-level traps.
