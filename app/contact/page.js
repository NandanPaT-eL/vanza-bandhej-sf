import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us — Vanza Bandhej",
  description:
    "Get in touch with Vanza Bandhej for bespoke orders, wholesale enquiries, or to visit our store in Vallabh Vidyanagar.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <span className="text-[11px] tracking-widest2 uppercase text-maroon">
          Get in touch
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-ink mt-4 leading-snug">
          We&rsquo;d love to{" "}
          <em className="italic text-maroon">hear from you.</em>
        </h1>
        <p className="mt-6 text-[15px] leading-relaxed text-ink/70 max-w-md">
          Whether you have a question about a saree, a bespoke commission in
          mind, or simply want to visit the store — reach out. Every message
          is read by a real person.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 gap-8">
          <div className="space-y-1">
            <h2 className="text-[10px] tracking-widest2 uppercase text-ink/40">
              Email
            </h2>
            <a
              href="mailto:hello@vanzabandhej.com"
              className="text-[15px] text-ink hover:text-maroon transition-colors"
            >
              hello@vanzabandhej.com
            </a>
          </div>

          <div className="space-y-1">
            <h2 className="text-[10px] tracking-widest2 uppercase text-ink/40">
              Phone
            </h2>
            <a
              href="tel:+919876543210"
              className="text-[15px] text-ink hover:text-maroon transition-colors"
            >
              +91 98765 43210
            </a>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <h2 className="text-[10px] tracking-widest2 uppercase text-ink/40">
              Store address
            </h2>
            <address className="not-italic text-[15px] leading-relaxed text-ink/70">
              C-4, Royal Invention,
              <br />
              Near Vrundavan Ground,
              <br />
              AV Road, Vallabh Vidyanagar,
              <br />
              Anand, Gujarat 388001
            </address>
            <p className="text-[13px] text-ink/50">
              Open Monday – Saturday, 10 am – 7 pm
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ink/10 text-[13px] text-ink/50">
          For bespoke orders and wholesale enquiries, please email us with
          your requirements and we will respond within one business day.
        </div>
      </main>
      <Footer />
    </>
  );
}
