"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images }) {
  const [active, setActive] = useState(0);
  if (!images || images.length === 0) {
    return <div className="fabric fabric-sindoor w-full aspect-[3/4] rounded-sm shadow-xl" />;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden shadow-xl bg-cream-dark">
        <Image
          src={images[active].url}
          alt={images[active].altText || "Product image"}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority={active === 0}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-16 h-20 rounded-sm overflow-hidden transition-opacity ${
                i === active ? "ring-2 ring-maroon opacity-100" : "opacity-60 hover:opacity-90"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.altText || `Image ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
