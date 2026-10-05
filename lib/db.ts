/**
 * The single data layer. Everything the site reads or writes goes through here.
 *
 * DEMO MODE. All data below is typed mock data held in memory for the length of
 * a session. There is no backend, no payment processor and no persistence — by
 * design, so the site can be shown to Iisha and Sabrina and clicked through end
 * to end before a cent is spent on infrastructure.
 *
 * GOING LIVE IS A BACKEND CHANGE, NOT A UI CHANGE. Every function below is the
 * seam. Replace the bodies; the components never change.
 *   // TODO: Supabase — listAppointments, createAppointment, listClients, journeyFor
 *   // TODO: Stripe   — takeDeposit
 *   // TODO: Shopify  — createOrder, listOrders
 *
 * TWO ARTISTS, NOT ONE. Unlike a solo-operator build, Bare Roots has two chairs
 * running independently. Availability is therefore per-artist: Sabrina being
 * booked solid does not close Iisha's day. Every function that touches the
 * calendar takes an artist id, and the owner dashboard is the only surface that
 * sees both books at once.
 */

import { SITE } from "./site";
import {
  SERVICES,
  serviceBySlug,
  type Service,
  DEPOSIT,
} from "./services";
import { PRODUCTS, type Product } from "./products";

export const DEMO_MODE = true;

/* -------------------------------------------------------------- the types */

export type Role = "guest" | "client" | "stylist" | "owner";
export type ArtistId = "iisha" | "sabrina";

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  since: string;
  /** Which side of the house she belongs to. Drives the cadence advice. */
  track: "Locs" | "Recovery" | "Both";
  /** Her primary artist. */
  artist: ArtistId;
  isMember: boolean;
  /** The artist's own prep note. Owner and that artist only — never the client. */
  notes: string;
};

export type AppointmentStatus = "upcoming" | "completed" | "cancelled";

export type Appointment = {
  id: string;
  clientId: string;
  artist: ArtistId;
  serviceSlug: string;
  /** Extra services chosen at booking. */
  addonSlugs: string[];
  /** ISO date, salon-local. */
  date: string;
  /** "13:00" */
  start: string;
  status: AppointmentStatus;
  depositPaid: boolean;
  /** Whole dollars, as they price. */
  total: number;
};

export type JourneyEntry = {
  id: string;
  clientId: string;
  date: string;
  /** Months into the plan — loc age, or months of recovery work. */
  month: number;
  /** null until a real photograph exists. Renders a PhotoSlot. */
  photo: string | null;
  photoBrief: string;
  note: string;
  /** The artist's note to the client, shown on the client side too. */
  artistNote?: string;
  artist?: ArtistId;
};

export type CartLine = { slug: string; qty: number };

export type Order = {
  id: string;
  placedAt: string;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "processing" | "shipped" | "delivered";
  clientId?: string;
};

export type NewAppointment = {
  artist: ArtistId;
  serviceSlug: string;
  addonSlugs: string[];
  date: string;
  start: string;
  name: string;
  email: string;
  phone: string;
  isTransferClient: boolean;
  notes?: string;
};

/* --------------------------------------------------------------- seed data
 *
 * Plainly fictional demo clients. Not real people. No real client of Iisha's or
 * Sabrina's is ever invented here, and no real name appears anywhere on this
 * site that was not given to us by the person it belongs to.
 */

export const DEMO_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Demo Client",
    email: "demo.client@example.com",
    phone: "(804) 555-0142",
    since: "2025-11-12",
    track: "Both",
    artist: "iisha",
    isMember: true,
    notes:
      "Traction thinning at both temples on intake. Month 9 of recovery, regrowth visible at the left temple. Locs maintained by Sabrina — coordinate tension.",
  },
  {
    id: "c2",
    name: "Demo Client Two",
    email: "demo.two@example.com",
    phone: "(804) 555-0177",
    since: "2026-02-03",
    track: "Locs",
    artist: "sabrina",
    isMember: false,
    notes:
      "Transfer client. Grid redefined at intake — previous loctician had combined 40 locs. Retwist every 5 weeks, not 4.",
  },
  {
    id: "c3",
    name: "Demo Client Three",
    email: "demo.three@example.com",
    phone: "(804) 555-0193",
    since: "2026-06-21",
    track: "Recovery",
    artist: "iisha",
    isMember: false,
    notes:
      "Postpartum shedding, month 4. Referred to GP for iron panel before protocol escalates. Do not promise a timeline.",
  },
];

/**
 * Fixed dates so the demo never drifts or renders an empty calendar.
 * a3 and a4 deliberately collide on one artist's day so the availability grid
 * has something real to route around.
 */
