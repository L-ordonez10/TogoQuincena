import { Metadata } from "next";

export const APP_NAME = "QuincenaToGo";
export const APP_DESCRIPTION = "Adelantos de quincena fácil y rápido. Obtén tu dinero antes de la fecha de pago sin complicaciones. Proceso 100% en línea, aprobación rápida y sin requisitos complicados.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://quincenatogo.com.gt";
export const APP_KEYWORDS = [
  "adelanto de quincena",
  "adelanto de nómina",
  "préstamo de nómina",
  "anticipo de salario",
  "dinero rápido",
  "crédito rápido",
  "préstamo en línea",
  "adelanto salarial",
  "QuincenaToGo",
  "crédito instantáneo"
];

export const defaultMetadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: APP_KEYWORDS,
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  publisher: APP_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: APP_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: "/imagenes/LogoQuincenaToGo.svg",
        width: 1200,
        height: 630,
        alt: `${APP_NAME} - Adelantos de quincena`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ["/imagenes/LogoQuincenaToGo.svg"],
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
  verification: {
    // Agregar códigos de verificación cuando estén disponibles
    // google: "código-de-google",
    // yandex: "código-de-yandex",
  },
};
