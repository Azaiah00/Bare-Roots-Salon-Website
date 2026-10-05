"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  cartCount,
  cartSubtotal,
  shippingFor,
  type CartLine,
} from "@/lib/db";

/**
 * The bag.
 *
 * Context holds the lines; lib/db.ts owns every number derived from them. That
 * split is deliberate — the maths is pure and testable, and the drawer, the
 * cart page and the checkout can never disagree about a total because none of
 * them does arithmetic.
 *
 * MEMORY ONLY. Nothing is written to localStorage. A demo cart that survives a
 * refresh is a demo cart someone eventually mistakes for a real one, and an
 * abandoned-cart row with no backend behind it is a lie the site tells itself.
 * // TODO: Shopify cart token on go-live.
 */

type Ctx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug);
      if (found) {
        return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { slug, qty }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback(
    (slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
    [],
  );

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);

  const value = useMemo<Ctx>(() => {
    const subtotal = cartSubtotal(lines);
    const shipping = shippingFor(subtotal);
    return {
      lines,
      count: cartCount(lines),
      subtotal,
      shipping,
      total: subtotal + shipping,
      add,
      setQty,
      remove,
      clear,
      isOpen,
      openCart,
      closeCart,
    };
  }, [lines, isOpen, add, setQty, remove, clear, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): Ctx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
