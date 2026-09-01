export default function ArtisanSpotlight() {
  return (
    <section className="bg-maroon text-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <span className="text-[11px] tracking-widest2 uppercase text-haldi">
            Artisan spotlight
          </span>
          <h2 className="font-display italic text-3xl sm:text-4xl leading-[1.2] mt-4">
            &ldquo;The knot knows more than my hands ever will.&rdquo;
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/75">
            Meet{" "}
            <span className="text-haldi">Rameshbhai Khatri</span> &mdash; 62, a
            fourth-generation bandhani master from Bhuj. His fingertips still
            remember a design his grandfather drew in the sand in 1968. Every
            Vanza saree begins in his courtyard.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <dt className="font-display text-2xl text-haldi">40+</dt>
              <dd className="text-[10px] tracking-widest2 uppercase text-cream/50 mt-1">
                Years of craft
              </dd>
            </div>
            <div>
              <dt className="font-display text-2xl text-haldi">4</dt>
              <dd className="text-[10px] tracking-widest2 uppercase text-cream/50 mt-1">
                Generations
              </dd>
            </div>
            <div>
              <dt className="font-display text-2xl text-haldi">6L+</dt>
              <dd className="text-[10px] tracking-widest2 uppercase text-cream/50 mt-1">
                Knots tied
              </dd>
            </div>
          </dl>

          <a
            href="#"
            className="inline-block mt-8 text-[11px] tracking-widest2 uppercase text-cream hover:text-haldi transition-colors"
          >
            Meet the karigars &rarr;
          </a>
        </div>

        <div className="relative">
          <div className="fabric-card rounded-sm shadow-2xl h-[340px] sm:h-[400px]">
            <div className="fabric-bg fabric fabric-haldi" />
            <div className="fabric-scrim" />
            <div className="fabric-content flex items-end h-full p-6 pb-10 pr-28 sm:pr-32">
              <span className="font-display text-2xl text-cream drop-shadow-sm">
                Rameshbhai Khatri
              </span>
            </div>
          </div>
          <div className="sticky-note absolute -bottom-6 -right-3 sm:right-4 px-4 py-3 max-w-[190px] font-display italic text-[13px] leading-snug text-ink rotate-[-1.5deg]">
            &ldquo;Bandhani listens. Then it answers.&rdquo;
            <div className="not-italic font-body text-[9px] tracking-widest2 uppercase text-ink/50 mt-2">
              &mdash; Rameshbhai, Bhuj
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
