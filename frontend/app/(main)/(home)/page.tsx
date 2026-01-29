import { Metadata } from "next";
import Image from "next/image";
import { AboutUsSection, HeroSection, WhyChooseSection, HowItWorksSection, BenefitsSection } from "./components";
import { OrganizationSchema, WebSiteSchema, ServiceSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Adelantos de quincena fácil y rápido. Obtén tu dinero antes de la fecha de pago sin complicaciones. Proceso 100% en línea, aprobación rápida y sin requisitos complicados.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "QuincenaToGo - Adelantos de quincena fácil y rápido",
    description: "Obtén tu dinero antes de la fecha de pago sin complicaciones. Proceso 100% en línea, aprobación rápida y sin requisitos complicados.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuincenaToGo - Adelantos de quincena fácil y rápido",
    description: "Obtén tu dinero antes de la fecha de pago sin complicaciones. Proceso 100% en línea.",
  },
};

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <ServiceSchema />
      
      <HeroSection />
      <AboutUsSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <BenefitsSection />
    </>
  );
}

