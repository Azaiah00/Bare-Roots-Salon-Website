"use client";

import Link from "next/link";
import { useSession, canSee } from "@/lib/auth";
import type { Role } from "@/lib/db";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Gates the private routes.
 *
 * THIS IS NOT SECURITY. It is a rendering decision made in the browser from a
 * role held in memory, and anyone who wants the markup can have it. It exists
 * so the demo behaves like the real thing and so the shape of the real thing is
 * already correct: when Supabase Auth goes in, this component keeps its props
 * and its position in the tree, and only lib/auth.tsx changes.
 * // TODO: Supabase Auth — replace useSession, keep this component.
 */
export default function Guard({
  need,
  children,
}: {
  need: Role;
  children: React.ReactNode;
}) {
  const { session } = useSession();

  if (canSee(session, need)) return <>{children}</>;

  const label =
    need === "owner" ? "the owner dashboard" : need === "stylist" ? "a stylist's book" : "the client portal";

  return (
    <div className="shell py-section">
      <div className="mx-auto max-w-xl text-center">
        <Icon name="lock" className="mx-auto size-10 text-bronze-ink" strokeWidth={1.1} />
        <h1 className="mt-7 font-display text-d2 text-ink">Sign in to continue.</h1>
        <p className="mt-5 text-base2 text-ink-soft">
          {session.role === "guest"
            ? `You need to be signed in to see ${label}.`
            : `You are signed in as ${session.label}, which does not have access to ${label}. Stylists see only their own chair — that separation is the point.`}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/login" variant="dark" icon="arrow-right">
            Choose a demo account
          </ButtonLink>
          <ButtonLink href="/portal" variant="outline">
            Back to the portal
          </ButtonLink>
        </div>
        <p className="mt-8 text-xs2 text-ink-soft">
          No password is checked and nothing is stored on your device.{" "}
          <Link href="/" className="underline underline-offset-4">
            Return to the site
          </Link>
        </p>
      </div>
    </div>
  );
}
