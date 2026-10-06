import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Our Story — Vanza Bandhej",
  description:
    "Learn about Vanza Bandhej — a family rooted in the bandhani tradition of Gujarat, weaving craft into heirloom.",
};

// Google Drive video embed URLs (portrait videos, rotated 90° left in CSS)
const FEEDBACK_VIDEOS = [
  {
    embedUrl: "https://drive.google.com/file/d/1vXQkJ0vNzlne36kGRtbNaSbDolbdQXol/preview",
    label: "Customer Feedback — 1",
  },
  {
    embedUrl: "https://drive.google.com/file/d/12zudCTduociBNVjES9mH0izXaoJGeXxN/preview",
    label: "Customer Feedback — 2",
  },
  {
    embedUrl: "https://drive.google.com/file/d/1vK6inakPntBEK6zFPNFEMRQqW2FNAbDP/preview",
    label: "Customer Feedback — 3",
  },
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
                <div key={v.embedUrl} className="flex flex-col items-center gap-4">
                  {/*
                    Videos were recorded in portrait on a phone but the Drive file
                    is stored landscape. We rotate the iframe -90° (left / CCW) inside
                    a 9:16 portrait wrapper so it displays upright.
                  */}
                  <div
                    className="relative overflow-hidden rounded-xl shadow-xl bg-ink/5"
                    style={{ width: "100%", paddingBottom: "177.78%" /* 9:16 */ }}
                  >
                    <iframe
                      src={v.embedUrl}
                      title={v.label}
                      allow="autoplay"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        transform: "rotate(-90deg)",
                        width: "177.78%",
                        height: "56.25%",
                        top: "50%",
                        left: "50%",
                        translate: "-50% -50%",
                        border: "none",
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
