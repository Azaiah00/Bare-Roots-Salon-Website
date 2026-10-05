/**
 * The retail shelf.
 *
 * Two lines, on purpose, with very different footing:
 *
 *   INFLÚANCE — the professional line already carried in the studio. Real
 *   products, real prices captured from influancehaircare.com. Bare Roots earns
 *   on every take-home. Photography is owed by the client.
 *
 *   DOPE HAIR — Iisha's own accessory brand, described in the brand package as
 *   FORTHCOMING. It is presented as a waitlist, not a live store, because
 *   selling a product that does not ship yet is how a salon loses a client it
 *   had already won. Prices are placeholders and are flagged as such.
 *
 * IMAGE INTEGRITY. Three of the concept renders delivered with the brand
 * package carry OTHER brands' names printed on the product:
 *   dope-detangler.png  → reads "LUXE LOCKS"
 *   dope-oil.png        → reads "NOURÉVA"
 *   salon-interior.png  → signage reads "MELANIN & BLOOM"
 * None of them ship. The two products render an honest PhotoSlot instead, and
 * every one is listed in ASSETS-OWED.md. Do not "just use it, nobody reads the
 * label" — the client will, on the call, in front of you.
 */

export type ProductLine = "influance" | "dope";

export type Product = {
  slug: string;
  line: ProductLine;
  name: string;
  /** One line for the card. */
  blurb: string;
  /** Two or three sentences for the product page. */
  detail: string;
  price: number;
  priceStatus: "from-partner" | "needs-confirmation";
  size?: string;
  badge?: string;
  /** null renders a PhotoSlot carrying `photoBrief`. */
  image: string | null;
  photoBrief: string;
  /** Waitlist products cannot be added to the bag. */
  available: boolean;
  ingredients?: string[];
};

