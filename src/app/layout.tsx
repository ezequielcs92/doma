import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import AnalyticsConsentBanner from "@/components/AnalyticsConsentBanner";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import GoogleAdsTag from "@/components/GoogleAdsTag";
import PageViewTracker from "@/components/PageViewTracker";
import { MAINTENANCE_MODE } from "@/lib/maintenance";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-mont",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DOMA Sculpt Center | Cirugía Estética de Alta Gama",
  description:
    "Centro de cirugía estética con evaluación personalizada, definición corporal, liposucción y medicina estética.",
  keywords: [
    "cirugía estética",
    "liposucción",
    "definición corporal",
    "medicina estética",
    "DOMA Sculpt",
  ],
  openGraph: {
    title: "DOMA Sculpt Center | Cirugía Estética de Alta Gama",
    description:
      "Centro de cirugía estética con evaluación personalizada y seguimiento profesional.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} font-mont antialiased`}>
        {/* In maintenance the page stands alone: no tracking, consent banner or floating button */}
        {!MAINTENANCE_MODE && <PageViewTracker />}
        {children}
        {!MAINTENANCE_MODE && (
          <>
            {/* useSearchParams needs a Suspense boundary so pages stay static */}
            <Suspense fallback={null}>
              <FloatingWhatsApp />
            </Suspense>
            <AnalyticsConsentBanner />
            <GoogleAdsTag />
          </>
        )}
      </body>
    </html>
  );
}
