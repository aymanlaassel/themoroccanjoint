# The Moroccan Joint

Website for The Moroccan Joint, a halal Moroccan ghost kitchen in Miami.

Built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion.

## How it works

- **Live menu.** Pages fetch products and collections from the existing Shopify store (`themoroccanjoint.com/products.json` and `/collections/*/products.json`) and revalidate every 10 minutes, so prices, availability and photos update when they change in Shopify. If Shopify is unreachable the site falls back to `src/data/menu-fallback.json`.
- **Bag and checkout.** Items are kept in a small client-side store. Checkout opens a Shopify cart permalink with the chosen variants and quantities, so payment happens on Shopify. A second button sends the order as a WhatsApp message instead.
- **Hours and Friday couscous.** Open status and the pre-order countdown are computed in Miami time on the client.
- **Catering.** The form composes a WhatsApp message with the event details.

## Develop

```bash
npm install
npm run dev
```

## Deploy

Deploy to Vercel (import this repository, no configuration needed). Point the domain at Vercel and keep Shopify running for checkout.
