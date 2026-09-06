import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Shipping Policy — Vanza Bandhej",
  description:
    "Shipping information for Vanza Bandhej — free shipping across India, international shipping available.",
};

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <span className="text-[11px] tracking-widest2 uppercase text-maroon">
          Shipping
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-ink mt-4 leading-snug">
          Shipping <em className="italic text-maroon">&amp; Delivery</em>
        </h1>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink/70">
          <section>
            <h2 className="font-display text-xl text-ink mb-3">
              India — Free shipping
            </h2>
            <p>
              We offer free standard shipping on all orders within India.
              Orders are dispatched within 2–3 business days and typically
              arrive within 5–7 business days of dispatch, depending on your
              location.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">
              International shipping
            </h2>
            <p>
              We ship to most countries worldwide. International shipping
              charges are calculated at checkout based on weight and
              destination. Delivery times vary between 10–21 business days.
              Import duties and taxes are the responsibility of the recipient.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">
              Order tracking
            </h2>
            <p>
              Once your order is dispatched, you will receive a tracking number
              by email. You can use this to follow your saree on its journey
              to you.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">
              Questions?
            </h2>
            <p>
              If you have any questions about your shipment, please email us at{" "}
              <a
                href="mailto:hello@vanzabandhej.com"
                className="text-maroon hover:underline"
              >
                hello@vanzabandhej.com
              </a>{" "}
              with your order number.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
