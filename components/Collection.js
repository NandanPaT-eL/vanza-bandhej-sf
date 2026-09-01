import Image from "next/image";
import { getProducts } from "@/lib/shopify";

// Revalidate this section's data at most once a minute. Swap for
// on-demand revalidation via a Shopify webhook once you're ready.
export const revalidate = 60;

const FALLBACK_SWATCHES = [
  "fabric-sindoor",
  "fabric-haldi",
  "fabric-neel",
  "fabric-kesari",
  "fabric-kholna",
];

function formatPrice(amount, currencyCode) {
  const symbol = currencyCode === "INR" ? "\u20b9" : `${currencyCode} `;
  return `${symbol}${Number(amount).toLocaleString("en-IN")}`;
}

export default async function Collection() {
  let products = [];
  try {
    products = await getProducts(6);
  } catch (err) {
    // Falls back to an empty state below — most likely the Shopify env
    // vars aren't set yet (see .env.local.example / README).
    console.error("Could not load products from Shopify:", err.message);
  }

  return (
    <section id="collections" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] tracking-widest2 uppercase text-maroon">
              This season
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4">
              The <em className="italic text-maroon">Sindoor</em> Edit.
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/70">
              A curated collection of nine sarees &mdash; dyed with madder root
              and turmeric, tied for the wedding season of 2026.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-ink/25 rounded-full px-6 py-3 text-[11px] tracking-widest2 uppercase text-ink hover:border-maroon hover:text-maroon transition-colors"
          >
            Shop all sarees <span aria-hidden>&#8599;</span>
          </a>
        </div>

        {products.length === 0 ? (
          <div className="border border-dashed border-ink/20 rounded-sm p-10 text-center text-[14px] text-ink/50">
            No products found yet. Once <code>SHOPIFY_STORE_DOMAIN</code> and{" "}
            <code>SHOPIFY_STOREFRONT_ACCESS_TOKEN</code> are set (and your
            Headless channel storefront has products published to it),
            they&apos;ll appear here automatically.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => {
              const price = product.priceRange?.minVariantPrice;
              const swatch = FALLBACK_SWATCHES[i % FALLBACK_SWATCHES.length];
              return (
                <a
                  href={`#`}
                  key={product.id}
                  className="fabric-card rounded-sm shadow-xl min-h-[360px] block"
                >
                  <div className="fabric-bg">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className={`fabric h-full ${swatch}`} />
                    )}
                  </div>
                  <div className="fabric-scrim" />
                  <div className="fabric-content flex flex-col justify-end h-full p-6 text-cream">
                    <h3 className="font-display text-2xl leading-snug">
                      {product.title}
                    </h3>
                    <div className="flex items-end justify-between mt-2">
                      {price && (
                        <p className="text-[14px]">
                          {formatPrice(price.amount, price.currencyCode)}
                        </p>
                      )}
                      <span className="text-[11px] tracking-widest2 uppercase hover:text-haldi transition-colors">
                        Shop &rarr;
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}