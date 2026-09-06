import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service — Vanza Bandhej",
  description: "Terms of service for Vanza Bandhej — your agreement when purchasing from our store.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <span className="text-[11px] tracking-widest2 uppercase text-maroon">
          Legal
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-ink mt-4 leading-snug">
          Terms of <em className="italic text-maroon">Service</em>
        </h1>
        <p className="mt-4 text-[12px] text-ink/40 tracking-wide">
          Last updated: September 2026
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink/70">
          <section>
            <h2 className="font-display text-xl text-ink mb-3">
              General
            </h2>
            <p>
              By placing an order with Vanza Bandhej, you agree to these terms.
              We reserve the right to update them at any time — the current
              version is always available on this page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">
              Products
            </h2>
            <p>
              Every saree is handcrafted and naturally dyed. Slight variations
              in colour and pattern are inherent to the craft and are not
              considered defects. Product images are as accurate as photography
              allows; real colours may vary slightly due to natural dye lots and
              screen calibration.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">
              Returns &amp; exchanges
            </h2>
            <p>
              We accept returns within 14 days of delivery for unused, unwashed
              items in their original packaging. Sale items and bespoke orders
              are final sale. To initiate a return, email{" "}
              <a
                href="mailto:hello@vanzabandhej.com"
                className="text-maroon hover:underline"
              >
                hello@vanzabandhej.com
              </a>{" "}
              with your order number.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">
              Governing law
            </h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall
              be subject to the exclusive jurisdiction of the courts of Anand,
              Gujarat.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
