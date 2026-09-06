"use client";

import { useState } from "react";
import { useCart } from "@/app/cart-context";

export default function AddToCartButton({ variants }) {
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants[0]?.id ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const selectedVariant = variants.find((v) => v.id === selectedVariantId);
  const available = selectedVariant?.availableForSale !== false;

  async function handleAddToCart() {
    if (!selectedVariantId || !available) return;
    setLoading(true);
    try {
      await addItem(selectedVariantId, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Variant selector — only show if there's more than one, or if the single one is not "Default Title" */}
      {(variants.length > 1 ||
        (variants.length === 1 && variants[0].title !== "Default Title")) && (
        <div>
          <label className="block text-[10px] tracking-widest2 uppercase text-ink/50 mb-2">
            Size / Variant
          </label>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantId(v.id)}
                disabled={!v.availableForSale}
                className={`px-4 py-2 rounded-full border text-[12px] tracking-wide transition-colors ${
                  v.id === selectedVariantId
                    ? "border-maroon bg-maroon text-cream"
                    : v.availableForSale
                    ? "border-ink/20 text-ink hover:border-maroon hover:text-maroon"
                    : "border-ink/10 text-ink/30 line-through cursor-not-allowed"
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity selector */}
      <div>
        <label className="block text-[10px] tracking-widest2 uppercase text-ink/50 mb-2">
          Quantity
        </label>
        <div className="flex items-center border border-ink/20 rounded-full w-fit overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="w-9 h-9 flex items-center justify-center text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors"
          >
            −
          </button>
          <span className="w-8 text-center text-[14px] text-ink tabular-nums">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="w-9 h-9 flex items-center justify-center text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={loading || !available}
        className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-3.5 rounded-full text-[12px] tracking-widest2 uppercase transition-colors ${
          !available
            ? "bg-ink/10 text-ink/40 cursor-not-allowed"
            : added
            ? "bg-haldi text-ink"
            : "bg-maroon text-cream hover:bg-maroon-dark"
        }`}
      >
        {loading ? "Adding…" : added ? "Added ✓" : available ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
