import Image from "next/image";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-10 md:pt-24 md:pb-16">

      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-3 text-[11px] tracking-widest2 uppercase text-maroon mb-6">
            <span className="[writing-mode:vertical-rl] hidden lg:block h-16 text-ink/40 tracking-widest2">
              Est. Anand, Gujarat &middot; India
            </span>
            <span>&mdash; A living craft, est. Gujarat</span>
          </div>

          <h1 className="font-display text-[2.75rem] leading-[1.08] sm:text-6xl sm:leading-[1.05] text-ink">
            Every dot,
            <br />a story <em className="italic text-maroon">tied</em>
            <br />by hand.
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/70">
            Vanza Bandhej weaves together a home for authentic bandhani &mdash; each
            knot a whispered prayer, each colour steeped in centuries of tradition,
            straight from the karigars of Kutch and Saurashtra.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/#collections"
              className="inline-flex items-center gap-2 bg-maroon text-cream px-7 py-3.5 rounded-full text-[12px] tracking-widest2 uppercase hover:bg-maroon-dark transition-colors"
            >
              Explore the collection <span aria-hidden>&rarr;</span>
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 border border-ink/25 text-ink px-7 py-3.5 rounded-full text-[12px] tracking-widest2 uppercase hover:border-maroon hover:text-maroon transition-colors"
            >
              Our story
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <dt className="font-display text-2xl text-ink">1000+</dt>
              <dd className="text-[10px] tracking-widest2 uppercase text-ink/50 mt-1">
                Knots per saree
              </dd>
            </div>
            <div>
              <dt className="font-display text-2xl text-ink">45+</dt>
              <dd className="text-[10px] tracking-widest2 uppercase text-ink/50 mt-1">
                Artisan families
              </dd>
            </div>
            <div>
              <dt className="font-display text-2xl text-ink">100%</dt>
              <dd className="text-[10px] tracking-widest2 uppercase text-ink/50 mt-1">
                Hand-tied &amp; dyed
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative h-[420px] sm:h-[520px]">
          {/* Photo — fills the right column */}
          <div className="portrait absolute right-0 top-10 w-[72%] h-[85%] rounded-sm shadow-2xl overflow-hidden">
            <Image
              src="/home.JPG"
              alt="Handcrafted bandhani saree — Vanza Bandhej"
              fill
              sizes="(min-width: 768px) 40vw, 72vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Sticky note — top-left corner of the photo */}
          <div className="sticky-note absolute -top-2 left-2 sm:left-8 z-20 px-4 py-3 max-w-[150px] font-display italic text-[13px] leading-snug text-ink">
            tied by hand, worn with heart.
            <div className="not-italic font-body text-[9px] tracking-widest2 uppercase text-ink/50 mt-2">
              &mdash; Our promise
            </div>
          </div>

          {/* Haldi fabric swatch — decorative accent, overlapping the photo bottom edge */}
          <div className="fabric fabric-haldi absolute left-[18%] bottom-0 w-[28%] h-[32%] rounded-sm shadow-xl z-10" />

          {/* Since 1972 badge */}
          <div className="absolute right-6 bottom-3 z-20 bg-haldi text-ink rounded-full w-24 h-24 flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-[8px] tracking-widest2 uppercase">Since</span>
            <span className="font-display text-lg leading-none">1972</span>
            <span className="text-[7px] tracking-widest2 uppercase mt-0.5">
              Family craft
            </span>
          </div>
        </div>
      </div>

      <div className="mt-14 text-center">
        <span className="text-[10px] tracking-widest2 uppercase text-ink/40">
          Scroll to unfold
        </span>
      </div>
    </section>
  );
}
