"use client";

/**
 * Demo authentication.
 *
 * THIS IS NOT SECURITY AND IT IS NOT PRETENDING TO BE. It is a React context
 * holding a role for the length of a page session, so the portal can be
 * demonstrated end to end. There is NO PERSISTENCE BY DESIGN — nothing is
 * written to localStorage, sessionStorage or a cookie, because a fake
 * credential should never be left on anyone's device, and because a "session"
 * that survives a refresh invites someone to mistake this for a real login.
 *
 * Going live is a change to THIS FILE ONLY. Swap the body of `signIn` for
 * Supabase Auth, keep the shape of `Session`, and Guard.tsx and every portal
 * screen carry on unchanged.
 * // TODO: Supabase Auth
 */

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ArtistId, Role } from "./db";
import { DEMO_CLIENTS } from "./db";
import { SITE } from "./site";

export type Session = {
  role: Role;
  label: string;
  /** Set when role === "client". */
  clientId?: string;
  /** Set when role === "stylist". */
  artist?: ArtistId;
};

export const GUEST: Session = { role: "guest", label: "Not signed in" };

/** The one-click demo accounts offered on /login. No password is checked. */
export const DEMO_ACCOUNTS: (Session & { blurb: string })[] = [
  {
    role: "client",
    clientId: DEMO_CLIENTS[0].id,
    label: "Demo Client",
    blurb:
      "Her next appointment, her recovery journey with every visit photographed, her orders and her membership.",
  },
  {
    role: "stylist",
    artist: "iisha",
    label: `${SITE.artists[0].name} — stylist`,
    blurb:
      "Only her own book, her own recovery clients and her own earnings. She cannot see Sabrina's chair.",
  },
  {
    role: "stylist",
    artist: "sabrina",
    label: `${SITE.artists[1].name} — stylist`,
    blurb:
      "Only her own book, her own loc clients and her own earnings. She cannot see Iisha's chair.",
  },
  {
    role: "owner",
    label: "Owner — the house",
    blurb:
      "Both books, every client, revenue across both chairs, deposits outstanding and the retail shelf.",
  },
];

type Ctx = {
  session: Session;
  signIn: (s: Session) => void;
  signOut: () => void;
};

const AuthContext = createContext<Ctx>({
  session: GUEST,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>(GUEST);

  const signIn = useCallback((s: Session) => setSession(s), []);
  const signOut = useCallback(() => setSession(GUEST), []);

  const value = useMemo(() => ({ session, signIn, signOut }), [session, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useSession(): Ctx {
  return useContext(AuthContext);
}

/** Owners can see everything a stylist can. Stylists cannot see each other. */
export function canSee(session: Session, need: Role): boolean {
  if (session.role === "owner") return true;
  return session.role === need;
}
