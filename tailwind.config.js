/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F3E9D3",
        "cream-dark": "#EBDCB9",
        maroon: {
          DEFAULT: "#5C0F1B",
          dark: "#450B14",
          deep: "#3A0A11",
        },
        sindoor: "#C3202E",
        haldi: "#D3A628",
        neel: "#1F4E79",
        kesari: "#C1602C",
        ink: "#241812",
        bark: "#1B120E",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      backgroundImage: {
        dots:
          "radial-gradient(circle, rgba(243,233,211,0.55) 1px, transparent 1.4px)",
      },
      backgroundSize: {
        dots: "16px 16px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};
