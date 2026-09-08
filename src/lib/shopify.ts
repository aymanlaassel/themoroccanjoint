import fallback from "@/data/menu-fallback.json";

export const SHOP_URL = "https://themoroccanjoint.com";
export const WHATSAPP_NUMBER = "13054132526";
export const WHATSAPP_DISPLAY = "305-413-2526";
export const INSTAGRAM_URL = "https://www.instagram.com/themoroccanjointmiami";

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export type MenuItem = {
  id: string;
  variantId: string;
  handle: string;
  title: string;
  description: string;
  descriptionEs?: string;
  price: number;
  available: boolean;
  image?: { src: string; width: number; height: number };
  halal: boolean;
  fridayOnly: boolean;
  url: string;
};

export type MenuCategory = {
  key: string;
  title: string;
  note?: string;
  items: MenuItem[];
};

type RawProduct = {
  id: number;
  handle: string;
  title: string;
  body_html: string | null;
  product_type?: string;
  variants: { id: number; price: string; available: boolean }[];
  images: { src: string; width: number; height: number }[];
};

type RawMenu = { products: RawProduct[]; collections: Record<string, string[]> };

const CATEGORY_DEFS: { key: string; title: string; note?: string; sources: string[] }[] = [
  { key: "tajine", title: "Tajine", note: "Slow-cooked, served with fresh bread", sources: ["tajine"] },
  { key: "couscous", title: "Couscous", note: "Fridays only. Pre-order by Thursday", sources: ["couscous"] },
  { key: "bocadillo", title: "Bocadillo", note: "On a fresh baguette, fries inside", sources: ["moroccan-bocadillo"] },
  { key: "panini", title: "Panini", note: "Grilled to order", sources: ["panini"] },
  { key: "msemen", title: "Msemen", note: "Layered flatbread, pan-cooked", sources: ["msemen"] },
  { key: "sides", title: "Appetizers & Sides", note: "Ask what is on today", sources: ["appetizers-sides"] },
  { key: "smoothies", title: "Avocado Smoothies", note: "Jus d'avocat, the café classic", sources: ["smoothies"] },
  { key: "tea", title: "Atay", note: "Moroccan mint tea, hot or over ice", sources: ["tea"] },
  { key: "drinks", title: "Drinks & Snacks", sources: ["soft-drinks", "water", "snacks"] },
];

const SOURCE_HANDLES = Array.from(new Set(CATEGORY_DEFS.flatMap((c) => c.sources)));

function stripHtml(html: string | null): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

const TITLE_OVERRIDES: Record<string, string> = {
  "tajine-chicken-lemon-olive": "Chicken, Preserved Lemon & Olives",
  "tajine-lamb-prunes": "Lamb with Prunes",
  "tajine-lamb-sweet-peas-artichoke": "Lamb, Sweet Peas & Artichoke",
  "a-tajine-cow-trotters-with-chickpeas": "Cow Trotters with Chickpeas",
  "milkshake-avocat-dates": "Avocado & Date Milkshake",
  "avocat-fruits-secs": "Avocat Fruits Secs",
  "chicken-pepperoni-panini": "Chicken Panini",
  "1-msemen": "Msemen",
};

function cleanTitle(title: string, handle: string): string {
  if (TITLE_OVERRIDES[handle]) return TITLE_OVERRIDES[handle];
  return title
    .replace(/^a\s+/i, "")
    .replace(/\s+halal$/i, "")
    .trim();
}

function parseDescription(html: string | null): { en: string; es?: string; fridayOnly: boolean; halal: boolean } {
  const text = stripHtml(html);
  const fridayOnly = /fridays? only/i.test(text);
  const halal = /halal/i.test(text);
  const [enRaw, restRaw] = text.split(/\bHALAL\b/);
  const en = (enRaw ?? text).trim();
  let es: string | undefined;
  if (restRaw) {
    es = restRaw.split(/Fridays? only/i)[0].trim() || undefined;
  }
  return { en, es, fridayOnly, halal };
}

function toItem(p: RawProduct): MenuItem {
  const v = p.variants[0];
  const parsed = parseDescription(p.body_html);
  const halalTitle = /halal/i.test(p.title);
  return {
    id: String(p.id),
    variantId: String(v?.id ?? ""),
    handle: p.handle,
    title: cleanTitle(p.title, p.handle),
    description: parsed.en,
    descriptionEs: parsed.es,
    price: Number(v?.price ?? 0),
    available: Boolean(v?.available) && Number(v?.price ?? 0) > 0,
    image: p.images[0],
    halal: parsed.halal || halalTitle,
    fridayOnly: parsed.fridayOnly || /couscous/i.test(p.handle),
    url: `${SHOP_URL}/products/${p.handle}`,
  };
}

function buildMenu(raw: RawMenu): MenuCategory[] {
  const byHandle = new Map(raw.products.map((p) => [p.handle, p]));
  const placed = new Set<string>();
  const categories: MenuCategory[] = CATEGORY_DEFS.map((def) => {
    const handles = def.sources.flatMap((s) => raw.collections[s] ?? []);
    const items = Array.from(new Set(handles))
      .map((h) => byHandle.get(h))
      .filter((p): p is RawProduct => Boolean(p))
      .map((p) => {
        placed.add(p.handle);
        return toItem(p);
      });
    return { key: def.key, title: def.title, note: def.note, items };
  });

  // Products not in any collection: place them by name.
  for (const p of raw.products) {
    if (placed.has(p.handle)) continue;
    const name = `${p.title} ${p.handle}`.toLowerCase();
    const target =
      name.includes("msemen") ? "msemen" :
      name.includes("tajine") ? "tajine" :
      name.includes("couscous") ? "couscous" :
      name.includes("panini") ? "panini" :
      name.includes("bocadillo") ? "bocadillo" : "sides";
    categories.find((c) => c.key === target)?.items.push(toItem(p));
  }

  // Sort within category: available first, then price descending for mains.
  for (const c of categories) {
    c.items.sort((a, b) => Number(b.available) - Number(a.available) || b.price - a.price);
  }
  return categories.filter((c) => c.items.length > 0);
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${SHOP_URL}${path}`, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; TheMoroccanJointSite/1.0)" },
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`Shopify ${path} ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getMenu(): Promise<{ categories: MenuCategory[]; live: boolean }> {
  try {
    const [{ products }, ...cols] = await Promise.all([
      fetchJson<{ products: RawProduct[] }>("/products.json?limit=250"),
      ...SOURCE_HANDLES.map((h) => fetchJson<{ products: { handle: string }[] }>(`/collections/${h}/products.json`)),
    ]);
    const collections: Record<string, string[]> = {};
    SOURCE_HANDLES.forEach((h, i) => {
      collections[h] = cols[i].products.map((p) => p.handle);
    });
    return { categories: buildMenu({ products, collections }), live: true };
  } catch {
    return { categories: buildMenu(fallback as unknown as RawMenu), live: false };
  }
}

export function findCategory(categories: MenuCategory[], key: string) {
  return categories.find((c) => c.key === key);
}

export function formatPrice(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
