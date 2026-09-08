"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import OpenStatus from "./OpenStatus";
import { whatsappLink } from "@/lib/shopify";

const ease = [0.25, 1, 0.5, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const up = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.1, delay, ease } };

  return (
    <section className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 85% 15%, rgba(15,61,42,0.45), transparent 60%), radial-gradient(45% 45% at 8% 95%, rgba(142,27,32,0.28), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <motion.p {...up(0.05)} className="label">Halal Moroccan kitchen · Miami</motion.p>
          <div className="draw mt-5 h-px w-24 bg-gold" aria-hidden="true" />
          <motion.h1
            {...up(0.2)}
            className="mt-7 font-display text-[clamp(2.7rem,6.4vw,5.6rem)] font-normal leading-[1.02] tracking-[-0.01em] text-ivory"
          >
            The warmth of a Moroccan table,
            <br />
            <em className="text-red">delivered to your door.</em>
          </motion.h1>
          <motion.p {...up(0.4)} className="mt-8 max-w-xl text-[1.25rem] leading-relaxed text-cream">
            Tajines left to cook until the lamb falls apart. Couscous the way it is made on Fridays in Morocco.
            Msemen, paninis, bocadillos and mint tea, hot or over ice. Cooked to order every evening.
          </motion.p>
          <motion.div {...up(0.55)} className="mt-10 flex flex-wrap items-center gap-8">
            <Link href="/menu" className="btn-primary">Order tonight</Link>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="label link-line text-ivory">
              WhatsApp 305-413-2526
            </a>
          </motion.div>
          <motion.div {...up(0.7)} className="mt-14">
            <OpenStatus />
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-5"
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease }}
        >
          <div className="relative mx-auto w-full max-w-md">
            <div className="arch relative aspect-[4/5] w-full overflow-hidden">
              <motion.div
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 9, ease: "easeOut" }}
              >
                <Image
                  src="/img/couscous.jpg"
                  alt="Lamb couscous with vegetables and chickpeas"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="photo object-cover"
                />
              </motion.div>
              <div className="photo-veil absolute inset-0" aria-hidden="true" />
            </div>
            <svg className="arch-outline translate-x-3 translate-y-3 text-gold-dim" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
              <path d="M9 125V54C9 47 0 45 0 36 0 16 26 8 50 0c24 8 50 16 50 36 0 9-9 11-9 18v71" fill="none" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            </svg>
            <p className="mt-5 text-center font-body text-lg italic text-cream/80">Friday couscous, lamb and seven vegetables</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
