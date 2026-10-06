"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/cart-context";

// ─── Mega-menu data ─────────────────────────────────────────────────────────
// Each column is a group of links. href values map to /shop?<param>=<value>
// so the shop page can filter by collection handle, tag, or type.
const SHOP_MENU = [
  {
    group: "By Product",
    links: [
      { label: "All Sarees",    href: "/shop" },
      { label: "Dupattas",      href: "/shop?collection=dupattas" },
      { label: "Lehengas",      href: "/shop?collection=lehengas" },
      { label: "Dress Material",href: "/shop?collection=dress-material" },
    ],
  },
  {
    group: "By Fabric",
    links: [
      { label: "Gaji Silk",       href: "/shop?collection=gaji-silk" },
      { label: "Pure Silk",       href: "/shop?collection=pure-silk" },
      { label: "Georgette",       href: "/shop?collection=georgette" },
      { label: "Cotton Bandhani", href: "/shop?collection=cotton-bandhani" },
      { label: "Rai-dana bandhej", href: "/shop?collection=chanderi" },
    ],
  },
  {
    group: "By Occasion",
    links: [
      { label: "Wedding",          href: "/shop?collection=bridal-wedding" },
      { label: "Festive",          href: "/shop?collection=festive" },
      { label: "Daily Wear",       href: "/shop?collection=daily-wear" },
      { label: "Fusion Wear",      href: "/shop?collection=office-wear" },
      { label: "Gifting",          href: "/shop?collection=gifting" },
    ],
  },
  {
    group: "Collections",
    links: [
      { label: "New Arrivals",    href: "/shop?collection=new-arrivals" },
      { label: "The Sindoor Edit",href: "/shop?collection=sindoor-edit" },
      { label: "Natural Dyes",    href: "/shop?collection=natural-dyes" },
      { label: "Best Sellers",    href: "/shop?collection=best-sellers" },
      { label: "Under ₹5,000",    href: "/shop?maxPrice=5000" },
    ],
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen]   = useState(false);
  const [isSearchOpen, setIsSearchOpen]           = useState(false);
  const [searchTerm, setSearchTerm]               = useState("");
  // Shop mega-menu open on desktop
  const [isShopMenuOpen, setIsShopMenuOpen]       = useState(false);
  // Mobile: which accordion section is expanded
  const [mobileShopOpen, setMobileShopOpen]       = useState(false);
  const shopMenuTimeout                           = useRef(null);

  const { cart, openCart } = useCart();
  const router             = useRouter();
  const inputRef           = useRef(null);

  // ── Search helpers ──────────────────────────────────────────────────────
  function openSearch() {
    setIsSearchOpen(true);
    setSearchTerm("");
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
  function submitMobileSearch(e) {
    e?.preventDefault();
    const term = searchTerm.trim();
    router.push(term ? `/shop?q=${encodeURIComponent(term)}` : "/shop");
    setIsMobileMenuOpen(false);
    setSearchTerm("");
  }

  // ── Shop mega-menu hover helpers (desktop) ───────────────────────────────
  function onShopEnter() {
    clearTimeout(shopMenuTimeout.current);
    setIsShopMenuOpen(true);
  }
  function onShopLeave() {
    shopMenuTimeout.current = setTimeout(() => setIsShopMenuOpen(false), 150);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
    setMobileShopOpen(false);
  }

  return (
    <header className="sticky top-0 z-50">
      {/* ── Announcement bar ── */}
      <div className="bg-maroon text-cream text-[11px] tracking-widest2 uppercase">
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between gap-4">
          <span className="hidden sm:block">
            Free shipping across India
          </span>
          <span className="italic normal-case tracking-normal text-haldi font-display text-[13px] text-center w-full sm:w-auto">
            handcrafted in Gujarat &middot; since generations
          </span>
          <span className="hidden md:block">
            Visit us in Vallabh Vidyanagar
          </span>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div className="bg-cream/95 backdrop-blur border-b border-ink/10 relative">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -ml-2 text-ink"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* ── Desktop Left Nav ── */}
          {!isSearchOpen && (
            <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-widest2 uppercase text-ink/80 flex-1">

              {/* Shop — with mega-menu on hover */}
              <div
                className="relative"
                onMouseEnter={onShopEnter}
                onMouseLeave={onShopLeave}
              >
                <a
                  href="/shop"
                  className={`flex items-center gap-1 transition-colors ${isShopMenuOpen ? "text-maroon" : "hover:text-maroon"}`}
                >
                  Shop
                  <svg
                    width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                    className={`transition-transform duration-200 ${isShopMenuOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </a>

                {/* Mega-menu panel */}
                {isShopMenuOpen && (
                  <div className="absolute top-full left-0 mt-3 w-[720px] bg-cream border border-ink/10 shadow-2xl rounded-sm overflow-hidden z-[200]">
                    <div className="grid grid-cols-4 gap-0">
                      {SHOP_MENU.map((col, ci) => (
                        <div
                          key={col.group}
                          className={`px-6 py-6 ${ci < SHOP_MENU.length - 1 ? "border-r border-ink/8" : ""}`}
                        >
                          <p className="text-[9px] tracking-widest2 uppercase text-maroon mb-4 font-medium">
                            {col.group}
                          </p>
                          <ul className="space-y-2.5">
                            {col.links.map((link) => (
                              <li key={link.label}>
                                <a
                                  href={link.href}
                                  className="block text-[12px] normal-case tracking-wide text-ink/70 hover:text-maroon transition-colors"
                                  onClick={() => setIsShopMenuOpen(false)}
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {/* Bottom CTA bar */}
                    <div className="bg-maroon/5 border-t border-ink/8 px-6 py-3 flex items-center justify-between">
                      <span className="text-[11px] tracking-widest2 uppercase text-ink/40">
                        Handcrafted in Gujarat · Est. 1972
                      </span>
                      <a
                        href="/shop"
                        onClick={() => setIsShopMenuOpen(false)}
                        className="text-[11px] tracking-widest2 uppercase text-maroon hover:underline"
                      >
                        Browse all →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Other nav items */}
              <a href="/about" className="hover:text-maroon transition-colors">
                Our Story
              </a>
              <a href="/contact" className="hover:text-maroon transition-colors">
                Visit Us
              </a>
            </nav>
          )}

          {/* Desktop inline search */}
          {isSearchOpen && (
            <form onSubmit={submitSearch} className="hidden md:flex flex-1 items-center gap-3 pr-4">
              <div className="fixed inset-0 z-[-1]" onClick={closeSearch} aria-hidden="true" />
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
              <button type="submit" aria-label="Submit search" className="text-ink/60 hover:text-maroon transition-colors shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
              <button type="button" onClick={closeSearch} aria-label="Close search" className="text-ink/40 hover:text-ink transition-colors shrink-0 text-lg leading-none">
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

          {/* Right — search + cart */}
          <div className="flex items-center justify-end gap-6 text-[12px] tracking-widest2 uppercase text-ink/80 flex-1">
            <div className="hidden md:flex items-center gap-6">
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

      {/* ── Mobile Menu Overlay ── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-cream md:hidden overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10">
            <a href="/" className="flex items-center" onClick={closeMobileMenu}>
              <Image
                src="/logo.png"
                alt="Vanza Bandhej"
                width={120}
                height={48}
                className="h-9 w-auto object-contain"
              />
            </a>
            <button className="p-2 -mr-2 text-ink" onClick={closeMobileMenu} aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col px-6 py-6 text-[13px] tracking-widest2 uppercase text-ink">

            {/* Shop — accordion on mobile */}
            <div className="border-b border-ink/8">
              <button
                className="w-full flex items-center justify-between py-4 text-left"
                onClick={() => setMobileShopOpen((o) => !o)}
              >
                <span>Shop</span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  className={`transition-transform duration-200 ${mobileShopOpen ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {mobileShopOpen && (
                <div className="pb-4 space-y-5">
                  {SHOP_MENU.map((col) => (
                    <div key={col.group}>
                      <p className="text-[9px] tracking-widest2 uppercase text-maroon mb-2">
                        {col.group}
                      </p>
                      <ul className="space-y-2 pl-1">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              onClick={closeMobileMenu}
                              className="block text-[13px] normal-case tracking-wide text-ink/70 hover:text-maroon py-0.5"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a href="/about" className="py-4 border-b border-ink/8" onClick={closeMobileMenu}>
              Our Story
            </a>
            <a href="/contact" className="py-4 border-b border-ink/8" onClick={closeMobileMenu}>
              Visit Us
            </a>
          </nav>

          {/* Mobile search */}
          <div className="px-6 py-6 border-t border-ink/8">
            <form onSubmit={submitMobileSearch} className="flex items-center gap-3">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search sarees…"
                aria-label="Search products"
                className="flex-1 bg-transparent border-b border-ink/20 focus:border-maroon outline-none text-[13px] text-ink placeholder:text-ink/40 py-2 transition-colors"
              />
              <button type="submit" aria-label="Submit search" className="text-ink/60 hover:text-maroon transition-colors shrink-0">
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
