# Vanza Bandhej — Landing Page

A Next.js (App Router) recreation of the Vanza Bandhej landing page design,
built with Tailwind CSS. All copy, layout, and sections match the design PDF.
Product photography is stubbed with styled "fabric swatch" and "portrait"
placeholder blocks — swap these for real images once your Shopify catalogue
is connected (see below).

## 1. Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Vanza Bandhej landing page"
gh repo create vanza-bandhej --private --source=. --push
# or: create a repo on github.com, then
#   git remote add origin https://github.com/<you>/vanza-bandhej.git
#   git push -u origin main
```

## 3. Deploy (recommended: Vercel)

1. Go to vercel.com → New Project → import your GitHub repo.
2. Add the two environment variables from step 4 below in the Vercel
   project's Settings → Environment Variables.
3. Deploy. Vercel builds and hosts the Next.js app automatically.

## 4. Connect your Shopify store

This project already includes a ready-to-use Storefront API client at
`lib/shopify.js`, plus `getProducts`, `getProductByHandle`, `createCart`,
and `addToCart` helpers.

**Get your credentials:**

1. In your Shopify admin, install the **Headless** channel (Sales
   channels → Headless, or find it in the Shopify App Store).
2. Click **Create storefront**. This generates a public and a private
   access token automatically.
3. Copy the **private access token** — this authenticates server-side
   requests from this Next.js app.

**Wire it up:**

1. Copy `.env.local.example` to `.env.local`.
2. Fill in:
   ```
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxx
   ```
3. Restart `npm run dev`.

**Use it in a page or component**, e.g. to replace the placeholder cards
in `components/Collection.js` with real products:

```js
import { getProducts } from "@/lib/shopify";

export default async function Collection() {
  const products = await getProducts(4);
  // map `products` into the existing card markup, using
  // product.featuredImage.url, product.title, product.priceRange...
}
```

For checkout, once a cart is created with `createCart`/`addToCart`, redirect
the buyer to the `checkoutUrl` field returned on the cart — that's Shopify's
own hosted, PCI-compliant checkout page.

Never add `SHOPIFY_STOREFRONT_ACCESS_TOKEN` to a client component or expose
it in the browser; only call the functions in `lib/shopify.js` from Server
Components, Route Handlers, or Server Actions.

## Project structure

```
app/
  layout.js         Root layout, fonts, metadata
  page.js            Assembles all landing page sections
  globals.css        Fabric/sticky-note textures, marquee animation
components/
  Header.js          Top bar + nav
  Hero.js            "Every dot, a story tied by hand"
  Marquee.js         Scrolling strip (English + Gujarati)
  Heritage.js        "Five hundred years, a thousand knots"
  Craft.js           Bandhna / Ranga / Kholna / Darshan process
  Collection.js       "The Sindoor Edit" product grid
  ArtisanSpotlight.js Rameshbhai Khatri feature
  Palette.js         Sindoor / Haldi / Maroon / Neel / Kesari colour chips
  Testimonials.js    "Some sarees become heirlooms"
  Journal.js         Blog/article cards
  Newsletter.js      Email signup (client component, local state only)
  Footer.js          Site footer
lib/
  shopify.js         Storefront API client + helpers (see step 4)
```

## Replacing placeholder imagery

Every fabric texture and portrait block is a CSS placeholder (see the
`.fabric`, `.fabric-card`, and `.portrait` classes in `app/globals.css`),
clearly labelled where a photo belongs. Once your product images are
available via the Storefront API (`product.featuredImage.url` /
`product.images`), swap these `<div>` placeholders for Next.js `<Image>`
components. `next.config.js` is already configured to allow images from
`cdn.shopify.com`.