export const PRODUCTS: Product[] = [
  /* ------------------------------------------------------------- Inflúance */
  {
    slug: "deep-cleansing-shampoo",
    line: "influance",
    name: "Deep Cleansing Shampoo",
    blurb: "Clarifies build-up without stripping the scalp",
    detail:
      "The reset. Lifts product build-up, hard-water minerals and oil from the scalp so a treatment can actually reach it. This is the bottle Iisha reaches for before any recovery protocol begins.",
    price: 13,
    priceStatus: "from-partner",
    badge: "Bestseller",
    image: null,
    photoBrief:
      "Bottle upright on the warm-paper ground, three-quarter view, single soft window light from the left, shallow depth of field.",
    available: true,
  },
  {
    slug: "hair-scalp-conditioner",
    line: "influance",
    name: "Hair & Scalp Conditioner",
    blurb: "Nourishes root to ends",
    detail:
      "A conditioner built for the scalp as much as the strand — which is the whole point, because hair grows out of skin, not out of the mirror.",
    price: 14.95,
    priceStatus: "from-partner",
    size: "4oz",
    image: null,
    photoBrief: "Same set-up and lighting as the shampoo. The line must photograph as a family.",
    available: true,
  },
  {
    slug: "glazed-edges-4oz",
    line: "influance",
    name: "Glazed Edges",
    blurb: "Sleek, laid and still laid at hour eight",
    detail:
      "Hold without the flake or the white cast. Works on locs, twists and pressed hair, and washes out without a second shampoo.",
    price: 23.95,
    priceStatus: "from-partner",
    size: "4oz",
    badge: "Bestseller",
    image: null,
    photoBrief: "Open jar, lid beside it, top-down on warm paper with a brush laid at a diagonal.",
    available: true,
  },
  {
    slug: "glazed-edges-1oz",
    line: "influance",
    name: "Glazed Edges — Travel",
    blurb: "The 1oz that lives in your bag",
    detail: "The same formula in a size that survives a handbag and a flight.",
    price: 9,
    priceStatus: "from-partner",
    size: "1oz",
    image: null,
    photoBrief: "Held in hand for scale, against the forest ground.",
    available: true,
  },
  {
    slug: "curling-wax",
    line: "influance",
    name: "Curling Wax",
    blurb: "Defines curls and coils, no crunch",
    detail:
      "For rod sets, petals and finger coils. Enough grip to hold the shape, soft enough that the hair still moves.",
    price: 14.95,
    priceStatus: "from-partner",
    size: "4oz",
    image: null,
    photoBrief: "Jar three-quarter view with a rod set just out of focus behind it.",
    available: true,
  },
  {
    slug: "firm-holding-spray",
    line: "influance",
    name: "Firm Holding Spray",
    blurb: "All-day hold that brushes out",
    detail: "The finishing step on a style you need to survive a full day and a photograph.",
    price: 29.95,
    priceStatus: "from-partner",
    size: "11oz",
    image: null,
    photoBrief: "Tall bottle, low angle, hard-ish light to catch the shoulder of the bottle.",
    available: true,
  },
  {
    slug: "banana-cocoa-body-butter",
    line: "influance",
    name: "Banana & Cocoa Body Butter",
    blurb: "Deep moisture, head to toe",
    detail:
      "The one clients buy at the desk on the way out. Whipped, rich, and it does not sit on the skin.",
    price: 27,
    priceStatus: "from-partner",
    badge: "It's Natural",
    image: null,
    photoBrief: "Open tub, swirl visible, top-down on linen with cocoa nibs scattered.",
    available: true,
  },
  {
    slug: "coconut-milk-body-butter",
    line: "influance",
    name: "Coconut Milk Body Butter",
    blurb: "Rich, whipped hydration",
    detail: "The lighter of the two butters. Same richness, cleaner finish.",
    price: 27,
    priceStatus: "from-partner",
    badge: "It's Natural",
    image: null,
    photoBrief: "Pair it with the banana & cocoa tub in one frame for the line shot.",
    available: true,
  },

  /* ------------------------------------------------------------- DOPE HAIR */
  {
    slug: "dope-gold-pick",
    line: "dope",
    name: "The Gold Pick",
    blurb: "Solid afro pick, gold finish, crown mark",
    detail:
      "The first piece of the line. A weighted pick that is meant to sit on the vanity, not hide in a drawer — the fist and the crown are the whole thesis of DOPE HAIR in one object.",
    price: 18,
    priceStatus: "needs-confirmation",
    badge: "Waitlist",
    image: "/img/dope-pick.webp",
    photoBrief: "Concept render approved. Reshoot against the forest ground once the sample arrives.",
    available: false,
  },
  {
    slug: "dope-detangler",
    line: "dope",
    name: "The Detangler",
    blurb: "Signature detangling brush",
    detail:
      "Flexible bristles set in a cushioned pad, sized for a full head of coils. Built for the wash-day nobody enjoys.",
    price: 34,
    priceStatus: "needs-confirmation",
    badge: "Waitlist",
    image: null,
    photoBrief:
      "NEEDS NEW RENDER — the supplied concept image is branded LUXE LOCKS and cannot ship. Reshoot: plum handle, gold collar, DOPE HAIR wordmark in gold on the handle, three-quarter view on warm paper.",
    available: false,
  },
  {
    slug: "dope-root-oil",
    line: "dope",
    name: "The Root Oil",
    blurb: "Scalp and growth serum",
    detail:
      "Iisha's own blend, built to sit behind the Root Recovery Method rather than replace it. Formulation is not final and no growth claim is made until it is.",
    price: 28,
    priceStatus: "needs-confirmation",
    badge: "Waitlist",
    image: null,
    photoBrief:
      "NEEDS NEW RENDER — the supplied concept image is branded NOURÉVA and cannot ship. Reshoot: amber dropper bottle, plum label, DOPE HAIR wordmark, botanical shadow on warm paper.",
    available: false,
  },
  {
    slug: "dope-collection",
    line: "dope",
    name: "The DOPE Collection",
    blurb: "Brush, pick, comb and oil, boxed",
    detail:
      "The full set in the plum-and-gold box. The piece the line will be photographed in and gifted from.",
    price: 74,
    priceStatus: "needs-confirmation",
    badge: "Waitlist",
    image: "/img/dope-banner.webp",
    photoBrief: "Concept render approved — correctly branded DOPE HAIR.",
    available: false,
  },
];

/* -------------------------------------------------------------- the lines */

export const LINES: {
  id: ProductLine;
  name: string;
  owner: string;
  lead: string;
  status: "shoppable" | "waitlist";
}[] = [
  {
    id: "influance",
    name: "Inflúance",
    owner: "Carried in studio",
    lead: "The professional line already on our shelf. What we use on you is what you take home — no bait, no substitution.",
    status: "shoppable",
  },
  {
    id: "dope",
    name: "DOPE HAIR",
    owner: "By Iisha",
    lead: "Iisha's own line of tools and scalp care. Not shipping yet — join the list and you will hear before anyone else.",
    status: "waitlist",
  },
];

/* ----------------------------------------------------------------- helpers */

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsInLine(line: ProductLine): Product[] {
  return PRODUCTS.filter((p) => p.line === line);
}

export function priceLabel(p: Product): string {
  return `$${p.price.toFixed(2).replace(/\.00$/, "")}`;
}
