export default function Heritage() {
  return (
    <section id="heritage" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <span className="text-[11px] tracking-widest2 uppercase text-maroon">
            The heritage
          </span>
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.1] text-ink mt-4">
            Five hundred years,
            <br />
            <em className="italic text-maroon">a thousand knots,</em>
            <br />
            one saree.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/70">
            Bandhani &mdash; from the Sanskrit <em className="italic">bandh</em>,
            meaning &ldquo;to tie&rdquo; &mdash; is one of the oldest textile
            traditions in India. The craft travelled with the Khatri artisans
            into the villages of Kutch, and it is from their looms and
            courtyards that Vanza Bandhej sources every piece.
          </p>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/70">
            A single saree can hold over a thousand tiny knots &mdash; plucked,
            pinched, and tied by fingertips that carry generations of memory.
            What you see is not print. It is patience, made visible.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex gap-1.5" aria-hidden>
              <span className="w-1.5 h-1.5 rounded-full bg-maroon" />
              <span className="w-1.5 h-1.5 rounded-full bg-ink/20" />
              <span className="w-1.5 h-1.5 rounded-full bg-ink/20" />
              <span className="w-1.5 h-1.5 rounded-full bg-ink/20" />
              <span className="w-1.5 h-1.5 rounded-full bg-ink/20" />
            </div>
            <a
              href="#craft"
              className="text-[11px] tracking-widest2 uppercase text-ink hover:text-maroon transition-colors"
            >
              Read the full story
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="fabric fabric-sindoor rounded-sm shadow-2xl h-[380px] sm:h-[440px]" />
          <div className="sticky-note absolute -bottom-6 -left-6 sm:left-2 px-4 py-3 max-w-[190px] font-display italic text-[13px] leading-snug text-ink rotate-[1.5deg]">
            &ldquo;my mother tied knots in the same courtyard.&rdquo;
            <div className="not-italic font-body text-[9px] tracking-widest2 uppercase text-ink/50 mt-2">
              &mdash; Hansaben, 3rd generation karigar
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