export const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: "a1",
    clientId: "c1",
    artist: "iisha",
    serviceSlug: "scalp-therapy-ritual",
    addonSlugs: ["scalp-scrub"],
    date: "2026-09-24",
    start: "13:00",
    status: "upcoming",
    depositPaid: true,
    total: 170,
  },
  {
    id: "a2",
    clientId: "c2",
    artist: "sabrina",
    serviceSlug: "traditional-retwist",
    addonSlugs: [],
    date: "2026-09-24",
    start: "15:00",
    status: "upcoming",
    depositPaid: false,
    total: 120,
  },
  {
    id: "a3",
    clientId: "c2",
    artist: "sabrina",
    serviceSlug: "loc-detox-soak",
    addonSlugs: [],
    date: "2026-09-25",
    start: "11:00",
    status: "upcoming",
    depositPaid: true,
    total: 150,
  },
  {
    id: "a4",
    clientId: "c1",
    artist: "sabrina",
    serviceSlug: "creative-loc-styles",
    addonSlugs: [],
    date: "2026-09-25",
    start: "16:00",
    status: "upcoming",
    depositPaid: true,
    total: 40,
  },
  {
    id: "a5",
    clientId: "c3",
    artist: "iisha",
    serviceSlug: "hair-recovery-consultation",
    addonSlugs: [],
    date: "2026-09-26",
    start: "11:00",
    status: "upcoming",
    depositPaid: false,
    total: 0,
  },
  {
    id: "a6",
    clientId: "c1",
    artist: "iisha",
    serviceSlug: "scalp-therapy-ritual",
    addonSlugs: [],
    date: "2026-08-27",
    start: "13:00",
    status: "completed",
    depositPaid: true,
    total: 140,
  },
  {
    id: "a7",
    clientId: "c2",
    artist: "sabrina",
    serviceSlug: "traditional-retwist",
    addonSlugs: [],
    date: "2026-08-22",
    start: "11:00",
    status: "completed",
    depositPaid: true,
    total: 120,
  },
  {
    id: "a8",
    clientId: "c3",
    artist: "iisha",
    serviceSlug: "scalp-scrub",
    addonSlugs: [],
    date: "2026-08-20",
    start: "17:00",
    status: "completed",
    depositPaid: true,
    total: 30,
  },
];

/**
 * The progress journey. Every photo is null on purpose — each renders a
 * PhotoSlot carrying the shooting instruction, so the gap becomes a task
 * rather than a lie.
 */
export const DEMO_JOURNEY: JourneyEntry[] = [
  {
    id: "j1",
    clientId: "c1",
    date: "2025-11-12",
    month: 0,
    photo: null,
    photoBrief:
      "Intake. Both temples, hairline parallel to the lens, natural window light, no flash. Same angle every visit from here.",
    note: "Intake assessment. Traction thinning at both temples, scalp inflamed along the part line.",
    artistNote:
      "We are going to stop the pulling first and treat the scalp second. Nothing grows out of skin that is angry.",
    artist: "iisha",
  },
  {
    id: "j2",
    clientId: "c1",
    date: "2026-02-04",
    month: 3,
    photo: null,
    photoBrief: "Month 3. Same two temple angles, same distance, same light.",
    note: "Inflammation down. No new loss. Vellus regrowth visible at the left temple under magnification.",
    artist: "iisha",
  },
  {
    id: "j3",
    clientId: "c1",
    date: "2026-05-13",
    month: 6,
    photo: null,
    photoBrief: "Month 6. Add one crown shot to the two temple angles.",
    note: "Regrowth visible to the naked eye at the left temple. Right temple slower — expected, it carried more tension.",
    artistNote:
      "Month six is where people stop taking the pictures. Do not stop taking the pictures.",
    artist: "iisha",
  },
  {
    id: "j4",
    clientId: "c1",
    date: "2026-08-27",
    month: 9,
    photo: null,
    photoBrief: "Month 9. Temples, crown, and a full-face shot for the first time.",
    note: "Hairline filling in on both sides. Moved to maintenance cadence — therapy every six weeks instead of four.",
    artist: "iisha",
  },
];

export const DEMO_ORDERS: Order[] = [
  {
    id: "BR-1042",
    placedAt: "2026-08-30",
    lines: [
      { slug: "deep-cleansing-shampoo", qty: 1 },
      { slug: "hair-scalp-conditioner", qty: 1 },
    ],
    subtotal: 27.95,
    shipping: 6,
    total: 33.95,
    status: "delivered",
    clientId: "c1",
  },
  {
    id: "BR-1058",
    placedAt: "2026-09-11",
    lines: [{ slug: "glazed-edges-4oz", qty: 2 }],
    subtotal: 47.9,
    shipping: 6,
    total: 53.9,
    status: "shipped",
    clientId: "c1",
  },
];

/* --------------------------------------------------------------- read API */

export function listServices(): Service[] {
  return SERVICES;
}

export function listProducts(): Product[] {
  return PRODUCTS;
}

/** // TODO: Supabase */
export function listClients(artist?: ArtistId): Client[] {
  return artist ? DEMO_CLIENTS.filter((c) => c.artist === artist) : DEMO_CLIENTS;
}

export function getClient(id: string): Client | undefined {
  return DEMO_CLIENTS.find((c) => c.id === id);
}

