import { Metadata } from "next";
import React, { Suspense } from "react"
import NosotrosClient from "./NosotrosClient"

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce a QuincenaToGo, tu aliado financiero para adelantos de quincena. Nuestra misión es brindarte soluciones rápidas y transparentes para tus necesidades económicas inmediatas.",
  alternates: {
    canonical: "/nosotros",
  },
  openGraph: {
    title: "Nosotros | QuincenaToGo",
    description: "Conoce nuestra misión de brindarte soluciones rápidas y transparentes para tus necesidades económicas inmediatas.",
    url: "/nosotros",
  },
};

export default function NosotrosPage() {
  return (
    <div>
      <Suspense fallback={null}>
        <NosotrosClient />
      </Suspense>
    </div>
  )
}