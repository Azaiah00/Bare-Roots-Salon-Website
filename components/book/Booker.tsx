"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  SERVICE_CATEGORIES,
  SERVICES,
  serviceBySlug,
  formatDuration,
  formatPrice,
  ADDON_SLUGS,
  DEPOSIT,
  CANCELLATION_HOURS,
  RESCHEDULE_HOURS,
  type Service,
} from "@/lib/services";
import {
  availableSlots,
  upcomingOpenDates,
  createAppointment,
  endTime,
} from "@/lib/db";
import { SITE, formatTime, artistById, HOURS_SUMMARY } from "@/lib/site";
import { longDate, dateParts } from "@/lib/dates";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Button, ButtonLink } from "@/components/ui/Button";

/**
 * The five-step booker.
 *
 * It beats a marketplace booking widget on three things that actually matter:
 *
 *  1. The price AND the duration are visible at every step, updating live — on
 *     desktop in the sticky panel, on mobile in a fixed bar at the bottom. A
 *     client choosing a $1,000 install should know that before step five.
 *  2. Availability is real. It is hours-aware, it is per-artist, and it refuses
 *     to offer a start the service cannot finish inside. Add an add-on and the
 *     days it no longer fits into grey out on their own.
 *  3. Every time slot says when you are OUT of the chair, not just when you are
 *     in it. For a 5-hour mini twist that is the single most useful number on
 *     the screen.
 *
 * The artist is derived from the service rather than asked for. Two chairs run
 * independently here, and making someone pick a person before they have picked
 * a service is a step that exists for the salon's benefit, not theirs.
 *
 * Demo mode: no deposit is taken and no appointment is created. // TODO: Stripe
 */

const STEPS = ["Service", "Add-ons", "Day", "Time", "Details"] as const;

const ADDONS = SERVICES.filter((s) => (ADDON_SLUGS as readonly string[]).includes(s.slug));

/**
 * Reads ?service= on the CLIENT.
 *
 * Deliberately not `searchParams` on the server: a page that reads searchParams
 * server-side becomes dynamic, which kills Next's prefetch of the most
 * important link on the site. useSyncExternalStore is the right API for reading
 * an external source like the URL — the server snapshot stays empty so
 * hydration matches, and there is no setState-in-an-effect.
 */
function useServiceParam(): string | null {
  const search = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("popstate", onChange);
      return () => window.removeEventListener("popstate", onChange);
    },
    () => window.location.search,
    () => "",
  );
  return useMemo(() => {
    const v = new URLSearchParams(search).get("service");
    return v && serviceBySlug(v) ? v : null;
  }, [search]);
}

