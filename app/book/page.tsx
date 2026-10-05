import type { Metadata } from "next";
import { SITE, HOURS_SUMMARY } from "@/lib/site";
import { jsonLd, breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import Booker from "@/components/book/Booker";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Book an appointment",
  description:
    "Book with Iisha or Sabrina at Bare Roots in Henrico, VA. Real availability, the price and duration visible at every step, and a deposit that holds the chair.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Book", path: "/book" },
            ]),
          ),
        }}
      />

      <PageHero
        ground="root"
        eyebrow="Booking"
        title={
          <>
            Five steps,
            <br />
            <em className="font-display italic text-gold">no dead ends.</em>
          </>
        }
        lead={`The price and the time in the chair are on screen the whole way through, and every slot tells you when you are out. ${HOURS_SUMMARY}.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Book", path: "/book" },
        ]}
        actions={
          <ButtonLink href={SITE.booking} variant="ghost" external>
            {SITE.bookingLabel}
          </ButtonLink>
        }
      />

      <Section ground="paper">
        <h2 className="sr-only">Book an appointment</h2>
        <Booker />
      </Section>
    </>
  );
}
