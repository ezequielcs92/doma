import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PageViewTracker from "@/components/PageViewTracker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-mont",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DOMA Sculpt Center | Cirugía Estética de Alta Gama",
  description:
    "Centro de cirugía estética con tecnología de vanguardia. Definición corporal, liposucción y medicina estética avanzada con los mejores profesionales.",
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
      "Centro de cirugía estética con tecnología de vanguardia y los mejores profesionales.",
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
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}


