/**
 * BARE ROOTS — the single source of truth for who, where and when.
 *
 * PROVENANCE RULE. Every value in this file traces to a primary source recorded
 * in RESEARCH-DOSSIER.md. Nothing here may be invented or "improved". If a fact
 * is not verified it does not belong in this file — it belongs behind a
 * `needs-confirmation` flag (see lib/services.ts) or in ASSETS-OWED.md.
 *
 * Captured 2026-09-20 from the Bare Roots brand package prepared by
 * Couture House Co. and from the two artists' own public profiles.
 */

export const SITE = {
  name: "Bare Roots",
  /** The descriptor lock-up. Not a sentence — three words, three beats. */
  descriptor: "Natural · Luxury · Culture",
  /** Primary tagline, approved set, BARE-ROOTS-Brand-Identity.md §4. */
  tagline: "Rooted in culture. Crowned in gold.",

  /**
   * The brand promise. Used once, on the home page. Saying it twice spends it.
   */
  promise:
    "We don't just do your hair. We return you to your roots — and crown them.",

  url: "https://bareroots.salon",

  description:
    "Richmond's luxury natural-hair house, where holistic hair recovery meets master loc artistry. Micro locs, sisterlocs, starter locs, scalp therapy, silk press and colour — in Henrico, VA.",

  /**
   * The two masters. Bare Roots is a merger of two established practices, not a
   * startup — the site has to carry both names without flattening either.
   */
  artists: [
    {
      id: "iisha",
      name: "Iisha",
      role: "Holistic Hair Recovery Practitioner & Educator",
      short: "Hair recovery & wellness",
      /** Verified: BARE-ROOTS-Brand-Identity.md §2. */
      bio: "Brooklyn-born, Richmond-rooted. Iisha grows hair from the inside out — treating thinning, alopecia and scalp health through wellness, science and soul rather than covering it up.",
      phone: "(804) 397-3340",
      phoneHref: "tel:+18043973340",
      smsHref: "sms:+18043973340",
      instagram: "@i.c.beautybrand",
      instagramUrl: "https://instagram.com/i.c.beautybrand",
      /** Iisha's own accessory line. Not yet shipping — see lib/products.ts. */
      subBrand: "DOPE HAIR",
      photo: "/img/artist-iisha.png",
      disciplines: ["recovery"] as const,
    },
    {
      id: "sabrina",
      name: "Sabrina Sutton",
      role: "Creative Loc Artist & Educator",
      short: "Loc artistry & natural styling",
      bio: "A meticulous artist of micro locs, sisterlocs, traditional locs, colour and silk press. Every part is measured, every install is intentional, and every crown is built to last.",
      phone: "(804) 615-4054",
      phoneHref: "tel:+18046154054",
      smsHref: "sms:+18046154054",
      instagram: "@ladyybri_xo",
      instagramUrl: "https://instagram.com/ladyybri_xo",
      subBrand: "Custom Wraps",
      photo: "/img/artist-sabrina.png",
      disciplines: ["loc", "natural"] as const,
    },
  ],

  address: {
    street: "8030 W Broad St",
    unit: "#117",
    city: "Henrico",
    region: "VA",
    regionName: "Virginia",
    postalCode: "23294",
    country: "US",
  },

  /**
   * Approximate — derived from the W Broad St corridor, not from a surveyed
   * pin. Confirm against the Google Business listing before launch.
   * See ASSETS-OWED.md.
   */
  geo: { lat: 37.6478, lng: -77.5502, precision: "approximate" as const },

  /**
   * Sunday-first, seven entries, "HH:MM" 24-hour or null for closed.
   * THE ORDERING IS LOAD-BEARING: lib/db.ts indexes this array directly by
   * `getUTCDay()`. Do not sort it, do not start it on Monday.
   * Source: Bare Roots README — "Wed 1–6 · Thu 11–9 · Fri 11–6:30 · Sat 11–6".
   */
  hours: [
    { day: "Sunday", short: "Sun", open: null, close: null },
    { day: "Monday", short: "Mon", open: null, close: null },
    { day: "Tuesday", short: "Tue", open: null, close: null },
    { day: "Wednesday", short: "Wed", open: "13:00", close: "18:00" },
    { day: "Thursday", short: "Thu", open: "11:00", close: "21:00" },
    { day: "Friday", short: "Fri", open: "11:00", close: "18:30" },
    { day: "Saturday", short: "Sat", open: "11:00", close: "18:00" },
  ] as const,

  /**
   * Sabrina's real, live booking page. Every CTA falls back to this so the site
   * converts on day one, before the custom portal has a backend.
   */
  booking: "https://50secretsofhair.glossgenius.com",
  bookingLabel: "Book with Sabrina on GlossGenius",

  /**
   * The in-salon professional retail line they already carry.
   * Not owned by Bare Roots — sold in the studio and shoppable online.
   */
  retailPartner: {
    name: "Inflúance Hair Care",
    url: "https://influancehaircare.com",
  },

  areaServed: [
    "Richmond",
    "Henrico",
    "Glen Allen",
    "Short Pump",
    "Chesterfield",
  ],

  /** Deliberately excludes any claim we cannot evidence. */
  amenities: [
    "Private studio suite",
    "Consultation-first booking",
    "Holistic scalp & hair assessment",
    "In-salon professional retail",
    "Education & masterclasses",
  ],
} as const;

