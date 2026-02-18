"use client"

import { ReferenceFields } from './ReferenceFields'

export function PersonalReferencesForm() {
  return (
    <ReferenceFields
      prefix="personalRefs"
      title="Dos referencias personales"
      subtitle="(Que no vivan contigo)"
    />
  )
}

