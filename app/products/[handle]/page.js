import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductByHandle } from "@/lib/shopify";
import ImageGallery from "./ImageGallery";
import AddToCartButton from "./AddToCartButton";

export async function generateMetadata({ params }) {
  const product = await getProductByHandle(params.handle);
  if (!product) return { title: "Product not found — Vanza Bandhej" };
  return {
    title: `${product.title} — Vanza Bandhej`,
    description: product.description?.slice(0, 160) || "Handcrafted bandhani from the artisans of Gujarat.",
  };
}

function formatPrice(amount, currencyCode) {
  const symbol = currencyCode === "INR" ? "₹" : `${currencyCode} `;
  return `${symbol}${Number(amount).toLocaleString("en-IN")}`;
}

export default async function ProductPage({ params }) {
  const product = await getProductByHandle(params.handle);
  if (!product) notFound();

  const images = product.images?.edges.map((e) => e.node) ?? [];
  const variants = product.variants?.edges.map((e) => e.node) ?? [];
  const price = variants[0]?.price;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-[10px] tracking-widest2 uppercase text-ink/40 mb-10"
          aria-label="Breadcrumb"
        >
          <a href="/" className="hover:text-maroon transition-colors">
            Home
          </a>
          <span aria-hidden>›</span>
          <a href="/shop" className="hover:text-maroon transition-colors">
            Shop
          </a>
          <span aria-hidden>›</span>
          <span className="text-ink/70">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — image gallery */}
          <ImageGallery images={images} />

          {/* Right — product details */}
          <div>
            <span className="text-[11px] tracking-widest2 uppercase text-maroon">
              Handcrafted in Gujarat
            </span>
            <h1 className="font-display text-3xl sm:text-4xl text-ink mt-3 leading-snug">
              {product.title}
            </h1>

            {price && (
              <p className="mt-4 text-xl text-ink font-medium">
                {formatPrice(price.amount, price.currencyCode)}
              </p>
            )}

            {product.description && (
              <p className="mt-5 text-[15px] leading-relaxed text-ink/70 max-w-md">
                {product.description}
              </p>
            )}

            <div className="mt-8 border-t border-ink/10 pt-8">
              <AddToCartButton variants={variants} />
            </div>

            {/* Care / details accordion — static for now */}
            <div className="mt-8 space-y-3 border-t border-ink/10 pt-8">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none text-[11px] tracking-widest2 uppercase text-ink/60 hover:text-ink transition-colors">
                  <span>Fabric &amp; Care</span>
                  <span className="text-ink/30 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/60">
                  Dry clean or hand wash with cold water. Do not wring. Store
                  folded in a cotton muslin bag away from direct sunlight. Each
                  piece is naturally dyed — slight variation in colour is a mark
                  of authenticity, not a flaw.
                </p>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none text-[11px] tracking-widest2 uppercase text-ink/60 hover:text-ink transition-colors">
                  <span>Shipping</span>
                  <span className="text-ink/30 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/60">
                  Free shipping across India on all orders. International
                  shipping available. Orders are dispatched within 2–3 business
                  days.
                </p>
              </details>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
