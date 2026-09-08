import type { Metadata } from "next";
import Image from "next/image";
import CateringForm from "@/components/CateringForm";
import Reveal from "@/components/Reveal";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Catering",
  description: "Moroccan catering across South Florida: family-style couscous, tajines, panini and bocadillo platters, msemen and mint tea.",
};

const OCCASIONS = ["Family gatherings", "Office lunches", "Private events", "Birthdays and celebrations", "Special occasions", "Large group orders"];

export default function CateringPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-36 pb-28 lg:px-10 lg:pt-44">
      <div className="grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="label">Catering &amp; special orders</p>
          <h1 className="mt-4 font-display text-6xl font-light leading-none lg:text-7xl">
            A Moroccan table,<br /><em className="text-red">for all of you.</em>
          </h1>
          <p className="mt-8 max-w-md leading-relaxed text-cream">
            Traditional tajines, family-style couscous, panini and bocadillo platters, msemen, mint tea and custom
            menus, sized for your group and delivered across South Florida.
          </p>
          <ul className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-3 text-sm text-sand">
            {OCCASIONS.map((o) => (
              <li key={o} className="flex items-center gap-3">
                <span className="h-px w-4 bg-gold-dim" aria-hidden="true" />
                {o}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-sand">
            Miami · Fort Lauderdale · Boca Raton · Delray Beach and surrounding areas.
          </p>
          <p className="mt-2 text-sm text-sand">
            Prefer to talk? <a className="text-ivory underline decoration-gold-dim underline-offset-4 hover:decoration-gold" href={whatsappLink("Hi! I'd like to ask about catering.")} target="_blank" rel="noopener">WhatsApp {WHATSAPP_DISPLAY}</a>
          </p>
          <div className="frame relative mt-14 aspect-[16/10] max-w-md overflow-hidden">
            <Image src="/img/royale.jpg" alt="Bocadillo Royale platter" fill sizes="40vw" className="photo object-cover" />
            <div className="photo-veil absolute inset-0" aria-hidden="true" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div className="border border-line bg-smoke p-8 lg:p-12">
            <p className="font-display text-3xl font-light">Tell us about your event</p>
            <p className="mt-2 mb-10 text-sm text-sand">We reply with a menu, pricing and availability.</p>
            <CateringForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
