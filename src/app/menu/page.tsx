import type { Metadata } from "next";
import MenuBoard from "@/components/MenuBoard";
import OpenStatus from "@/components/OpenStatus";
import Reveal from "@/components/Reveal";
import { getMenu } from "@/lib/shopify";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Menu",
  description: "Tajines, Friday couscous, bocadillos, paninis, msemen, avocado smoothies and Moroccan mint tea. Halal, delivered across Miami.",
};

export default async function MenuPage() {
  const { categories, live } = await getMenu();
  return (
    <div className="mx-auto max-w-7xl px-6 pt-36 pb-28 lg:px-10 lg:pt-44">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-gold-dim/60 pb-10">
          <div>
            <p className="label">The menu</p>
            <h1 className="mt-4 font-display text-6xl font-light leading-none lg:text-7xl">
              From street food<br /><em className="text-gold">to the family table.</em>
            </h1>
          </div>
          <div className="max-w-sm text-sm leading-relaxed text-sand">
            <OpenStatus className="mb-4" />
            <p>Add dishes to your bag and check out securely, or send the order straight to us on WhatsApp. Dishes marked halal are made with halal meat.</p>
            {!live && <p className="mt-2 text-xs text-gold-dim">Prices shown from our last update. Confirm at checkout.</p>}
          </div>
        </div>
      </Reveal>
      <div className="mt-14">
        <MenuBoard categories={categories} />
      </div>
    </div>
  );
}
