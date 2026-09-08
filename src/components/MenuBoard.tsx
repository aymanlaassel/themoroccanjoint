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
      { rootMargin: "-30% 0px -60% 0px" },
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [categories]);

  return (
    <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
      <nav aria-label="Menu categories" className="lg:sticky lg:top-28 lg:self-start">
        <ul className="scroll-none flex gap-6 overflow-x-auto border-b border-line pb-4 lg:flex-col lg:gap-3 lg:border-b-0 lg:pb-0">
          {categories.map((c) => (
            <li key={c.key} className="flex-none">
              <a
                href={`#${c.key}`}
                className={`label whitespace-nowrap transition-colors ${active === c.key ? "text-red" : "text-sand hover:text-cream"}`}
              >
                {active === c.key && <span className="mr-2 inline-block h-px w-4 bg-red align-middle lg:w-6" aria-hidden="true" />}
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-20">
        {categories.map((c) => (
          <section
            key={c.key}
            id={c.key}
            data-key={c.key}
            ref={(el) => { refs.current[c.key] = el; }}
            className="scroll-mt-32"
          >
            <Reveal>
              <div className="flex items-baseline justify-between gap-6 border-b border-gold-dim/60 pb-4">
                <h2 className="font-display text-4xl font-light">{c.title}</h2>
                {c.note && <p className="text-right text-xs tracking-[0.12em] uppercase text-sand">{c.note}</p>}
              </div>
            </Reveal>
            <ul>
              {c.items.map((item, i) => (
                <Reveal key={item.id} delay={Math.min(i * 0.05, 0.3)} y={12}>
                  <li className="group grid grid-cols-[1fr_auto] items-start gap-6 border-b border-line py-6 transition-colors sm:grid-cols-[72px_1fr_auto_auto]">
                    {item.image ? (
                      <Image
                        src={item.image.src}
                        alt={item.title}
                        width={72}
                        height={72}
                        sizes="72px"
                        className="photo hidden h-[72px] w-[72px] object-cover sm:block"
                      />
                    ) : (
                      <div className="hidden h-[72px] w-[72px] bg-ash sm:block" aria-hidden="true" />
                    )}
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.45rem] leading-tight">
                        {item.title}
                        {item.halal && <span className="ml-3 align-middle text-[0.6rem] tracking-[0.2em] uppercase text-sage">Halal</span>}
                        {item.fridayOnly && <span className="ml-3 align-middle text-[0.6rem] tracking-[0.2em] uppercase text-gold-dim">Friday</span>}
                      </h3>
                      {item.description && <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-sand">{item.description}</p>}
                      {item.descriptionEs && <p className="mt-1 max-w-prose font-display text-[0.95rem] italic text-sand/80">{item.descriptionEs}</p>}
                    </div>
                    <p className="tnum pt-1 text-right font-display text-xl text-gold">
                      {item.available ? formatPrice(item.price) : <span className="text-sand/60">—</span>}
                    </p>
                    <div className="col-span-2 flex justify-end sm:col-span-1 sm:pt-0.5">
                      <AddButton item={item} />
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
