/**
 * The service menu. One entry per bookable service.
 *
 * HONEST PRICING. Every price carries a `priceStatus`. Nothing renders as a
 * confirmed price until Iisha and Sabrina have signed off on it — the UI shows
 * a visible marker for anything still pending. Do not silently "clean up" a
 * price by removing its flag. See DESIGN.md §7 and ASSETS-OWED.md.
 *
 * Durations drive real availability in lib/db.ts. A wrong duration is a
 * double-booking, so treat them as facts, not decoration.
 */

export type PriceStatus =
  /** Confirmed in writing by the artist. */
  | "confirmed"
  /** Taken from the artist's live booking system. Correct as captured. */
  | "from-booking-system"
  /** A placeholder we chose. Must be confirmed before launch. */
  | "needs-confirmation";

export type CategoryId = "loc" | "recovery" | "natural";

export type Service = {
  slug: string;
  name: string;
  category: CategoryId;
  /** Which artist performs it — drives the booker's routing. */
  artist: "iisha" | "sabrina";
  /** Whole dollars, as they price. 0 = quoted at consultation. */
  price: number;
  priceStatus: PriceStatus;
  /** True when `price` is a floor, not a fixed figure. */
  isBasePrice?: boolean;
  /** True when no price can be given without seeing the head first. */
  consultationFirst?: boolean;
  /** Minutes in the chair. Used by availableSlots(). */
  duration: number;
  /** The short line under the name on the menu. */
  blurb: string;
  /** Optional operational note — policy, prep, what is included. */
  note?: string;
  /** Marks the two or three services the business actually runs on. */
  signature?: boolean;
};

export const SERVICE_CATEGORIES: {
  id: CategoryId;
  name: string;
  lead: string;
  artistId: "iisha" | "sabrina";
}[] = [
  {
    id: "loc",
    name: "Loc Artistry",
    lead: "Installs, maintenance and loc styling, by Sabrina. Sizing and parting are decided in consultation, because a grid you cannot live with is a grid you will pay to undo.",
    artistId: "sabrina",
  },
  {
    id: "recovery",
    name: "Hair Recovery & Wellness",
    lead: "Iisha's side of the house. Thinning, alopecia and scalp health, treated from the inside out — assessment first, protocol second, product third.",
    artistId: "iisha",
  },
  {
    id: "natural",
    name: "Natural Styling & Colour",
    lead: "Silk press, twists, crochet, keratin and custom colour on natural hair — finished so the health of the hair survives the style.",
    artistId: "sabrina",
  },
];

