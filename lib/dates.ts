/**
 * Date formatting.
 *
 * Every ISO date is anchored at T12:00:00Z and rendered with timeZone: "UTC".
 * Without both halves, a date stored as "2026-09-24" renders as the 23rd for
 * anyone west of Greenwich — which in a booking system means an appointment
 * card that disagrees with the appointment.
 */

export function longDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "September 24, 2026" — no weekday. */
export function plainDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "Thu, Sep 24" — for a dense working list. */
export function shortDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** The three parts of a date tile: "Thu", "24", "Sep". */
export function dateParts(iso: string): { weekday: string; day: string; month: string } {
  const d = new Date(`${iso}T12:00:00Z`);
  const f = (opts: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });
  return {
    weekday: f({ weekday: "short" }),
    day: f({ day: "numeric" }),
    month: f({ month: "short" }),
  };
}
