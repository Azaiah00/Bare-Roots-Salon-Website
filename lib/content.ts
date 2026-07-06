// ---------- SERVICES (3 tabbed menus) ----------
export type Service = { name: string; price: string; dur: string; desc: string };
export type ServiceTab = { id: string; label: string; items: Service[] };

export const SERVICE_TABS: ServiceTab[] = [
  {
    id: "loc",
    label: "Loc Artistry",
    items: [
      { name: "Micro Locs", price: "From $1,000", dur: "Consultation First · 3–5in+", desc: "The pinnacle of loc artistry. Two-strand-twist micro installs, custom-sized and parted, built to last a lifetime." },
      { name: "Starter Locs", price: "From $185", dur: "165 min · Steam · Coils/Twists", desc: "Traditional starter locs with a steam cleanse, conditioning, detangle and loc foundation." },
      { name: "Traditional Retwist", price: "From $120", dur: "90 min · Express", desc: "Steam cleanse, conditioning, traditional retwist and a style to refresh your crown." },
      { name: "Loc Scalp Therapy", price: "$140", dur: "150 min · Hydration", desc: "Hydration steam cleanse, infused scalp treatment and full loc maintenance." },
      { name: "Loc Detox Soak", price: "From $150", dur: "165 min · Clarify", desc: "Clarifying soak, hydration steam cleanse and deep conditioning to revive your locs." },
      { name: "Creative Loc Styles", price: "From $40", dur: "90 min · Petals · Curls · Rods", desc: "Petals, curls, rod sets and loc enhancements for occasions that deserve a statement." },
    ],
  },
  {
    id: "recovery",
    label: "Hair Recovery & Wellness",
    items: [
      { name: "Hair Recovery Consultation", price: "Book", dur: "In-Studio · Holistic Scan", desc: "A full assessment of thinning, alopecia and scalp health — with a personalized recovery plan built from the inside out." },
      { name: "Virtual Hair Health", price: "Book", dur: "Remote · Anywhere", desc: "Can't make it in? A virtual scalp & hair-health appointment to start your recovery journey from home." },
      { name: "Scalp Therapy Ritual", price: "$140", dur: "150 min · Restorative", desc: "Steam hydration, infused treatment and scalp stimulation to create the healthy foundation hair needs to grow." },
      { name: "Scalp Scrub", price: "$30", dur: "20 min · Detox", desc: "An invigorating scalp scrub that cleanses, exfoliates and revitalizes the root of it all." },
      { name: "Specialty Treatments", price: "From $30", dur: "Tailored", desc: "Targeted restorative treatments prescribed during your consultation for your unique needs." },
      { name: "Wellness + Product Plan", price: "Custom", dur: "Inside-Out", desc: "A pairing of in-salon therapy and take-home product so your results keep growing between visits." },
    ],
  },
  {
    id: "natural",
    label: "Natural Styling & Color",
    items: [
      { name: "Silk Press / Blow Out", price: "From $110", dur: "105 min · Shampoo · Trim", desc: "Shampoo, blow dry, trim and treatment for a flawless, healthy silk finish." },
      { name: "Two-Strand Twist", price: "From $115", dur: "120 min · Hydration", desc: "Hydration steam cleanse, conditioning, detangle and your desired twist style." },
      { name: "Keratin Treatment", price: "From $135", dur: "165 min · Smoothing", desc: "A smoothing keratin treatment for manageable, frizz-free, healthy movement." },
      { name: "Color Services", price: "Varies", dur: "Consultation First", desc: '"Color makes the world better." Custom loc and natural-hair color with a hydration cleanse and treatment.' },
      { name: "Basic Crochet", price: "From $115", dur: "165 min · Protective", desc: "Protective crochet styling installed with care and precision." },
      { name: "Mini Twist", price: "From $360", dur: "300 min · Detailed", desc: "Intricate mini two-strand twists — a labor of love for long-lasting definition." },
    ],
  },
];

