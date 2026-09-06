import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — Vanza Bandhej",
  description: "Privacy policy for Vanza Bandhej — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <span className="text-[11px] tracking-widest2 uppercase text-maroon">
          Legal
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-ink mt-4 leading-snug">
          Privacy <em className="italic text-maroon">Policy</em>
        </h1>
        <p className="mt-4 text-[12px] text-ink/40 tracking-wide">
          Last updated: September 2026
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink/70">
          <section>
            <h2 className="font-display text-xl text-ink mb-3">
              Information we collect
            </h2>
            <p>
              When you place an order or create an account, we collect your
              name, email address, shipping address, and payment information.
              Payment details are processed securely by Shopify Payments and
              are never stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">
              How we use your information
            </h2>
            <p>
              We use your information to fulfil and ship your order, send order
              confirmations and shipping updates, and (with your permission)
              send you newsletters about new arrivals and artisan stories. We
              never sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">Cookies</h2>
            <p>
              We use essential cookies to maintain your shopping cart session.
              No advertising or tracking cookies are used without your explicit
              consent.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">
              Your rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal data at any time by emailing{" "}
              <a
                href="mailto:hello@vanzabandhej.com"
                className="text-maroon hover:underline"
              >
                hello@vanzabandhej.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
