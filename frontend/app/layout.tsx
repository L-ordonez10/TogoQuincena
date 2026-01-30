import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./providers/QueryProvider";
import { defaultMetadata } from "./lib/constants";
import { GoogleTagManager } from '@next/third-parties/google'
import { GoogleAnalytics } from "@next/third-parties/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <GoogleTagManager gtmId="GTM-5BSXBBH9'" />
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
      <GoogleAnalytics gaId="G-L0R428MLM2" />
    </html>
  );
}
