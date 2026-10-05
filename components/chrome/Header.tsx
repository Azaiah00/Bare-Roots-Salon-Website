"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { NAV, SITE } from "@/lib/site";
import { useScrolled } from "@/lib/hooks";
import { useCart } from "@/components/cart/CartProvider";
import Wordmark from "@/components/brand/Wordmark";
import { Icon } from "@/components/ui/Icon";

/**
 * The header condenses on scroll — glass over the hero, solid once the page has
 * moved. It is fixed, so --header-h in globals.css is what every anchored
 * section scrolls to clear.
 */
export default function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  // Close the drawer on navigation — otherwise a route change leaves it open
  // over the new page with the scroll still locked.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      // The header is fixed and transparent at the top of every route, where
      // it sits over a dark hero it is not a DOM descendant of. Declaring the
      // ground is what lets the audit — and the next person — know that.
      data-ground="dark"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-base ease-brand",
        scrolled || open
          ? "border-b border-white/12 bg-forest-deep/95 backdrop-blur-md"
          : "bg-transparent",
      )}
      style={{ height: "var(--header-h)" }}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${SITE.name} — home`}
          className="inline-flex min-h-11 shrink-0 items-center"
        >
          <Wordmark tone="light" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-xs2 px-3 text-sm2 transition-colors duration-base ease-brand",
                      active ? "text-gold" : "text-paper hover:text-gilt",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex size-11 items-center justify-center rounded-xs2 text-paper transition-colors duration-base ease-brand hover:text-gilt"
            aria-label={count > 0 ? `Your bag, ${count} items` : "Your bag, empty"}
          >
            <Icon name="bag" />
            {count > 0 && (
              <span className="absolute right-1 top-1 flex size-[18px] items-center justify-center rounded-pill bg-gold text-[0.625rem] font-medium tabular-nums text-ink">
                {count}
              </span>
            )}
          </button>

          <Link href="/book" className="btn btn-gold btn-sm hidden sm:inline-flex">
            Book
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex size-11 items-center justify-center rounded-xs2 text-paper lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="max-h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain border-t border-white/12 bg-forest-deep lg:hidden"
      >
        <nav aria-label="Primary mobile" className="shell py-6">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-14 items-center justify-between border-b border-white/10 text-paper"
                >
                  <span className="font-display text-d4">{item.label}</span>
                  <Icon name="arrow-right" className="size-4 text-gold" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/portal"
                className="flex min-h-14 items-center justify-between border-b border-white/10 text-cream-dim"
              >
                <span className="text-sm2">Client portal</span>
                <Icon name="arrow-right" className="size-4 text-gold" />
              </Link>
            </li>
          </ul>
          <div className="mt-7 flex flex-col gap-3">
            <Link href="/book" className="btn btn-gold w-full">
              Book an appointment
            </Link>
            <a href={SITE.artists[0].phoneHref} className="btn btn-ghost w-full">
              <Icon name="phone" className="size-4" />
              Call the studio
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