export default function Booker() {
  const preset = useServiceParam();

  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | null>(null);
  const [addons, setAddons] = useState<string[]>([]);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    transfer: "no",
    notes: "",
  });
  const [confirmed, setConfirmed] = useState<{ id: string } | null>(null);

  // Apply the deep link during render rather than in an effect — one render
  // pass instead of two, and no flash of step one.
  const [appliedPreset, setAppliedPreset] = useState<string | null>(null);
  if (preset && appliedPreset !== preset) {
    setAppliedPreset(preset);
    const s = serviceBySlug(preset);
    if (s) {
      setService(s);
      setStep(1);
    }
  }

  const addonServices = addons
    .map((a) => serviceBySlug(a))
    .filter((s): s is Service => Boolean(s));

  const totalPrice = (service?.price ?? 0) + addonServices.reduce((n, a) => n + a.price, 0);
  const totalMins = (service?.duration ?? 0) + addonServices.reduce((n, a) => n + a.duration, 0);
  const artist = service ? artistById(service.artist) : null;
  const quoteOnly = Boolean(service && service.price === 0);

  const dates = useMemo(() => upcomingOpenDates(12), []);
  const slots = useMemo(
    () => (date && service ? availableSlots(date, service.artist, totalMins) : []),
    [date, service, totalMins],
  );

  const canAdvance =
    (step === 0 && service) ||
    step === 1 ||
    (step === 2 && date) ||
    (step === 3 && time) ||
    step === 4;

  function chooseService(s: Service) {
    setService(s);
    // Add-ons belong to one artist; changing artists invalidates them.
    setAddons((prev) =>
      prev.filter((slug) => serviceBySlug(slug)?.artist === s.artist),
    );
    setTime(null);
  }

  /* ------------------------------------------------------------ confirmed */

  if (confirmed && service && date && time) {
    return (
      <div className="mx-auto max-w-2xl">
        <Icon name="circle-check" className="size-12 text-bronze-ink" strokeWidth={1} />
        <h2 className="mt-7 font-display text-d2 text-ink">You&rsquo;re on the books.</h2>
        <p className="mt-5 text-lead text-ink-soft">
          {service.name} with {artist?.name} on {longDate(date)} at{" "}
          {formatTime(time)}, out by {formatTime(endTime(time, totalMins))}.
        </p>

        <dl className="hairline-grid mt-9 sm:grid-cols-3">
          <div className="bg-paper p-6">
            <dt className="eyebrow text-bronze-ink">Reference</dt>
            <dd className="mt-2 text-base2 tabular-nums">{confirmed.id}</dd>
          </div>
          <div className="bg-paper p-6">
            <dt className="eyebrow text-bronze-ink">Deposit</dt>
            <dd className="mt-2 text-base2">${DEPOSIT} — not taken in demo</dd>
          </div>
          <div className="bg-paper p-6">
            <dt className="eyebrow text-bronze-ink">Balance at visit</dt>
            <dd className="mt-2 text-base2 tabular-nums">
              {quoteOnly ? "Quoted at consultation" : `$${Math.max(0, totalPrice - DEPOSIT)}`}
            </dd>
          </div>
        </dl>

        <div className="marker mt-9 p-6 text-sm2">
          <p className="font-normal">
            <strong className="font-medium">This is a preview build.</strong>{" "}
            Nothing was actually booked and no deposit was charged. To book for
            real today, use{" "}
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Sabrina&rsquo;s GlossGenius page
            </a>{" "}
            or text {artist?.name.split(" ")[0]} on{" "}
            <a href={artist?.smsHref} className="underline underline-offset-4">
              {artist?.phone}
            </a>
            .
          </p>
        </div>

        <div className="mt-9 flex flex-wrap gap-4">
          <ButtonLink href="/portal/client" variant="dark" icon="arrow-right">
            See it in the portal
          </ButtonLink>
          <ButtonLink href={SITE.booking} variant="outline" external>
            Book for real
          </ButtonLink>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- panel */

  const summary = (
    <>
      <dl className="flex flex-col gap-5">
        <div>
          <dt className="eyebrow text-bronze-ink">Service</dt>
          <dd className="mt-1.5 text-base2 text-ink">
            {service ? service.name : "Not chosen yet"}
            {artist && (
              <span className="block text-sm2 text-ink-soft">with {artist.name}</span>
            )}
          </dd>
        </div>
        {addonServices.length > 0 && (
          <div>
            <dt className="eyebrow text-bronze-ink">Add-ons</dt>
            <dd className="mt-1.5 text-base2 text-ink">
              {addonServices.map((a) => a.name).join(", ")}
            </dd>
          </div>
        )}
        <div>
          <dt className="eyebrow text-bronze-ink">When</dt>
          <dd className="mt-1.5 text-base2 text-ink">
            {date ? longDate(date) : "Not chosen yet"}
            {date && time && (
              <span className="block text-sm2 text-ink-soft">
                {formatTime(time)} — out by {formatTime(endTime(time, totalMins))}
              </span>
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-7 border-t border-ink/12 pt-7">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-sm2 text-ink-soft">
            <Icon name="clock" className="size-4 text-bronze-ink" />
            In the chair
          </span>
          <span className="text-base2 tabular-nums text-ink">
            {totalMins ? formatDuration(totalMins) : "—"}
          </span>
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <span className="eyebrow text-bronze-ink">Total</span>
          <span className="font-display text-[2.5rem] leading-none tabular-nums text-bronze">
            {quoteOnly ? (
              <span className="text-d4 not-italic">At consultation</span>
            ) : (
              <>
                {service?.isBasePrice && (
                  <span className="mr-1 font-sans text-sm2 text-ink-soft">from</span>
                )}
                ${totalPrice}
              </>
            )}
          </span>
        </div>
      </div>

      {!quoteOnly && (
        <dl className="mt-7 flex flex-col gap-2 border-t border-ink/12 pt-7 text-sm2">
          <div className="flex justify-between">
            <dt className="text-ink-soft">Deposit today</dt>
            <dd className="tabular-nums">${DEPOSIT}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Balance at visit</dt>
            <dd className="tabular-nums">${Math.max(0, totalPrice - DEPOSIT)}</dd>
          </div>
        </dl>
      )}

      <p className="mt-6 text-xs2 text-ink-soft">
        Deposit holds the chair and comes off your balance. {CANCELLATION_HOURS}{" "}
        hours&rsquo; notice to cancel, {RESCHEDULE_HOURS} to reschedule. Deposit
        amount still to be confirmed by the artists.
      </p>
    </>
  );

  /* ----------------------------------------------------------------- body */

  return (
    <>
      <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:items-start lg:gap-16">
        <div>
          {/* Step rail */}
          <ol aria-label="Booking steps" className="flex flex-wrap gap-2">
            {STEPS.map((label, i) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  aria-current={i === step ? "step" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-pill border px-4 text-sm2 transition-colors duration-base ease-brand",
                    i === step && "border-transparent bg-forest text-paper",
                    i < step && "border-bronze-ink/45 text-bronze-ink hover:bg-cream",
                    i > step && "border-ink/12 text-ink-mid",
                  )}
                >
                  {i < step ? (
                    <Icon name="check" className="size-3.5" strokeWidth={2.2} />
                  ) : (
                    <span className="tabular-nums">{i + 1}</span>
                  )}
                  {label}
                </button>
              </li>
            ))}
          </ol>

          {/* ---------------------------------------------------- step 1 */}
          {step === 0 && (
            <div className="mt-12">
              <p className="eyebrow text-bronze-ink">Step 1</p>
              <h2 className="mt-4 font-display text-d3 text-ink">
                What are we doing?
              </h2>
              <p className="mt-4 max-w-prose2 text-base2 text-ink-soft">
                Transferring from another loctician, or not sure where to start?
                Choose a consultation. Neither artist will quote a head she has
                not seen, and starting there costs you less than starting wrong.
              </p>

              <div className="mt-10 flex flex-col gap-10">
                {SERVICE_CATEGORIES.map((cat) => (
                  <fieldset key={cat.id}>
                    <legend className="eyebrow text-bronze-ink">
                      {cat.name} · {artistById(cat.artistId)?.name}
                    </legend>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {SERVICES.filter((s) => s.category === cat.id).map((s) => {
                        const on = service?.slug === s.slug;
                        return (
                          <li key={s.slug}>
                            <button
                              type="button"
                              aria-pressed={on}
                              onClick={() => chooseService(s)}
                              className={cn(
                                "flex min-h-[76px] w-full flex-col justify-center rounded-xs2 border p-4 text-left transition-colors duration-base ease-brand",
                                on
                                  ? "border-bronze-ink bg-cream"
                                  : "border-ink/12 hover:border-bronze-ink/50 hover:bg-cream",
                              )}
                            >
                              <span className="text-base2 text-ink">{s.name}</span>
                              <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs2 text-ink-soft">
                                <span className="font-display italic text-bronze-ink">
                                  {formatPrice(s)}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <Icon name="clock" className="size-3.5" />
                                  {formatDuration(s.duration)}
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </fieldset>
                ))}
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- step 2 */}
          {step === 1 && (
            <div className="mt-12">
              <p className="eyebrow text-bronze-ink">Step 2</p>
              <h2 className="mt-4 font-display text-d3 text-ink">Anything to add?</h2>
              <p className="mt-4 max-w-prose2 text-base2 text-ink-soft">
                Optional. Each one extends the appointment, and the total on the
                right updates as you pick — which is also why the days that no
                longer fit will grey out at the next step.
              </p>

              <ul className="mt-9 flex flex-col gap-3">
                {ADDONS.filter((a) => !service || a.artist === service.artist).map((a) => {
                  const on = addons.includes(a.slug);
                  return (
                    <li key={a.slug}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => {
                          setAddons((prev) =>
                            on ? prev.filter((s) => s !== a.slug) : [...prev, a.slug],
                          );
                          setTime(null);
                        }}
                        className={cn(
                          "flex w-full items-start gap-4 rounded-xs2 border p-5 text-left transition-colors duration-base ease-brand",
                          on ? "border-bronze-ink bg-cream" : "border-ink/12 hover:border-bronze-ink/50",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[3px] border",
                            on ? "border-bronze-ink bg-bronze-ink text-paper" : "border-ink/25",
                          )}
                        >
                          {on && <Icon name="check" className="size-3" strokeWidth={2.6} />}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-base2 text-ink">{a.name}</span>
                          <span className="mt-1 block text-sm2 text-ink-soft">
                            +${a.price} · +{formatDuration(a.duration)}
                          </span>
                          {a.note && (
                            <span className="mt-2 block text-xs2 text-ink-soft">{a.note}</span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {ADDONS.filter((a) => !service || a.artist === service.artist).length === 0 && (
                <p className="marker mt-9 p-5 text-sm2 font-normal">
                  No add-ons apply to this service — continue to pick a day.
                </p>
              )}
            </div>
          )}

          {/* ---------------------------------------------------- step 3 */}
          {step === 2 && service && (
            <div className="mt-12">
              <p className="eyebrow text-bronze-ink">Step 3</p>
              <h2 className="mt-4 font-display text-d3 text-ink">Which day?</h2>
              <p className="mt-4 max-w-prose2 text-base2 text-ink-soft">
                {HOURS_SUMMARY}. Only days where {formatDuration(totalMins)}{" "}
                actually fits in {artist?.name.split(" ")[0]}&rsquo;s book are
                selectable.
              </p>

              <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {dates.map((d) => {
                  const fits = availableSlots(d, service.artist, totalMins).length > 0;
                  const on = date === d;
                  const parts = dateParts(d);
                  return (
                    <li key={d}>
                      <button
                        type="button"
                        disabled={!fits}
                        aria-pressed={on}
                        onClick={() => {
                          setDate(d);
                          setTime(null);
                        }}
                        className={cn(
                          "flex min-h-20 w-full flex-col items-center justify-center rounded-xs2 border transition-colors duration-base ease-brand",
                          on && "border-bronze-ink bg-cream",
                          !on && fits && "border-ink/12 hover:border-bronze-ink/50 hover:bg-cream",
                          !fits && "cursor-not-allowed border-ink/8 text-ink-soft/45",
                        )}
                      >
                        <span className="eyebrow">{parts.weekday}</span>
                        <span className="mt-1 font-display text-[1.75rem] leading-none tabular-nums">
                          {parts.day}
                        </span>
                        <span className="mt-1 text-xs2">{parts.month}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-6 text-xs2 text-ink-soft">
                Greyed-out days are days the full {formatDuration(totalMins)} does
                not fit — not days we are closed. Closed days are not shown at all.
              </p>
            </div>
          )}

          {/* ---------------------------------------------------- step 4 */}
          {step === 3 && service && date && (
            <div className="mt-12">
              <p className="eyebrow text-bronze-ink">Step 4</p>
              <h2 className="mt-4 font-display text-d3 text-ink">What time?</h2>
              <p className="mt-4 flex max-w-prose2 items-start gap-3 text-base2 text-ink-soft">
                <Icon name="info" className="mt-1 size-4 shrink-0 text-bronze-ink" />
                One client at a time. These are the starts where the full{" "}
                {formatDuration(totalMins)} finishes before close on{" "}
                {longDate(date)}.
              </p>

              {slots.length === 0 ? (
                <div className="marker mt-9 p-6">
                  <p className="text-base2 font-normal">
                    Nothing fits on that day. Try another — or, for a service this
                    long, text {artist?.name.split(" ")[0]} on{" "}
                    <a href={artist?.smsHref} className="underline underline-offset-4">
                      {artist?.phone}
                    </a>{" "}
                    and she will find you a sitting.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn btn-outline btn-sm mt-5"
                  >
                    <Icon name="arrow-left" className="size-3.5" />
                    Pick another day
                  </button>
                </div>
              ) : (
                <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {slots.map((t) => {
                    const on = time === t;
                    return (
                      <li key={t}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => setTime(t)}
                          className={cn(
                            "flex min-h-16 w-full flex-col items-center justify-center rounded-xs2 border transition-colors duration-base ease-brand",
                            on
                              ? "border-bronze-ink bg-cream"
                              : "border-ink/12 hover:border-bronze-ink/50 hover:bg-cream",
                          )}
                        >
                          <span className="text-base2 tabular-nums text-ink">
                            {formatTime(t)}
                          </span>
                          <span className="mt-0.5 text-xs2 text-ink-soft">
                            out by {formatTime(endTime(t, totalMins))}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}

          {/* ---------------------------------------------------- step 5 */}
          {step === 4 && service && date && time && (
            <form
              className="mt-12"
              onSubmit={(e) => {
                e.preventDefault();
                const res = createAppointment({
                  artist: service.artist,
                  serviceSlug: service.slug,
                  addonSlugs: addons,
                  date,
                  start: time,
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  isTransferClient: form.transfer === "yes",
                  notes: form.notes,
                });
                setConfirmed({ id: res.id });
              }}
            >
              <p className="eyebrow text-bronze-ink">Step 5</p>
              <h2 className="mt-4 font-display text-d3 text-ink">Who&rsquo;s coming in?</h2>

              <div className="mt-9 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-name" className="eyebrow text-bronze-ink">
                    Full name
                  </label>
                  <input
                    id="bk-name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="field mt-2"
                  />
                </div>
                <div>
                  <label htmlFor="bk-phone" className="eyebrow text-bronze-ink">
                    Mobile — she texts if she is running late
                  </label>
                  <input
                    id="bk-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="field mt-2"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="bk-email" className="eyebrow text-bronze-ink">
                    Email
                  </label>
                  <input
                    id="bk-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="field mt-2"
                  />
                </div>
              </div>

              <fieldset className="mt-8">
                <legend className="eyebrow text-bronze-ink">
                  Are you transferring from another stylist?
                </legend>
                <div className="mt-4 flex flex-wrap gap-3">
                  {(["no", "yes"] as const).map((v) => (
                    <label
                      key={v}
                      className={cn(
                        "inline-flex min-h-12 cursor-pointer items-center rounded-pill border px-7 text-sm2 capitalize transition-colors duration-base ease-brand",
                        form.transfer === v
                          ? "border-bronze-ink bg-cream text-ink"
                          : "border-ink/15 text-ink-soft hover:border-bronze-ink",
                      )}
                    >
                      <input
                        type="radio"
                        name="transfer"
                        value={v}
                        checked={form.transfer === v}
                        onChange={() => setForm({ ...form, transfer: v })}
                        className="sr-only"
                      />
                      {v}
                    </label>
                  ))}
                </div>
                {form.transfer === "yes" && (
                  <p className="marker mt-5 p-5 text-sm2 font-normal">
                    Transfers are welcome and we do a lot of them. A consultation
                    is required first so {artist?.name.split(" ")[0]} can see the
                    grid, the tension and the loc health before quoting. If you
                    have not had one, change your selection at step one.
                  </p>
                )}
              </fieldset>

              <div className="mt-8">
                <label htmlFor="bk-notes" className="eyebrow text-bronze-ink">
                  Anything she should know? (optional)
                </label>
                <textarea
                  id="bk-notes"
                  rows={4}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Medication, recent colour, a date you are getting ready for, anything you are worried about."
                  className="field mt-2"
                />
              </div>

              <button type="submit" className="btn btn-gold mt-9 w-full sm:w-auto">
                Confirm — ${DEPOSIT} deposit
              </button>
              <p className="mt-4 text-xs2 text-ink-soft">
                No card is taken in this preview and nothing is charged.
              </p>
            </form>
          )}

          {/* Nav */}
          {step < 4 && (
            <div className="mt-12 flex items-center gap-3">
              {step > 0 && (
                <Button variant="outline" iconBefore="arrow-left" onClick={() => setStep((s) => s - 1)}>
                  Back
                </Button>
              )}
              <Button
                variant="gold"
                disabled={!canAdvance}
                onClick={() => setStep((s) => Math.min(4, s + 1))}
              >
                Continue
              </Button>
            </div>
          )}
        </div>

        {/* Desktop summary */}
        <aside
          aria-label="Appointment summary"
          className="card-light hidden p-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:block"
        >
          <h2 className="font-display text-d4 text-ink">Your appointment</h2>
          <div className="mt-7">{summary}</div>
          <p className="mt-7 border-t border-ink/12 pt-6 text-xs2 text-ink-soft">
            Prefer to book the way you always have?{" "}
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Sabrina is on GlossGenius
            </a>
            .
          </p>
        </aside>
      </div>

      {/* Mobile running total — the number has to follow you down the page */}
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-ink/12 bg-paper px-gutter pt-3 shadow-[0_-12px_28px_-18px_rgba(28,21,24,0.5)] lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-xs2 text-ink-soft">
              {service ? `${service.name}${artist ? ` · ${artist.name.split(" ")[0]}` : ""}` : "Nothing chosen yet"}
            </p>
            <p className="mt-0.5 flex items-baseline gap-3">
              <span className="font-display text-d4 italic tabular-nums text-bronze-ink">
                {quoteOnly ? "At consultation" : `$${totalPrice}`}
              </span>
              {totalMins > 0 && (
                <span className="text-xs2 tabular-nums text-ink-soft">
                  {formatDuration(totalMins)}
                </span>
              )}
            </p>
          </div>
          {step < 4 ? (
            <Button
              variant="gold"
              size="sm"
              disabled={!canAdvance}
              onClick={() => setStep((s) => Math.min(4, s + 1))}
            >
              Continue
            </Button>
          ) : (
            <Link href="#main" className="btn btn-outline btn-sm">
              Review
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
