"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">

      {/* ══════════════════════════════════════════
          MOBILE HERO — full-bleed image with overlay text
          Hidden on md+ (desktop gets a 2-col layout below)
          ══════════════════════════════════════════ */}
      <div className="relative md:hidden h-[100svh] min-h-[600px] max-h-[900px]">
        {/* Background image — fills the whole viewport height */}
        <Image
          src="/home.JPG"
          alt="Handcrafted bandhani saree — Vanza Bandhej"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        {/* Dark gradient — bottom-heavy so text pops */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />

        {/* "Since 1972" badge — top right */}
        <div className="absolute top-5 right-5 z-10 bg-haldi text-ink rounded-full w-16 h-16 flex flex-col items-center justify-center text-center shadow-lg">
          <span className="text-[7px] tracking-widest uppercase">Since</span>
          <span className="font-display text-sm leading-none">1972</span>
          <span className="text-[6px] tracking-widest uppercase mt-0.5">Craft</span>
        </div>

        {/* New arrivals pill — top left */}
        <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-1.5 text-[9px] tracking-widest uppercase text-cream bg-cream/15 backdrop-blur-sm border border-cream/20 px-2.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-haldi animate-pulse" />
          New arrivals
        </div>

        {/* Bottom text block */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-8 pt-12">
          <span className="text-[10px] tracking-widest uppercase text-haldi block mb-3">
            Handcrafted in Gujarat · Est. 1972
          </span>

          <h1 className="font-display text-[2.4rem] leading-[1.06] text-cream">
            Authentic
            <br /><em className="italic text-haldi">Bandhani</em>
            <br />Sarees &amp; More.
          </h1>

          <p className="mt-3 text-[13px] leading-relaxed text-cream/75 max-w-xs">
            Hand-tied by artisans of Kutch &amp; Saurashtra — sarees, dupattas, lehengas &amp; dress materials.
          </p>

          {/* CTA buttons */}
          <div className="mt-5 flex items-center gap-3">
            <Link
              href="/shop"
              className="flex-1 text-center bg-maroon text-cream px-5 py-3.5 rounded-full text-[11px] tracking-widest uppercase hover:bg-maroon-dark transition-colors shadow-lg shadow-maroon/30"
            >
              Shop Now →
            </Link>
            <Link
              href="/about"
              className="flex-1 text-center border border-cream/40 text-cream px-5 py-3.5 rounded-full text-[11px] tracking-widest uppercase hover:border-haldi hover:text-haldi transition-colors"
            >
              Our Story
            </Link>
          </div>

          {/* Quick category chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { label: "Sarees", href: "/shop" },
              { label: "Dupattas", href: "/shop?collection=dupattas" },
              { label: "Bridal", href: "/shop?collection=bridal-wedding" },
              { label: "Lehengas", href: "/shop?collection=lehengas" },
            ].map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="px-3 py-1 border border-cream/25 rounded-full text-[9px] tracking-widest uppercase text-cream/70 hover:border-haldi hover:text-haldi transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </div>

          {/* Stats strip */}
          <div className="mt-5 pt-4 border-t border-cream/15 grid grid-cols-3 gap-2">
            {[
              { num: "1000+", label: "Knots / saree" },
              { num: "45+",   label: "Artisan families" },
              { num: "100%",  label: "Hand-tied" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-xl text-haldi">{s.num}</div>
                <div className="text-[8px] tracking-widest uppercase text-cream/50 mt-0.5 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════
          DESKTOP HERO — 2-column layout
          Hidden on mobile (shown from md breakpoint)
          ══════════════════════════════════════════ */}
      <div className="hidden md:block pt-20 pb-16">
        <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Text content */}
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] tracking-widest2 uppercase text-maroon mb-5 bg-maroon/8 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-maroon animate-pulse" />
              New arrivals · Handcrafted in Gujarat
            </div>

            <h1 className="font-display text-[2.75rem] leading-[1.08] lg:text-6xl lg:leading-[1.05] text-ink">
              Authentic
              <br /><em className="italic text-maroon">Bandhani</em>
              <br />Sarees &amp; More.
            </h1>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/70">
              Each knot tied by skilled artisans of Kutch &amp; Saurashtra. Shop our
              curated collection of sarees, dupattas, lehengas &amp; dress materials —
              straight from the karigar families of Gujarat.
            </p>

            {/* Primary CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-maroon text-cream px-8 py-4 rounded-full text-[12px] tracking-widest2 uppercase hover:bg-maroon-dark transition-colors shadow-lg shadow-maroon/20"
              >
                Shop the Collection <span aria-hidden>→</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-ink/25 text-ink px-7 py-3.5 rounded-full text-[12px] tracking-widest2 uppercase hover:border-maroon hover:text-maroon transition-colors"
              >
                Our Story
              </Link>
            </div>

            {/* Quick category links */}
            <div className="mt-7 flex flex-wrap gap-2">
              {[
                { label: "Sarees",       href: "/shop" },
                { label: "Dupattas",     href: "/shop?collection=dupattas" },
                { label: "Lehengas",     href: "/shop?collection=lehengas" },
                { label: "Bridal",       href: "/shop?collection=bridal-wedding" },
                { label: "New Arrivals", href: "/shop?collection=new-arrivals" },
              ].map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className="px-3 py-1.5 border border-ink/15 rounded-full text-[10px] tracking-widest2 uppercase text-ink/60 hover:border-maroon hover:text-maroon transition-colors"
                >
                  {c.label}
                </Link>
              ))}
            </div>

            {/* Stats row */}
            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md border-t border-ink/8 pt-8">
              <div>
                <dt className="font-display text-2xl text-ink">1000+</dt>
                <dd className="text-[10px] tracking-widest2 uppercase text-ink/50 mt-1">Knots per saree</dd>
              </div>
              <div>
                <dt className="font-display text-2xl text-ink">45+</dt>
                <dd className="text-[10px] tracking-widest2 uppercase text-ink/50 mt-1">Artisan families</dd>
              </div>
              <div>
                <dt className="font-display text-2xl text-ink">100%</dt>
                <dd className="text-[10px] tracking-widest2 uppercase text-ink/50 mt-1">Hand-tied &amp; dyed</dd>
              </div>
            </dl>
          </div>

          {/* Right: Product photo with decorative elements */}
          <div className="relative h-[520px]">
            <div className="portrait absolute right-0 top-0 w-[80%] h-[92%] rounded-2xl shadow-2xl overflow-hidden">
              <Image
                src="/home.JPG"
                alt="Handcrafted bandhani saree — Vanza Bandhej"
                fill
                sizes="40vw"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <Link
                href="/shop"
                className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-cream text-ink text-[11px] tracking-widest2 uppercase px-6 py-2.5 rounded-full shadow-xl hover:bg-haldi transition-colors whitespace-nowrap"
              >
                Shop Now →
              </Link>
            </div>

            {/* Sticky note */}
            <div className="sticky-note absolute -top-2 left-4 z-20 px-4 py-3 max-w-[150px] font-display italic text-[13px] leading-snug text-ink">
              tied by hand, worn with heart.
              <div className="not-italic font-body text-[9px] tracking-widest2 uppercase text-ink/50 mt-2">
                &mdash; Our promise
              </div>
            </div>

            {/* Fabric swatch accent */}
            <div className="fabric fabric-haldi absolute left-[12%] bottom-0 w-[26%] h-[30%] rounded-xl shadow-xl z-10" />

            {/* Since 1972 badge */}
            <div className="absolute right-4 bottom-3 z-20 bg-haldi text-ink rounded-full w-24 h-24 flex flex-col items-center justify-center text-center shadow-lg">
              <span className="text-[8px] tracking-widest2 uppercase">Since</span>
              <span className="font-display text-lg leading-none">1972</span>
              <span className="text-[7px] tracking-widest2 uppercase mt-0.5">Family craft</span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <span className="text-[10px] tracking-widest2 uppercase text-ink/40">Scroll to explore</span>
        </div>
      </div>

    </section>
  );
}