/* ---------------------------------------------------------------- derived */

export const ADDRESS_ONE_LINE = `${SITE.address.street} ${SITE.address.unit}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${SITE.name}, ${ADDRESS_ONE_LINE}`,
)}`;

export const OPEN_DAYS = SITE.hours.filter((h) => h.open !== null);

/** "1:00 PM" from "13:00". Hand-rolled so no locale can surprise us. */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${suffix}`;
}

/** "Wed 1:00 PM – 6:00 PM" */
export function formatDayHours(h: (typeof SITE.hours)[number]): string {
  if (h.open === null || h.close === null) return "Closed";
  return `${formatTime(h.open)} – ${formatTime(h.close)}`;
}

export const HOURS_SUMMARY = "Wednesday – Saturday, by appointment";

/** Stated in one place so the shop, the drawer and the checkout agree. */
export const FREE_SHIPPING_COPY = "Flat $6 shipping, free over $75, or collect in studio.";

/** The primary line for the salon. Iisha takes recovery enquiries. */
export const PRIMARY_PHONE = SITE.artists[0].phone;
export const PRIMARY_PHONE_HREF = SITE.artists[0].phoneHref;

export type Artist = (typeof SITE.artists)[number];
export function artistById(id: string): Artist | undefined {
  return SITE.artists.find((a) => a.id === id);
}

/* ------------------------------------------------------------------- nav */

export const NAV: { href: string; label: string }[] = [
  { href: "/services", label: "Services" },
  { href: "/recovery", label: "Hair Recovery" },
  { href: "/work", label: "Work" },
  { href: "/house", label: "The House" },
  { href: "/academy", label: "Academy" },
  { href: "/shop", label: "Shop" },
  { href: "/visit", label: "Visit" },
];

export const FOOTER_NAV: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "The House",
    links: [
      { href: "/house", label: "Our story" },
      { href: "/house#artists", label: "The two masters" },
      { href: "/work", label: "Selected work" },
      { href: "/journal", label: "Journal" },
      { href: "/visit", label: "Visit the studio" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services", label: "Full menu" },
      { href: "/services#loc", label: "Loc artistry" },
      { href: "/recovery", label: "Root Recovery Method" },
      { href: "/services#natural", label: "Natural styling & colour" },
      { href: "/academy", label: "Academy" },
    ],
  },
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All products" },
      { href: "/shop?line=influance", label: "Inflúance" },
      { href: "/shop?line=dope", label: "DOPE HAIR" },
      { href: "/wraps", label: "Custom wraps" },
      { href: "/cart", label: "Your bag" },
    ],
  },
  {
    title: "Booking",
    links: [
      { href: "/book", label: "Book an appointment" },
      { href: "/portal", label: "Client portal" },
      { href: "/faq", label: "FAQ" },
      { href: "/policies", label: "Policies" },
    ],
  },
];
