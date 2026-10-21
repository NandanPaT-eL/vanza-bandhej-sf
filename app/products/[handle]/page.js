import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { getProductByHandle, getRelatedProducts } from "@/lib/shopify";
import ImageGallery from "./ImageGallery";
import AddToCartButton from "./AddToCartButton";
import ProductAccordions from "./ProductAccordions";

export async function generateMetadata({ params }) {
  const product = await getProductByHandle(params.handle);
  if (!product) return { title: "Product not found — Vanza Bandhej" };

  const firstImage = product.images?.edges?.[0]?.node?.url;

  return {
    title: `${product.title} — Vanza Bandhej`,
    description:
      product.description?.slice(0, 160) ||
      "Handcrafted bandhani sarees, dupattas, and fabrics from the master artisans of Gujarat.",
    openGraph: {
      title: `${product.title} — Vanza Bandhej`,
      description:
        product.description?.slice(0, 160) ||
        "Authentic handcrafted Bandhani from Kutch, Gujarat.",
      images: firstImage ? [{ url: firstImage }] : [],
    },
  };
}

function formatPrice(amount, currencyCode) {
  const symbol = currencyCode === "INR" ? "₹" : `${currencyCode} `;
  return `${symbol}${Number(amount).toLocaleString("en-IN")}`;
}

