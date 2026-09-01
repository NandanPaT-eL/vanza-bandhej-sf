const items = [
  "Tied by hand",
  "Worn with heart",
  "વંઝા બાંધેજ",
  "Authentic bandhani",
  "બાંધણી ની સુંદરતા",
  "Made in Gujarat",
];

export default function Marquee() {
  const track = [...items, ...items];
  return (
    <div className="bg-maroon-dark border-y border-haldi/20 overflow-hidden py-3">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center text-haldi font-display italic text-[15px] px-6 whitespace-nowrap"
          >
            {item}
            <span aria-hidden className="ml-6 text-haldi/40">
              &middot;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
