import { Metadata } from "next";
import { DiscoverHowSection, FormSection } from "./components"
import { FormProvider } from "./components/form/FormContext"

export const metadata: Metadata = {
  title: "Solicita tu Adelanto",
  description: "Solicita tu adelanto de quincena ahora. Proceso rápido y 100% en línea. Completa el formulario y obtén tu dinero en minutos. Sin complicaciones ni requisitos difíciles.",
  alternates: {
    canonical: "/solicita-adelanto",
  },
  openGraph: {
    title: "Solicita tu Adelanto | QuincenaToGo",
    description: "Proceso rápido y 100% en línea. Completa el formulario y obtén tu dinero en minutos.",
    url: "/solicita-adelanto",
  },
};

export default function SolicitaAdelantoPage() {
    return (
        <div>
            <DiscoverHowSection />
            <FormSection />
        </div>
    )
}
