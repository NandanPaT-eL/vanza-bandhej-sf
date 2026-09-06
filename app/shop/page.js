import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProducts, getCollectionProducts, getCollections } from "@/lib/shopify";
import ShopFilters from "./ShopFilters";
import { Suspense } from "react";

export const metadata = {
  title: "Shop All Sarees — Vanza Bandhej",
  description:
    "Explore our full collection of handcrafted bandhani sarees — dyed with natural colours and tied by the artisans of Gujarat.",
};

function formatPrice(amount, currencyCode) {
  const symbol = currencyCode === "INR" ? "₹" : `${currencyCode} `;
  return `${symbol}${Number(amount).toLocaleString("en-IN")}`;
}

const SORT_MAP = {
  "CREATED_AT:true": { sortKey: "CREATED_AT", reverse: true },
  "PRICE:false": { sortKey: "PRICE", reverse: false },
  "PRICE:true": { sortKey: "PRICE", reverse: true },
  "BEST_SELLING:false": { sortKey: "BEST_SELLING", reverse: false },
};

const FALLBACK_SWATCHES = [
  "fabric-sindoor",
  "fabric-haldi",
  "fabric-neel",
  "fabric-kesari",
  "fabric-kholna",
];

/**
 * Build a composite Shopify product query string from active filters.
 * Shopify query syntax: field:value AND field:value
 */
function buildShopifyQuery({ searchQuery, type, tag }) {
  const parts = [];
  if (searchQuery) parts.push(searchQuery);
  if (type) parts.push(`product_type:${JSON.stringify(type)}`);
  if (tag) parts.push(`tag:${JSON.stringify(tag)}`);
  return parts.length > 0 ? parts.join(" AND ") : null;
}

