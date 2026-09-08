import type { Metadata } from "next";
import MenuBoard from "@/components/MenuBoard";
import OpenStatus from "@/components/OpenStatus";
import { getMenu } from "@/lib/shopify";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Menu",
  description: "Tajines, Friday couscous, bocadillos, paninis, msemen, avocado smoothies and Moroccan mint tea. Halal, delivered across Miami.",
};

export default async function MenuPage() {
  const { categories, live } = await getMenu();
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6 pb-8">
        <div>
          <h1 className="heading text-5xl lg:text-6xl">Menu</h1>
          <p className="mt-3 text-ink-2">Pickup and delivery. Dishes marked halal are made with halal meat.</p>
        </div>
        <div className="text-right text-sm text-ink-2">
          <OpenStatus />
          {!live && <p className="text-xs text-ink-3">Prices from our last update. Confirmed at checkout.</p>}
        </div>
      </div>
      <MenuBoard categories={categories} />
    </div>
  );
}
