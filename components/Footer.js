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
            {["Instagram", "Pinterest", "Email"].map((label) => (
              <span
                key={label}
                aria-label={label}
                className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center text-[10px]"
              >
                {label[0]}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] tracking-widest2 uppercase text-cream/40 mb-4">
            Shop
          </h4>
          <ul className="space-y-2.5 text-[13px]">
            {["Sindoor Edit", "Gharchola", "Everyday Cotton", "Bridal", "Gift Cards"].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="hover:text-haldi transition-colors">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] tracking-widest2 uppercase text-cream/40 mb-4">
            The house
          </h4>
          <ul className="space-y-2.5 text-[13px]">
            {["Our Story", "The Craft", "Artisans", "Journal", "Sustainability"].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="hover:text-haldi transition-colors">
                    {item}
                  </a>
                </li>
              )
            )}
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
            href="#"
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
            <a href="#" className="hover:text-cream transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-cream transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-cream transition-colors">
              Shipping
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
