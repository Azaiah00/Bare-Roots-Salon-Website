/**
 * JSON-LD. Only verified facts.
 *
 * `hasCredential` is deliberately ABSENT. Iisha is described on this site the
 * way she describes herself — "Holistic Hair Recovery Practitioner & Educator"
 * — and no licence, certification or medical claim is asserted in structured
 * data until documentation exists. Structured data is a claim made to a search
 * engine in writing; it is the last place to be loose.
 *
 * `aggregateRating` is absent for the same reason: Bare Roots is a new merged
 * entity with no review corpus of its own yet. The moment the Google listing
 * carries real ratings, put the real numbers here — never an invented one.
 */

import { SITE, OPEN_DAYS, ADDRESS_ONE_LINE, MAPS_URL } from "./site";
import { SERVICES, formatDuration, COURSES } from "./services";
import { PRODUCTS, type Product, priceLabel } from "./products";

const ID = `${SITE.url}/#business`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${SITE.address.street} ${SITE.address.unit}`,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

const openingHours = OPEN_DAYS.map((h) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: `https://schema.org/${h.day}`,
  opens: h.open,
  closes: h.close,
}));

export function hairSalonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": ID,
    name: SITE.name,
    description: SITE.description,
    slogan: SITE.tagline,
    url: SITE.url,
    telephone: SITE.artists[0].phone,
    image: `${SITE.url}/img/hero.webp`,
    logo: `${SITE.url}/img/logo-br.png`,
    priceRange: "$30–$1000+",
    currenciesAccepted: "USD",
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    hasMap: MAPS_URL,
    openingHoursSpecification: openingHours,
    sameAs: SITE.artists.map((a) => a.instagramUrl),
    areaServed: SITE.areaServed.map((name) => ({ "@type": "City", name })),
    employee: SITE.artists.map((a) => ({
      "@type": "Person",
      name: a.name,
      jobTitle: a.role,
      sameAs: a.instagramUrl,
      telephone: a.phone,
    })),
    amenityFeature: SITE.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      name: s.name,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      ...(s.price > 0
        ? s.isBasePrice
          ? {
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: s.price,
                priceCurrency: "USD",
              },
            }
          : { price: s.price }
        : {}),
      itemOffered: {
        "@type": "Service",
        name: s.name,
        serviceType: s.name,
        description: s.blurb,
        provider: { "@id": ID },
      },
      eligibleDuration: {
        "@type": "QuantitativeValue",
        value: s.duration,
        unitCode: "MIN",
        description: formatDuration(s.duration),
      },
    })),
  };
}

export function productSchema(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.detail,
    brand: {
      "@type": "Brand",
      name: p.line === "dope" ? "DOPE HAIR" : SITE.retailPartner.name,
    },
    category: "Hair Care",
    ...(p.image ? { image: `${SITE.url}${p.image}` } : {}),
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "USD",
      availability: p.available
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      url: `${SITE.url}/shop/${p.slug}`,
      seller: { "@id": ID },
    },
  };
}

export function itemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} — the shelf`,
    itemListElement: PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/shop/${p.slug}`,
      name: `${p.name} — ${priceLabel(p)}`,
    })),
  };
}

export function courseListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} Academy`,
    itemListElement: COURSES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: c.title,
        description: c.desc,
        url: `${SITE.url}/academy#${c.slug}`,
        provider: { "@id": ID },
      },
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE.url}${t.path}`,
    })),
  };
}

export function howToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function articleSchema(p: {
  title: string;
  dek: string;
  date: string;
  slug: string;
  authorName: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.dek,
    datePublished: p.date,
    author: { "@type": "Person", name: p.authorName },
    publisher: { "@id": ID },
    mainEntityOfPage: `${SITE.url}/journal/${p.slug}`,
    ...(p.image ? { image: `${SITE.url}${p.image}` } : {}),
  };
}

/** Renders a schema object into a script tag body. Escapes `<` for safety. */
export function jsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export { ADDRESS_ONE_LINE };
