/**
 * Editorial content — work, reviews, the method, FAQs, policies, journal.
 *
 * TWO INTEGRITY RULES LIVE IN THIS FILE.
 *
 * 1. NO INVENTED TESTIMONIALS. The four "client reviews" that shipped in the
 *    first draft of this site — Destiny R., Amara T., Jasmine W., Nia B. — were
 *    written by us. They are not real people. A fabricated review on a site
 *    selling $1,000 installs is dishonest and it is E-E-A-T poison the moment
 *    Google matches the text against nothing. They are kept below ONLY with
 *    `status: "placeholder"`, which renders a visible marker, and they must be
 *    replaced with Iisha's and Sabrina's real Google and Instagram reviews
 *    before this site is published. See ASSETS-OWED.md.
 *
 * 2. THE WORK IS NOT THEIR WORK YET. Every image in WORK is a concept render
 *    produced for the pitch, not a photograph of a Bare Roots client. Each
 *    carries `real: false`, which is what drives the honest marker on the
 *    gallery. Swap the file and flip the flag; nothing else changes.
 */

/* ------------------------------------------------------------------- work */

export type WorkItem = {
  slug: string;
  image: string;
  /** Alt text doubles as the lightbox caption, so write it as a sentence. */
  alt: string;
  caption: string;
  category: "loc" | "recovery" | "natural";
  artist: "iisha" | "sabrina";
  /** False = concept render standing in for a photograph of real work. */
  real: boolean;
  /** Links the tile to the service it sells. */
  serviceSlug?: string;
  span?: "tall" | "wide";
};

export const WORK: WorkItem[] = [
  {
    slug: "microlocs-gold",
    image: "/img/work-microlocs.webp",
    alt: "Micro locs finished with small gold cuffs, resting across plum and sage satin.",
    caption: "Micro locs, adorned",
    category: "loc",
    artist: "sabrina",
    real: false,
    serviceSlug: "micro-locs",
    span: "tall",
  },
  {
    slug: "sisterlocs-updo",
    image: "/img/work-sisterlocs.webp",
    alt: "A sculpted sisterloc updo, gathered high and shaped to the face.",
    caption: "Sisterlocs, sculpted",
    category: "loc",
    artist: "sabrina",
    real: false,
    serviceSlug: "starter-locs",
  },
  {
    slug: "loc-colour",
    image: "/img/work-loccolor.webp",
    alt: "Locs graduating from deep brown at the root to warm copper through the length, lit from behind.",
    caption: "Custom loc colour",
    category: "natural",
    artist: "sabrina",
    real: false,
    serviceSlug: "colour-services",
    span: "wide",
  },
  {
    slug: "scalp-therapy",
    image: "/img/work-scalptherapy.webp",
    alt: "A client reclined for a scalp therapy ritual, herbal infusions and warm towels on the tray beside her.",
    caption: "Scalp therapy ritual",
    category: "recovery",
    artist: "iisha",
    real: false,
    serviceSlug: "scalp-therapy-ritual",
  },
  {
    slug: "creative-loc-styling",
    image: "/img/work-creativeloc.webp",
    alt: "A high creative loc style with barrel curls, set in the studio's gilt mirror light.",
    caption: "Creative loc styling",
    category: "loc",
    artist: "sabrina",
    real: false,
    serviceSlug: "creative-loc-styles",
    span: "tall",
  },
  {
    slug: "recovery-journey",
    image: "/img/work-recovery.webp",
    alt: "A client in profile, hand at her nape, edges and hairline filled in after a course of recovery work.",
    caption: "Recovery, month nine",
    category: "recovery",
    artist: "iisha",
    real: false,
    serviceSlug: "hair-recovery-consultation",
    span: "wide",
  },
  {
    slug: "two-strand-twists",
    image: "/img/work-twists.webp",
    alt: "Two-strand twists with defined ends, falling past the shoulder.",
    caption: "Two-strand twists",
    category: "natural",
    artist: "sabrina",
    real: false,
    serviceSlug: "two-strand-twist",
  },
];

/* ---------------------------------------------------------------- reviews */

export type Review = {
  quote: string;
  who: string;
  /** "verified" = quoted from a public review we can link to. */
  status: "verified" | "placeholder";
  source?: string;
  sourceUrl?: string;
};

export const REVIEWS: Review[] = [
  {
    quote:
      "I came in with thinning edges and no hope. Six months later my hair is growing back — and my locs look like art. Bare Roots didn't just do my hair, they gave me myself back.",
    who: "Placeholder — replace with a real review",
    status: "placeholder",
  },
  {
    quote:
      "Every part is precise, every install is intentional. I've never had my crown treated with this much care.",
    who: "Placeholder — replace with a real review",
    status: "placeholder",
  },
  {
    quote:
      "She explained the why behind my hair loss and built a plan that actually worked. Science and soul under one roof.",
    who: "Placeholder — replace with a real review",
    status: "placeholder",
  },
];

