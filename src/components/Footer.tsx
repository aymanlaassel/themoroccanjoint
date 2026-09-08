import Link from "next/link";
import Image from "next/image";
import { HOURS_LABEL } from "@/lib/hours";
import { INSTAGRAM_URL, SHOP_URL, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/shopify";
import OpenStatus from "./OpenStatus";

export default function Footer() {
  return (
    <footer id="contact" className="bg-green-deep text-cream">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[auto_1fr_1fr_1fr] md:gap-14">
          <div className="max-w-xs">
            <Image src="/img/logo.jpg" alt="The Moroccan Joint" width={96} height={96} className="h-24 w-24 object-cover" />
            <p className="mt-5 text-sm leading-relaxed text-cream/85">
              Moroccan food made in Miami with the warmth of home. A ghost kitchen serving authentic Moroccan street food made fresh to order, for delivery and pickup.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-cream/70">Hours</h4>
            <p className="mt-3 text-sm">Open daily</p>
            <p className="tnum text-2xl font-extrabold tracking-tight">{HOURS_LABEL}</p>
            <OpenStatus className="mt-2 text-sm text-cream/80" />
            <p className="mt-3 text-sm text-cream/80">Friday couscous delivers midday. Pre-order by Thursday.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-cream/70">Order</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="hover:text-white underline-offset-4 hover:underline" href={whatsappLink()} target="_blank" rel="noopener">WhatsApp {WHATSAPP_DISPLAY}</a></li>
              <li><a className="hover:text-white underline-offset-4 hover:underline" href="tel:+13054132526">Call {WHATSAPP_DISPLAY}</a></li>
              <li><Link className="hover:text-white underline-offset-4 hover:underline" href="/menu">Order online</Link></li>
              <li><Link className="hover:text-white underline-offset-4 hover:underline" href="/catering">Catering &amp; special orders</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-cream/70">Follow</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="hover:text-white underline-offset-4 hover:underline" href={INSTAGRAM_URL} target="_blank" rel="noopener">Instagram @themoroccanjointmiami</a></li>
              <li><a className="hover:text-white underline-offset-4 hover:underline" href={SHOP_URL}>Shop</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-cream/20 pt-6 text-xs text-cream/70">
          <span>© {new Date().getFullYear()} The Moroccan Joint · Miami, Florida</span>
          <span>Halal · Pickup &amp; delivery · Catering across South Florida</span>
        </div>
      </div>
    </footer>
  );
}
