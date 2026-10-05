import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo sign-in",
  description: "One-click demo accounts for the Bare Roots portal.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
