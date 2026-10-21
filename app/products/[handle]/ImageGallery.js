"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ImageGallery({ images = [], title = "Product" }) {
  const [active, setActive] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Close lightbox on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (lightboxOpen) {
        if (e.key === "ArrowLeft") {
          setActive((prev) => (prev > 0 ? prev - 1 : images.length - 1));
        } else if (e.key === "ArrowRight") {
          setActive((prev) => (prev < images.length - 1 ? prev + 1 : 0));
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[3/4] rounded-sm bg-gradient-to-br from-cream-dark/50 to-cream border border-ink/10 flex items-center justify-center p-8 text-center">
        <span className="text-[12px] uppercase tracking-widest2 text-ink/40">
          Handcrafted Bandhani
        </span>
      </div>
    );
  }

  const currentImage = images[active] || images[0];

  function handleMouseMove(e) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && active < images.length - 1) {
        setActive((prev) => prev + 1);
      } else if (diff < 0 && active > 0) {
        setActive((prev) => prev - 1);
      }
    }
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-5 w-full items-start">
      {/* ── Desktop & Tablet Thumbnail Strip (Vertical on lg, horizontal below) ── */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[640px] py-1 shrink-0 no-scrollbar w-full lg:w-20">
          {images.map((img, i) => {
            const isSelected = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1} of ${images.length}`}
                className={`relative shrink-0 w-16 h-20 sm:w-18 sm:h-24 lg:w-20 lg:h-24 rounded-sm overflow-hidden transition-all duration-200 border ${
                  isSelected
                    ? "border-maroon ring-1 ring-maroon shadow-sm opacity-100"
                    : "border-ink/10 opacity-70 hover:opacity-100 hover:border-ink/30"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.altText || `${title} thumbnail ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* ── Main High-Resolution Image Canvas ── */}
      <div className="relative flex-1 w-full">
        <div
          className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] max-h-[720px] rounded-sm overflow-hidden shadow-lg border border-ink/10 bg-[#f7f3ec] group cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setLightboxOpen(true)}
        >
          {/* Main Photo with smooth hover zoom effect */}
          <div
            className="w-full h-full relative transition-transform duration-300 ease-out"
            style={
              isZoomed
                ? {
                    transform: "scale(1.5)",
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  }
                : { transform: "scale(1)" }
            }
          >
            <Image
              src={currentImage.url}
              alt={currentImage.altText || `${title} - Handcrafted Bandhani`}
              fill
              priority={active === 0}
              sizes="(min-width: 1280px) 45vw, (min-width: 1024px) 50vw, (min-width: 768px) 60vw, 100vw"
              className="object-cover pointer-events-none"
            />
          </div>

          {/* Badge: Pure Craft Authentic Mark */}
          <div className="absolute top-3.5 left-3.5 pointer-events-none z-10 flex items-center gap-1.5 bg-cream/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-ink/10 text-ink shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-maroon animate-pulse" />
            <span className="text-[10px] tracking-widest2 uppercase font-medium">
              Hand-Tied Knotwork
            </span>
          </div>

          {/* Image Counter Pill (Mobile & Desktop) */}
          {images.length > 1 && (
            <div className="absolute bottom-3.5 right-3.5 pointer-events-none z-10 bg-bark/70 text-cream backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] tracking-wider font-mono">
              {active + 1} / {images.length}
            </div>
          )}

          {/* Lightbox / Zoom hint icon */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            aria-label="Open fullscreen image view"
            className="absolute bottom-3.5 left-3.5 z-10 w-8 h-8 rounded-full bg-cream/85 hover:bg-cream backdrop-blur-md border border-ink/15 text-ink flex items-center justify-center shadow-sm opacity-90 hover:opacity-100 transition-opacity"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
        </div>

        {/* Mobile Swipe / Arrow hints when multiple images */}
        {images.length > 1 && (
          <div className="flex lg:hidden items-center justify-between mt-2.5 px-1">
            <button
              type="button"
              onClick={() => setActive((prev) => Math.max(0, prev - 1))}
              disabled={active === 0}
              className="text-[11px] uppercase tracking-widest2 text-ink/50 disabled:opacity-20 flex items-center gap-1 hover:text-maroon transition-colors"
            >
              ‹ Prev
            </button>
            <div className="flex gap-1.5 items-center">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-maroon" : "w-1.5 bg-ink/20"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setActive((prev) => Math.min(images.length - 1, prev + 1))
              }
              disabled={active === images.length - 1}
              className="text-[11px] uppercase tracking-widest2 text-ink/50 disabled:opacity-20 flex items-center gap-1 hover:text-maroon transition-colors"
            >
              Next ›
            </button>
          </div>
        )}
      </div>

      {/* ── Fullscreen Lightbox Modal ── */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Product full resolution image viewer"
          className="fixed inset-0 z-[500] bg-bark/95 backdrop-blur-lg flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Header Bar */}
          <div
            className="w-full flex items-center justify-between text-cream/80 max-w-6xl pb-4 border-b border-cream/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[12px] uppercase tracking-widest2 font-light">
              {title} <span className="text-cream/40">({active + 1} of {images.length})</span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center text-cream transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Central Image View */}
          <div
            className="relative w-full max-w-4xl flex-1 my-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh] sm:h-[75vh]">
              <Image
                src={currentImage.url}
                alt={currentImage.altText || `${title} magnified`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Prev / Next navigation buttons in lightbox */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActive((prev) =>
                      prev > 0 ? prev - 1 : images.length - 1
                    )
                  }
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/15 hover:bg-cream/30 text-cream backdrop-blur-md flex items-center justify-center transition-all"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActive((prev) =>
                      prev < images.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/15 hover:bg-cream/30 text-cream backdrop-blur-md flex items-center justify-center transition-all"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Lightbox thumbnail row */}
          {images.length > 1 && (
            <div
              className="flex gap-2 max-w-full overflow-x-auto py-2 no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative w-12 h-16 rounded-sm overflow-hidden border transition-all ${
                    i === active
                      ? "border-haldi ring-2 ring-haldi scale-105"
                      : "border-cream/20 opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
