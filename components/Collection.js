export default function Collection() {
  return (
    <section id="collections" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] tracking-widest2 uppercase text-maroon">
              This season
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4">
              The <em className="italic text-maroon">Sindoor</em> Edit.
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/70">
              A curated collection of nine sarees &mdash; dyed with madder root
              and turmeric, tied for the wedding season of 2026.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-ink/25 rounded-full px-6 py-3 text-[11px] tracking-widest2 uppercase text-ink hover:border-maroon hover:text-maroon transition-colors"
          >
            Shop all sarees <span aria-hidden>&#8599;</span>
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="fabric-card rounded-sm shadow-xl min-h-[440px]">
            <div className="fabric-bg fabric fabric-sindoor" />
            <div className="fabric-scrim" />
            <div className="fabric-content flex flex-col justify-between h-full p-6">
              <span className="self-start bg-haldi text-ink text-[10px] tracking-widest2 uppercase px-3 py-1.5 rounded-full">
                Bestseller
              </span>
              <div className="text-cream">
                <span className="text-[10px] tracking-widest2 uppercase text-cream/70">
                  Gharchola &middot; Pure Gaji Silk
                </span>
                <div className="flex items-end justify-between mt-2">
                  <div>
                    <h3 className="font-display text-3xl">Rani Sindoor</h3>
                    <p className="mt-1 text-[15px]">&#8377; 28,500</p>
                  </div>
                  <a
                    href="#"
                    className="text-[11px] tracking-widest2 uppercase hover:text-haldi transition-colors"
                  >
                    Discover &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-6">
            <div className="fabric-card rounded-sm shadow-xl min-h-[200px]">
              <div className="fabric-bg fabric fabric-haldi" />
              <div className="fabric-scrim" />
              <div className="fabric-content flex flex-col justify-between h-full p-6">
                <span className="text-[10px] tracking-widest2 uppercase text-ink/70">
                  Cotton &middot; Everyday
                </span>
                <div className="flex items-end justify-between text-ink">
                  <div>
                    <h3 className="font-display text-2xl">Haldi Bindu</h3>
                    <p className="mt-1 text-[14px]">&#8377; 6,800</p>
                  </div>
                  <a
                    href="#"
                    className="text-[11px] tracking-widest2 uppercase hover:text-maroon transition-colors"
                  >
                    Shop &rarr;
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="fabric-card rounded-sm shadow-xl min-h-[200px]">
                <div className="fabric-bg fabric fabric-neel" />
                <div className="fabric-scrim" />
                <div className="fabric-content flex flex-col justify-between h-full p-5">
                  <span className="text-[9px] tracking-widest2 uppercase text-cream/70">
                    Georgette
                  </span>
                  <div className="text-cream">
                    <h3 className="font-display text-lg">Chandrakala</h3>
                    <div className="flex items-end justify-between mt-1">
                      <p className="text-[13px]">&#8377; 13,900</p>
                      <a
                        href="#"
                        className="text-[10px] tracking-widest2 uppercase hover:text-haldi transition-colors"
                      >
                        Shop &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fabric-card rounded-sm shadow-xl min-h-[200px]">
                <div className="fabric-bg fabric fabric-sindoor" />
                <div className="fabric-scrim" />
                <div className="fabric-content flex flex-col justify-center h-full p-5">
                  <p className="font-display italic text-cream text-[15px] leading-snug">
                    &ldquo;colour is a season&rdquo;
                  </p>
                  <span className="text-[10px] tracking-widest2 uppercase text-cream/60 mt-2">
                    the palette
                  </span>
                  <a
                    href="#palette"
                    className="text-[10px] tracking-widest2 uppercase text-haldi mt-3 hover:text-cream transition-colors"
                  >
                    View all colours
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
