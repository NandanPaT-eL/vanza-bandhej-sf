"use client";

import { useState } from "react";

const WA_NUMBER = "919825000000";

export default function ProductAccordions({
  productTitle = "",
  productDescription = "",
  descriptionHtml = null,
  productType = "",
}) {
  // Keep first item open by default for immediate product information
  const [openIndex, setOpenIndex] = useState(0);

  function toggle(idx) {
    setOpenIndex((curr) => (curr === idx ? null : idx));
  }

  const waMessage = encodeURIComponent(
    `Hello Vanza Bandhej Stylist! I need assistance with styling, drape, or custom inquiries for: "${productTitle}".`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  const accordionItems = [
    {
      title: "PRODUCT DETAILS",
      content: (
        <div className="space-y-3 text-[13px] text-ink/75 leading-relaxed">
          {descriptionHtml ? (
            <div
              className="prose prose-sm max-w-none text-ink/75"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          ) : (
            <p>{productDescription || "Handcrafted Bandhani masterpiece created by master artisans."}</p>
          )}

          <div className="pt-2 border-t border-ink/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
            <div>
              <span className="font-semibold text-ink">Craft Technique: </span>
              <span>Authentic Hand-tied Bandhani (Rai Bandhej)</span>
            </div>
            <div>
              <span className="font-semibold text-ink">Category: </span>
              <span>{productType || "Handcrafted Bandhani Saree / Textile"}</span>
            </div>
            <div>
              <span className="font-semibold text-ink">Provenance: </span>
              <span>Bhuj &amp; Mandvi, Kutch, Gujarat</span>
            </div>
            <div>
              <span className="font-semibold text-ink">Package Contains: </span>
              <span>1 Garment with Certificate of Handloom Authenticity</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "RETURNS AND EXCHANGE",
      content: (
        <div className="space-y-2.5 text-[13px] text-ink/75 leading-relaxed">
          <p>
            We take immense pride in our handcrafted creations. If you are not entirely satisfied, we offer an easy <strong>7-day exchange window</strong> from the date of delivery.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[12.5px]">
            <li>Items must be unworn, unwashed, and returned in their original luxury packaging with all artisan tags intact.</li>
            <li>Customized items (such as bespoke stitched blouses, custom falls, or personalized dye requests) are crafted exclusively for you and are non-exchangeable.</li>
            <li>To initiate an exchange, simply reach out to our team via WhatsApp or email with your Order ID.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "CONTACT OUR STYLIST",
      content: (
        <div className="space-y-3 text-[13px] text-ink/75 leading-relaxed">
          <p>
            Whether you need guidance choosing the right blouse fabric, styling for a bridal trousseau, or want a <strong>live video call inspection</strong> of this piece in natural daylight, our in-house heritage stylists are here to assist.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#25D366] hover:bg-[#128C7E] text-white text-[11px] tracking-widest2 uppercase font-medium transition-colors shadow-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Connect with Stylist</span>
            </a>
            <span className="text-[11px] text-ink/50 flex items-center">
              Mon – Sat, 10:00 AM – 7:00 PM IST
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "SHIPPING",
      content: (
        <div className="space-y-2.5 text-[13px] text-ink/75 leading-relaxed">
          <p>
            Every order is dispatched in protective moisture-barrier packaging to ensure your handcrafted heirloom reaches you in pristine condition.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[12.5px]">
            <li><strong>Domestic Dispatch:</strong> Dispatched within 2–3 business days with free insured shipping across India. Standard transit time is 3–5 days.</li>
            <li><strong>International Orders:</strong> Worldwide express delivery available via DHL / FedEx. Delivery within 5–9 business days.</li>
            <li>Real-time tracking links will be shared via SMS, WhatsApp, and email once shipped.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "WASH AND CARE",
      content: (
        <div className="space-y-2 text-[13px] text-ink/75 leading-relaxed">
          <p>
            Preserve the vibrancy and fine knotwork of traditional Bandhani with these essential care instructions:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[12.5px]">
            <li><strong>Dry Clean Only:</strong> Strictly dry clean for all washes to maintain fabric luster, knot definition, and genuine zari.</li>
            <li><strong>Storage:</strong> Wrap neatly folded inside an unbleached pure cotton muslin cloth. Do not store in plastic bags or on metal hangers.</li>
            <li><strong>Ironing:</strong> Press on reverse using a low heat setting with a thin protective cloth placed over the fabric.</li>
            <li>Avoid spraying water, perfume, or deodorant directly onto the tie-dyed patterns.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "DISCLAIMER",
      content: (
        <div className="space-y-2 text-[13px] text-ink/75 leading-relaxed">
          <p>
            Each piece is a genuine, slow-crafted artisan creation. Thousands of micro-knots are tied entirely by hand and immersed in natural dye baths by craftspeople in Gujarat.
          </p>
          <p className="text-[12.5px]">
            Minor variations in knot tightness, color saturation, motif alignment, or handloom yarn slubs are natural marks of handmade authenticity and make your piece truly one-of-a-kind. Product colors may vary slightly due to device screen settings and photographic lighting.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="border-t border-ink/15 pt-2">
      {accordionItems.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.title} className="border-b border-ink/15">
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full py-4 flex items-center justify-between text-left group transition-colors focus:outline-none"
            >
              <span className="font-display sm:font-sans text-[13px] sm:text-[14px] font-semibold tracking-wider text-[#3B0E17] group-hover:text-maroon transition-colors uppercase">
                {item.title}
              </span>
              <span
                className={`text-ink/60 group-hover:text-maroon transition-transform duration-300 transform shrink-0 ml-4 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
              >
                {/* Clean dropdown chevron matching user screenshot */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            {/* Collapsible Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[600px] pb-5 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
