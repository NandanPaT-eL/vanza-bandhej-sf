export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-maroon text-cream text-[11px] tracking-widest2 uppercase">
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between gap-4">
          <span className="hidden sm:block">
            Free shipping across India &middot; Bespoke orders welcome
          </span>
          <span className="italic normal-case tracking-normal text-haldi font-display text-[13px]">
            handcrafted in Gujarat &middot; since generations
          </span>
          <span className="hidden md:block">
            Visit us in Vallabh Vidyanagar
          </span>
        </div>
      </div>

      <div className="bg-cream/95 backdrop-blur border-b border-ink/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-widest2 uppercase text-ink/80">
            <a href="#collections" className="hover:text-maroon transition-colors">
              Collections
            </a>
            <a href="#heritage" className="hover:text-maroon transition-colors">
              Heritage
            </a>
            <a href="#craft" className="hover:text-maroon transition-colors">
              The Craft
            </a>
            <a href="#journal" className="hover:text-maroon transition-colors">
              Journal
            </a>
          </nav>

          <a href="#top" className="text-center leading-none mx-auto md:mx-0">
            <div className="font-display text-2xl text-ink">
              Vanza <span className="italic text-maroon">Bandhej</span>
            </div>
            <div className="text-[9px] tracking-widest2 uppercase text-ink/50 mt-1">
              Elegance of Bandhej
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6 text-[12px] tracking-widest2 uppercase text-ink/80">
            <a href="#our-story" className="hover:text-maroon transition-colors">
              Our Story
            </a>
            <a href="#visit" className="hover:text-maroon transition-colors">
              Visit
            </a>
            <button aria-label="Search" className="hover:text-maroon transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <button aria-label="Account" className="hover:text-maroon transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c1.8-4 5-6 8-6s6.2 2 8 6" />
              </svg>
            </button>
            <button aria-label="Cart" className="relative hover:text-maroon transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 8h12l-1 12H7L6 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-maroon text-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
