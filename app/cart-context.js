"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "vanza_cart_id";

/** Normalise a raw Shopify cart response into a clean shape. */
function normaliseCart(shopifyCart) {
  if (!shopifyCart) return null;
  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    totalQuantity: shopifyCart.totalQuantity ?? 0,
    subtotal: shopifyCart.cost?.subtotalAmount ?? { amount: "0", currencyCode: "INR" },
    items: (shopifyCart.lines?.edges ?? []).map(({ node }) => ({
      id: node.id,
      merchandiseId: node.merchandise?.id,
      quantity: node.quantity,
      title: node.merchandise?.product?.title ?? "",
      variantTitle: node.merchandise?.title ?? "",
      price: node.merchandise?.price ?? { amount: "0", currencyCode: "INR" },
      image: node.merchandise?.product?.featuredImage ?? null,
    })),
  };
}

// ---------------------------------------------------------------------------
// Internal API helpers — all traffic goes through Next.js Route Handlers so
// process.env secrets never reach the browser bundle.
// ---------------------------------------------------------------------------

async function apiPost(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `API error ${res.status}`);
  return json;
}

async function apiGet(url) {
  const res = await fetch(url);
  if (res.status === 404) return null;
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `API error ${res.status}`);
  return json;
}

async function apiPatch(url, body) {
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `API error ${res.status}`);
  return json;
}

async function apiDelete(url, body) {
  const res = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `API error ${res.status}`);
  return json;
}

/** Encode a Shopify GID for use in a URL path segment. */
function encodeId(id) {
  return encodeURIComponent(id);
}

// ---------------------------------------------------------------------------
// CartProvider
// ---------------------------------------------------------------------------

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Rehydrate from Shopify on first mount via the server-side GET route
  useEffect(() => {
    const savedId =
      typeof window !== "undefined"
        ? localStorage.getItem(CART_STORAGE_KEY)
        : null;
    if (!savedId) return;
    apiGet(`/api/cart/${encodeId(savedId)}`)
      .then((raw) => {
        if (raw) {
          setCart(normaliseCart(raw));
        } else {
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      })
      .catch(() => localStorage.removeItem(CART_STORAGE_KEY));
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  /**
   * Add a variant to the cart (or create a new cart if none exists).
   * Opens the drawer after adding.
   */
  const addItem = useCallback(
    async (merchandiseId, quantity = 1) => {
      let minimal;
      if (cart?.id) {
        // Add to existing cart
        minimal = await apiPost(`/api/cart/${encodeId(cart.id)}/lines`, {
          merchandiseId,
          quantity,
        });
      } else {
        // Create new cart
        minimal = await apiPost("/api/cart", { merchandiseId, quantity });
        localStorage.setItem(CART_STORAGE_KEY, minimal.id);
      }
      // Re-fetch full cart so we have images, titles, etc.
      const full = await apiGet(`/api/cart/${encodeId(minimal.id)}`);
      setCart(normaliseCart(full));
      setIsOpen(true);
    },
    [cart]
  );

  /** Update the quantity of a line item (removes it if quantity reaches 0). */
  const updateQuantity = useCallback(
    async (lineId, quantity) => {
      if (!cart?.id) return;
      if (quantity < 1) {
        const raw = await apiDelete(`/api/cart/${encodeId(cart.id)}/lines`, { lineId });
        setCart(normaliseCart(raw));
        return;
      }
      const raw = await apiPatch(`/api/cart/${encodeId(cart.id)}/lines`, {
        lineId,
        quantity,
      });
      setCart(normaliseCart(raw));
    },
    [cart]
  );

  /** Remove a line item from the cart. */
  const removeItem = useCallback(
    async (lineId) => {
      if (!cart?.id) return;
      const raw = await apiDelete(`/api/cart/${encodeId(cart.id)}/lines`, { lineId });
      setCart(normaliseCart(raw));
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, isOpen, openCart, closeCart, addItem, updateQuantity, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

/** Convenience hook — throws if used outside <CartProvider>. */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
