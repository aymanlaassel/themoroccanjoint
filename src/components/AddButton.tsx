"use client";

import { useState } from "react";
import { useCart } from "@/lib/store";
import type { MenuItem } from "@/lib/shopify";
import { whatsappLink } from "@/lib/shopify";

export default function AddButton({ item, variant = "icon" }: { item: MenuItem; variant?: "icon" | "text" }) {
  const add = useCart((s) => s.add);
  const setOpen = useCart((s) => s.setOpen);
  const [pulse, setPulse] = useState(false);

  if (!item.available) {
    return (
      <a
        href={whatsappLink(`Is ${item.title} available today?`)}
        target="_blank"
        rel="noopener"
        className="label link-line text-sand hover:text-gold"
      >
        Ask
      </a>
    );
  }

  const onClick = () => {
    add({
      variantId: item.variantId,
      handle: item.handle,
      title: item.title,
      price: item.price,
      image: item.image?.src,
      fridayOnly: item.fridayOnly,
    });
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
    if (variant === "text") setOpen(true);
  };

  if (variant === "text") {
    return (
      <button type="button" onClick={onClick} className="label link-line text-ivory hover:text-gold">
        Add to bag
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Add ${item.title} to bag`}
      className={`flex h-9 w-9 items-center justify-center rounded-full border text-lg leading-none transition-all duration-300 ${
        pulse ? "border-red bg-red text-ivory scale-110" : "border-gold-dim text-gold hover:border-red hover:text-red hover:bg-red/10"
      }`}
    >
      +
    </button>
  );
}