// ---------- GALLERY ----------
export type GalItem = { img: string; cap: string; span?: "tall" | "wide" };
export const GALLERY: GalItem[] = [
  { img: "/assets/gal-microlocs.png", cap: "Micro Locs · Gold Adorned", span: "tall" },
  { img: "/assets/gal-sisterlocs.png", cap: "Sisterlocs" },
  { img: "/assets/gal-silkpress.png", cap: "Silk Press Perfection", span: "wide" },
  { img: "/assets/gal-loccolor.png", cap: "Loc Color" },
  { img: "/assets/gal-scalptherapy.png", cap: "Scalp Therapy" },
  { img: "/assets/gal-creativeloc.png", cap: "Creative Loc Styling", span: "tall" },
  { img: "/assets/gal-regrowth.png", cap: "Recovery Journey · Regrowth", span: "wide" },
  { img: "/assets/gal-twists.png", cap: "Two-Strand Twists" },
];

// ---------- TESTIMONIALS (rotating) ----------
export type Testimonial = { quote: string; who: string };
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I came in with thinning edges and no hope. Six months with Iisha and my hair is growing back — and Sabrina keeps my locs looking like art. Bare Roots didn't just do my hair. They gave me myself back.",
    who: "Destiny R. · Richmond, VA",
  },
  {
    quote:
      "Sabrina's micro locs are unmatched. Every part is precise, every install is intentional. I've never had my crown treated with this much care and artistry.",
    who: "Amara T. · Henrico, VA",
  },
  {
    quote:
      "The Root Recovery Method changed everything. Iisha explained the why behind my hair loss and built a plan that actually worked. This is science and soul under one roof.",
    who: "Jasmine W. · Short Pump, VA",
  },
  {
    quote:
      "From the gold-lit studio to the way they teach you to care for your own hair — Bare Roots feels like a fashion house, not a salon. Worth every mile of the drive.",
    who: "Nia B. · Chesterfield, VA",
  },
];

// ---------- ACADEMY ----------
export type Course = { kind: string; title: string; desc: string; price: string };
export const COURSES: Course[] = [
  { kind: "Masterclass", title: "Micro Loc Foundations", desc: "A hands-on professional course in sizing, parting and installing flawless micro locs that last.", price: "$497" },
  { kind: "Workshop", title: "Loving Your Natural Hair", desc: "For everyday clients — learn to cleanse, moisturize and style your natural hair with confidence.", price: "$97" },
  { kind: "Certification", title: "Hair Recovery Basics", desc: "Understand the science of hair loss and scalp health, and how to support regrowth from the inside out.", price: "$297" },
];

// ---------- ROOT RECOVERY METHOD ----------
export const RECOVERY_STEPS = [
  { no: "01", title: "Scan & Assess", desc: "A holistic hair, scalp and body-health scan uncovers the real cause behind your hair loss — not just the surface." },
  { no: "02", title: "Recovery Plan", desc: "A personalized inside-out protocol: in-salon therapy, wellness guidance and DOPE HAIR product prescriptions." },
  { no: "03", title: "Restore", desc: "Scalp therapy rituals, targeted treatments and nourishment that reawaken dormant follicles and calm the scalp." },
  { no: "04", title: "Grow & Maintain", desc: "We track your regrowth and keep you rooted with maintenance, education and a routine you can own at home." },
];

// ---------- BUSINESS FACTS ----------
export const BUSINESS = {
  name: "Bare Roots",
  street: "8030 W Broad St #117",
  city: "Henrico",
  region: "VA",
  zip: "23294",
  addressFull: "8030 W Broad St #117, Henrico, VA 23294",
  hours: "Wed 1–6 · Thu 11–9 · Fri 11–6:30 · Sat 11–6",
  phones: ["(804) 397-3340", "(804) 615-4054"],
  iishaIG: "@i.c.beautybrand",
  sabrinaIG: "@ladyybri_xo",
  glossgenius: "https://50secretsofhair.glossgenius.com",
  geo: { lat: 37.6478, lng: -77.5502 },
};