export const HAS_VERIFIED_REVIEWS = REVIEWS.some((r) => r.status === "verified");

/* --------------------------------------------------- the Root Recovery Method */

export const RECOVERY_STEPS = [
  {
    no: "01",
    title: "Scan & assess",
    desc: "A holistic hair, scalp and whole-body assessment. We are looking for the cause, not the symptom — because thinning that starts in your thyroid will not be fixed by a serum.",
    detail:
      "Density, breakage pattern, edge line, scalp condition, styling history, medication, stress and diet. Everything is written down, because month six has to be measurable against month one.",
  },
  {
    no: "02",
    title: "Write the plan",
    desc: "A protocol written for your head: what happens in the studio, what happens at home, and what we are watching for at each check-in.",
    detail:
      "In-salon therapy on a cadence, a home routine you can actually keep, and wellness guidance. If the plan needs a doctor rather than a stylist, you will be told that plainly.",
  },
  {
    no: "03",
    title: "Restore",
    desc: "Scalp therapy rituals, targeted treatments and nourishment that calm the scalp and wake dormant follicles back up.",
    detail:
      "Steam hydration, infusions, stimulation and exfoliation — sequenced, not stacked. Restoration is slow on purpose; a scalp that is being rushed will tell on you.",
  },
  {
    no: "04",
    title: "Grow & maintain",
    desc: "Photographed at every visit, tracked in your portal, and handed back to you as a routine you own.",
    detail:
      "Same angle, same distance, same light, every appointment. It is the only honest way to see growth — and the thing that gets people through the months where nothing seems to be happening.",
  },
];

/* -------------------------------------------------------------------- FAQ */

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Do I need a consultation before I book?",
    a: "For micro locs, colour and any recovery work, yes. Sizing, parting and colour on textured hair are priced by density and history, and neither artist will quote a head she has not seen. Everything else can be booked directly.",
  },
  {
    q: "How long does a micro loc install take?",
    a: "Longer than one day. Micro installs are scheduled in sittings, and the exact number depends on your density and the grid we design together at consultation. You will be told the full schedule and the full price before anything starts.",
  },
  {
    q: "Can you help if my hair is thinning or I have alopecia?",
    a: "That is Iisha's entire practice. It starts with a Hair Recovery Consultation — a full scalp and hair-health assessment and a plan written for you. We will tell you honestly what hair care can and cannot do for your situation, including when the right answer is a dermatologist.",
  },
  {
    q: "Do you take clients transferring from another loctician?",
    a: "Yes, and gladly. Start with a consultation so Sabrina can see the grid, the tension and the loc health before quoting. Transfers are often the most rewarding work we do.",
  },
  {
    q: "What is your deposit and cancellation policy?",
    a: "A deposit holds the chair and comes off your balance on the day. We ask for 48 hours' notice to cancel and 24 to reschedule — long services book out weeks ahead, and a same-day cancellation is a day nobody else could take.",
  },
  {
    q: "Do you work on children's hair?",
    a: "On a case-by-case basis, and always with a consultation first. Starter locs on a child are a ten-year decision, and we would rather have that conversation than take the booking.",
  },
  {
    q: "Where are you, and is there parking?",
    a: "8030 W Broad St #117 in Henrico, on the West Broad corridor just outside Richmond. There is free parking on site.",
  },
  {
    q: "Can I buy the products you use on me?",
    a: "Yes. The Inflúance line we use in the studio is on the shelf and in the shop. DOPE HAIR, Iisha's own line, is not shipping yet — join the waitlist and you will hear first.",
  },
];

/* --------------------------------------------------------------- policies */

export type Policy = { slug: string; title: string; body: string[] };

export const POLICIES: Policy[] = [
  {
    slug: "booking-deposits",
    title: "Booking & deposits",
    body: [
      "A deposit is required to hold your appointment and is applied to your balance on the day of service.",
      "Consultation-first services — micro locs, colour and all recovery work — cannot be booked without a completed consultation. This protects you from a quote that changes in the chair.",
      "Long services are scheduled in sittings. You will receive the full schedule in writing before the first sitting begins.",
      "NEEDS CLIENT CONFIRMATION: deposit amount and whether it is refundable.",
    ],
  },
  {
    slug: "cancellations",
    title: "Cancellations & lateness",
    body: [
      "We ask for 48 hours' notice to cancel and 24 hours to reschedule.",
      "Arriving more than 20 minutes late may mean the service has to be shortened or rebooked — the next client's time is not ours to spend.",
      "Text the artist directly if you are running late. We would much rather adjust than lose you.",
      "NEEDS CLIENT CONFIRMATION: late fees, no-show policy.",
    ],
  },
  {
    slug: "preparing",
    title: "Preparing for your appointment",
    body: [
      "Come with your hair free of heavy product and, where possible, detangled. If you are unsure, come as you are and we will handle it.",
      "Bring any prescriptions, supplements or treatments you are using if you are booking recovery work. It matters more than people expect.",
      "Guests and children are welcome in the waiting area, but the studio is small — please tell us in advance.",
    ],
  },
  {
    slug: "products-returns",
    title: "Products & returns",
    body: [
      "Unopened retail products may be returned within 14 days with proof of purchase.",
      "Opened product cannot be returned for hygiene reasons. If something reacts badly with your scalp, tell us — we will make it right.",
      "DOPE HAIR is a waitlist, not a store. Nothing is charged until the line ships.",
      "NEEDS CLIENT CONFIRMATION: returns window and shipping policy.",
    ],
  },
  {
    slug: "privacy",
    title: "Privacy & your photographs",
    body: [
      "Progress photographs taken as part of a recovery plan belong to you. They are kept in your client record so your growth can be measured over time.",
      "Nothing is published on social media or on this site without your explicit written permission, and permission can be withdrawn at any time.",
      "Your health information stays between you and your practitioner.",
    ],
  },
];