export const SERVICES: Service[] = [
  /* ------------------------------------------------------------ loc artistry */
  {
    slug: "micro-locs",
    name: "Micro Locs",
    category: "loc",
    artist: "sabrina",
    price: 1000,
    priceStatus: "confirmed",
    isBasePrice: true,
    consultationFirst: true,
    duration: 480,
    blurb:
      "The pinnacle of the craft. Two-strand-twist micro installs, custom-sized and parted, built to last a lifetime.",
    note: "Consultation required. Starting length 3–5in. Multi-day installs are scheduled in sittings — the grid is designed before a single loc is made.",
    signature: true,
  },
  {
    slug: "starter-locs",
    name: "Starter Locs",
    category: "loc",
    artist: "sabrina",
    price: 185,
    priceStatus: "from-booking-system",
    isBasePrice: true,
    duration: 165,
    blurb:
      "Traditional starter locs with a steam cleanse, conditioning, full detangle and a loc foundation set to your pattern.",
    note: "Coils or twists. The first three months decide the next ten years — we will tell you the truth about your density before we start.",
    signature: true,
  },
  {
    slug: "traditional-retwist",
    name: "Traditional Retwist",
    category: "loc",
    artist: "sabrina",
    price: 120,
    priceStatus: "from-booking-system",
    isBasePrice: true,
    duration: 90,
    blurb:
      "Steam cleanse, conditioning, traditional retwist and a style to refresh your crown.",
    note: "Every 4–6 weeks. Staying on cadence is the difference between a retwist and a repair.",
  },
  {
    slug: "loc-scalp-therapy",
    name: "Loc Scalp Therapy",
    category: "loc",
    artist: "sabrina",
    price: 140,
    priceStatus: "from-booking-system",
    duration: 150,
    blurb:
      "Hydration steam cleanse, infused scalp treatment and full loc maintenance in one sitting.",
  },
  {
    slug: "loc-detox-soak",
    name: "Loc Detox Soak",
    category: "loc",
    artist: "sabrina",
    price: 150,
    priceStatus: "from-booking-system",
    isBasePrice: true,
    duration: 165,
    blurb:
      "A clarifying soak, hydration steam cleanse and deep conditioning to pull years of build-up out of the loc.",
    note: "Recommended twice a year, and always before colour.",
  },
  {
    slug: "creative-loc-styles",
    name: "Creative Loc Styles",
    category: "loc",
    artist: "sabrina",
    price: 40,
    priceStatus: "from-booking-system",
    isBasePrice: true,
    duration: 90,
    blurb:
      "Petals, curls, rod sets and loc enhancements for the occasions that deserve a statement.",
  },

  /* -------------------------------------------------------- recovery & wellness */
  {
    slug: "hair-recovery-consultation",
    name: "Hair Recovery Consultation",
    category: "recovery",
    artist: "iisha",
    price: 0,
    priceStatus: "needs-confirmation",
    consultationFirst: true,
    duration: 60,
    blurb:
      "A full assessment of thinning, alopecia and scalp health — and a recovery plan written for your head, not a category.",
    note: "Every recovery client starts here. Iisha will not prescribe a protocol she has not seen the scalp for.",
    signature: true,
  },
  {
    slug: "virtual-hair-health",
    name: "Virtual Hair Health Session",
    category: "recovery",
    artist: "iisha",
    price: 0,
    priceStatus: "needs-confirmation",
    duration: 45,
    blurb:
      "Not local, or not ready to come in? A remote scalp and hair-health appointment to start the work from where you are.",
  },
  {
    slug: "scalp-therapy-ritual",
    name: "Scalp Therapy Ritual",
    category: "recovery",
    artist: "iisha",
    price: 140,
    priceStatus: "from-booking-system",
    duration: 150,
    blurb:
      "Steam hydration, infused treatment and scalp stimulation — building the foundation hair actually needs in order to grow.",
    signature: true,
  },
  {
    slug: "scalp-scrub",
    name: "Scalp Scrub",
    category: "recovery",
    artist: "iisha",
    price: 30,
    priceStatus: "from-booking-system",
    duration: 20,
    blurb:
      "An invigorating scrub that cleanses, exfoliates and revitalises the root of it all.",
    note: "Add it to any service. Twenty minutes, and the difference is immediate.",
  },
  {
    slug: "specialty-treatment",
    name: "Specialty Treatment",
    category: "recovery",
    artist: "iisha",
    price: 30,
    priceStatus: "needs-confirmation",
    isBasePrice: true,
    duration: 45,
    blurb:
      "Targeted restorative treatments, prescribed during your consultation for what your scalp is actually doing.",
  },

  /* --------------------------------------------------- natural styling & colour */
  {
    slug: "silk-press",
    name: "Silk Press & Blow Out",
    category: "natural",
    artist: "sabrina",
    price: 110,
    priceStatus: "from-booking-system",
    isBasePrice: true,
    duration: 105,
    blurb:
      "Shampoo, blow dry, trim and treatment for a flawless, healthy silk finish that swings.",
    note: "Includes the trim. A silk press over damaged ends is a photograph, not a service.",
  },
  {
    slug: "two-strand-twist",
    name: "Two-Strand Twist",
    category: "natural",
    artist: "sabrina",
    price: 115,
    priceStatus: "from-booking-system",
    isBasePrice: true,
    duration: 120,
    blurb:
      "Hydration steam cleanse, conditioning, full detangle and your twist set, shaped to your face.",
  },
  {
    slug: "keratin-treatment",
    name: "Keratin Treatment",
    category: "natural",
    artist: "sabrina",
    price: 135,
    priceStatus: "from-booking-system",
    isBasePrice: true,
    duration: 165,
    blurb:
      "A smoothing keratin treatment for manageable, frizz-free movement without surrendering the curl pattern.",
  },
  {
    slug: "colour-services",
    name: "Colour Services",
    category: "natural",
    artist: "sabrina",
    price: 0,
    priceStatus: "needs-confirmation",
    consultationFirst: true,
    duration: 240,
    blurb:
      "Custom loc and natural-hair colour with a hydration cleanse and treatment built into the appointment.",
    note: "Quoted at consultation — colour on locs is priced by density and history, never by a menu.",
  },
  {
    slug: "basic-crochet",
    name: "Basic Crochet",
    category: "natural",
    artist: "sabrina",
    price: 115,
    priceStatus: "from-booking-system",
    isBasePrice: true,
    duration: 165,
    blurb:
      "Protective crochet styling installed with care, precision and a tension your edges can live with.",
  },
  {
    slug: "mini-twist",
    name: "Mini Twist",
    category: "natural",
    artist: "sabrina",
    price: 360,
    priceStatus: "from-booking-system",
    isBasePrice: true,
    duration: 300,
    blurb:
      "Intricate mini two-strand twists — a labour of love, and the longest-lasting definition we offer.",
  },
];

