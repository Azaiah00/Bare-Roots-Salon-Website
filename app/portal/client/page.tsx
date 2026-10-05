"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth";
import {
  getClient,
  listAppointments,
  journeyFor,
  listOrders,
  appointmentMinutes,
  endTime,
  DEMO_CLIENTS,
} from "@/lib/db";
import {
  serviceBySlug,
  formatDuration,
  DEPOSIT,
  MEMBERSHIP,
  CANCELLATION_HOURS,
  RESCHEDULE_HOURS,
} from "@/lib/services";
import { productBySlug } from "@/lib/products";
import { artistById, formatTime } from "@/lib/site";
import { longDate, plainDate } from "@/lib/dates";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import PhotoSlot from "@/components/ui/PhotoSlot";
import Guard from "@/components/portal/Guard";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

export default function ClientPortalPage() {
  return (
    <Guard need="client">
      <ClientPortal />
    </Guard>
  );
}

function ClientPortal() {
  const { session } = useSession();
  // An owner previewing this screen sees the first demo client's view.
  const clientId = session.clientId ?? DEMO_CLIENTS[0].id;

  const client = getClient(clientId)!;
  const appts = listAppointments({ clientId });
  const upcoming = appts
    .filter((a) => a.status === "upcoming")
    .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  const past = appts.filter((a) => a.status === "completed");
  const journey = journeyFor(clientId);
  const orders = listOrders(clientId);

  const next = upcoming[0];
  const nextService = next ? serviceBySlug(next.serviceSlug) : null;
  const nextArtist = next ? artistById(next.artist) : null;
  const nextMins = next ? appointmentMinutes(next) : 0;
  const monthsIn = journey.length ? journey[journey.length - 1].month : 0;

  return (
    <>
      <PageHero
        ground="root"
        eyebrow="Client portal"
        title={`Welcome back, ${client.name.split(" ")[0]}.`}
        lead={`${client.track === "Both" ? "Recovery and locs" : client.track} with us since ${plainDate(client.since)}.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Portal", path: "/portal" },
          { name: "Client", path: "/portal/client" },
        ]}
      />

      {/* Next appointment */}
      <Section ground="paper" labelledBy="next-title">
        <h2 id="next-title" className="sr-only">
          Your next appointment
        </h2>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            {next && nextService ? (
              <article className="flex h-full flex-col rounded-panel border border-bronze-ink/45 bg-paper p-8">
                <p className="eyebrow text-bronze-ink">Next appointment</p>
                <h3 className="mt-4 font-display text-d2 text-ink">{nextService.name}</h3>
                <p className="mt-3 text-lead text-ink-soft">
                  {longDate(next.date)} at {formatTime(next.start)} with{" "}
                  {nextArtist?.name}
                </p>

                <dl className="hairline-grid mt-8 sm:grid-cols-3">
                  <div className="bg-paper p-5">
                    <dt className="eyebrow text-bronze-ink">In the chair</dt>
                    <dd className="mt-2 text-base2 tabular-nums">
                      {formatDuration(nextMins)}
                    </dd>
                    <dd className="mt-0.5 text-xs2 text-ink-soft">
                      out by {formatTime(endTime(next.start, nextMins))}
                    </dd>
                  </div>
                  <div className="bg-paper p-5">
                    <dt className="eyebrow text-bronze-ink">Total</dt>
                    <dd className="mt-2 text-base2 tabular-nums">
                      {next.total === 0 ? "At consultation" : `$${next.total}`}
                    </dd>
                  </div>
                  <div className="bg-paper p-5">
                    <dt className="eyebrow text-bronze-ink">Balance due</dt>
                    <dd className="mt-2 text-base2 tabular-nums">
                      ${Math.max(0, next.total - (next.depositPaid ? DEPOSIT : 0))}
                    </dd>
                    {next.depositPaid && (
                      <dd className="mt-0.5 text-xs2 text-bronze-ink">Deposit paid</dd>
                    )}
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/book" variant="outline" size="sm">
                    Reschedule
                  </ButtonLink>
                  <ButtonLink href="/shop" variant="outline" size="sm">
                    Restock before you come
                  </ButtonLink>
                  <a href={nextArtist?.smsHref} className="btn btn-outline btn-sm">
                    <Icon name="message" className="size-3.5" />
                    Text {nextArtist?.name.split(" ")[0]}
                  </a>
                </div>

                <p className="mt-6 text-xs2 text-ink-soft">
                  {CANCELLATION_HOURS} hours&rsquo; notice to cancel,{" "}
                  {RESCHEDULE_HOURS} to reschedule. Running late? Text — we would
                  rather move it than lose it.
                </p>
              </article>
            ) : (
              <article className="card-light flex h-full flex-col justify-center p-8">
                <p className="eyebrow text-bronze-ink">Next appointment</p>
                <h3 className="mt-4 font-display text-d2 text-ink">Nothing booked.</h3>
                <p className="mt-4 max-w-prose2 text-base2 text-ink-soft">
                  Your cadence is what keeps the last appointment worth what you
                  paid for it.
                </p>
                <div className="mt-8">
                  <ButtonLink href="/book" variant="gold" icon="arrow-right">
                    Book now
                  </ButtonLink>
                </div>
              </article>
            )}
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={90}>
              <article className="card-light h-full p-7">
                <Icon name="crown" className="size-6 text-bronze-ink" strokeWidth={1.2} />
                <h3 className="mt-5 font-display text-d4 text-ink">{MEMBERSHIP.name}</h3>
                <p className="mt-2 text-sm2 text-ink-soft">
                  {client.isMember
                    ? `Active — $${MEMBERSHIP.price} a month`
                    : "Not a member"}
                </p>
                {client.isMember ? (
                  <ul className="mt-5 flex flex-col gap-2">
                    {MEMBERSHIP.perks.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm2 text-ink-soft">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rotate-45 bg-bronze"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Link
                    href="/academy#membership-title"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs2 uppercase tracking-wide2 text-bronze-ink"
                  >
                    What it includes
                    <Icon name="arrow-right" className="size-3.5" />
                  </Link>
                )}
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="card-light h-full p-7">
                <Icon name="clock" className="size-6 text-bronze-ink" strokeWidth={1.2} />
                <h3 className="mt-5 font-display text-d4 text-ink">Your cadence</h3>
                <p className="mt-3 text-sm2 text-ink-soft">
                  {client.track === "Recovery"
                    ? "Scalp therapy every four to six weeks while the protocol is active. Stretching past eight undoes the calm you have built."
                    : "Retwist every four to six weeks. Staying on that schedule is the difference between a $120 retwist and a $150 detox soak."}
                </p>
                <Link
                  href="/services"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs2 uppercase tracking-wide2 text-bronze-ink"
                >
                  See the menu
                  <Icon name="arrow-right" className="size-3.5" />
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* The journey — the retention hook */}
      <Section ground="cream" labelledBy="journey-title">
        <Reveal
          as="header"
          className="flex flex-wrap items-end justify-between gap-8"
        >
          <div className="max-w-measure">
            <p className="eyebrow flex items-center gap-3 text-bronze-ink">
              <span className="gold-rule" aria-hidden="true" />
              Your journey
            </p>
            <h2 id="journey-title" className="mt-5 text-d2 text-ink">
              Every visit,{" "}
              <em className="font-display italic text-bronze">photographed.</em>
            </h2>
            <p className="mt-5 text-lead text-ink-soft">
              Same angle, same distance, every appointment. It is the only honest
              way to see growth — and it is the thing that gets people through the
              months where nothing seems to be happening.
            </p>
          </div>
          <p className="rounded-pill border border-bronze-ink/45 px-5 py-2 text-sm2 text-bronze-ink">
            {journey.length} {journey.length === 1 ? "entry" : "entries"} ·{" "}
            {monthsIn} months in
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((j, i) => {
            const artist = j.artist ? artistById(j.artist) : null;
            return (
              <Reveal as="li" key={j.id} delay={i * 80}>
                <article className="card-light flex h-full flex-col p-5">
                  <PhotoSlot
                    src={j.photo}
                    alt={`Month ${j.month}`}
                    brief={j.photoBrief}
                    ratio="4/5"
                    sizes="(min-width: 1024px) 22vw, 45vw"
                  />
                  <p className="eyebrow mt-5 text-bronze-ink">
                    Month {j.month} · {plainDate(j.date)}
                  </p>
                  <p className="mt-3 flex-1 text-sm2 text-ink-soft">{j.note}</p>
                  {j.artistNote && (
                    <p className="mt-4 border-l-2 border-bronze pl-4 text-sm2 italic text-ink">
                      &ldquo;{j.artistNote}&rdquo;
                      <span className="mt-1 block not-italic text-xs2 text-ink-soft">
                        {artist?.name ?? "Your artist"}
                      </span>
                    </p>
                  )}
                </article>
              </Reveal>
            );
          })}

          {/* The forward-looking card. The journey is never finished. */}
          <Reveal as="li" delay={journey.length * 80}>
            <div className="marker flex h-full flex-col items-center justify-center gap-4 p-7 text-center">
              <Icon name="camera" className="size-7" strokeWidth={1.2} />
              <p className="eyebrow">Next entry</p>
              <p className="max-w-[26ch] text-sm2 font-normal">
                Lands after your appointment on{" "}
                {next ? plainDate(next.date) : "your next visit"}.
              </p>
            </div>
          </Reveal>
        </ol>
      </Section>

      {/* History and orders */}
      <Section ground="paper" labelledBy="history-title">
        <h2 id="history-title" className="sr-only">
          History and orders
        </h2>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h3 className="eyebrow flex items-center gap-3 text-bronze-ink">
              <Icon name="calendar" className="size-4" />
              Past appointments
            </h3>
            {past.length === 0 ? (
              <p className="mt-6 text-base2 text-ink-soft">Nothing yet.</p>
            ) : (
              <ul className="mt-6 flex flex-col border-t border-ink/12">
                {past.map((a) => {
                  const s = serviceBySlug(a.serviceSlug);
                  return (
                    <li
                      key={a.id}
                      className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/12 py-4"
                    >
                      <span className="text-base2 text-ink">{s?.name}</span>
                      <span className="text-sm2 tabular-nums text-ink-soft">
                        {plainDate(a.date)} · ${a.total}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </Reveal>

          <Reveal delay={90}>
            <h3 className="eyebrow flex items-center gap-3 text-bronze-ink">
              <Icon name="package" className="size-4" />
              Product orders
            </h3>
            {orders.length === 0 ? (
              <p className="mt-6 text-base2 text-ink-soft">No orders yet.</p>
            ) : (
              <ul className="mt-6 flex flex-col gap-5">
                {orders.map((o) => (
                  <li key={o.id} className="card-light p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-base2 tabular-nums text-ink">{o.id}</span>
                      <span className="badge border-bronze-ink/45 text-bronze-ink">
                        {o.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm2 text-ink-soft">
                      {o.lines
                        .map((l) => `${l.qty} × ${productBySlug(l.slug)?.name ?? l.slug}`)
                        .join(", ")}
                    </p>
                    <p className="mt-2 text-sm2 tabular-nums text-ink-soft">
                      ${o.total.toFixed(2)} · {plainDate(o.placedAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-7">
              <ButtonLink href="/shop" variant="outline" size="sm" icon="arrow-right">
                Reorder
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
