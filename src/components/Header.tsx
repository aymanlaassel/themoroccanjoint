"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cartCount, useCart } from "@/lib/store";
import { whatsappLink } from "@/lib/shopify";

const NAV = [
  { href: "/menu", label: "Menu" },
  { href: "/#friday", label: "Friday Couscous" },
  { href: "/#story", label: "Our Chef" },
  { href: "/catering", label: "Catering" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  const count = cartCount(lines);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled || menuOpen ? "bg-ebony/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-4" aria-label="The Moroccan Joint, home">
          <Image src="/img/logo.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-full ring-1 ring-red/70" />
          <span className="text-small font-display text-[1.35rem] tracking-[0.12em] uppercase leading-none">The Moroccan Joint</span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="label link-line text-cream hover:text-ivory transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a href={whatsappLink()} target="_blank" rel="noopener" className="label link-line hidden md:inline text-ivory">
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="label flex items-center gap-2 text-ivory"
            aria-label={`Open bag, ${count} items`}
          >
            Bag
            <span suppressHydrationWarning className="tnum inline-flex h-6 min-w-6 items-center justify-center border border-gold-dim px-1.5 text-[0.65rem] text-gold">
              {count}
            </span>
          </button>
          <button
            type="button"
            className="lg:hidden text-ivory"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="block h-px w-6 bg-current mb-1.5" />
            <span className="block h-px w-6 bg-current" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-line px-6 py-6 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-5">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setMenuOpen(false)} className="font-display text-2xl text-ivory">{n.label}</Link>
              </li>
            ))}
            <li>
              <a href={whatsappLink()} className="label text-gold">WhatsApp 305-413-2526</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
