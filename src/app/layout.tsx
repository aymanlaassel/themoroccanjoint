import type { Metadata } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://themoroccanjoint.com"),
  title: { default: "The Moroccan Joint", template: "%s · The Moroccan Joint" },
  description:
    "Halal Moroccan kitchen in Miami. Slow-cooked tajines, Friday couscous, msemen, paninis, bocadillos and mint tea, delivered daily 4 PM to 12:10 AM.",
  openGraph: {
    title: "The Moroccan Joint",
    description: "Moroccan food made in Miami with the warmth of home.",
    images: ["/img/couscous.jpg"],
  },
  icons: { icon: "/icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${cormorant.variable} ${hanken.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
