"use client"

import React from 'react'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useFormCtx } from './FormContext'
import { sanitizeDigits } from '@/lib/utils'

type RefsKey = 'personalRefs' | 'workRefs'

interface ReferenceFieldsProps {
  prefix: RefsKey
  title: string
  subtitle: string
}

export function ReferenceFields({ prefix, title, subtitle }: ReferenceFieldsProps) {
  const { data, setField, errors } = useFormCtx()
  const refs = data[prefix]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 mt-6 max-w-2xl w-full mx-auto mb-12">
      <h2 className="md:col-span-2 text-black hover:text-[#97D22A] transition-colors duration-200 font-bold text-lg lg:text-3xl">
        {title} <br />
        <span className="font-normal text-base lg:text-lg text-black">
          {subtitle}
        </span>
      </h2>

      {refs.map((_, index) => (
        <React.Fragment key={index}>
          <Field>
            <FieldLabel className="text-base font-normal">
              Nombre (Un nombre y apellido)
            </FieldLabel>
            <Input
              type="text"
              value={refs[index].name}
              onChange={(e) => setField(`${prefix}.${index}.name`, e.target.value)}
              className="border-none shadow-[0px_4px_4px_0px_#00000040]"
            />
            {errors[`${prefix}.${index}.name`] && (
              <div className="text-rose-500 font-bold text-sm">
                {errors[`${prefix}.${index}.name`]}
              </div>
            )}
          </Field>

          <Field>
            <FieldLabel className="text-base font-normal">
              Número de teléfono
            </FieldLabel>
            <Input
              type="tel"
              value={refs[index].phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const digits = sanitizeDigits(e.target.value)
                setField(`${prefix}.${index}.phone`, digits)
              }}
              className="border-none shadow-[0px_4px_4px_0px_#00000040]"
            />
            {errors[`${prefix}.${index}.phone`] && (
              <div className="text-rose-500 font-bold text-sm">
                {errors[`${prefix}.${index}.phone`]}
              </div>
            )}
          </Field>
        </React.Fragment>
      ))}
    </div>
  )
}
