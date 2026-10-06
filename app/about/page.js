import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Our Story — Vanza Bandhej",
  description:
    "Learn about Vanza Bandhej — a family rooted in the bandhani tradition of Gujarat, weaving craft into heirloom.",
};

// Feedback videos stored in /public/feedback/
const FEEDBACK_VIDEOS = [
  { file: "/feedback/DSC_0060.MOV", label: "Customer Feedback — 1" },
  { file: "/feedback/DSC_0061.MOV", label: "Customer Feedback — 2" },
  { file: "/feedback/DSC_0062.MOV", label: "Customer Feedback — 3" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Our Story ── */}
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
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
              &quot;to tie.&quot; A single saree can hold over a thousand individually
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
        </div>

        {/* ── Customer Feedback Videos ── */}
        <section className="py-16 md:py-24 bg-cream-dark border-t border-ink/[0.06]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <span className="text-[11px] tracking-widest2 uppercase text-maroon">
                Real stories
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4">
                What our{" "}
                <em className="italic text-maroon">customers say.</em>
              </h2>
              <p className="mt-3 text-[14px] text-ink/60 max-w-md mx-auto leading-relaxed">
                Hear directly from the women who wear Vanza Bandhej — in their own words.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEEDBACK_VIDEOS.map((v) => (
                <div key={v.file} className="flex flex-col items-center gap-4">
                  {/*
                    Videos are shot in portrait (phone held vertically) but stored
                    as landscape MOV files. We rotate the <video> element -90° (counter-
                    clockwise / left) to display them correctly, then use a wrapper
                    that swaps the visual width/height so the layout doesn't collapse.
                    Wrapper is a fixed portrait aspect-ratio container; the video is
                    rotated inside it.
                  */}
                  <div
                    className="relative overflow-hidden rounded-xl shadow-xl bg-ink/5"
                    style={{ width: "100%", paddingBottom: "177.78%" /* 9:16 portrait */ }}
                  >
                    <video
                      src={v.file}
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={v.label}
                      style={{
                        position: "absolute",
                        /* Rotate the video 90° counter-clockwise (left) */
                        transform: "rotate(-90deg)",
                        /* After rotation the video's own width becomes the visual height,
                           so we make its width equal the container height (= 100% / 0.5625) */
                        width: "177.78%",
                        height: "56.25%",
                        top: "50%",
                        left: "50%",
                        translate: "-50% -50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <p className="text-[11px] tracking-widest2 uppercase text-ink/50 text-center">
                    {v.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
