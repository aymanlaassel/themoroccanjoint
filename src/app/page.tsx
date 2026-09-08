import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import AddButton from "@/components/AddButton";
import FridayCountdown from "@/components/FridayCountdown";
import OpenStatus from "@/components/OpenStatus";
import Reveal, { SectionTitle } from "@/components/Reveal";
import { findCategory, formatPrice, getMenu, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/shopify";

export const revalidate = 600;

export default async function HomePage() {
  const { categories } = await getMenu();
  const tajines = findCategory(categories, "tajine")?.items.filter((i) => i.available).slice(0, 3) ?? [];
  const couscous = findCategory(categories, "couscous")?.items ?? [];
  const teas = findCategory(categories, "tea")?.items ?? [];

  return (
    <>
      <Hero />

      {/* Order strip */}
      <div className="bg-red text-cream">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-5 py-3 text-center text-[12px] font-bold uppercase tracking-[0.12em]">
          <span>Order online</span><span aria-hidden="true">•</span>
          <span>Pickup &amp; delivery</span><span aria-hidden="true">•</span>
          <a href={whatsappLink()} className="underline underline-offset-4 hover:text-white">WhatsApp {WHATSAPP_DISPLAY}</a><span aria-hidden="true">•</span>
          <OpenStatus className="inline" />
        </div>
      </div>

      {/* Explore the menu */}
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
        <div className="boxed text-center">
          <SectionTitle title="Explore the menu" />
          <p className="mt-4 text-ink-2">From Moroccan street food to slow-cooked family favorites.</p>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c, i) => {
              const img = c.items.find((i) => i.image)?.image;
              return (
                <Reveal as="li" key={c.key} delay={(i % 4) * 0.08}>
                  <Link href={`/menu#${c.key}`} className="group block transition-transform duration-300 hover:-translate-y-1">
                    <div className="relative aspect-square overflow-hidden rounded-sm bg-cream-2">
                      {img && (
                        <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      )}
                    </div>
                    <p className="mt-3 text-base font-bold uppercase tracking-tight text-green transition-colors group-hover:text-red">{c.title}</p>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Tajines */}
      <section className="bg-cream-2">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
          <SectionTitle eyebrow="Slow-cooked" title="Our tajines" />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {tajines.map((item, i) => (
              <Reveal as="article" key={item.id} delay={i * 0.12} className="group flex flex-col">
                {item.image && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image src={item.image.src} alt={item.title} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  </div>
                )}
                <h3 className="heading mt-5 text-2xl">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="tnum text-[15px] font-semibold">{formatPrice(item.price)}</span>
                  <AddButton item={item} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Friday couscous */}
      <section id="friday" className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <Image src="/img/couscous.jpg" alt="Traditional lamb couscous" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </Reveal>
        <div>
          <SectionTitle eyebrow="Fridays only" title="Friday couscous" align="left" />
          <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
            Every Friday in Morocco, families gather around one generous plate of couscous. Ours is prepared the traditional
            Moroccan way with halal lamb, chickpeas and vegetables slowly cooked in a fragrant broth. It is comforting, abundant
            and made with love, the kind of meal meant to bring people together.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
            Traditional lamb couscous is available for Friday delivery only in limited quantities. Pre-order by Thursday to reserve your plate.
          </p>
          <div className="mt-7"><FridayCountdown /></div>
          <ul className="mt-7 divide-y divide-line border-y border-line">
            {couscous.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-4 py-3">
                <span className="text-[15px] font-semibold">{c.title}</span>
                <span className="flex items-center gap-4">
                  <span className="tnum text-[15px] font-bold">{formatPrice(c.price)}</span>
                  <AddButton item={c} />
                </span>
              </li>
            ))}
          </ul>
          <a href={whatsappLink("I'd like to pre-order Friday couscous.")} target="_blank" rel="noopener" className="btn btn-red mt-7">Preorder on WhatsApp</a>
        </div>
      </section>

      {/* Story */}
      <section className="bg-green-deep text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <SectionTitle eyebrow="From Morocco to Miami" title="Real Moroccan cooking" align="left" light />
            <p className="mt-4 text-xl font-semibold text-cream">More than 20 years of cooking from the heart.</p>
            <p className="mt-5 text-[15px] leading-relaxed text-cream/90">
              Our chef came to Miami carrying the flavors she grew up with in Morocco: the smell of spices warming in the kitchen,
              bread shared around the table and tajines left to cook slowly until everything becomes tender and full of flavor.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-cream/90">
              After more than 20 years of cooking, those memories still guide every dish. Preserved lemon, olives, cumin, saffron,
              fresh herbs and mint tea are not simply ingredients; they are part of the food she knows, loves and wants to share.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-cream/90">
              The Moroccan Joint is her way of bringing that feeling of home to Miami: honest food, generous portions and recipes made with love.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Reveal className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-sm">
              <Image src="/img/peas.jpg" alt="Lamb tajine with sweet peas and artichoke" fill sizes="50vw" className="object-cover" />
            </Reveal>
            <Reveal delay={0.1} className="relative aspect-square overflow-hidden rounded-sm">
              <Image src="/img/msemen.jpg" alt="Fresh msemen" fill sizes="25vw" className="object-cover" />
            </Reveal>
            <Reveal delay={0.2} className="relative aspect-square overflow-hidden rounded-sm">
              <Image src="/img/chicken.jpg" alt="Chicken tajine with preserved lemon and olives" fill sizes="25vw" className="object-cover" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ice Atay */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        <div className="lg:order-2">
          <SectionTitle eyebrow="Cool down with Ice Atay" title="Moroccan mint tea, reimagined" align="left" />
          <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
            Moroccan mint tea is traditionally served hot and poured with care. Our chef created Ice Atay as a refreshing Miami
            twist on that beloved tradition: fragrant mint tea chilled over ice, bright, smooth and perfect beside a warm panini
            or slow-cooked tajine.
          </p>
          <ul className="mt-7 divide-y divide-line border-y border-line">
            {teas.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-4 py-3">
                <span className="text-[15px] font-semibold">{t.title}</span>
                <span className="flex items-center gap-4">
                  {t.available && <span className="tnum text-[15px] font-bold">{formatPrice(t.price)}</span>}
                  <AddButton item={t} />
                </span>
              </li>
            ))}
          </ul>
          <Link href="/menu#tea" className="btn btn-outline mt-7">See drinks</Link>
        </div>
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-sm lg:order-1">
          <Image src="/img/iceatay.jpg" alt="Ice Atay with lemon and mint" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </Reveal>
      </section>

      {/* Catering */}
      <section className="bg-cream-2">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
          <div className="boxed mx-auto max-w-3xl text-center">
            <SectionTitle title="Catering & special orders" />
            <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
              Bring the warmth of a Moroccan table to your next gathering. We offer traditional tajines, family-style couscous,
              panini and bocadillo platters, msemen, mint tea and custom menu selections for family gatherings, office lunches,
              private events, birthdays, celebrations and large group orders.
            </p>
            <Link href="/catering" className="btn btn-green mt-7">Plan your order</Link>
          </div>
        </div>
      </section>
    </>
  );
}