export default async function ShopPage({ searchParams }) {
  const sortParam = searchParams?.sort ?? "CREATED_AT:true";
  const { sortKey, reverse } = SORT_MAP[sortParam] ?? SORT_MAP["CREATED_AT:true"];

  // Filter params
  const inStock = searchParams?.inStock === "true";
  const minPrice = Number(searchParams?.minPrice ?? 0);
  const maxPrice = Number(searchParams?.maxPrice ?? 999999);
  const searchQuery = searchParams?.q?.trim() || null;
  const activeCollection = searchParams?.collection?.trim() || null;
  const activeType = searchParams?.type?.trim() || null;
  // tags are multi-select: ?tag=cotton&tag=natural-dye → array
  const activeTags = searchParams?.tag
    ? Array.isArray(searchParams.tag)
      ? searchParams.tag
      : [searchParams.tag]
    : [];

  // Fetch collections for the sidebar (server-side, cached)
  let collections = [];
  try {
    collections = await getCollections();
  } catch (err) {
    console.error("Could not load collections:", err.message);
  }

  // Fetch products — switch strategy depending on active filters
  let allProducts = [];
  try {
    if (activeCollection) {
      // Collection-scoped fetch — sort/type/tag/search don't apply via collection endpoint
      allProducts = await getCollectionProducts(activeCollection, 100);
    } else {
      // Build composite Shopify query from type + tag + free-text search
      // For multi-tag we apply the first tag via Shopify, then client-filter the rest
      const shopifyQuery = buildShopifyQuery({
        searchQuery,
        type: activeType,
        tag: activeTags[0] ?? null,
      });
      allProducts = await getProducts(100, sortKey, reverse, shopifyQuery);
    }
  } catch (err) {
    console.error("Shop page: could not load products:", err.message);
  }

  // Derive available filter options from the full (unfiltered) product list
  // so the sidebar always shows what exists in the catalogue
  const availableTypes = [
    ...new Set(
      allProducts.map((p) => p.productType).filter(Boolean)
    ),
  ].sort();

  const availableTags = [
    ...new Set(
      allProducts.flatMap((p) => p.tags ?? []).filter(
        // Exclude noisy Shopify system tags
        (t) => t && t !== "Sample Product"
      )
    ),
  ].sort();

  // Client-side secondary filters (price, stock, additional tags)
  const filtered = allProducts.filter((p) => {
    const price = Number(p.priceRange?.minVariantPrice?.amount ?? 0);
    if (inStock && !p.availableForSale) return false;
    if (minPrice > 0 && price < minPrice) return false;
    if (maxPrice < 999999 && price > maxPrice) return false;
    // Apply remaining tags beyond the first (already sent to Shopify)
    if (activeTags.length > 1) {
      const productTags = p.tags ?? [];
      if (!activeTags.every((t) => productTags.includes(t))) return false;
    }
    return true;
  });

  // Active filter chips for display
  const activeFilters = [
    ...(activeCollection
      ? [
          {
            label: collections.find((c) => c.handle === activeCollection)?.title ?? activeCollection,
            clear: buildClearParam("collection"),
          },
        ]
      : []),
    ...(activeType ? [{ label: activeType, clear: buildClearParam("type") }] : []),
    ...activeTags.map((t) => ({ label: t, clear: buildClearTagParam(t) })),
    ...(searchQuery ? [{ label: `"${searchQuery}"`, clear: buildClearParam("q") }] : []),
    ...(inStock ? [{ label: "In stock", clear: buildClearParam("inStock") }] : []),
  ];

  function buildClearParam(key) {
    const p = { ...searchParams };
    delete p[key];
    const qs = new URLSearchParams(p).toString();
    return `/shop${qs ? `?${qs}` : ""}`;
  }

  function buildClearTagParam(tag) {
    const p = { ...searchParams };
    const tags = activeTags.filter((t) => t !== tag);
    if (tags.length === 0) delete p.tag;
    else p.tag = tags;
    const qs = new URLSearchParams(p).toString();
    return `/shop${qs ? `?${qs}` : ""}`;
  }

  const hasActiveFilters = activeFilters.length > 0;
  const isSearch = !!searchQuery && !activeCollection && !activeType && activeTags.length === 0;

  return (
    <>
      <Header />
      <main>
        {/* Page header */}
        <section className="bg-cream-dark py-12 md:py-16 text-center border-b border-ink/10">
          <span className="text-[11px] tracking-widest2 uppercase text-maroon">
            {isSearch ? "Search results" : activeCollection
              ? collections.find((c) => c.handle === activeCollection)?.title ?? "Collection"
              : "All sarees"}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-ink mt-3">
            {isSearch ? (
              <>
                Results for{" "}
                <em className="italic text-maroon">&ldquo;{searchQuery}&rdquo;</em>
              </>
            ) : activeType ? (
              <>
                <em className="italic text-maroon">{activeType}</em> sarees
              </>
            ) : (
              <>The <em className="italic text-maroon">Collection</em></>
            )}
          </h1>
          {hasActiveFilters ? (
            <a
              href="/shop"
              className="mt-4 inline-flex items-center gap-1.5 text-[11px] tracking-widest2 uppercase text-ink/50 hover:text-maroon transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
              Clear all filters
            </a>
          ) : (
            <p className="mt-3 text-[14px] text-ink/60 max-w-md mx-auto leading-relaxed">
              Every piece hand-tied, naturally dyed — straight from the karigars
              of Gujarat.
            </p>
          )}
        </section>

        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
            {/* Filters sidebar */}
            <div className="md:w-56 shrink-0">
              <Suspense fallback={null}>
                <ShopFilters
                  allProducts={allProducts}
                  collections={collections}
                  availableTypes={availableTypes}
                  availableTags={availableTags}
                />
              </Suspense>
            </div>

            {/* Product grid */}
            <div className="flex-1">
              {/* Active filter chips + count */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <p className="text-[12px] text-ink/50 tracking-wide mr-2">
                  {filtered.length} {filtered.length === 1 ? "saree" : "sarees"}
                </p>
                {activeFilters.map((f) => (
                  <a
                    key={f.label}
                    href={f.clear}
                    className="inline-flex items-center gap-1.5 border border-ink/20 rounded-full px-3 py-1 text-[11px] tracking-wide text-ink/70 hover:border-maroon hover:text-maroon transition-colors"
                  >
                    {f.label}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </a>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div className="border border-dashed border-ink/20 rounded-sm p-10 text-center text-[14px] text-ink/50">
                  {hasActiveFilters ? (
                    <>
                      No sarees match the active filters.{" "}
                      <a href="/shop" className="text-maroon hover:underline">
                        Clear all filters
                      </a>
                      .
                    </>
                  ) : (
                    "No sarees found."
                  )}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((product, i) => {
                    const price = product.priceRange?.minVariantPrice;
                    const swatch = FALLBACK_SWATCHES[i % FALLBACK_SWATCHES.length];
                    return (
                      <a
                        key={product.id}
                        href={`/products/${product.handle}`}
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
                          {!product.availableForSale && (
                            <span className="mb-2 self-start text-[9px] tracking-widest2 uppercase bg-ink/60 text-cream/80 px-2 py-0.5 rounded-full">
                              Sold out
                            </span>
                          )}
                          {product.productType && (
                            <span className="mb-1 text-[9px] tracking-widest2 uppercase text-cream/60">
                              {product.productType}
                            </span>
                          )}
                          <h2 className="font-display text-2xl leading-snug">
                            {product.title}
                          </h2>
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
