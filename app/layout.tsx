import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SITE } from "@/lib/site";
import { hairSalonSchema, jsonLd } from "@/lib/schema";
import { AuthProvider } from "@/lib/auth";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import MobileBookBar from "@/components/chrome/MobileBookBar";
import DemoBanner from "@/components/chrome/DemoBanner";
import ExitOffer from "@/components/ExitOffer";

/**
 * Fonts are SELF-HOSTED, not fetched from Google.
 *
 * next/font/google reaches out to fonts.googleapis.com at build time, which
 * fails in an offline or firewalled CI container and takes the whole build with
 * it. Two woff2 files in the repo cost 103 KB, are content-hashed and cached
 * for a year by netlify.toml, and cannot fail.
 */
const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin.woff2", style: "normal", weight: "300 700" },
    { path: "./fonts/cormorant-garamond-latin-italic.woff2", style: "italic", weight: "300 700" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "Times New Roman", "serif"],
});

const jost = localFont({
  src: [{ path: "./fonts/jost-latin.woff2", style: "normal", weight: "300 600" }],
  variable: "--font-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Helvetica Neue", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Natural. Luxury. Culture. | Richmond, VA`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "micro locs Richmond VA",
    "loc salon Henrico VA",
    "sisterlocs Richmond",
    "hair loss recovery Richmond VA",
    "alopecia specialist Richmond",
    "scalp therapy Henrico",
    "natural hair salon Richmond VA",
    "silk press Richmond",
    "loctician Short Pump",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} — ${SITE.descriptor}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [
      { url: "/img/hero.webp", width: 1376, height: 768, alt: `${SITE.name} studio` },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.descriptor}`,
    description: SITE.description,
    images: ["/img/hero.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2E3F28",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(hairSalonSchema()) }}
        />
        {/* With JS off, never leave content hidden behind an animation that
            will never run. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.root-draw path,.root-draw line,.root-draw circle{stroke-dashoffset:0!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xs2 focus:bg-gold focus:px-5 focus:py-3 focus:text-sm2 focus:text-ink"
        >
          Skip to content
        </a>

        <AuthProvider>
          <CartProvider>
            <Header />
            <main id="main" className="pb-24 lg:pb-0">
              {children}
            </main>
            <Footer />
            <MobileBookBar />
            <CartDrawer />
            <ExitOffer />
            <DemoBanner />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
