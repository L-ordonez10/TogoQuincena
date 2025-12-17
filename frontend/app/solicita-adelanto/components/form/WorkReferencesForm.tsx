"use client"

import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useFormCtx } from './FormContext'

export function WorkReferencesForm() {
    const { data, setField, errors } = useFormCtx()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 mt-6 max-w-2xl w-full mx-auto mb-12">
            <h2 className="md:col-span-2 text-black hover:text-[#97D22A] transition-colors duration-200 font-bold text-lg lg:text-3xl">
                Dos referencias de trabajo <br />
                <span className="font-normal text-base lg:text-lg text-black">
                    (Actual)
                </span>
            </h2>

            <Field>
                <FieldLabel className="text-base font-normal">
                    Nombre (Un nombre y apellido)
                </FieldLabel>
                <Input
                    type="text"
                    value={data.workRefs[0].name}
                    onChange={(e) =>
                        setField('workRefs.0.name', e.target.value)
                    }
                    className="border-none shadow-[0px_4px_4px_0px_#00000040]"
                />
                {errors['workRefs.0.name'] && (
                    <div className="text-rose-500 font-bold text-sm">
                        {errors['workRefs.0.name']}
                    </div>
                )}
            </Field>

            <Field>
                <FieldLabel className="text-base font-normal">
                    Número de teléfono
                </FieldLabel>
                <Input
                    type="tel"
                    value={data.workRefs[0].phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const digits = e.target.value.replace(/\D/g, '')
                        setField('workRefs.0.phone', digits)
                    }}
                    className="border-none shadow-[0px_4px_4px_0px_#00000040]"
                />
                {errors['workRefs.0.phone'] && (
                    <div className="text-rose-500 font-bold text-sm">
                        {errors['workRefs.0.phone']}
                    </div>
                )}
            </Field>


            <Field>
                <FieldLabel className="text-base font-normal">
                    Nombre (Un nombre y apellido)
                </FieldLabel>
                <Input
                    type="text"
                    value={data.workRefs[1].name}
                    onChange={(e) =>
                        setField('workRefs.1.name', e.target.value)
                    }
                    className="border-none shadow-[0px_4px_4px_0px_#00000040]"
                />
                {errors['workRefs.1.name'] && (
                    <div className="text-rose-500 font-bold text-sm">
                        {errors['workRefs.1.name']}
                    </div>
                )}
            </Field>

            <Field>
                <FieldLabel className="text-base font-normal">
                    Número de teléfono
                </FieldLabel>
                <Input
                    type="tel"
                    value={data.workRefs[1].phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const digits = e.target.value.replace(/\D/g, '')
                        setField('workRefs.1.phone', digits)
                    }}
                    className="border-none shadow-[0px_4px_4px_0px_#00000040]"
                />
                {errors['workRefs.1.phone'] && (
                    <div className="text-rose-500 font-bold text-sm">
                        {errors['workRefs.1.phone']}
                    </div>
                )}
            </Field>
        </div>
    )
}
