export default function Footer() {
  return (
    <footer className="bg-bark text-cream/70">
      <div className="mx-auto max-w-7xl px-6 py-16 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-2xl text-cream">
            Vanza <span className="italic text-haldi">Bandhej</span>
          </div>
          <div className="text-[9px] tracking-widest2 uppercase text-cream/40 mt-1">
            Elegance of Bandhej
          </div>
          <p className="text-[13px] leading-relaxed mt-4 max-w-xs">
            A home for authentic bandhani &mdash; every dot tied by hand, every
            colour steeped in tradition, straight from the artisans of
            Gujarat.
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href="https://www.instagram.com/vanzabandhejanand"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center hover:border-haldi hover:text-haldi transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/19NFNwyqQt/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center hover:border-haldi hover:text-haldi transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] tracking-widest2 uppercase text-cream/40 mb-4">
            Shop
          </h4>
          <ul className="space-y-2.5 text-[13px]">
            {[
              { label: "Sindoor Edit", href: "/shop?collection=sindoor-edit" },
              { label: "Gharchola", href: "/shop" },
              { label: "Everyday Cotton", href: "/shop" },
              { label: "Bridal", href: "/shop" },
            ].map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-haldi transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] tracking-widest2 uppercase text-cream/40 mb-4">
            The house
          </h4>
          <ul className="space-y-2.5 text-[13px]">
            {[
              { label: "Our Story", href: "/about" },
              { label: "The Craft", href: "/#craft" },
              { label: "Artisans", href: "/about" },
              { label: "Journal", href: "/#journal" },
              { label: "Sustainability", href: "/about" },
            ].map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-haldi transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] tracking-widest2 uppercase text-cream/40 mb-4">
            Visit the store
          </h4>
          <p className="text-[13px] leading-relaxed">
            C-4, Royal Invention,
            <br />
            Near Vrundavan Ground,
            <br />
            AV Road, Vallabh Vidyanagar,
            <br />
            Anand, Gujarat 388001
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=C-4+Royal+Invention+Near+Vrundavan+Ground+AV+Road+Vallabh+Vidyanagar+Anand+Gujarat+388001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-[11px] tracking-widest2 uppercase text-haldi hover:text-cream transition-colors"
          >
            Get directions
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-cream/40">
          <span>&copy; 2026 Vanza Bandhej &middot; Made with heart in Gujarat</span>
          <span className="font-display italic text-haldi/80">
            tied by hand, worn with heart.
          </span>
          <span className="flex gap-4">
            <a href="/privacy" className="hover:text-cream transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-cream transition-colors">
              Terms
            </a>
            <a href="/shipping" className="hover:text-cream transition-colors">
              Shipping
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
