"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type CartItem = {
  key: string;
  n: string;
  p: number;
  img?: string;
  q: number;
};

type ModalContent = { title: string; msg: string; demo?: boolean } | null;

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: { key: string; n: string; p: number; img?: string }) => void;
  inc: (key: string) => void;
  dec: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toastName: string | null;
  modal: ModalContent;
  showModal: (m: ModalContent) => void;
  closeModal: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "bareroots.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [toastName, setToastName] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalContent>(null);
  const hydrated = useRef(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load persisted cart
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupt storage */
    }
    hydrated.current = true;
  }, []);

  // Persist on change (after first hydrate so we don't clobber saved data)
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full / unavailable */
    }
  }, [items]);

  const fireToast = useCallback((name: string) => {
    setToastName(name);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastName(null), 2200);
  }, []);

  const add: CartCtx["add"] = useCallback(
    (item) => {
      setItems((prev) => {
        const ex = prev.find((c) => c.key === item.key);
        if (ex) return prev.map((c) => (c.key === item.key ? { ...c, q: c.q + 1 } : c));
        return [...prev, { ...item, q: 1 }];
      });
      fireToast(item.n);
    },
    [fireToast],
  );

  const inc = useCallback((key: string) => {
    setItems((prev) => prev.map((c) => (c.key === key ? { ...c, q: c.q + 1 } : c)));
  }, []);

  const dec = useCallback((key: string) => {
    setItems((prev) =>
      prev.flatMap((c) =>
        c.key === key ? (c.q - 1 < 1 ? [] : [{ ...c, q: c.q - 1 }]) : [c],
      ),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((c) => c.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((a, b) => a + b.q, 0);
    const subtotal = items.reduce((a, b) => a + b.p * b.q, 0);
    return {
      items,
      count,
      subtotal,
      add,
      inc,
      dec,
      remove,
      clear,
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      toastName,
      modal,
      showModal: setModal,
      closeModal: () => setModal(null),
    };
  }, [items, isOpen, toastName, modal, add, inc, dec, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
