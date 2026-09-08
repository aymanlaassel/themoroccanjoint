import type { Metadata } from "next";
import Image from "next/image";
import CateringForm from "@/components/CateringForm";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Catering & Special Orders",
  description: "Custom catering and special orders for groups, parties and events throughout South Florida.",
};

const OCCASIONS = ["Family gatherings", "Office lunches", "Private events", "Birthdays and celebrations", "Special occasions", "Large group orders"];

export default function CateringPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="heading text-5xl lg:text-6xl">Catering &amp; special orders</h1>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-2">
            We provide custom catering and special orders for groups, parties and events throughout South Florida, including
            Miami, Fort Lauderdale, Boca Raton, Delray Beach and the surrounding areas.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
            Tell us about your event and what you&rsquo;re looking for using the form, and our team will get back to you to
            discuss details, pricing and availability.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-ink-2">
            {OCCASIONS.map((o) => (
              <li key={o} className="flex items-center gap-2">
                <span className="text-red" aria-hidden="true">•</span>{o}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] text-ink-2">
            Prefer to talk? <a className="text-green underline underline-offset-4 hover:text-red" href={whatsappLink("Hi! I'd like to ask about catering.")} target="_blank" rel="noopener">WhatsApp {WHATSAPP_DISPLAY}</a>
          </p>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-sm">
            <Image src="/img/royale.jpg" alt="Bocadillo Royale platter" fill sizes="50vw" className="object-cover" />
          </div>
        </div>
        <div className="boxed bg-cream-2">
          <h2 className="heading text-3xl">Tell us about your event</h2>
          <div className="mt-6">
            <CateringForm />
          </div>
        </div>
      </div>
    </div>
  );
}
