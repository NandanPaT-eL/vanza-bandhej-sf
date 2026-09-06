const posts = [
  {
    kind: "portrait",
    category: "The craft",
    time: "6 min read",
    title: "Why every dot in bandhani is a prayer.",
    sub: "Inside the Bhuj workshop where cloth becomes memory.",
  },
  {
    kind: "fabric-kesari",
    category: "Heritage",
    time: "4 min read",
    title: "The colours of a Gujarati wedding.",
    sub: "Sindoor, haldi, kesari \u2014 what each hue whispers.",
  },
  {
    kind: "fabric-kholna",
    category: "Style",
    time: "3 min read",
    title: "How to drape a bandhani for a modern day.",
    sub: "Three drapes, three moods, one heritage.",
  },
];

export default function Journal() {
  return (
    <section id="journal" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] tracking-widest2 uppercase text-maroon">
              From the journal
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4">
              Stories, <em className="italic text-maroon">softly told.</em>
            </h2>
          </div>
          {/* TODO: replace with real article pages once the journal/blog feature is built. */}
          <a
            href="/about"
            className="text-[11px] tracking-widest2 uppercase text-ink hover:text-maroon transition-colors"
          >
            All articles &rarr;
          </a>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {/* TODO: replace with real article pages once the journal/blog feature is built. */}
          {posts.map((p) => (
            <a href="/about" key={p.title} className="block group">
              <div
                className={
                  p.kind === "portrait"
                    ? "portrait rounded-sm h-56"
                    : `fabric ${p.kind} rounded-sm h-56`
                }
              />
              <span className="block text-[10px] tracking-widest2 uppercase text-maroon mt-4">
                {p.category} &middot; {p.time}
              </span>
              <h3 className="font-display text-xl text-ink mt-2 leading-snug group-hover:text-maroon transition-colors">
                {p.title}
              </h3>
              <p className="text-[13px] text-ink/60 mt-1">{p.sub}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
