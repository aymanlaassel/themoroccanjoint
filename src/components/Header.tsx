"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cartCount, useCart } from "@/lib/store";
import { whatsappLink } from "@/lib/shopify";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/#friday", label: "Friday Couscous" },
  { href: "/catering", label: "Catering" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const lines = useCart((s) => s.lines);
  const addedAt = useCart((s) => s.addedAt);
  const setOpen = useCart((s) => s.setOpen);
  const count = cartCount(lines);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-green-deep text-cream">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 transition-[height] duration-300 lg:px-10 ${
          compact ? "h-16" : "h-24"
        }`}
      >
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="The Moroccan Joint, home" className="block shrink-0">
            <Image
              src="/img/logo.jpg"
              alt="The Moroccan Joint"
              width={88}
              height={88}
              priority
              className={`object-cover transition-all duration-300 ${compact ? "h-12 w-12" : "h-[88px] w-[88px]"}`}
            />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="nav-link text-[13px] font-bold uppercase tracking-[0.08em] text-cream transition-colors hover:text-white">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <a href={whatsappLink()} target="_blank" rel="noopener" className="nav-link hidden text-[13px] font-bold uppercase tracking-[0.08em] text-cream hover:text-white md:inline">
            WhatsApp 305-413-2526
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 text-cream hover:text-white"
            aria-label={`Open bag, ${count} items`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 8h12l1 13H5L6 8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <motion.span
              key={addedAt ?? 0}
              suppressHydrationWarning
              className="tnum inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red px-1.5 text-[11px] font-bold text-cream"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.35, 1] }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {count}
            </motion.span>
          </button>
          <button
            type="button"
            className="lg:hidden text-cream"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-cream/20 bg-green-deep px-6 py-5 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-4">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setMenuOpen(false)} className="text-base font-bold uppercase tracking-wide text-cream">{n.label}</Link>
              </li>
            ))}
            <li>
              <a href={whatsappLink()} className="text-base font-bold uppercase tracking-wide text-cream">WhatsApp 305-413-2526</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
