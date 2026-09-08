import Link from "next/link";
import { HOURS_LABEL } from "@/lib/hours";
import { INSTAGRAM_URL, SHOP_URL, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/shopify";
import Star from "./Star";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-smoke">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.12em] uppercase">The Moroccan Joint</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand">
              A halal Moroccan kitchen in Miami. Slow-cooked tajines, Friday couscous, msemen, paninis and mint tea,
              made fresh to order for delivery and pickup.
            </p>
          </div>
          <div>
            <p className="label mb-4">Hours</p>
            <p className="font-display text-2xl tnum">{HOURS_LABEL}</p>
            <p className="mt-2 text-sm text-sand">Every day. Friday couscous delivers midday.</p>
          </div>
          <div>
            <p className="label mb-4">Order</p>
            <ul className="space-y-2 text-sm text-cream">
              <li><a className="hover:text-gold transition-colors" href={whatsappLink()} target="_blank" rel="noopener">WhatsApp {WHATSAPP_DISPLAY}</a></li>
              <li><a className="hover:text-gold transition-colors" href="tel:+13054132526">Call {WHATSAPP_DISPLAY}</a></li>
              <li><Link className="hover:text-gold transition-colors" href="/menu">Menu</Link></li>
              <li><Link className="hover:text-gold transition-colors" href="/catering">Catering</Link></li>
            </ul>
          </div>
          <div>
            <p className="label mb-4">Follow</p>
            <ul className="space-y-2 text-sm text-cream">
              <li><a className="hover:text-gold transition-colors" href={INSTAGRAM_URL} target="_blank" rel="noopener">Instagram</a></li>
              <li><a className="hover:text-gold transition-colors" href={SHOP_URL}>Online store</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex items-center gap-6">
          <div className="hairline flex-1" />
          <Star className="h-3 w-3 text-gold-dim" />
          <div className="hairline flex-1" />
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-4 text-[0.7rem] tracking-[0.18em] uppercase text-sand">
          <span>© {new Date().getFullYear()} The Moroccan Joint · Miami, Florida</span>
          <span>Halal · Delivery &amp; pickup · Catering across South Florida</span>
        </div>
      </div>
    </footer>
  );
}
