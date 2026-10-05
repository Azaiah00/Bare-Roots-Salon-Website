import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your bag",
  description: "The products in your Bare Roots bag.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
