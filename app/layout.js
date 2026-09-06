import "./globals.css";
import { CartProvider } from "./cart-context";
import CartDrawer from "@/components/CartDrawer";

export const metadata = {
  title: "Vanza Bandhej — Elegance of Bandhej",
  description:
    "A home for authentic bandhani, tied by hand — every dot a story, every colour steeped in tradition, straight from the artisans of Gujarat.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-ink font-body antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
