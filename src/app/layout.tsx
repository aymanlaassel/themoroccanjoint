import type { Metadata } from "next";
import { Cormorant, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://themoroccanjoint.com"),
  title: { default: "The Moroccan Joint", template: "%s · The Moroccan Joint" },
  description:
    "Moroccan food made in Miami with the warmth of home. Slow-cooked tajines, Friday couscous, fresh msemen, paninis, bocadillos and mint tea, prepared with halal ingredients. Delivery and pickup daily 4 PM to 12:10 AM.",
  openGraph: {
    title: "The Moroccan Joint",
    description: "Moroccan food made in Miami with the warmth of home.",
    images: ["/img/couscous.jpg"],
  },
  icons: { icon: "/icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${openSans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <Toast />
      </body>
    </html>
  );
}
