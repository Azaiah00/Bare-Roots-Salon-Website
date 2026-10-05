"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth";
import {
  listAppointments,
  listClients,
  appointmentMinutes,
  endTime,
  SEED_TODAY,
  type ArtistId,
} from "@/lib/db";
import { serviceBySlug, formatDuration, DEPOSIT } from "@/lib/services";
import { SITE, artistById, formatTime } from "@/lib/site";
import { longDate, shortDate } from "@/lib/dates";
import { cn } from "@/lib/cn";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Guard from "@/components/portal/Guard";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

export default function StylistPortalPage() {
  return (
    <Guard need="stylist">
      <StylistPortal />
    </Guard>
  );
}

/**
 * One artist's chair, and only hers.
 *
 * ROLE SEPARATION IS THE WHOLE POINT OF THIS SCREEN. Every read on this page
 * passes an artist id, so a stylist session literally cannot fetch the other
 * chair's rows — the same filter that will exist as a row-level policy when
 * this moves to Supabase. An owner viewing this screen gets a toggle, because
 * the owner is allowed to look at either book.
 */
function StylistPortal() {
  const { session } = useSession();
  const isOwner = session.role === "owner";
  const [viewing, setViewing] = useState<ArtistId>(session.artist ?? "iisha");
  const artist = artistById(viewing)!;

  const appts = listAppointments({ artist: viewing });
  const upcoming = appts
    .filter((a) => a.status === "upcoming")
    .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  const completed = appts.filter((a) => a.status === "completed");
  const clients = listClients(viewing);

  const booked = upcoming.reduce((n, a) => n + a.total, 0);
  const earned = completed.reduce((n, a) => n + a.total, 0);
  const chairMins = upcoming.reduce((n, a) => n + appointmentMinutes(a), 0);
  const depositsDue = upcoming.filter((a) => !a.depositPaid);

  const byDay = upcoming.reduce<Record<string, typeof upcoming>>((acc, a) => {
    (acc[a.date] ||= []).push(a);
    return acc;
  }, {});

  const STATS = [
    {
      icon: "trending" as const,
      label: "Booked ahead",
      value: `$${booked}`,
      sub: `${upcoming.length} appointments`,
    },
    {
      icon: "clock" as const,
      label: "Chair hours ahead",
      value: formatDuration(chairMins),
      sub: "across the open book",
    },
    {
      icon: "wallet" as const,
      label: "Completed",
      value: `$${earned}`,
      sub: `${completed.length} appointments`,
    },
    {
      icon: "users" as const,
      label: "Your clients",
      value: String(clients.length),
      sub: `${clients.filter((c) => c.isMember).length} on membership`,
    },
  ];

  return (
    <>
      <PageHero
        ground="forest"
        eyebrow="Stylist"
        title={`${artist.name.split(" ")[0]}'s chair.`}
        lead={`As of ${longDate(SEED_TODAY)}. Your own book only — the other chair is not visible from here, and that separation is enforced in the data layer rather than in the layout.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Portal", path: "/portal" },
          { name: "Stylist", path: "/portal/stylist" },
        ]}
      />

      <Section ground="paper" labelledBy="stylist-stats-title">
        {isOwner && (
          <Reveal className="mb-12 card-light flex flex-wrap items-center justify-between gap-5 p-6">
            <p className="flex items-center gap-3 text-sm2 text-ink-soft">
              <Icon name="dashboard" className="size-5 text-bronze-ink" />
              You are the owner, so you can look at either chair.
            </p>
            <div className="flex gap-2">
              {SITE.artists.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setViewing(a.id as ArtistId)}
                  aria-pressed={viewing === a.id}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-pill border px-5 text-sm2 transition-colors duration-base ease-brand",
                    viewing === a.id
                      ? "border-transparent bg-forest text-paper"
                      : "border-ink/15 text-ink-soft hover:border-bronze-ink",
                  )}
                >
                  {a.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        <h2 id="stylist-stats-title" className="eyebrow text-bronze-ink">
          Your numbers
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

        {depositsDue.length > 0 && (
          <Reveal className="mt-10 rounded-panel border border-alert/50 bg-paper p-7" delay={200}>
            <h3 className="flex items-center gap-3 font-display text-d4 text-ink">
              <Icon name="alert" className="size-5 text-alert" />
              {depositsDue.length} deposit{depositsDue.length === 1 ? "" : "s"} outstanding
            </h3>
            <p className="mt-3 text-sm2 text-ink-soft">
              {depositsDue
                .map((a) => {
                  const c = clients.find((x) => x.id === a.clientId);
                  return `${c?.name ?? a.clientId} — ${shortDate(a.date)}`;
                })
                .join(" · ")}
            </p>
            <p className="mt-4 font-display text-[2rem] tabular-nums text-alert">
              ${depositsDue.length * DEPOSIT}
            </p>
          </Reveal>
        )}
      </Section>

      {/* The book */}
      <Section ground="cream" labelledBy="stylist-book-title">
        <h2 id="stylist-book-title" className="text-d2 text-ink">
          What&rsquo;s{" "}
          <em className="font-display italic text-bronze">coming.</em>
        </h2>

        {upcoming.length === 0 ? (
          <p className="mt-8 text-base2 text-ink-soft">Nothing on the book.</p>
        ) : (
          <div className="mt-12 flex flex-col gap-12">
            {Object.entries(byDay).map(([date, list], di) => (
              <Reveal key={date} delay={di * 80}>
                <h3 className="eyebrow text-bronze-ink">{longDate(date)}</h3>
                <ul className="mt-5 flex flex-col border-t border-ink/12">
                  {list.map((a) => {
                    const s = serviceBySlug(a.serviceSlug);
                    const c = clients.find((x) => x.id === a.clientId);
                    const mins = appointmentMinutes(a);
                    return (
                      <li
                        key={a.id}
                        className="grid gap-3 border-b border-ink/12 py-5 sm:grid-cols-[130px_1fr_auto] sm:items-baseline"
                      >
                        <div>
                          <p className="tabular-nums text-base2 text-bronze-ink">
                            {formatTime(a.start)}
                          </p>
                          <p className="text-xs2 tabular-nums text-ink-soft">
                            to {formatTime(endTime(a.start, mins))}
                          </p>
                        </div>

                        <div className="min-w-0">
                          <p className="text-base2 text-ink">{c?.name ?? a.clientId}</p>
                          <p className="text-sm2 text-ink-soft">
                            {s?.name}
                            {a.addonSlugs.length > 0 &&
                              ` + ${a.addonSlugs
                                .map((x) => serviceBySlug(x)?.name)
                                .filter(Boolean)
                                .join(", ")}`}{" "}
                            · {formatDuration(mins)}
                          </p>
                          {c?.notes && (
                            <p className="mt-2 max-w-[62ch] text-sm2 italic text-ink-soft">
                              {c.notes}
                            </p>
                          )}
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
                            {a.depositPaid ? "Deposit paid" : "Deposit due"}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      {/* Clients */}
      <Section ground="paper" labelledBy="stylist-clients-title">
        <h2 id="stylist-clients-title" className="text-d2 text-ink">
          Your{" "}
          <em className="font-display italic text-bronze">clients.</em>
        </h2>

        <Reveal className="mt-10 overflow-x-auto" delay={80}>
          <table className="w-full min-w-[680px] border-collapse text-left">
            <caption className="sr-only">
              Clients assigned to {artist.name}
            </caption>
            <thead>
              <tr className="border-b border-ink/12">
                {["Client", "Track", "Since", "Membership", "Notes"].map((h) => (
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
                  <td className="max-w-[30ch] py-5 text-sm2 text-ink-soft">{c.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap gap-4" delay={160}>
          <ButtonLink href="/portal/owner" variant="outline" icon="arrow-right">
            The owner view
          </ButtonLink>
          <ButtonLink href="/portal/client" variant="outline">
            What your client sees
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
