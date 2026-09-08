"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/cart-context";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cart, openCart } = useCart();
  const router = useRouter();
  const inputRef = useRef(null);

  function openSearch() {
    setIsSearchOpen(true);
    setSearchTerm("");
    // Focus the input after the transition renders
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function closeSearch() {
    setIsSearchOpen(false);
    setSearchTerm("");
  }

  function submitSearch(e) {
    e?.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    closeSearch();
    router.push(`/shop?q=${encodeURIComponent(term)}`);
  }

  function handleSearchKeyDown(e) {
    if (e.key === "Escape") closeSearch();
  }

  // Mobile search: input shown inline in the mobile menu
  function submitMobileSearch(e) {
    e?.preventDefault();
    const term = searchTerm.trim();
    if (!term) {
      router.push("/shop");
    } else {
      router.push(`/shop?q=${encodeURIComponent(term)}`);
    }
    setIsMobileMenuOpen(false);
    setSearchTerm("");
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-maroon text-cream text-[11px] tracking-widest2 uppercase">
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between gap-4">
          <span className="hidden sm:block">
            Free shipping across India &middot; Bespoke orders welcome
          </span>
          <span className="italic normal-case tracking-normal text-haldi font-display text-[13px] text-center w-full sm:w-auto">
            handcrafted in Gujarat &middot; since generations
          </span>
          <span className="hidden md:block">
            Visit us in Vallabh Vidyanagar
          </span>
        </div>
      </div>

      <div className="bg-cream/95 backdrop-blur border-b border-ink/10 relative">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

          {/* Mobile Hamburger Menu Button */}
          <button
            className="md:hidden p-2 -ml-2 text-ink"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Left Navigation — hidden when search is open */}
          {!isSearchOpen && (
            <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-widest2 uppercase text-ink/80 flex-1">
              <a href="/shop" className="hover:text-maroon transition-colors">
                Shop
              </a>
              <a href="/#heritage" className="hover:text-maroon transition-colors">
                Heritage
              </a>
              <a href="/#journal" className="hover:text-maroon transition-colors">
                Journal
              </a>
              <a href="/about" className="hover:text-maroon transition-colors">
                Our Story
              </a>
              <a href="/contact" className="hover:text-maroon transition-colors">
                Visit
              </a>
            </nav>
          )}

          {/* Desktop Inline Search Input */}
          {isSearchOpen && (
            <form
              onSubmit={submitSearch}
              className="hidden md:flex flex-1 items-center gap-3 pr-4"
            >
              {/* Backdrop click closes search */}
              <div
                className="fixed inset-0 z-[-1]"
                onClick={closeSearch}
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search sarees…"
                aria-label="Search products"
                className="flex-1 bg-transparent border-b border-ink/30 focus:border-maroon outline-none text-[13px] text-ink placeholder:text-ink/40 py-1 transition-colors"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="text-ink/60 hover:text-maroon transition-colors shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="text-ink/40 hover:text-ink transition-colors shrink-0 text-lg leading-none"
              >
                ×
              </button>
            </form>
          )}

          {/* Center Logo */}
          <a href="/" className="shrink-0 md:px-4 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Vanza Bandhej"
              width={160}
              height={64}
              className="h-10 md:h-14 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop Right — Search icon + Cart */}
          <div className="flex items-center justify-end gap-6 text-[12px] tracking-widest2 uppercase text-ink/80 flex-1">
            <div className="hidden md:flex items-center gap-6">
              {/* Search icon toggles the inline search */}
              <button
                onClick={isSearchOpen ? closeSearch : openSearch}
                aria-label="Search"
                className="hover:text-maroon transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
            </div>

            <button
              aria-label="Cart"
              className="relative hover:text-maroon transition-colors p-2 md:p-0 -mr-2 md:mr-0"
              onClick={openCart}
            >
              <svg width="20" height="20" className="md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 8h12l-1 12H7L6 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <span className="absolute top-0 right-0 md:-top-2 md:-right-2 bg-maroon text-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {cart?.totalQuantity ?? 0}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-cream md:hidden overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10">
            <a href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="/logo.png"
                alt="Vanza Bandhej"
                width={120}
                height={48}
                className="h-9 w-auto object-contain"
              />
            </a>
            <button
              className="p-2 -mr-2 text-ink"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col px-6 py-8 text-[14px] tracking-widest2 uppercase text-ink">
            <a href="/shop" className="py-4 border-b border-ink/5" onClick={() => setIsMobileMenuOpen(false)}>
              Shop
            </a>
            <a href="/#heritage" className="py-4 border-b border-ink/5" onClick={() => setIsMobileMenuOpen(false)}>
              Heritage
            </a>
            <a href="/#journal" className="py-4 border-b border-ink/5" onClick={() => setIsMobileMenuOpen(false)}>
              Journal
            </a>
            <a href="/about" className="py-4 border-b border-ink/5" onClick={() => setIsMobileMenuOpen(false)}>
              Our Story
            </a>
            <a href="/contact" className="py-4 border-b border-ink/5" onClick={() => setIsMobileMenuOpen(false)}>
              Visit
            </a>
          </nav>

          {/* Mobile search */}
          <div className="px-6 py-6 border-t border-ink/5">
            <form onSubmit={submitMobileSearch} className="flex items-center gap-3">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search sarees…"
                aria-label="Search products"
                className="flex-1 bg-transparent border-b border-ink/20 focus:border-maroon outline-none text-[13px] text-ink placeholder:text-ink/40 py-2 transition-colors"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="text-ink/60 hover:text-maroon transition-colors shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
