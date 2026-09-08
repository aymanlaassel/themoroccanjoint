"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { cartCount, cartTotal, shopifyCheckoutUrl, useCart, whatsappOrderUrl } from "@/lib/store";
import { formatPrice } from "@/lib/shopify";

export default function CartDrawer() {
  const { lines, open, setOpen, setQty, remove } = useCart();
  const total = cartTotal(lines);
  const count = cartCount(lines);
  const hasFriday = lines.some((l) => l.fridayOnly);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close bag"
            className="fixed inset-0 z-50 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label="Your bag"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream text-ink shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-3xl text-green">Your bag <span className="tnum text-ink-3">({count})</span></h2>
              <button type="button" onClick={() => setOpen(false)} className="text-sm uppercase tracking-wide text-ink-2 hover:text-red">Close</button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {lines.length === 0 ? (
                <p className="py-14 text-center text-ink-2">Your bag is empty.</p>
              ) : (
                <ul className="divide-y divide-line">
                  {lines.map((l) => (
                    <li key={l.variantId} className="flex gap-4 py-4">
                      {l.image ? (
                        <Image src={l.image} alt="" width={72} height={72} className="h-[72px] w-[72px] flex-none rounded object-cover" />
                      ) : (
                        <div className="h-[72px] w-[72px] flex-none rounded bg-cream-2" />
                      )}
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-3">
                          <p className="text-[15px] font-medium">{l.title}</p>
                          <p className="tnum text-[15px]">{formatPrice(l.price * l.qty)}</p>
                        </div>
                        {l.fridayOnly && <p className="mt-0.5 text-xs text-red">Friday delivery only</p>}
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center rounded-full border border-line">
                            <button type="button" className="px-3 py-1 text-ink-2 hover:text-green" onClick={() => setQty(l.variantId, l.qty - 1)} aria-label="Decrease">−</button>
                            <span className="tnum min-w-6 text-center text-sm">{l.qty}</span>
                            <button type="button" className="px-3 py-1 text-ink-2 hover:text-green" onClick={() => setQty(l.variantId, l.qty + 1)} aria-label="Increase">+</button>
                          </div>
                          <button type="button" className="text-xs uppercase tracking-wide text-ink-3 hover:text-red" onClick={() => remove(l.variantId)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-line bg-cream-2 px-6 py-5">
                {hasFriday && (
                  <p className="mb-3 text-xs leading-relaxed text-ink-2">
                    Couscous is delivered Friday midday. Order by Thursday and add your phone number and address at checkout.
                  </p>
                )}
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="text-sm uppercase tracking-wide text-ink-2">Subtotal</span>
                  <span className="tnum font-display text-3xl text-green">{formatPrice(total)}</span>
                </div>
                <a href={shopifyCheckoutUrl(lines)} className="btn btn-green w-full">Checkout</a>
                <a href={whatsappOrderUrl(lines)} target="_blank" rel="noopener" className="btn btn-red mt-2 w-full">
                  Order on WhatsApp
                </a>
                <p className="mt-3 text-center text-xs text-ink-3">Delivery fees are added at checkout.</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
