import type { Metadata } from "next";

/**
 * Every portal route is noindex, and robots.ts excludes the whole /portal tree
 * as well. Two locks, because a private dashboard appearing in a search result
 * is the kind of mistake nobody notices for six months.
 */
export const metadata: Metadata = {
  title: "Portal",
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
