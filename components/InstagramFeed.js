// InstagramFeed.js — Static section linking to Vanza Bandhej Instagram.
// Replace the grid placeholders with real Embed API images once the
// Instagram Basic Display API token is configured (see Shopify guide doc).

const IG_HANDLE = "vanzabandhejanand";
const IG_URL    = "https://www.instagram.com/vanzabandhejanand";

// Instagram-style placeholder posts (styled with fabric gradients)
const MOCK_POSTS = [
  { id: 1, fabric: "fabric-sindoor",  caption: "Bridal bandhani — every knot a blessing." },
  { id: 2, fabric: "fabric-haldi",    caption: "The golden hour of the dupatta." },
  { id: 3, fabric: "fabric-kholna",   caption: "Dark silk, rich heritage." },
  { id: 4, fabric: "fabric-kesari",   caption: "Saffron threads of tradition." },
  { id: 5, fabric: "fabric-neel",     caption: "Monsoon blues in every tie." },
  { id: 6, fabric: "fabric-sindoor",  caption: "Wedding season collection — 2026." },
];

export default function InstagramFeed() {
  return (
    <section className="py-20 md:py-28 bg-cream-dark border-t border-ink/[0.06]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[11px] tracking-widest2 uppercase text-maroon mb-3">
              {/* Instagram logo icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              Follow us on Instagram
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-ink">
              @{IG_HANDLE}
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-ink/60 max-w-md">
              Daily glimpses of the craft — from the karigar&apos;s courtyard to your wardrobe.
            </p>
          </div>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-maroon text-cream px-6 py-3 rounded-full text-[11px] tracking-widest2 uppercase hover:bg-maroon-dark transition-colors shrink-0"
          >
            Follow on Instagram
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {MOCK_POSTS.map((post) => (
            <a
              key={post.id}
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={post.caption}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-md"
            >
              {/* Fabric texture placeholder (replace with <img> from API) */}
              <div className={`fabric ${post.fabric} w-full h-full transition-transform duration-500 group-hover:scale-110`} />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none" />
                  </svg>
                  <p className="text-white text-[10px] leading-snug line-clamp-2">{post.caption}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-ink/40 tracking-widest2 uppercase">
          Connect with us · Share your look with <span className="text-maroon">#VanzaBandhej</span>
        </p>
      </div>
    </section>
  );
}
