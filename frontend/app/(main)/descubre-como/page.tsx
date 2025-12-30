import React, { Suspense } from "react"
import { DiscoverHowSection, StepSection } from "./components"
import ScrollToStepsClient from "./components/ScrollToStepsClient"

export default function page() {
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
