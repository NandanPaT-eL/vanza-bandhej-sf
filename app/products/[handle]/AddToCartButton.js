"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/cart-context";

const WA_NUMBER = "919825000000";

function formatPrice(amount, currencyCode) {
  const symbol = currencyCode === "INR" ? "₹" : `${currencyCode} `;
  return `${symbol}${Number(amount).toLocaleString("en-IN")}`;
}

export default function AddToCartButton({
  variants = [],
  productTitle = "",
  productHandle = "",
}) {
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants[0]?.id ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) || variants[0];
  const available = selectedVariant?.availableForSale !== false;
  const currentPrice = selectedVariant?.price;

  // Track scroll position to reveal sticky bottom bar on mobile
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      // Show sticky bar once user scrolls past 520px
      setShowStickyBar(scrollY > 520);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleAddToCart() {
    if (!selectedVariantId || !available || loading) return;
    setLoading(true);
    try {
      await addItem(selectedVariantId, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2200);
    } finally {
      setLoading(false);
    }
  }

  // Pre-filled WhatsApp inquiry link
  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://vanzabandhej.com/products/${productHandle}`;
  const waMessage = encodeURIComponent(
    `Hello Vanza Bandhej, I am interested in "${productTitle}" (${currentUrl}). Could you please share more details?`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <div className="space-y-6">
      {/* ── Variant / Size Selector (Pills) ── */}
      {(variants.length > 1 ||
        (variants.length === 1 && variants[0]?.title !== "Default Title")) && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-[11px] tracking-widest2 uppercase font-medium text-ink/70">
              Select Option / Size
            </label>
            <span className="text-[10px] uppercase tracking-wider text-ink/40">
              {available ? "In Stock · Ready to ship" : "Currently Unavailable"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {variants.map((v) => {
              const isSelected = v.id === selectedVariantId;
              const isAvailable = v.availableForSale !== false;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariantId(v.id)}
                  disabled={!isAvailable}
                  className={`px-4 py-2.5 rounded-sm border text-[12px] tracking-wide font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? "border-maroon bg-maroon text-cream shadow-sm"
                      : isAvailable
                      ? "border-ink/20 text-ink bg-cream hover:border-maroon/60 hover:text-maroon"
                      : "border-ink/10 text-ink/30 bg-ink/5 line-through cursor-not-allowed"
                  }`}
                >
                  <span>{v.title}</span>
                  {isSelected && <span className="text-[10px] text-cream/75">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Quantity Selector & Action Controls ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Quantity Stepper */}
        <div className="flex items-center justify-between sm:justify-start border border-ink/20 rounded-sm bg-cream px-1 h-12 w-full sm:w-36 shrink-0">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1 || !available}
            aria-label="Decrease quantity"
            className="w-10 h-10 flex items-center justify-center text-ink/60 hover:text-ink hover:bg-ink/5 rounded-sm transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <span className="text-lg leading-none">−</span>
          </button>
          <span className="flex-1 text-center text-[13px] font-medium text-ink tabular-nums">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            disabled={!available}
            aria-label="Increase quantity"
            className="w-10 h-10 flex items-center justify-center text-ink/60 hover:text-ink hover:bg-ink/5 rounded-sm transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <span className="text-lg leading-none">+</span>
          </button>
        </div>

        {/* Primary CTA: Add to Bag */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={loading || !available}
          className={`flex-1 h-12 px-8 rounded-sm text-[11px] tracking-widest2 uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99] ${
            !available
              ? "bg-ink/15 text-ink/40 cursor-not-allowed"
              : added
              ? "bg-[#256847] text-white"
              : "bg-maroon hover:bg-maroon-dark text-cream shadow-maroon/20 hover:shadow-md"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-cream"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Adding to Bag…</span>
            </>
          ) : added ? (
            <>
              <span>✓ Added to Bag</span>
            </>
          ) : available ? (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>Add to Bag</span>
            </>
          ) : (
            "Out of Stock"
          )}
        </button>
      </div>

      {/* ── Secondary CTA: WhatsApp Stylist Consultation ── */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-11 border border-ink/20 hover:border-maroon/50 rounded-sm bg-cream hover:bg-[#FAF6ED] text-ink/80 hover:text-ink text-[11px] tracking-widest2 uppercase font-medium transition-all duration-200 flex items-center justify-center gap-2 group"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#25D366"
          className="shrink-0 group-hover:scale-110 transition-transform"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span>Enquire / Custom Order via WhatsApp</span>
      </a>

      {/* ── Mobile Sticky Bottom Bar (Slides in when scrolling down on phone) ── */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-[150] bg-cream/95 backdrop-blur-md border-t border-ink/10 px-4 py-3 transition-transform duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-ink truncate font-display">
              {productTitle}
            </p>
            {currentPrice && (
              <p className="text-[13px] font-semibold text-maroon">
                {formatPrice(currentPrice.amount, currentPrice.currencyCode)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={loading || !available}
            className={`px-6 py-2.5 rounded-sm text-[11px] tracking-widest2 uppercase font-medium shrink-0 transition-colors ${
              !available
                ? "bg-ink/15 text-ink/40"
                : added
                ? "bg-[#256847] text-white"
                : "bg-maroon text-cream active:bg-maroon-dark"
            }`}
          >
            {added ? "Added ✓" : available ? "Add to Bag" : "Sold Out"}
          </button>
        </div>
      </div>
    </div>
  );
}
