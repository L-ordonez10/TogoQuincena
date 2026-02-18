import { Metadata } from "next";
import React, { Suspense } from "react"
import { DiscoverHowSection, StepSection } from "./components"
import ScrollToStepsClient from "./components/ScrollToStepsClient"

export const metadata: Metadata = {
  title: "Descubre Cómo Funciona",
  description: "Descubre cómo funciona QuincenaToGo en 3 simples pasos. Proceso transparente, rápido y seguro para obtener tu adelanto de quincena. Conoce todos los detalles.",
  alternates: {
    canonical: "/descubre-como",
  },
  openGraph: {
    title: "Descubre Cómo Funciona | QuincenaToGo",
    description: "Proceso transparente, rápido y seguro para obtener tu adelanto de quincena en 3 simples pasos.",
    url: "/descubre-como",
  },
};

export default function DescubreComoPage() {
  return (
    <div>
      <Suspense fallback={null}>
        <DiscoverHowSection />
      </Suspense>

      <StepSection />

      <Suspense fallback={null}>
        <ScrollToStepsClient />
      </Suspense>
    </div>
  )
}
