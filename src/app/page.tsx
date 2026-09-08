import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import AddButton from "@/components/AddButton";
import FridayCountdown from "@/components/FridayCountdown";
import { Divider } from "@/components/Star";
import { findCategory, formatPrice, getMenu, whatsappLink } from "@/lib/shopify";

export const revalidate = 600;

export default async function HomePage() {
  const { categories } = await getMenu();
  const tajines = findCategory(categories, "tajine")?.items.filter((i) => i.available).slice(0, 3) ?? [];
  const couscous = findCategory(categories, "couscous")?.items ?? [];
  const teas = findCategory(categories, "tea")?.items ?? [];

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-7xl px-6 lg:px-10"><Divider /></div>

      {/* Signature tajines */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label">Signature dishes</p>
              <h2 className="mt-4 font-display text-5xl font-light leading-none lg:text-6xl">The tajines</h2>
            </div>
            <Link href="/menu" className="label link-line text-cream">Full menu</Link>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {tajines.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.12}>
              <article className="group">
                {item.image && (
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Image
                      src={item.image.src}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="photo object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="photo-veil absolute inset-0" aria-hidden="true" />
                  </div>
                )}
                <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <h3 className="font-display text-2xl leading-tight">{item.title}</h3>
                  <span className="tnum font-display text-xl text-gold">{formatPrice(item.price)}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-sand">{item.description}</p>
                <div className="mt-5"><AddButton item={item} variant="text" /></div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Friday couscous */}
      <section id="friday" className="relative scroll-mt-20 overflow-hidden bg-smoke">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-36">
          <Reveal>
            <p className="label">Every Friday</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-none lg:text-6xl">
              One plate,<br /><em className="text-gold">the whole table.</em>
            </h2>
            <p className="mt-8 max-w-lg leading-relaxed text-cream">
              Every Friday in Morocco, families gather around a single generous plate of couscous. Ours is prepared
              the traditional way: halal lamb, chickpeas and vegetables cooked slowly in a fragrant broth until the
              grain drinks it all in.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-sand">
              Made in limited quantities for Friday delivery only. Pre-order by Thursday; it arrives Friday midday, ready to reheat.
            </p>
            <div className="mt-12"><FridayCountdown /></div>
            <div className="mt-12 flex flex-wrap items-center gap-8">
              {couscous.map((c) => (
                <div key={c.id} className="flex items-center gap-4">
                  <span className="font-display text-lg">{c.title.replace("Lamb Couscous ", "")}</span>
                  <span className="tnum font-display text-lg text-gold">{formatPrice(c.price)}</span>
                  <AddButton item={c} />
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:justify-self-end">
            <div className="frame relative aspect-[4/5] w-full max-w-md overflow-hidden">
              <Image src="/img/couscous.jpg" alt="Friday lamb couscous" fill sizes="(min-width: 1024px) 40vw, 100vw" className="photo object-cover" />
              <div className="photo-veil absolute inset-0" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24 lg:px-10 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden">
                <Image src="/img/peas.jpg" alt="Lamb tajine with sweet peas and artichoke" fill sizes="40vw" className="photo object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image src="/img/msemen.jpg" alt="Fresh msemen" fill sizes="20vw" className="photo object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image src="/img/chicken.jpg" alt="Chicken tajine with preserved lemon and olives" fill sizes="20vw" className="photo object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="label">From Morocco to Miami</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-none lg:text-6xl">Twenty years of cooking from the heart</h2>
            <blockquote className="mt-10 border-l border-gold-dim pl-6 font-display text-2xl font-light italic leading-snug text-cream">
              Preserved lemon, olives, cumin, saffron, fresh herbs and mint tea are not simply ingredients. They are the food she knows, loves and wants to share.
            </blockquote>
            <p className="mt-8 leading-relaxed text-sand">
              Our chef came to Miami carrying the flavors she grew up with in Morocco: spices warming in the kitchen,
              bread shared around the table, tajines left to cook slowly until everything becomes tender and full of flavor.
              After more than twenty years, those memories still guide every dish.
            </p>
            <p className="mt-4 leading-relaxed text-sand">
              The Moroccan Joint is her way of bringing that feeling of home to Miami: honest food, generous portions and recipes made with love.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-10"><Divider /></div>

      {/* Atay */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="label">Atay</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-none lg:text-6xl">Mint tea, poured hot<br /><em className="text-gold">or served over ice.</em></h2>
            <p className="mt-8 max-w-lg leading-relaxed text-sand">
              Moroccan mint tea is traditionally served hot and poured from a height. Our chef created Ice Atay as a
              Miami answer to that ritual: the same fragrant tea chilled over ice with a twist of lemonade and fresh mint,
              made for a warm evening beside a panini or a tajine.
            </p>
            <ul className="mt-10 max-w-md divide-y divide-line border-y border-line">
              {teas.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-6 py-4">
                  <div>
                    <p className="font-display text-xl">{t.title}</p>
                    <p className="text-sm text-sand">{t.description}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="tnum font-display text-xl text-gold">{t.available ? formatPrice(t.price) : "Ask"}</span>
                    <AddButton item={t} />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
            <div className="frame relative aspect-[4/5] overflow-hidden">
              <Image src="/img/iceatay.jpg" alt="Ice Atay with lemon and mint" fill sizes="(min-width: 1024px) 35vw, 100vw" className="photo object-cover" />
              <div className="photo-veil absolute inset-0" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Catering teaser */}
      <section className="border-y border-line bg-smoke">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-10 px-6 py-20 lg:px-10">
          <Reveal>
            <p className="label">Catering &amp; special orders</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-light leading-tight lg:text-5xl">
              Bring a Moroccan table to your next gathering.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-sand">
              Family-style couscous, tajines, panini and bocadillo platters, msemen and mint tea for offices, birthdays and
              private events across Miami, Fort Lauderdale, Boca Raton and Delray Beach.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-8">
              <Link href="/catering" className="btn-gold">Plan an event</Link>
              <a href={whatsappLink("Hi! I'd like to ask about catering.")} target="_blank" rel="noopener" className="label link-line text-cream">Ask on WhatsApp</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