/* ---------------------------------------------------------------- journal */

export type JournalPost = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  author: "iisha" | "sabrina";
  readMins: number;
  image?: string;
  body: string[];
};

export const JOURNAL: JournalPost[] = [
  {
    slug: "before-you-start-locs",
    title: "What nobody tells you before you start locs",
    dek: "The budding stage is not a mistake. It is the whole point — and it is where most people quit.",
    date: "2026-08-14",
    author: "sabrina",
    readMins: 5,
    image: "/img/work-microlocs.webp",
    body: [
      "Every loc journey has a stretch, usually somewhere between month three and month seven, where your hair looks less finished than it did the day you started. The locs pouf. The parts wander. The ends unravel in the shower and you stand there holding one wondering what you have done.",
      "This is the budding stage, and it is not a sign that something went wrong. It is the sign that something is working. The hair is matting from the inside out, and matting is not tidy.",
      "What makes the difference is not product. It is cadence and restraint. Come in on schedule, keep your hands out of them between visits, and resist the urge to retwist every three weeks because the roots look soft. Over-twisting is the single fastest way to thin a loc at the root, and it is almost always done by someone trying to make the budding stage look neat.",
      "The clients who come out the other side with the locs they imagined are the ones who photographed the ugly months. Six pictures, same angle, and suddenly month seven looks like progress rather than a mistake.",
    ],
  },
  {
    slug: "thinning-edges-what-actually-works",
    title: "Thinning edges: what actually works, and what is a waste of money",
    dek: "Most edge products treat the symptom. Here is how we look for the cause first.",
    date: "2026-07-02",
    author: "iisha",
    readMins: 6,
    image: "/img/work-recovery.webp",
    body: [
      "If your edges are thinning, the first question is not which oil to buy. It is what is pulling on them, what is happening on the scalp, and what is happening inside your body — in that order.",
      "Tension is the most common cause and the easiest to fix, and it is almost always a styling habit rather than one bad appointment. Braids that hurt, a scarf tied to the same line every night, a ponytail worn in the same place for a decade. Traction alopecia in its early stages is reversible. Left long enough, it is not — the follicle closes, and no serum reopens it.",
      "The second cause is scalp condition. Inflammation, build-up and seborrheic dermatitis all interfere with the growth cycle, and all three are treatable. This is what a scalp assessment is actually for.",
      "The third is systemic: thyroid function, iron, postpartum hormone shifts, medication, stress. This is the one hair care cannot solve, and the one an honest practitioner will send you to a doctor for rather than sell you a twelve-week package.",
      "What is worth your money: a proper assessment, reducing tension, treating the scalp, and time. What is not: any product sold with a photograph of someone else's before-and-after and no explanation of the mechanism.",
    ],
  },
  {
    slug: "the-consultation-is-the-service",
    title: "Why we make you sit through a consultation",
    dek: "It is not a sales call. It is the part of the service that decides whether the rest of it works.",
    date: "2026-06-05",
    author: "sabrina",
    readMins: 4,
    image: "/img/editorial-silkpress.webp",
    body: [
      "A consultation is where we look at your density, your growth pattern, your scalp and your life, and design a grid around all four. Get it right and the install lasts a decade. Get it wrong and you will be paying someone to combine locs in year two.",
      "It is also where the price is set honestly. Micro locs are priced by how many locs your head actually needs and how long they take to make, not by a number on a menu. Anyone quoting you a flat figure over Instagram DMs has not seen your head.",
      "And it is where we tell you no. Some heads are not ready for micros. Some are not ready for colour. Some need three months of recovery work before a single loc is started. That conversation is uncomfortable and it is the most valuable thing we do.",
    ],
  },
];

export function postBySlug(slug: string): JournalPost | undefined {
  return JOURNAL.find((p) => p.slug === slug);
}

/* ------------------------------------------------------------ the marquee */

export const MARQUEE_TERMS = [
  "Micro Locs",
  "Sisterlocs",
  "Starter Locs",
  "Hair Recovery",
  "Scalp Therapy",
  "Silk Press",
  "Loc Colour",
  "Two-Strand Twists",
  "Education",
];
