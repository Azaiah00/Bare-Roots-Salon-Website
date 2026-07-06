export type StoreId = "inf" | "dope";

export type Product = {
  n: string; // name
  d: string; // one-line description
  p: number; // price
  img?: string; // optional image (fallback tile when absent)
  b?: string; // badge
};

// Inflúance in-salon retail line. Product photos ship later
// (influancehaircare.com/shop) — cards render as luxe fallback tiles for now.
export const INFLUANCE: Product[] = [
  { n: "Banana & Cocoa Body Butter", d: "Deep moisture, head to toe", p: 27, b: "It's Natural" },
  { n: "Coconut Milk Body Butter", d: "Rich, whipped hydration", p: 27, b: "It's Natural" },
  { n: "Curling Wax 4oz", d: "Define curls & coils", p: 14.95 },
  { n: "Deep Cleansing Shampoo", d: "Clarify & refresh the scalp", p: 13, b: "Bestseller" },
  { n: "Firm Holding Spray 11oz", d: "All-day hold, no crunch", p: 29.95 },
  { n: "Glazed Edges 4oz", d: "Sleek, laid, lasting edges", p: 23.95, b: "Bestseller" },
  { n: "Hair & Scalp Conditioner 4oz", d: "Nourish roots to ends", p: 14.95 },
  { n: "Glazed Edges 1oz", d: "Travel-size edge control", p: 9 },
];

// DOPE HAIR — Iisha's own accessory brand. Flagship pieces have imagery.
export const DOPE: Product[] = [
  { n: "The Detangler", d: "Signature detangling brush", p: 34, img: "/assets/dope-detangler.png", b: "Flagship" },
  { n: "Gold Pick", d: "Solid afro pick, gold finish", p: 18, img: "/assets/dope-pick.png" },
  { n: "The Root Oil", d: "Scalp & growth serum", p: 28, img: "/assets/dope-oil.png", b: "New" },
  { n: "DOPE Collection", d: "The full brush + pick + oil set", p: 74, img: "/assets/dope-banner.png", b: "Bundle" },
  { n: "Edge & Define Brush", d: "Dual-sided edge brush", p: 22 },
  { n: "Satin Wide-Tooth Comb", d: "Gentle, breakage-free", p: 16 },
  { n: "Scalp Massager", d: "Stimulate & de-stress", p: 14 },
  { n: "The Wrap Cloth", d: "Satin-lined finishing wrap", p: 24 },
];

export const STORES: { id: StoreId; label: string; items: Product[] }[] = [
  { id: "inf", label: "Inflúance · In-Salon Line", items: INFLUANCE },
  { id: "dope", label: "DOPE HAIR · by Iisha", items: DOPE },
];
