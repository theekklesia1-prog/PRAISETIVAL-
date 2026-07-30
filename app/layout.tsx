import type { Metadata } from "next";
import { Figtree, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Praisetival — A Sound of Heaven on Earth",
  description:
    "Praisetival is a worship movement — a convergence of faith, culture, and sound where thousands gather for revival, heartfelt worship, and spiritual renewal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white text-ink">
        <SmoothScroll>
          <Navbar />
          {/* clip (not hidden) so slide-in reveal animations don't create a
              horizontal page scroll, without breaking the sticky navbar */}
          <main className="overflow-x-clip">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
