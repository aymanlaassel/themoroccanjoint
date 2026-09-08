"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MenuCategory } from "@/lib/shopify";
import { formatPrice } from "@/lib/shopify";
import AddButton from "./AddButton";
import Reveal from "./Reveal";

export default function MenuBoard({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState<string | undefined>(categories[0]?.key);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.key);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [categories]);

  return (
    <div>
      <nav aria-label="Menu categories" className="sticky top-16 z-30 -mx-5 border-b border-line bg-cream/95 px-5 backdrop-blur lg:-mx-10 lg:px-10">
        <ul className="scroll-none flex gap-2 overflow-x-auto py-3">
          {categories.map((c) => (
            <li key={c.key} className="flex-none">
              <a
                href={`#${c.key}`}
                className={`btn btn-sm ${active === c.key ? "btn-green" : "border-line bg-cream text-ink-2 hover:border-green hover:text-green"}`}
              >
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-16">
        {categories.map((c) => (
          <section
            key={c.key}
            id={c.key}
            data-key={c.key}
            ref={(el) => { refs.current[c.key] = el; }}
            className="scroll-mt-36"
          >
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-gold-2 pb-3">
                <h2 className="heading text-3xl lg:text-4xl">{c.title}</h2>
                {c.note && <p className="text-sm text-ink-3">{c.note}</p>}
              </div>
            </Reveal>

            <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
              {c.items.map((item, i) => (
                <Reveal as="li" key={item.id} delay={(i % 4) * 0.08} className="group flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-cream-2">
                    {item.image ? (
                      <Image
                        src={item.image.src}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : null}
                    {item.fridayOnly && item.available && (
                      <span className="absolute bottom-2 left-2 rounded-full bg-red px-2.5 py-1 text-xs text-cream">Fridays only</span>
                    )}
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <h3 className="text-[15px] font-medium leading-snug">
                      {item.title}
                      {item.halal && <span className="ml-2 text-[11px] font-semibold uppercase tracking-wide text-green">Halal</span>}
                    </h3>
                    {item.available && <p className="tnum text-[15px]">{formatPrice(item.price)}</p>}
                  </div>
                  {item.description && <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-ink-2">{item.description}</p>}
                  <div className="mt-3">
                    <AddButton item={item} />
                  </div>
                </Reveal>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
