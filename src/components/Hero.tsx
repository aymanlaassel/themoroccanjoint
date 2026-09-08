"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { whatsappLink, WHATSAPP_DISPLAY } from "@/lib/shopify";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const up = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };

  return (
    <section className="relative isolate overflow-hidden bg-green-deep">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduce ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
      >
        <Image src="/img/couscous.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-green-deep/80 via-ink/55 to-ink/70" aria-hidden="true" />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 py-24 text-center text-cream lg:py-32">
        <motion.span
          className="gold-rule"
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.1, ease }}
        />
        <motion.h1
          {...up(0.25)}
          className="mt-8 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]"
        >
          The Moroccan Joint
        </motion.h1>
        <motion.p {...up(0.45)} className="mt-6 max-w-3xl text-[clamp(1.25rem,2.6vw,1.9rem)] font-medium leading-snug">
          Moroccan food made in Miami with the warmth of home.
        </motion.p>
        <motion.p {...up(0.6)} className="mt-6 max-w-2xl text-[15px] leading-relaxed text-cream/90 lg:text-base">
          Slow-cooked tajines, Friday couscous, fresh msemen, paninis, bocadillos and mint tea, prepared with halal
          ingredients and the warmth and generosity of Moroccan hospitality.
        </motion.p>
        <motion.div {...up(0.75)} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/menu" className="btn btn-green">View full menu</Link>
          <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-red">WhatsApp {WHATSAPP_DISPLAY}</a>
        </motion.div>
      </div>
    </section>
  );
}
