"use client";

import { useState } from "react";
import { useCart } from "@/lib/store";
import type { MenuItem } from "@/lib/shopify";
import { whatsappLink } from "@/lib/shopify";

export default function AddButton({ item, className = "" }: { item: MenuItem; className?: string }) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  if (!item.available) {
    return (
      <a
        href={whatsappLink(`Is ${item.title} available today?`)}
        target="_blank"
        rel="noopener"
        className={`btn btn-sm border-line bg-cream-2 text-ink-2 hover:border-green hover:text-green ${className}`}
      >
        Ask availability
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
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button type="button" onClick={onClick} className={`btn btn-sm ${added ? "btn-red" : "btn-green"} ${className}`}>
      {added ? "Added" : "Add to bag"}
    </button>
  );
}
