"use client"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DiscoverHowSection, StepSection } from "./components"

export default function page() {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!searchParams) return
    const section = searchParams.get('section')
    if (!section) return

    if (section.toLowerCase() === 'pasos') {
      const el = document.getElementById('steps-section')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [searchParams?.toString()])

  return (
    <div>
      <DiscoverHowSection />
      <StepSection />
    </div>
  )
}
