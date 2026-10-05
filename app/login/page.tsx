"use client";

import { useRouter } from "next/navigation";
import { DEMO_ACCOUNTS, useSession } from "@/lib/auth";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";

const ICON: Record<string, IconName> = {
  client: "user",
  stylist: "scissors",
  owner: "dashboard",
};

/**
 * The demo sign-in.
 *
 * Four one-click accounts, no password checked, nothing persisted. Presented
 * honestly as a demo rather than dressed up as a login form, because a fake
 * password field trains people to type real passwords into fake forms.
 */
export default function LoginPage() {
  const { signIn } = useSession();
  const router = useRouter();

  return (
    <>
      <PageHero
        ground="ink"
        eyebrow="Demo sign-in"
        title={
          <>
            Pick a seat
            <br />
            <em className="font-display italic text-gold">at the table.</em>
          </>
        }
        lead="Four accounts, one click each. No password is checked, nothing is written to your device, and every screen behind this runs on typed demo data."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Portal", path: "/portal" },
          { name: "Sign in", path: "/login" },
        ]}
      />

      <Section ground="paper">
        <h2 className="sr-only">Demo accounts</h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {DEMO_ACCOUNTS.map((a, i) => (
            <Reveal as="li" key={a.label} delay={i * 80}>
              <button
                type="button"
                onClick={() => {
                  signIn(a);
                  router.push(
                    a.role === "client"
                      ? "/portal/client"
                      : a.role === "stylist"
                        ? "/portal/stylist"
                        : "/portal/owner",
                  );
                }}
                className="card-light card-hover group flex h-full w-full flex-col p-8 text-left"
              >
                <Icon
                  name={ICON[a.role] ?? "user"}
                  className="size-7 text-bronze-ink"
                  strokeWidth={1.2}
                />
                <h3 className="mt-6 font-display text-d3 text-ink">{a.label}</h3>
                <p className="mt-4 flex-1 text-sm2 text-ink-soft">{a.blurb}</p>
                <p className="mt-7 inline-flex items-center gap-2 text-xs2 uppercase tracking-wide2 text-bronze-ink">
                  Sign in as this
                  <Icon
                    name="arrow-right"
                    className="size-3.5 transition-transform duration-base ease-brand group-hover:translate-x-1"
                  />
                </p>
              </button>
            </Reveal>
          ))}
        </ul>

        <Reveal className="marker mt-12 flex items-start gap-4 p-6 text-sm2" delay={280}>
          <Icon name="lock" className="mt-0.5 size-5 shrink-0" />
          <p className="max-w-[64ch] font-normal">
            <strong className="font-medium">No real accounts exist yet.</strong>{" "}
            Sessions live in memory for as long as this tab is open and are gone on
            refresh — a fake credential should never be written to anyone&rsquo;s
            device. Turning this into real authentication is a change to one file.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
