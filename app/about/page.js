import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Our Story — Vanza Bandhej",
  description:
    "Learn about Vanza Bandhej — a family rooted in the bandhani tradition of Gujarat, weaving craft into heirloom.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <span className="text-[11px] tracking-widest2 uppercase text-maroon">
          Our story
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-ink mt-4 leading-snug">
          Tied by hand,{" "}
          <em className="italic text-maroon">worn with heart.</em>
        </h1>

        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-ink/70">
          <p>
            Vanza Bandhej was born from a simple belief: that the most
            beautiful things in the world are made slowly, by hand, by people
            who have been making them for generations. Our family has been part
            of the bandhani tradition in Gujarat since 1972 — long before it
            became a trend, and long after trends have moved on.
          </p>
          <p>
            The word <em className="italic text-ink">bandhani</em> comes from
            the Sanskrit <em className="italic text-ink">bandh</em>, meaning
            "to tie." A single saree can hold over a thousand individually
            pinched and knotted points — each one placed by a pair of
            fingertips that carry generations of memory. What you see is not
            print. It is patience, made visible.
          </p>
          <p>
            We work directly with 45+ karigar families in Kutch and
            Saurashtra, paying fair wages and celebrating their craft rather
            than industrialising it. Every piece we carry is a living document
            — of colour, of skill, of a tradition that has survived and
            thrived because of the people who pour their lives into it.
          </p>
          <p>
            When you buy a Vanza Bandhej saree, you are not buying fabric. You
            are buying a relationship — with the woman who tied it, with the
            dyer who named its colour after a season, and with a craft that has
            never once cut a corner.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-ink/10">
          <p className="font-display italic text-xl text-maroon">
            &ldquo;Tied by hand, worn with heart.&rdquo;
          </p>
          <p className="mt-2 text-[11px] tracking-widest2 uppercase text-ink/40">
            — The Vanza family, Vallabh Vidyanagar
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
