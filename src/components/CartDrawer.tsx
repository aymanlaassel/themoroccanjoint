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
            className="fixed inset-0 z-50 bg-ebony/70 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label="Your bag"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-smoke"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-7 py-6">
              <p className="font-display text-2xl">Your bag <span className="text-sand tnum">({count})</span></p>
              <button type="button" onClick={() => setOpen(false)} className="label text-sand hover:text-ivory">Close</button>
            </div>

            <div className="flex-1 overflow-y-auto px-7">
              {lines.length === 0 ? (
                <p className="py-16 text-center font-display text-xl italic text-sand">Nothing here yet. The tajines are waiting.</p>
              ) : (
                <ul className="divide-y divide-line">
                  {lines.map((l) => (
                    <li key={l.variantId} className="flex gap-4 py-5">
                      {l.image ? (
                        <Image src={l.image} alt="" width={64} height={64} className="photo h-16 w-16 flex-none object-cover" />
                      ) : (
                        <div className="h-16 w-16 flex-none bg-ash" />
                      )}
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-3">
                          <p className="font-display text-lg leading-tight">{l.title}</p>
                          <p className="tnum text-sm text-gold">{formatPrice(l.price * l.qty)}</p>
                        </div>
                        {l.fridayOnly && <p className="mt-1 text-[0.68rem] tracking-[0.18em] uppercase text-gold-dim">Friday delivery</p>}
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-line">
                            <button type="button" className="px-3 py-1 text-sand hover:text-ivory" onClick={() => setQty(l.variantId, l.qty - 1)} aria-label="Decrease">−</button>
                            <span className="tnum min-w-6 text-center text-sm">{l.qty}</span>
                            <button type="button" className="px-3 py-1 text-sand hover:text-ivory" onClick={() => setQty(l.variantId, l.qty + 1)} aria-label="Increase">+</button>
                          </div>
                          <button type="button" className="text-[0.68rem] tracking-[0.18em] uppercase text-sand hover:text-red" onClick={() => remove(l.variantId)}>
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
              <div className="border-t border-line px-7 py-6">
                {hasFriday && (
                  <p className="mb-4 text-xs leading-relaxed text-sand">
                    Couscous is delivered Friday midday. Order by Thursday and add your address at checkout.
                  </p>
                )}
                <div className="mb-5 flex items-baseline justify-between">
                  <span className="label">Subtotal</span>
                  <span className="font-display text-3xl tnum">{formatPrice(total)}</span>
                </div>
                <a href={shopifyCheckoutUrl(lines)} className="btn-primary w-full justify-center">Checkout</a>
                <a href={whatsappOrderUrl(lines)} target="_blank" rel="noopener" className="btn-outline mt-3 w-full justify-center">
                  Send order on WhatsApp
                </a>
                <p className="mt-4 text-center text-[0.68rem] tracking-[0.14em] uppercase text-sand">Secure checkout · Delivery fees added at checkout</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
