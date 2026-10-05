"use client";

import Link from "next/link";
import {
  listAppointments,
  listClients,
  listOrders,
  appointmentMinutes,
  endTime,
  SEED_TODAY,
} from "@/lib/db";
import { serviceBySlug, formatDuration, DEPOSIT } from "@/lib/services";
import { PRODUCTS, priceLabel } from "@/lib/products";
import { SITE, artistById, formatTime } from "@/lib/site";
import { longDate, shortDate } from "@/lib/dates";
import { cn } from "@/lib/cn";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Guard from "@/components/portal/Guard";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

export default function OwnerPortalPage() {
  return (
    <Guard need="owner">
      <OwnerDashboard />
    </Guard>
  );
}

/**
 * The house.
 *
 * Every figure on this screen is derived here, in the component, from the same
 * three reads the other portals use — never precomputed into the seed data. It
 * is the only way to guarantee the totals cannot disagree with the rows
 * underneath them.
 */
function OwnerDashboard() {
  const appts = listAppointments();
  const clients = listClients();
  const orders = listOrders();

  const upcoming = appts
    .filter((a) => a.status === "upcoming")
    .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  const completed = appts.filter((a) => a.status === "completed");

  const bookedRevenue = upcoming.reduce((n, a) => n + a.total, 0);
  const earnedRevenue = completed.reduce((n, a) => n + a.total, 0);
  const productRevenue = orders.reduce((n, o) => n + o.total, 0);
  const depositsOutstanding = upcoming.filter((a) => !a.depositPaid);
  const chairMins = upcoming.reduce((n, a) => n + appointmentMinutes(a), 0);

  const byDay = upcoming.reduce<Record<string, typeof upcoming>>((acc, a) => {
    (acc[a.date] ||= []).push(a);
    return acc;
  }, {});

  const perArtist = SITE.artists.map((a) => {
    const mine = upcoming.filter((x) => x.artist === a.id);
    const done = completed.filter((x) => x.artist === a.id);
    return {
      id: a.id,
      name: a.name,
      booked: mine.reduce((n, x) => n + x.total, 0),
      earned: done.reduce((n, x) => n + x.total, 0),
      count: mine.length,
      mins: mine.reduce((n, x) => n + appointmentMinutes(x), 0),
      clients: clients.filter((c) => c.artist === a.id).length,
    };
  });

  const needsPhoto = PRODUCTS.filter((p) => !p.image);

  const STATS = [
    {
      icon: "trending" as const,
      label: "Booked ahead",
      value: `$${bookedRevenue}`,
      sub: `${upcoming.length} appointments, both chairs`,
    },
    {
      icon: "clock" as const,
      label: "Chair hours ahead",
      value: formatDuration(chairMins),
      sub: "across the open book",
    },
    {
      icon: "wallet" as const,
      label: "Services completed",
      value: `$${earnedRevenue}`,
      sub: `${completed.length} appointments`,
    },
    {
      icon: "package" as const,
      label: "Product revenue",
      value: `$${productRevenue.toFixed(2).replace(/\.00$/, "")}`,
      sub: `${orders.length} orders`,
    },
  ];

  return (
    <>
      <PageHero
        ground="ink"
        eyebrow="Owner"
        title={
          <>
            The book, the clients,
            <br />
            <em className="font-display italic text-gold">the numbers.</em>
          </>
        }
        lead={`As of ${longDate(SEED_TODAY)}. Everything on this screen is demo data — the real thing reads from the same functions.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Portal", path: "/portal" },
          { name: "Owner", path: "/portal/owner" },
        ]}
      />

      {/* Numbers */}
      <Section ground="paper" labelledBy="owner-stats-title">
        <h2 id="owner-stats-title" className="eyebrow text-bronze-ink">
          Key numbers
        </h2>
        <ul className="hairline-grid mt-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 70} className="bg-paper p-7">
              <Icon name={s.icon} className="size-5 text-bronze-ink" />
              <p className="mt-5 font-display text-[2.5rem] leading-none tabular-nums text-ink">
                {s.value}
              </p>
              <p className="eyebrow mt-4 text-bronze-ink">{s.label}</p>
              <p className="mt-2 text-sm2 text-ink-soft">{s.sub}</p>
            </Reveal>
          ))}
        </ul>

        {/* Per chair */}
        <h2 className="eyebrow mt-16 text-bronze-ink">By chair</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {perArtist.map((a, i) => (
            <Reveal as="li" key={a.id} delay={i * 90}>
              <article className="card-light p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="font-display text-d3 text-ink">{a.name}</h3>
                  <Link
                    href="/portal/stylist"
                    className="inline-flex min-h-11 items-center gap-2 text-xs2 uppercase tracking-wide2 text-bronze-ink"
                  >
                    Open her book
                    <Icon name="arrow-right" className="size-3.5" />
                  </Link>
                </div>
                <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
                  {[
                    { k: "Booked", v: `$${a.booked}` },
                    { k: "Completed", v: `$${a.earned}` },
                    { k: "Appointments", v: String(a.count) },
                    { k: "Clients", v: String(a.clients) },
                  ].map((d) => (
                    <div key={d.k}>
                      <dt className="eyebrow text-bronze-ink">{d.k}</dt>
                      <dd className="mt-1.5 text-base2 tabular-nums text-ink">{d.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-sm2 text-ink-soft">
                  {formatDuration(a.mins)} of chair time on the open book.
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        {depositsOutstanding.length > 0 && (
          <Reveal className="mt-14 rounded-panel border border-alert/50 bg-paper p-7" delay={200}>
            <h2 className="flex items-center gap-3 font-display text-d4 text-ink">
              <Icon name="alert" className="size-5 text-alert" />
              {depositsOutstanding.length} deposit
              {depositsOutstanding.length === 1 ? "" : "s"} outstanding
            </h2>
            <p className="mt-3 text-sm2 text-ink-soft">
              {depositsOutstanding
                .map((a) => {
                  const c = clients.find((x) => x.id === a.clientId);
                  const ar = artistById(a.artist);
                  return `${c?.name ?? a.clientId} — ${shortDate(a.date)} (${ar?.name.split(" ")[0]})`;
                })
                .join(" · ")}
            </p>
            <p className="mt-4 font-display text-[2rem] tabular-nums text-alert">
              ${depositsOutstanding.length * DEPOSIT}
            </p>
          </Reveal>
        )}
      </Section>

      {/* The book, both chairs */}
      <Section ground="cream" labelledBy="owner-book-title">
        <h2 id="owner-book-title" className="text-d2 text-ink">
          The book, both{" "}
          <em className="font-display italic text-bronze">chairs.</em>
        </h2>

        <div className="mt-12 flex flex-col gap-12">
          {Object.entries(byDay).map(([date, list], di) => (
            <Reveal key={date} delay={di * 80}>
              <h3 className="eyebrow text-bronze-ink">{longDate(date)}</h3>
              <ul className="mt-5 flex flex-col border-t border-ink/12">
                {list.map((a) => {
                  const s = serviceBySlug(a.serviceSlug);
                  const c = clients.find((x) => x.id === a.clientId);
                  const ar = artistById(a.artist);
                  const mins = appointmentMinutes(a);
                  return (
                    <li
                      key={a.id}
                      className="grid gap-3 border-b border-ink/12 py-5 sm:grid-cols-[120px_100px_1fr_auto] sm:items-baseline"
                    >
                      <div>
                        <p className="tabular-nums text-base2 text-bronze-ink">
                          {formatTime(a.start)}
                        </p>
                        <p className="text-xs2 tabular-nums text-ink-soft">
                          to {formatTime(endTime(a.start, mins))}
                        </p>
                      </div>
                      <p className="text-sm2 text-ink-soft">{ar?.name.split(" ")[0]}</p>
                      <div className="min-w-0">
                        <p className="text-base2 text-ink">{c?.name ?? a.clientId}</p>
                        <p className="text-sm2 text-ink-soft">
                          {s?.name} · {formatDuration(mins)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:justify-end">
                        <span className="tabular-nums text-base2 text-ink">
                          {a.total === 0 ? "—" : `$${a.total}`}
                        </span>
                        <span
                          className={cn(
                            "badge",
                            a.depositPaid
                              ? "border-bronze-ink/45 text-bronze-ink"
                              : "border-alert/60 text-alert",
                          )}
                        >
                          {a.depositPaid ? "Paid" : "Due"}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Clients */}
      <Section ground="paper" labelledBy="owner-clients-title">
        <h2 id="owner-clients-title" className="text-d2 text-ink">
          Every{" "}
          <em className="font-display italic text-bronze">client.</em>
        </h2>

        <Reveal className="mt-10 overflow-x-auto" delay={80}>
          <table className="w-full min-w-[760px] border-collapse text-left">
            <caption className="sr-only">All Bare Roots clients</caption>
            <thead>
              <tr className="border-b border-ink/12">
                {["Client", "Artist", "Track", "Since", "Membership", "Notes"].map((h) => (
                  <th key={h} scope="col" className="eyebrow py-3 pr-6 text-bronze-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-ink/12 align-top">
                  <th scope="row" className="py-5 pr-6 font-normal">
                    <span className="block text-base2 text-ink">{c.name}</span>
                    <span className="block text-sm2 tabular-nums text-ink-soft">
                      {c.phone}
                    </span>
                  </th>
                  <td className="py-5 pr-6 text-sm2 text-ink-soft">
                    {artistById(c.artist)?.name.split(" ")[0]}
                  </td>
                  <td className="py-5 pr-6 text-sm2 text-ink-soft">{c.track}</td>
                  <td className="py-5 pr-6 text-sm2 tabular-nums text-ink-soft">
                    {shortDate(c.since)}
                  </td>
                  <td className="py-5 pr-6">
                    {c.isMember ? (
                      <span className="badge border-bronze-ink/45 text-bronze-ink">
                        Crown Circle
                      </span>
                    ) : (
                      <span className="text-ink-soft">&mdash;</span>
                    )}
                  </td>
                  <td className="max-w-[28ch] py-5 text-sm2 text-ink-soft">{c.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      {/* The shelf */}
      <Section ground="cream" labelledBy="owner-shelf-title">
        <h2 id="owner-shelf-title" className="text-d2 text-ink">
          The{" "}
          <em className="font-display italic text-bronze">shelf.</em>
        </h2>
        <p className="mt-5 max-w-measure text-base2 text-ink-soft">
          Stock levels arrive with the commerce backend. For now this lists what is
          published and flags what is still missing a photograph — so the gaps are
          yours to clear rather than ours to explain.
        </p>

        <ul className="hairline-grid mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 6) * 50} className="bg-cream p-6">
              <div className="flex items-start justify-between gap-4">
                <Link
                  href={`/shop/${p.slug}`}
                  className="text-base2 text-ink hover:text-bronze-ink"
                >
                  {p.name}
                </Link>
                <span className="font-display text-base2 italic tabular-nums text-bronze-ink">
                  {priceLabel(p)}
                </span>
              </div>
              <p className="mt-2 text-xs2 uppercase tracking-wide2 text-ink-soft">
                {p.line === "dope" ? "DOPE HAIR" : "Inflúance"}
                {!p.available && " · waitlist"}
              </p>
              {!p.image && (
                <span className="badge mt-4 border-dashed border-alert/60 text-alert">
                  Needs photo
                </span>
              )}
            </Reveal>
          ))}
        </ul>

        {needsPhoto.length > 0 && (
          <Reveal className="marker mt-10 p-6 text-sm2" delay={200}>
            <p className="font-normal">
              <strong className="font-medium">
                {needsPhoto.length} of {PRODUCTS.length} products need photography.
              </strong>{" "}
              Each product page prints the exact shot it needs. Two DOPE HAIR
              concept renders were withheld from the build because the products in
              them carry other brands&rsquo; names — see ASSETS-OWED.md.
            </p>
          </Reveal>
        )}

        <Reveal className="mt-12 flex flex-wrap gap-4" delay={240}>
          <ButtonLink href="/shop" variant="dark" icon="arrow-right">
            Open the shop
          </ButtonLink>
          <ButtonLink href="/portal/stylist" variant="outline">
            A stylist&rsquo;s view
          </ButtonLink>
          <ButtonLink href="/portal/client" variant="outline">
            A client&rsquo;s view
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