export default async function ProductPage({ params }) {
  const product = await getProductByHandle(params.handle);
  if (!product) notFound();

  // Fetch complementary/related products
  const relatedProducts = await getRelatedProducts(product.id, 4);

  const images = product.images?.edges.map((e) => e.node) ?? [];
  const variants = product.variants?.edges.map((e) => e.node) ?? [];
  const primaryVariant = variants[0];
  const price = primaryVariant?.price;
  const compareAtPrice = primaryVariant?.compareAtPrice;

  // Calculate discount percentage if available
  const hasDiscount =
    compareAtPrice &&
    Number(compareAtPrice.amount) > Number(price?.amount);
  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(compareAtPrice.amount) - Number(price.amount)) /
          Number(compareAtPrice.amount)) *
          100
      )
    : null;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-cream text-ink">
        {/* ── Breadcrumb Bar ── */}
        <div className="border-b border-ink/10 bg-cream-dark/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3.5">
            <nav
              className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-widest2 uppercase text-ink/50 overflow-x-auto whitespace-nowrap"
              aria-label="Breadcrumb"
            >
              <a href="/" className="hover:text-maroon transition-colors">
                Home
              </a>
              <span className="text-ink/30" aria-hidden>
                /
              </span>
              <a href="/shop" className="hover:text-maroon transition-colors">
                Shop
              </a>
              {product.productType && (
                <>
                  <span className="text-ink/30" aria-hidden>
                    /
                  </span>
                  <a
                    href={`/shop?type=${encodeURIComponent(product.productType)}`}
                    className="hover:text-maroon transition-colors"
                  >
                    {product.productType}
                  </a>
                </>
              )}
              <span className="text-ink/30" aria-hidden>
                /
              </span>
              <span className="text-ink/80 font-medium truncate max-w-[200px] sm:max-w-none">
                {product.title}
              </span>
            </nav>
          </div>
        </div>

        {/* ── Main Product Section (Two Column Layout) ── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
            {/* Left Column: Image Gallery (7 cols on large screens) */}
            <div className="lg:col-span-7">
              <ImageGallery images={images} title={product.title} />
            </div>

            {/* Right Column: Sticky Product Purchase Details (5 cols on large screens) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              {/* Category & Craft Origin Tag */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-widest2 uppercase font-medium text-maroon bg-maroon/10 px-2.5 py-1 rounded-sm">
                    {product.productType || "Kutch Bandhani"}
                  </span>
                  <span className="text-[10px] tracking-widest2 uppercase text-ink/40">
                    Handcrafted in Gujarat
                  </span>
                </div>

                {/* Main Product Title */}
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-tight tracking-tight">
                  {product.title}
                </h1>
              </div>

              {/* Price & Tax Disclosure */}
              <div className="space-y-1.5 pb-2 border-b border-ink/10">
                <div className="flex items-baseline gap-3">
                  {price && (
                    <span className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight font-display">
                      {formatPrice(price.amount, price.currencyCode)}
                    </span>
                  )}
                  {hasDiscount && (
                    <>
                      <span className="text-base sm:text-lg text-ink/40 line-through">
                        {formatPrice(
                          compareAtPrice.amount,
                          compareAtPrice.currencyCode
                        )}
                      </span>
                      <span className="text-[11px] font-medium tracking-wide text-[#256847] bg-[#256847]/10 px-2 py-0.5 rounded-sm">
                        Save {discountPercent}%
                      </span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-ink/50 tracking-wide">
                  Inclusive of all taxes · Free insured express shipping
                </p>
              </div>

              {/* Product Short Description */}
              {product.description && (
                <div className="text-[14px] leading-relaxed text-ink/75 max-w-lg space-y-2">
                  <p>{product.description}</p>
                </div>
              )}

              {/* Add to Cart & Variant Selection */}
              <div className="pt-2">
                <AddToCartButton
                  variants={variants}
                  productTitle={product.title}
                  productHandle={product.handle}
                />
              </div>

              {/* ── Key Craft Specifications ── */}
              <div className="rounded-sm bg-cream-dark/25 border border-ink/10 p-4 sm:p-5">
                <h3 className="text-[10px] tracking-widest2 uppercase font-semibold text-ink/70 mb-3">
                  Artisanal Craft Details
                </h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[12px]">
                  <div>
                    <span className="block text-[10px] tracking-wider uppercase text-ink/40">
                      Craft Form
                    </span>
                    <span className="font-medium text-ink">
                      Rai Bandhej (Tie &amp; Dye)
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-wider uppercase text-ink/40">
                      Provenance
                    </span>
                    <span className="font-medium text-ink">
                      Bhuj &amp; Mandvi, Gujarat
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-wider uppercase text-ink/40">
                      Fabric Care
                    </span>
                    <span className="font-medium text-ink">
                      Dry Clean Only
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-wider uppercase text-ink/40">
                      Dispatch
                    </span>
                    <span className="font-medium text-ink">
                      Within 2–3 Business Days
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Trust Metrics Strip ── */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-ink/10 text-ink/80">
                <div className="flex items-center gap-2.5">
                  <span className="text-maroon text-base">✦</span>
                  <span className="text-[11px] tracking-wide">
                    100% Hand-tied Knotwork
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-maroon text-base">✦</span>
                  <span className="text-[11px] tracking-wide">
                    Direct Artisan Looms
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-maroon text-base">✦</span>
                  <span className="text-[11px] tracking-wide">
                    Free Insured Pan-India Delivery
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-maroon text-base">✦</span>
                  <span className="text-[11px] tracking-wide">
                    Certified Handloom Authenticity
                  </span>
                </div>
              </div>

              {/* ── Luxury Information Accordions (Exact tabs: Details, Returns, Stylist, Shipping, Wash & Care, Disclaimer) ── */}
              <ProductAccordions
                productTitle={product.title}
                productDescription={product.description}
                descriptionHtml={product.descriptionHtml}
                productType={product.productType}
              />
            </div>
          </div>
        </section>

        {/* ── Related / "You May Also Like" Products ── */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-ink/10 bg-cream-dark/20 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-ink/10 gap-4">
                <div>
                  <span className="text-[10px] tracking-widest2 uppercase text-maroon font-medium block mb-1.5">
                    Complete Your Wardrobe
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl text-ink">
                    You May Also Adore
                  </h2>
                </div>
                <a
                  href="/shop"
                  className="text-[11px] tracking-widest2 uppercase text-maroon hover:text-maroon-dark font-medium transition-colors flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>Explore All Creations</span>
                  <span aria-hidden>→</span>
                </a>
              </div>

              {/* Grid of related cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((relProduct, idx) => (
                  <ProductCard
                    key={relProduct.id}
                    product={relProduct}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