/* ------------------------------------------------------------- add-ons */

/**
 * Add-ons the booker offers at step two. Each is a real service that extends
 * the appointment, so availability tightens as they are chosen.
 */
export const ADDON_SLUGS = ["scalp-scrub", "creative-loc-styles"] as const;

/* ------------------------------------------------------------ deposits */

/** Demo figures. // TODO: confirm with the artists before launch. */
export const DEPOSIT = 50;
export const DEPOSIT_STATUS: PriceStatus = "needs-confirmation";
export const CANCELLATION_HOURS = 48;
export const RESCHEDULE_HOURS = 24;

/* ------------------------------------------------------------- helpers */

export function serviceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicesInCategory(id: CategoryId): Service[] {
  return SERVICES.filter((s) => s.category === id);
}

/** "2h 45m" from 165. "45m" from 45. */
export function formatDuration(mins: number): string {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

/** The price as it should read on the page, flag included. */
export function formatPrice(s: Service): string {
  if (s.price === 0) return "Quoted at consultation";
  return s.isBasePrice ? `From $${s.price}` : `$${s.price}`;
}

/** Plain money, for totals. No "from", no words. */
export function money(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

/* ----------------------------------------------------- academy & membership */

export type Course = {
  slug: string;
  kind: "Masterclass" | "Workshop" | "Certification";
  title: string;
  who: string;
  desc: string;
  price: number;
  priceStatus: PriceStatus;
  length: string;
  artist: "iisha" | "sabrina";
};

export const COURSES: Course[] = [
  {
    slug: "micro-loc-foundations",
    kind: "Masterclass",
    title: "Micro Loc Foundations",
    who: "For licensed stylists and locticians",
    desc: "A hands-on professional course in sizing, parting and installing micro locs that survive year three — including the density conversations most stylists avoid having.",
    price: 497,
    priceStatus: "needs-confirmation",
    length: "One full day, in studio",
    artist: "sabrina",
  },
  {
    slug: "loving-your-natural-hair",
    kind: "Workshop",
    title: "Loving Your Natural Hair",
    who: "For everyday clients",
    desc: "Learn to cleanse, moisturise and style your own natural hair with confidence — so the result you leave with is one you can actually keep.",
    price: 97,
    priceStatus: "needs-confirmation",
    length: "Half day, small group",
    artist: "sabrina",
  },
  {
    slug: "hair-recovery-basics",
    kind: "Certification",
    title: "Hair Recovery Basics",
    who: "For stylists adding recovery to their practice",
    desc: "The science of hair loss and scalp health, and how to support regrowth from the inside out without overpromising to a client who is already frightened.",
    price: 297,
    priceStatus: "needs-confirmation",
    length: "Two evenings + assessment",
    artist: "iisha",
  },
];

export const MEMBERSHIP = {
  name: "The Crown Circle",
  price: 65,
  priceStatus: "needs-confirmation" as PriceStatus,
  lead: "For the client on a maintenance cadence. Monthly, cancel any time.",
  perks: [
    "Priority booking — your standing slot, held",
    "One scalp scrub included every month",
    "10% off everything on the retail shelf",
    "Your progress photos, filed and tracked",
    "First access to Academy seats and DOPE HAIR drops",
  ],
};
