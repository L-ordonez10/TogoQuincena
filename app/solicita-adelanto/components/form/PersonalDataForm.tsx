"use client"

import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormCtx } from './FormContext';

export function PersonalDataForm() {
    const { data, setField, errors } = useFormCtx()

    return (
        <div>
            <h2 className='text-[#94CE29] hover:text-black transition-colors duration-200 text-left font-bold text-lg lg:text-4xl mb-12'>
                Completa datos personales
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 max-w-2xl mx-auto'>
                <Field>
                    <FieldLabel className='text-base font-normal'>Primer nombre</FieldLabel>
                    <Input
                        type='text'
                        value={data.personal.firstName}
                        className='border-none shadow-[0px_4px_4px_0px_#00000040]'
                        onChange={(e) => setField('personal.firstName', e.target.value)}
                    />
                    {errors['personal.firstName'] && <div className='text-rose-500 font-bold text-sm'>{errors['personal.firstName']}</div>}
                </Field>
                <Field>
                    <FieldLabel className='text-base font-normal'>Segundo nombre</FieldLabel>
                    <Input
                        type='text'
                        value={data.personal.secondName}
                        className='border-none shadow-[0px_4px_4px_0px_#00000040]'
                        onChange={(e) => setField('personal.secondName', e.target.value)}
                    />
                    {errors['personal.secondName'] && <div className='text-rose-500 font-bold text-sm'>{errors['personal.secondName']}</div>}
                </Field>
                <Field>
                    <FieldLabel className='text-base font-normal'>Tercer nombre</FieldLabel>
                    <Input
                        type='text'
                        value={data.personal.thirdName}
                        className='border-none shadow-[0px_4px_4px_0px_#00000040]'
                        onChange={(e) => setField('personal.thirdName', e.target.value)}
                    />
                    {errors['personal.thirdName'] && <div className='text-rose-500 font-bold text-sm'>{errors['personal.thirdName']}</div>}
                </Field>
                <Field>
                    <FieldLabel className='text-base font-normal'>Primer apellido</FieldLabel>
                    <Input
                        type='text'
                        value={data.personal.lastName}
                        className='border-none shadow-[0px_4px_4px_0px_#00000040]'
                        onChange={(e) => setField('personal.lastName', e.target.value)}
                    />
                    {errors['personal.lastName'] && <div className='text-rose-500 font-bold text-sm'>{errors['personal.lastName']}</div>}
                </Field>
                <Field>
                    <FieldLabel className='text-base font-normal'>Segundo apellido</FieldLabel>
                    <Input
                        type='text'
                        value={data.personal.secondLastName}
                        className='border-none shadow-[0px_4px_4px_0px_#00000040]'
                        onChange={(e) => setField('personal.secondLastName', e.target.value)}
                    />
                    {errors['personal.secondLastName'] && <div className='text-rose-500 font-bold text-sm'>{errors['personal.secondLastName']}</div>}
                </Field>
                <Field>
                    <FieldLabel className='text-base font-normal'>Apelido de casada</FieldLabel>
                    <Input
                        type='text'
                        value={data.personal.marriedLastName}
                        className='border-none shadow-[0px_4px_4px_0px_#00000040]'
                        onChange={(e) => setField('personal.marriedLastName', e.target.value)}
                    />
                    {errors['personal.marriedLastName'] && <div className='text-rose-500 font-bold text-sm'>{errors['personal.marriedLastName']}</div>}
                </Field>
                <Field>
                    <FieldLabel className='text-base font-normal'>Fecha de nacimiento</FieldLabel>
                    <Input
                        type='date'
                        value={data.personal.birthDate}
                        className='border-none shadow-[0px_4px_4px_0px_#00000040]'
                        onChange={(e) => setField('personal.birthDate', e.target.value)}
                    />
                    {errors['personal.birthDate'] && <div className='text-rose-500 font-bold text-sm'>{errors['personal.birthDate']}</div>}
                </Field>
                <Field>
                    <FieldLabel className='text-base font-normal'>Número de teléfono</FieldLabel>
                    <Input
                        type='tel'
                        inputMode='tel'
                        pattern='[0-9]*'
                        value={data.personal.phone}
                        className='border-none shadow-[0px_4px_4px_0px_#00000040]'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const digits = e.target.value.replace(/\D/g, '')
                            setField('personal.phone', digits)
                        }}
                    />
                    {errors['personal.phone'] && <div className='text-rose-500 font-bold text-sm'>{errors['personal.phone']}</div>}
                </Field>
                <Field>
                    <FieldLabel className='text-base font-normal'>No. de DPI</FieldLabel>
                    <Input
                        type='text'
                        value={data.personal.dpi}
                        className='border-none shadow-[0px_4px_4px_0px_#00000040]'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const digits = e.target.value.replace(/\D/g, '')
                            setField('personal.dpi', digits)
                        }}
                    />
                    {errors['personal.dpi'] && <div className='text-rose-500 font-bold text-sm'>{errors['personal.dpi']}</div>}
                </Field>
                <Field>
                    <FieldLabel className='text-base font-normal'>Correo electrónico</FieldLabel>
                    <Input
                        type='text'
                        value={data.personal.email}
                        className='border-none shadow-[0px_4px_4px_0px_#00000040]'
                        onChange={(e) => setField('personal.email', e.target.value)}
                    />
                    {errors['personal.email'] && <div className='text-rose-500 font-bold text-sm'>{errors['personal.email']}</div>}
                </Field>
            </div>
            <div className='flex flex-col items-center my-20 max-w-2xl mx-auto'>
                <div className='flex items-center gap-4'>
                    <Checkbox
                        id='employmentLength'
                        className='w-6 h-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'
                        checked={!!data.personal.hasSixMonths}
                        onCheckedChange={(v) => setField('personal.hasSixMonths', !!v)}
                    />
                    <label htmlFor='employmentLength' className='text-base lg:text-lg'>
                        Llevo 6 o más meses trabajando en este empleo.
                    </label>
                </div>
                {errors['personal.hasSixMonths'] && <div className='mt-2 text-rose-500 font-bold text-sm'>{errors['personal.hasSixMonths']}</div>}
            </div>
        </div>
    )
}
