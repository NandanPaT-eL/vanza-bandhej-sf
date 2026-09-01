const steps = [
  {
    n: "01",
    hindi: "Bandhna",
    en: "tie",
    fabric: "fabric-sindoor",
    text: "Fine cotton or gaji silk is pinched into thousands of tiny points and bound with thread.",
  },
  {
    n: "02",
    hindi: "Ranga",
    en: "dye",
    fabric: "fabric-haldi",
    text: "Natural pigments \u2014 haldi, madder, indigo \u2014 steep the fabric in earthen vats.",
  },
  {
    n: "03",
    hindi: "Kholna",
    en: "untie",
    fabric: "fabric-kholna",
    text: "Threads are gently undone \u2014 a slow, ceremonial act by the same hands that tied them.",
  },
  {
    n: "04",
    hindi: "Darshan",
    en: "reveal",
    fabric: "fabric-kesari",
    text: "The pattern emerges \u2014 dots forming lotuses, mangoes, elephants, the sun.",
  },
];

export default function Craft() {
  return (
    <section id="craft" className="bg-cream-dark py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-14 items-end mb-14">
          <div>
            <span className="text-[11px] tracking-widest2 uppercase text-maroon">
              The craft
            </span>
            <h2 className="font-display text-4xl sm:text-5xl leading-[1.1] text-ink mt-4">
              Four hands, four days,
              <br />
              <em className="italic text-maroon">one heirloom.</em>
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-ink/70">
            Every Vanza saree passes through four generations of skill &mdash;
            from the woman who pinches the cloth to the master dyer who names
            each colour after a season.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s) => (
            <div key={s.n}>
              <div className={`fabric ${s.fabric} h-40 rounded-sm shadow-lg mb-4`} />
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] text-maroon/60 tracking-widest2">
                  {s.n}
                </span>
                <h3 className="font-display text-lg text-ink">
                  {s.hindi}{" "}
                  <span className="italic text-ink/50 text-base">/ {s.en}</span>
                </h3>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
