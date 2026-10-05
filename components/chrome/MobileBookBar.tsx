"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

/**
 * The mobile book bar. One primary CTA, always reachable, above the home
 * indicator rather than under it.
 *
 * Suppressed wherever it would compete with the page's own primary action —
 * the booker, the checkout and the portal all have a better button on screen
 * already, and two "Book" buttons is one too many.
 */
const SUPPRESS = ["/book", "/cart", "/checkout", "/portal", "/login"];

export default function MobileBookBar() {
  const pathname = usePathname();
  if (SUPPRESS.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-forest-deep/95 px-gutter pt-3 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-3">
        <a
          href={SITE.artists[0].phoneHref}
          className="inline-flex size-[52px] shrink-0 items-center justify-center rounded-xs2 border border-gold/45 text-gilt"
          aria-label={`Call the studio on ${SITE.artists[0].phone}`}
        >
          <Icon name="phone" />
        </a>
        <Link href="/book" className="btn btn-gold flex-1">
          Book an appointment
        </Link>
      </div>
    </div>
  );
}
