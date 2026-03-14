import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import Footer from "../components/layout/Footer";
import SpotlightBackground from "../components/ui/SpotlightBackground";
import SmoothScroller from "../components/ui/SmoothScroller";
import { GoogleTagManager } from "@next/third-parties/google";
import WhatsAppButton from "../components/shared/WhatsAppButton";
import MetricoolTracker from "../components/analytics/Metricool";
import Clarity from "../components/analytics/Clarity";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metadatos globales de la pagina web SEO 

export const metadata: Metadata = {
  metadataBase: new URL('https://www.krouhub.com'),
  title: {
    default: "KrouHub | Servicios Digitales y Desarrollo Web",
    template: "%s | KrouHub",
  },
  description: "Transformamos ideas en soluciones digitales. Desarrollo Web y Automatizaciones a medida para tu empresa.",
  keywords: ["Desarrollo Web", "Automatización", "SEO", "Paginas Web", "Colombia", "KrouHub"],
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
        url: "/seoGeneral.png", // Asegúrate de tener esta imagen en public/
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
    images: ["/seoGeneral.png"],
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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        <MetricoolTracker />
        <Clarity />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroller />
          <SpotlightBackground />
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
