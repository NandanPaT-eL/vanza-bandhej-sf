"use client";

import Image from "next/image";
import { useCart } from "@/app/cart-context";

function formatPrice(amount, currencyCode) {
  const symbol = currencyCode === "INR" ? "₹" : `${currencyCode} `;
  return `${symbol}${Number(amount).toLocaleString("en-IN")}`;
}

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeItem } = useCart();

  const items = cart?.items ?? [];
  const subtotal = cart?.subtotal ?? { amount: "0", currencyCode: "INR" };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[150] bg-ink/40 backdrop-blur-sm"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-[200] h-full w-full max-w-md bg-cream flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
          <h2 className="font-display text-xl text-ink">
            Your <span className="italic text-maroon">Cart</span>
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-ink/50 hover:text-ink transition-colors p-1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Line items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-ink/20"
              >
                <path d="M6 8h12l-1 12H7L6 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <p className="text-[13px] text-ink/50 tracking-wide">
                Your cart is empty.
              </p>
              <button
                onClick={closeCart}
                className="text-[11px] tracking-widest2 uppercase text-maroon hover:text-maroon-dark transition-colors"
              >
                Continue shopping →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                {/* Thumbnail */}
                <div className="relative w-20 h-24 shrink-0 rounded-sm overflow-hidden bg-cream-dark">
                  {item.image ? (
                    <Image
                      src={item.image.url}
                      alt={item.image.altText || item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="fabric fabric-sindoor w-full h-full" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-ink leading-snug line-clamp-2">
                    {item.title}
                  </p>
                  {item.variantTitle && item.variantTitle !== "Default Title" && (
                    <p className="text-[11px] text-ink/50 mt-0.5 tracking-wide">
                      {item.variantTitle}
                    </p>
                  )}
                  <p className="text-[13px] text-maroon mt-1">
                    {formatPrice(item.price.amount, item.price.currencyCode)}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty controls */}
                    <div className="flex items-center border border-ink/15 rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 flex items-center justify-center text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-[12px] text-ink tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="w-7 h-7 flex items-center justify-center text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.title}`}
                      className="text-[10px] tracking-widest2 uppercase text-ink/40 hover:text-sindoor transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer — subtotal + checkout */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-ink/10 space-y-4">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-ink/60 tracking-wide">Subtotal</span>
              <span className="font-medium text-ink">
                {formatPrice(subtotal.amount, subtotal.currencyCode)}
              </span>
            </div>
            <p className="text-[10px] text-ink/40 tracking-wide -mt-1">
              Shipping &amp; taxes calculated at checkout
            </p>
            <button
              onClick={() => {
                if (cart?.checkoutUrl) {
                  window.location.href = cart.checkoutUrl;
                }
              }}
              className="w-full bg-maroon text-cream rounded-full py-3.5 text-[12px] tracking-widest2 uppercase hover:bg-maroon-dark transition-colors"
            >
              Checkout →
            </button>
            <button
              onClick={closeCart}
              className="w-full text-[11px] tracking-widest2 uppercase text-ink/50 hover:text-ink transition-colors py-1"
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
