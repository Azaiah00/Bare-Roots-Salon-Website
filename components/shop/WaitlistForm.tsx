"use client";

import { useState } from "react";
import { joinWaitlist } from "@/lib/db";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * The waitlist capture. Used by DOPE HAIR, the wraps and the Academy.
 *
 * Demo only — nothing is sent and no address is stored anywhere. The success
 * state says so, because a form that claims to have subscribed someone who is
 * not subscribed is a promise the client will have to break later.
 * // TODO: newsletter provider
 */
export default function WaitlistForm({
  slug,
  label = "Join the list",
  note = "Preview build — nothing is sent and no address is stored.",
  dark,
}: {
  slug: string;
  label?: string;
  note?: string;
  dark?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div
        className={cn(
          "marker flex items-start gap-3 p-5 text-sm2",
          dark && "marker-dark",
        )}
      >
        <Icon name="circle-check" className="mt-0.5 size-5 shrink-0" />
        <p className="font-normal">
          <strong className="font-medium">You are on the list.</strong> {note}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        joinWaitlist(email, slug);
        setDone(true);
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label htmlFor={`waitlist-${slug}`} className="sr-only">
        Email address
      </label>
      <input
        id={`waitlist-${slug}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
        className={cn("field flex-1", dark && "field-dark")}
      />
      <button type="submit" className={cn("btn", dark ? "btn-gold" : "btn-dark")}>
        {label}
      </button>
    </form>
  );
}
