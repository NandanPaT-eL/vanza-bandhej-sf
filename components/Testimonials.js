const notes = [
  {
    quote:
      "I wore my Vanza saree to my daughter\u2019s wedding, and my mother said it looked exactly like the one from her trousseau.",
    name: "Meera Shah",
    place: "Ahmedabad",
    color: "#5C0F1B",
    rotate: "-rotate-2",
  },
  {
    quote:
      "You can feel the hours in every knot. This isn\u2019t a saree, it\u2019s a memory being tied around you.",
    name: "Riya Iyer",
    place: "Mumbai",
    color: "#D3A628",
    rotate: "rotate-1",
  },
  {
    quote:
      "Vanza didn\u2019t sell me a saree. They handed me a story, folded in silk, from a village I\u2019ve never been to.",
    name: "Anjali Verma",
    place: "Delhi",
    color: "#C1602C",
    rotate: "-rotate-1",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-20 md:py-28 bg-cream-dark overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-0 font-display text-[9rem] leading-none text-ink/[0.06] select-none"
      >
        Love
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <span className="text-[11px] tracking-widest2 uppercase text-maroon">
          Notes from our women
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4">
          Some sarees become <em className="italic text-maroon">heirlooms.</em>
        </h2>

        <div className="mt-14 grid sm:grid-cols-3 gap-8">
          {notes.map((n) => (
            <div
              key={n.name}
              className={`sticky-note ${n.rotate} p-6 text-left`}
            >
              <p className="font-display italic text-[15px] leading-relaxed text-ink">
                &ldquo;{n.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] text-cream font-display"
                  style={{ backgroundColor: n.color }}
                >
                  {n.name[0]}
                </span>
                <div className="leading-tight">
                  <div className="text-[12px] text-ink">{n.name}</div>
                  <div className="text-[9px] tracking-widest2 uppercase text-ink/45">
                    {n.place}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
