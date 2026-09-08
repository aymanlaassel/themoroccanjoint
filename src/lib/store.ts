"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SHOP_URL, whatsappLink } from "./shopify";

export type CartLine = {
  variantId: string;
  handle: string;
  title: string;
  price: number;
  qty: number;
  image?: string;
  fridayOnly?: boolean;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  lastAdded?: string;
  add: (line: Omit<CartLine, "qty">) => void;
  remove: (variantId: string) => void;
  setQty: (variantId: string, qty: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      lastAdded: undefined,
      add: (line) =>
        set((s) => {
          const existing = s.lines.find((l) => l.variantId === line.variantId);
          const lines = existing
            ? s.lines.map((l) => (l.variantId === line.variantId ? { ...l, qty: l.qty + 1 } : l))
            : [...s.lines, { ...line, qty: 1 }];
          return { lines, lastAdded: line.title };
        }),
      remove: (variantId) => set((s) => ({ lines: s.lines.filter((l) => l.variantId !== variantId) })),
      setQty: (variantId, qty) =>
        set((s) => ({
          lines: qty <= 0
            ? s.lines.filter((l) => l.variantId !== variantId)
            : s.lines.map((l) => (l.variantId === variantId ? { ...l, qty } : l)),
        })),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
    }),
    { name: "tmj-cart", partialize: (s) => ({ lines: s.lines }) },
  ),
);

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty * l.price, 0);
}

/** Shopify cart permalink: opens the store's cart pre-filled, ready for checkout. */
export function shopifyCheckoutUrl(lines: CartLine[]) {
  if (!lines.length) return `${SHOP_URL}/cart`;
  return `${SHOP_URL}/cart/${lines.map((l) => `${l.variantId}:${l.qty}`).join(",")}`;
}

export function whatsappOrderUrl(lines: CartLine[]) {
  const body = [
    "Hi! I'd like to order:",
    ...lines.map((l) => `• ${l.qty} × ${l.title}`),
    "",
    `Total ${cartTotal(lines).toLocaleString("en-US", { style: "currency", currency: "USD" })}`,
    "Pickup or delivery? (I'll add my address)",
  ].join("\n");
  return whatsappLink(body);
}
