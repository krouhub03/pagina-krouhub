import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import SpotlightBackground from "../components/ui/SpotlightBackground";
import SmoothScroller from "../components/ui/SmoothScroller";
import GoogleAnalytics from "../components/analytics/GoogleAnalytics";
import MetricoolTracker from "../components/analytics/Metricool";
import MetaPixel from "../components/analytics/MetaPixel";
import WhatsAppButton from "../components/shared/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.krouhub.com'),
  title: {
    default: "KrouHub | Servicios Digitales y Desarrollo Web",
    template: "%s | KrouHub",
  },
  description: "Transformamos ideas en soluciones digitales. Desarrollo Web y Automatizaciones a medida para tu empresa.",
  keywords: ["Desarrollo Web", "Automatización", "SEO", "Diseño Web", "Colombia", "KrouHub"],
  authors: [{ name: "KrouHub Team" }],
  creator: "BrianKrou",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.krouhub.com",
    title: "KrouHub | Servicios Digitales",
    description: "Impulsa tu negocio con tecnología de vanguardia. Sitios web rápidos y automatización inteligente.",
    siteName: "KrouHub",
    images: [
      {
        url: "/og-image.jpg", // Asegúrate de tener esta imagen en public/
        width: 1200,
        height: 630,
        alt: "KrouHub Servicios Digitales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KrouHub | Servicios Digitales",
    description: "Soluciones web y automatizaciones para escalar tu negocio.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <MetricoolTracker />
        <MetaPixel />
        <SmoothScroller />
        <SpotlightBackground />
        <Header />
        {children}
        <WhatsAppButton />
        <footer className="py-10 border-t border-white/5 text-center relative z-10 snap-start bg-[#020617]">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} KrouHub Servicios Digitales.
          </p>
        </footer>
      </body>
    </html>
  );
}
