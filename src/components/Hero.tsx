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
            "radial-gradient(70% 55% at 85% 15%, rgba(200,164,93,0.10), transparent 60%), radial-gradient(40% 40% at 10% 90%, rgba(122,27,31,0.14), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <motion.p {...up(0.05)} className="label">Halal Moroccan kitchen · Miami</motion.p>
          <motion.h1
            {...up(0.2)}
            className="mt-7 font-display text-[clamp(2.9rem,7vw,6.2rem)] font-light leading-[0.98] tracking-tight text-ivory"
          >
            The warmth of a Moroccan table,
            <br />
            <em className="text-gold">delivered to your door.</em>
          </motion.h1>
          <motion.p {...up(0.4)} className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-cream">
            Tajines left to cook until the lamb falls apart. Couscous the way it is made on Fridays in Morocco.
            Msemen, paninis, bocadillos and mint tea, hot or over ice. Cooked to order every evening.
          </motion.p>
          <motion.div {...up(0.55)} className="mt-10 flex flex-wrap items-center gap-8">
            <Link href="/menu" className="btn-gold">Order tonight</Link>
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
          <div className="frame relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "easeOut" }}
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
            <p className="absolute bottom-5 left-5 font-display text-lg italic text-ivory/90">Friday couscous, lamb and seven vegetables</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
