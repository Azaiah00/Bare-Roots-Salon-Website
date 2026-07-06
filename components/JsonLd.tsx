import { BUSINESS } from "@/lib/content";

// LocalBusiness / HairSalon structured data for local SEO.
const schema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Bare Roots",
  description:
    "Richmond's luxury natural-hair house — micro locs, sisterlocs, holistic hair recovery, silk press, color and wellness.",
  image: "https://bareroots.salon/assets/hero.png",
  url: "https://bareroots.salon",
  telephone: BUSINESS.phones[0],
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.zip,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.lat,
    longitude: BUSINESS.geo.lng,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "13:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "11:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "11:00", closes: "18:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "11:00", closes: "18:00" },
  ],
  sameAs: [
    "https://instagram.com/i.c.beautybrand",
    "https://instagram.com/ladyybri_xo",
    BUSINESS.glossgenius,
  ],
  areaServed: ["Richmond VA", "Henrico VA", "Short Pump", "Chesterfield"],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
