"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SORT_OPTIONS = [
  { label: "Newest", sortKey: "CREATED_AT", reverse: true },
  { label: "Price: Low to High", sortKey: "PRICE", reverse: false },
  { label: "Price: High to Low", sortKey: "PRICE", reverse: true },
  { label: "Best Selling", sortKey: "BEST_SELLING", reverse: false },
];

export default function ShopFilters({
  allProducts,
  collections = [],
  availableTypes = [],
  availableTags = [],
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentSort = searchParams.get("sort") ?? "CREATED_AT:true";
  const currentInStock = searchParams.get("inStock") === "true";
  const currentMinPrice = Number(searchParams.get("minPrice") ?? 0);
  const currentMaxPrice = Number(searchParams.get("maxPrice") ?? 999999);
  const currentCollection = searchParams.get("collection") ?? "";
  const currentType = searchParams.get("type") ?? "";
  const currentTags = searchParams.getAll("tag");

  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

  /** Update a single param, preserving all others (including q). */
  function updateParam(key, value) {
    // Spread all existing params (including q) so nothing is dropped
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "" || value === false) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  /** Toggle a collection — clicking active collection deselects it. */
  function toggleCollection(handle) {
    const params = new URLSearchParams(searchParams.toString());
    if (currentCollection === handle) {
      params.delete("collection");
    } else {
      params.set("collection", handle);
      // Collection filter overrides type / tag Shopify filters
      params.delete("type");
      params.delete("tag");
    }
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  /** Toggle a product type — clicking active type deselects it. */
  function toggleType(type) {
    const params = new URLSearchParams(searchParams.toString());
    if (currentType === type) {
      params.delete("type");
    } else {
      params.set("type", type);
      // Type filter can't be combined with collection
      params.delete("collection");
    }
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  /** Toggle a tag — multi-select. */
  function toggleTag(tag) {
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.getAll("tag");
    params.delete("tag");
    if (existing.includes(tag)) {
      existing.filter((t) => t !== tag).forEach((t) => params.append("tag", t));
    } else {
      [...existing, tag].forEach((t) => params.append("tag", t));
      // Tags can't be combined with collection filter
      params.delete("collection");
    }
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  function applyPriceFilter() {
    // Spread all existing params (including q) so nothing is dropped
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice > 0) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    if (maxPrice < 999999) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  return (
    <aside className="space-y-8">

      {/* Sort */}
      <div>
        <h3 className="text-[10px] tracking-widest2 uppercase text-ink/50 mb-3">
          Sort by
        </h3>
        <select
          value={currentSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="w-full bg-cream border border-ink/20 rounded-full px-4 py-2.5 text-[12px] text-ink tracking-wide focus:outline-none focus:border-maroon cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => {
            const val = `${o.sortKey}:${o.reverse}`;
            return (
              <option key={val} value={val}>
                {o.label}
              </option>
            );
          })}
        </select>
      </div>

      {/* Collections */}
      {collections.length > 0 && (
        <div>
          <h3 className="text-[10px] tracking-widest2 uppercase text-ink/50 mb-3">
            Collections
          </h3>
          <div className="flex flex-wrap gap-2">
            {collections.map((c) => (
              <button
                key={c.handle}
                onClick={() => toggleCollection(c.handle)}
                className={`px-3 py-1.5 rounded-full border text-[11px] tracking-wide transition-colors ${
                  currentCollection === c.handle
                    ? "border-maroon bg-maroon text-cream"
                    : "border-ink/20 text-ink/70 hover:border-maroon hover:text-maroon"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Type */}
      {availableTypes.length > 0 && (
        <div>
          <h3 className="text-[10px] tracking-widest2 uppercase text-ink/50 mb-3">
            Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-3 py-1.5 rounded-full border text-[11px] tracking-wide transition-colors ${
                  currentType === type
                    ? "border-maroon bg-maroon text-cream"
                    : "border-ink/20 text-ink/70 hover:border-maroon hover:text-maroon"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {availableTags.length > 0 && (
        <div>
          <h3 className="text-[10px] tracking-widest2 uppercase text-ink/50 mb-3">
            Tags
          </h3>
          <div className="space-y-2">
            {availableTags.map((tag) => {
              const active = currentTags.includes(tag);
              return (
                <label
                  key={tag}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <div className="relative shrink-0">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={active}
                      onChange={() => toggleTag(tag)}
                    />
                    <div
                      className={`w-4 h-4 rounded border transition-colors ${
                        active
                          ? "border-maroon bg-maroon"
                          : "border-ink/30 bg-cream group-hover:border-maroon"
                      }`}
                    />
                    {active && (
                      <svg
                        className="absolute inset-0 m-auto w-2.5 h-2.5 text-cream"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[12px] text-ink/70 group-hover:text-ink transition-colors capitalize">
                    {tag}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Availability */}
      <div>
        <h3 className="text-[10px] tracking-widest2 uppercase text-ink/50 mb-3">
          Availability
        </h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={currentInStock}
              onChange={(e) =>
                updateParam("inStock", e.target.checked ? "true" : null)
              }
            />
            <div
              className={`w-9 h-5 rounded-full transition-colors ${
                currentInStock ? "bg-maroon" : "bg-ink/20"
              }`}
            />
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-cream shadow transition-transform ${
                currentInStock ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </div>
          <span className="text-[12px] text-ink/70 group-hover:text-ink transition-colors">
            In stock only
          </span>
        </label>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-[10px] tracking-widest2 uppercase text-ink/50 mb-3">
          Price range
        </h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min={0}
            value={minPrice || ""}
            onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
            placeholder="Min"
            className="w-full bg-cream border border-ink/20 rounded-full px-3 py-2 text-[12px] text-ink focus:outline-none focus:border-maroon"
          />
          <span className="text-ink/30 text-sm shrink-0">–</span>
          <input
            type="number"
            min={0}
            value={maxPrice >= 999999 ? "" : maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value) || 999999)}
            placeholder="Max"
            className="w-full bg-cream border border-ink/20 rounded-full px-3 py-2 text-[12px] text-ink focus:outline-none focus:border-maroon"
          />
        </div>
        <button
          onClick={applyPriceFilter}
          className="mt-3 text-[10px] tracking-widest2 uppercase text-maroon hover:text-maroon-dark transition-colors"
        >
          Apply →
        </button>
      </div>
    </aside>
  );
}
