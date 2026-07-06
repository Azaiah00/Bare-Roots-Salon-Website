import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { CartProvider } from "@/components/CartProvider";
import CartUI from "@/components/CartUI";
import JsonLd from "@/components/JsonLd";

// Display / headlines — high-contrast serif, italic for emotional accents
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Body / UI — clean geometric sans, letter-spaced small caps for labels
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bareroots.salon"),
  title: {
    default: "Bare Roots — Natural. Luxury. Culture. | Richmond, VA",
    template: "%s · Bare Roots",
  },
  description:
    "Bare Roots is Richmond's home for luxury natural hair — micro locs, sisterlocs, traditional locs, holistic hair recovery, silk press, color and wellness. Two master artists, one rooted experience.",
  keywords: [
    "micro locs Richmond VA",
    "loc salon Henrico",
    "hair loss recovery Richmond",
    "sisterlocs RVA",
    "natural hair salon Richmond",
  ],
  openGraph: {
    title: "Bare Roots — Natural. Luxury. Culture.",
    description:
      "Richmond's luxury natural-hair house where holistic hair recovery meets master loc artistry. Rooted in culture, crowned in gold.",
    url: "https://bareroots.salon",
    siteName: "Bare Roots",
    images: [{ url: "/assets/hero.png", width: 1200, height: 630, alt: "Bare Roots" }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        {/* Without JS, never hide reveal content */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <JsonLd />
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <div className="mobile-book">
            <a href="#book" className="btn btn-gold">
              Book Now
            </a>
          </div>
          <CartUI />
        </CartProvider>
      </body>
    </html>
  );
}
