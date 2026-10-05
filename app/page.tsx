import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { jsonLd, faqSchema, howToSchema } from "@/lib/schema";
import { FAQS, RECOVERY_STEPS } from "@/lib/content";

import Hero from "@/components/home/Hero";
import Marquee from "@/components/brand/Marquee";
import Union from "@/components/home/Union";
import Disciplines from "@/components/home/Disciplines";
import RecoveryRail from "@/components/home/RecoveryRail";
import WorkPreview from "@/components/home/WorkPreview";
import Reviews from "@/components/home/Reviews";
import ShelfPreview from "@/components/home/ShelfPreview";
import AcademyPreview from "@/components/home/AcademyPreview";
import VisitCta from "@/components/home/VisitCta";

export const metadata: Metadata = {
  title: `${SITE.name} — Natural. Luxury. Culture. | Richmond, VA`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

/**
 * Ground rhythm — dark, forest, paper, forest, wellness, paper, cream, plum,
 * paper, ink. Never more than two light grounds in a row, and every dark ground
 * is earning its place by holding either imagery or a number.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQS.slice(0, 5))) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            howToSchema(
              "The Root Recovery Method",
              "The four-stage protocol Bare Roots uses for thinning, alopecia and scalp health.",
              RECOVERY_STEPS.map((s) => ({ name: s.title, text: s.desc })),
            ),
          ),
        }}
      />

      <Hero />
      <Marquee />
      <Union />
      <Disciplines />
      <RecoveryRail />
      <WorkPreview />
      <Reviews />
      <ShelfPreview />
      <AcademyPreview />
      <VisitCta />
    </>
  );
}
