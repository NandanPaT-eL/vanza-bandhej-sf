import { getCollectionProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";

// Revalidate this section's data at most once a minute.
export const revalidate = 60;

export default async function Collection() {
  let products = [];
  try {
    products = await getCollectionProducts("sindoor-edit", 6);
  } catch (err) {
    console.error("Could not load products from Shopify:", err.message);
  }

  return (
    <section id="collections" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] tracking-widest2 uppercase text-maroon">
              This season
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-ink mt-3">
              The <em className="italic text-maroon">Sindoor</em> Edit.
            </h2>
            <p className="mt-2 max-w-md text-[14px] leading-relaxed text-ink/60">
              Nine sarees dyed with madder root &amp; turmeric — tied for the
              wedding season of 2026.
            </p>
          </div>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 border border-ink/25 rounded-full px-6 py-3 text-[11px] tracking-widest2 uppercase text-ink hover:border-maroon hover:text-maroon transition-colors shrink-0"
          >
            Shop all sarees <span aria-hidden>&#8599;</span>
          </a>
        </div>

        {products.length === 0 ? (
          <div className="border border-dashed border-ink/20 rounded-sm p-10 text-center text-[14px] text-ink/50">
            No products found yet. Once{" "}
            <code>SHOPIFY_STORE_DOMAIN</code> and{" "}
            <code>SHOPIFY_STOREFRONT_ACCESS_TOKEN</code> are set (and your
            Headless channel storefront has products published to it),
            they&apos;ll appear here automatically.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                priority={i < 3}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}