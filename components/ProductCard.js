"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/app/cart-context";

const FALLBACK_SWATCHES = [
  "fabric-sindoor",
  "fabric-haldi",
  "fabric-neel",
  "fabric-kesari",
  "fabric-kholna",
];

function formatPrice(amount, currencyCode) {
  const symbol = currencyCode === "INR" ? "₹" : `${currencyCode} `;
  return `${symbol}${Number(amount).toLocaleString("en-IN")}`;
}

/**
 * Standard e-commerce product card.
 * - Image fills the top portion (aspect-ratio: 3/4 portrait)
 * - Clean cream panel below with type label, title, price
 * - Hover: "Add to Bag" button slides up over the image bottom edge
 * - Wishlist heart in image top-right
 *
 * Props:
 *   product  — Shopify product object from getProducts / getCollectionProducts
 *   index    — used to pick a fallback swatch colour
 *   priority — passed to next/image for LCP images
 */
export default function ProductCard({ product, index = 0, priority = false }) {
  const { addItem } = useCart();
  const [wished, setWished] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const price = product.priceRange?.minVariantPrice;
  const swatch = FALLBACK_SWATCHES[index % FALLBACK_SWATCHES.length];
  const available = product.availableForSale !== false;

  // Use the first variant for quick-add (single variant products)
  const firstVariantId = product.variants?.edges?.[0]?.node?.id ?? null;

  async function handleQuickAdd(e) {
    e.preventDefault(); // don't navigate
    if (!firstVariantId || !available || adding) return;
    setAdding(true);
    try {
      await addItem(firstVariantId, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setAdding(false);
    }
  }

  function handleWishlist(e) {
    e.preventDefault();
    setWished((w) => !w);
  }

  return (
    <a
      href={`/products/${product.handle}`}
      className="product-card group block rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {/* ── Image container ── */}
      <div className="product-card__image relative" style={{ aspectRatio: "3/4" }}>
        {/* Fallback swatch or real photo */}
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          <div className={`fabric ${swatch} w-full h-full`} />
        )}

        {/* Sold out badge */}
        {!available && (
          <span className="absolute top-3 left-3 bg-ink/70 text-cream text-[9px] tracking-widest2 uppercase px-2.5 py-1 rounded-full z-10">
            Sold out
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-cream/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-cream"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={wished ? "#5C0F1B" : "none"}
            stroke="#5C0F1B"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick-add button — slides up from image bottom on hover */}
        <div className="product-card__quick-add absolute bottom-0 left-0 right-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleQuickAdd}
            disabled={!available || adding}
            className={`w-full py-3 text-[11px] tracking-widest2 uppercase font-medium transition-colors ${
              !available
                ? "bg-ink/40 text-cream/60 cursor-not-allowed"
                : added
                ? "bg-haldi text-ink"
                : "bg-maroon text-cream hover:bg-maroon-dark"
            }`}
          >
            {adding ? "Adding…" : added ? "Added ✓" : available ? "Add to Bag" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* ── Info panel — sits below image on clean cream background ── */}
      <div className="product-card__info bg-[#f3e9d3] px-4 py-3.5">
        {/* Product type label */}
        {product.productType && (
          <span className="block text-[9px] tracking-widest2 uppercase text-ink/45 mb-1">
            {product.productType}
          </span>
        )}

        {/* Title */}
        <h3 className="font-display text-[1.05rem] leading-snug text-ink group-hover:text-maroon transition-colors">
          {product.title}
        </h3>

        {/* Price row */}
        <div className="flex items-center justify-between mt-2">
          {price ? (
            <p className="text-[14px] font-medium text-ink">
              {formatPrice(price.amount, price.currencyCode)}
            </p>
          ) : (
            <span />
          )}
          <span className="text-[10px] tracking-widest2 uppercase text-maroon group-hover:underline">
            View →
          </span>
        </div>
      </div>
    </a>
  );
}
