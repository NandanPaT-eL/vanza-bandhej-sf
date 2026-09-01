"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire this up to your email provider or a Shopify customer
    // subscription mutation once the backend is connected.
    setSubmitted(true);
  }

  return (
    <section className="bg-maroon text-cream py-20 md:py-24 text-center">
      <div className="mx-auto max-w-xl px-6">
        <span className="text-[11px] tracking-widest2 uppercase text-haldi">
          Tie the thread
        </span>
        <h2 className="font-display text-3xl sm:text-4xl leading-tight mt-4">
          Be first to know when a new{" "}
          <em className="italic text-haldi">bandhani</em> is born.
        </h2>
        <p className="mt-4 text-[14px] leading-relaxed text-cream/70">
          A quiet letter &mdash; once a month &mdash; with new arrivals, artisan
          stories and the sarees we keep aside for people who love them
          slowly.
        </p>

        {submitted ? (
          <p className="mt-8 font-display italic text-haldi text-lg">
            Thank you &mdash; welcome to the thread.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your email address"
              className="bg-transparent border border-cream/30 rounded-full px-5 py-3 text-[13px] placeholder:text-cream/40 focus:outline-none focus:border-haldi w-full sm:w-72"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-haldi text-ink px-6 py-3 rounded-full text-[12px] tracking-widest2 uppercase hover:bg-cream transition-colors"
            >
              Subscribe <span aria-hidden>&rarr;</span>
            </button>
          </form>
        )}

        <div className="mt-6 flex justify-center gap-1.5" aria-hidden>
          <span className="w-1.5 h-1.5 rounded-full bg-haldi" />
          <span className="w-1.5 h-1.5 rounded-full bg-cream/25" />
        </div>
        <p className="mt-3 text-[10px] tracking-widest2 uppercase text-cream/40">
          No spam &middot; only stories
        </p>
      </div>
    </section>
  );
}
