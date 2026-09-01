const colours = [
  { name: "Sindoor", mood: "The married red", hex: "#C3202E" },
  { name: "Haldi", mood: "The auspicious", hex: "#D3A628" },
  { name: "Maroon", mood: "Motherhood", hex: "#5C0F1B" },
  { name: "Neel", mood: "The monsoon", hex: "#1F4E79" },
  { name: "Kesari", mood: "The saffron", hex: "#C1602C" },
];

export default function Palette() {
  return (
    <section id="palette" className="py-20 md:py-24 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <span className="text-[11px] tracking-widest2 uppercase text-maroon">
          A palette named after seasons
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4">
          The <em className="italic text-maroon">colours</em> of bandhani.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/70">
          In our tradition, each hue is a mood &mdash; a marriage, a harvest, a
          monsoon. Every saree carries at least one.
        </p>
      </div>

      <div className="mt-14 flex flex-wrap justify-center gap-x-12 gap-y-8">
        {colours.map((c) => (
          <div key={c.name} className="flex flex-col items-center w-24">
            <span
              className="w-16 h-16 rounded-full shadow-md"
              style={{ backgroundColor: c.hex }}
              aria-hidden
            />
            <span className="font-display text-lg text-ink mt-3">
              {c.name}
            </span>
            <span className="text-[9px] tracking-widest2 uppercase text-ink/45 mt-1">
              {c.mood}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
