"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

const ROLES: {
  href: string;
  icon: IconName;
  name: string;
  body: string;
  detail: string;
}[] = [
  {
    href: "/portal/client",
    icon: "user",
    name: "Client",
    body: "Your next appointment, your recovery journey photographed visit by visit, your orders and your membership.",
    detail: "What the person in the chair sees",
  },
  {
    href: "/portal/stylist",
    icon: "scissors",
    name: "Stylist",
    body: "One artist's own book, her own clients with her own prep notes, and what her chair has earned. She cannot see the other chair.",
    detail: "Iisha or Sabrina",
  },
  {
    href: "/portal/owner",
    icon: "dashboard",
    name: "Owner",
    body: "Both books at once, every client, revenue across both chairs, deposits outstanding and the state of the retail shelf.",
    detail: "The house",
  },
];

export default function PortalPage() {
  const { session, signOut } = useSession();

  return (
    <>
      <PageHero
        ground="forest"
        eyebrow="Portal"
        title={
          <>
            Three views,
            <br />
            <em className="font-display italic text-gold">one system.</em>
          </>
        }
        lead="Clients see their own journey. Each artist sees her own chair. The house sees everything. All three run on the same demo data — no real client information is stored in this preview."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Portal", path: "/portal" },
        ]}
        actions={
          session.role === "guest" ? (
            <ButtonLink href="/login" variant="gold" icon="arrow-right">
              Choose a demo account
            </ButtonLink>
          ) : undefined
        }
      />

      <Section ground="paper">
        {session.role !== "guest" && (
          <Reveal className="mb-12 card-light flex flex-wrap items-center justify-between gap-5 p-6">
            <p className="flex items-center gap-3 text-sm2 text-ink-soft">
              <Icon name="user" className="size-5 text-bronze-ink" />
              Signed in as{" "}
              <strong className="font-medium text-ink">{session.label}</strong>
            </p>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex min-h-11 items-center gap-2 text-sm2 text-ink-soft underline underline-offset-4 hover:text-bronze-ink"
            >
              Sign out
            </button>
          </Reveal>
        )}

        <h2 className="sr-only">Portal views</h2>
        <ul className="grid gap-6 lg:grid-cols-3">
          {ROLES.map((r, i) => (
            <Reveal as="li" key={r.href} delay={i * 90}>
              <Link href={r.href} className="card-light card-hover group flex h-full flex-col p-8">
                <Icon name={r.icon} className="size-7 text-bronze-ink" strokeWidth={1.2} />
                <h3 className="mt-6 font-display text-d3 text-ink">{r.name}</h3>
                <p className="mt-4 flex-1 text-sm2 text-ink-soft">{r.body}</p>
                <p className="eyebrow mt-7 text-bronze-ink">{r.detail}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-xs2 uppercase tracking-wide2 text-ink">
                  Open
                  <Icon
                    name="arrow-right"
                    className="size-3.5 transition-transform duration-base ease-brand group-hover:translate-x-1"
                  />
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 card-light p-8" delay={280}>
          <h3 className="eyebrow text-bronze-ink">How this becomes real</h3>
          <p className="mt-5 max-w-prose2 text-base2 text-ink-soft">
            Every screen behind these three doors reads through one data layer,{" "}
            <code className="font-mono text-sm2 text-ink">lib/db.ts</code>. Swapping
            the demo arrays for Supabase and Stripe is a backend change — the
            function signatures stay identical and the interface does not move.
            Role separation is already enforced the way it will be in production:
            the client portal asks for one client&rsquo;s rows, a stylist asks for
            one artist&rsquo;s, and only the owner asks for everything.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
