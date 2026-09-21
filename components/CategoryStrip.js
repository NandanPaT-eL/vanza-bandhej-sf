const categories = [
  {
    label: "Wedding Season",
    sub: "Bridal & festive",
    href: "/shop?tag=bridal",
    fabric: "fabric-sindoor",
  },
  {
    label: "Daily Wear",
    sub: "Lightweight cottons",
    href: "/shop?tag=cotton",
    fabric: "fabric-haldi",
  },
  {
    label: "Silk Bandhani",
    sub: "Gaji & pure silk",
    href: "/shop?type=Silk+Saree",
    fabric: "fabric-kholna",
  },
  {
    label: "Natural Dyes",
    sub: "Haldi, madder, indigo",
    href: "/shop?tag=natural-dye",
    fabric: "fabric-kesari",
  },
  {
    label: "Gifting",
    sub: "Curated for loved ones",
    href: "/shop?tag=gift",
    fabric: "fabric-neel",
  },
];

export default function CategoryStrip() {
  return (
    <section className="py-12 md:py-16 bg-cream-dark border-t border-b border-ink/[0.08]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between mb-8">
          <span className="text-[11px] tracking-widest2 uppercase text-maroon">
            Shop by category
          </span>
          <a
            href="/shop"
            className="text-[11px] tracking-widest2 uppercase text-ink/50 hover:text-maroon transition-colors"
          >
            View all →
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <a
              key={cat.label}
              href={cat.href}
              className="category-tile group block rounded-sm overflow-hidden"
            >
              {/* Swatch / image tile */}
              <div
                className={`fabric ${cat.fabric} h-32 sm:h-40 transition-transform duration-400 group-hover:scale-[1.04]`}
              />

              {/* Label row */}
              <div className="bg-[#f3e9d3] px-3 py-2.5">
                <p className="font-display text-[0.95rem] leading-snug text-ink group-hover:text-maroon transition-colors">
                  {cat.label}
                </p>
                <p className="text-[9px] tracking-widest2 uppercase text-ink/45 mt-0.5">
                  {cat.sub}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