/**
 * // TODO: Supabase
 * The optional filters are the entire role-separation mechanism: the client
 * portal passes a clientId, a stylist dashboard passes an artist, and the owner
 * dashboard passes neither and therefore sees everything.
 */
export function listAppointments(opts?: {
  clientId?: string;
  artist?: ArtistId;
}): Appointment[] {
  return DEMO_APPOINTMENTS.filter(
    (a) =>
      (!opts?.clientId || a.clientId === opts.clientId) &&
      (!opts?.artist || a.artist === opts.artist),
  );
}

/** // TODO: Supabase — filtered AND sorted ascending, so reading order is chronological. */
export function journeyFor(clientId: string): JourneyEntry[] {
  return DEMO_JOURNEY.filter((j) => j.clientId === clientId).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
}

/** // TODO: Shopify */
export function listOrders(clientId?: string): Order[] {
  return clientId ? DEMO_ORDERS.filter((o) => o.clientId === clientId) : DEMO_ORDERS;
}

/* ------------------------------------------------------------ availability
 *
 * Real, hours-aware, and honest about capacity. Each artist works one client at
 * a time, so a slot is available only if the whole service fits inside that
 * day's opening hours AND does not collide with that artist's existing book.
 */

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const toHHMM = (min: number) =>
  `${Math.floor(min / 60)
    .toString()
    .padStart(2, "0")}:${(min % 60).toString().padStart(2, "0")}`;

/** Day-of-week for an ISO date string, without timezone drift. */
export function isoWeekday(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function isOpenOn(iso: string): boolean {
  return SITE.hours[isoWeekday(iso)].open !== null;
}

/** "HH:MM" + minutes, as "HH:MM". Shared so the booker and the book agree. */
export function endTime(start: string, mins: number): string {
  return toHHMM(toMin(start) + mins);
}

/** Total minutes an appointment occupies, add-ons included. */
export function appointmentMinutes(a: Appointment): number {
  const base = serviceBySlug(a.serviceSlug)?.duration ?? 60;
  const extra = a.addonSlugs.reduce(
    (n, s) => n + (serviceBySlug(s)?.duration ?? 0),
    0,
  );
  return base + extra;
}

export function availableSlots(
  iso: string,
  artist: ArtistId,
  durationMins: number,
): string[] {
  const day = SITE.hours[isoWeekday(iso)];
  if (day.open === null || day.close === null) return [];

  const open = toMin(day.open);
  const close = toMin(day.close);

  const busy = DEMO_APPOINTMENTS.filter(
    (a) => a.date === iso && a.artist === artist && a.status === "upcoming",
  ).map((a) => {
    const start = toMin(a.start);
    return [start, start + appointmentMinutes(a)] as const;
  });

  const out: string[] = [];
  for (let t = open; t + durationMins <= close; t += 30) {
    const end = t + durationMins;
    const clash = busy.some(([bs, be]) => t < be && end > bs);
    if (!clash) out.push(toHHMM(t));
  }
  return out;
}

/**
 * The next N open dates from a fixed "today", so the demo is stable.
 * // TODO: Supabase — replace SEED_TODAY with the real clock on go-live.
 */
export const SEED_TODAY = "2026-09-20";

export function upcomingOpenDates(count = 12, from: string = SEED_TODAY): string[] {
  const out: string[] = [];
  const [y, m, d] = from.split("-").map(Number);
  const cursor = new Date(Date.UTC(y, m - 1, d));
  let guard = 0;
  while (out.length < count && guard < 120) {
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    const iso = cursor.toISOString().slice(0, 10);
    if (isOpenOn(iso)) out.push(iso);
    guard++;
  }
  return out;
}

/* -------------------------------------------------------------- write API */

export function createAppointment(_input: NewAppointment): {
  ok: true;
  id: string;
  depositDue: number;
} {
  // TODO: Supabase + Stripe. In demo mode this returns a plausible reference
  // and never touches a payment method.
  const id = `BR-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  return { ok: true, id, depositDue: DEPOSIT };
}

export function createOrder(lines: CartLine[]): {
  ok: true;
  id: string;
  total: number;
} {
  // TODO: Shopify checkout. Demo only.
  const subtotal = cartSubtotal(lines);
  return {
    ok: true,
    id: `BR-${Math.floor(1100 + Math.random() * 800)}`,
    total: subtotal + shippingFor(subtotal),
  };
}

export function joinWaitlist(_email: string, _productSlug: string): { ok: true } {
  // TODO: newsletter provider. Demo only — nothing is sent, nothing is stored.
  return { ok: true };
}

/* ------------------------------------------------------------- cart maths
 * Pure, so it is unit-testable and cannot drift from the UI.
 */

export const FREE_SHIPPING_OVER = 75;
export const FLAT_SHIPPING = 6;

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => {
    const p = PRODUCTS.find((x) => x.slug === l.slug);
    return sum + (p ? p.price * l.qty : 0);
  }, 0);
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function shippingFor(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_OVER ? 0 : FLAT_SHIPPING;
}
