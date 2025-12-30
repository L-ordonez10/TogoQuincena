import React, { Suspense } from "react"
import NosotrosClient from "./NosotrosClient"

export default function NosotrosPage() {
  return (
    <div>
      <Suspense fallback={null}>
        <NosotrosClient />
      </Suspense>
    </div>
  )
}