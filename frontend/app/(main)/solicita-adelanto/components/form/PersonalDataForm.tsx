"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ErrorMessage } from "@/components/ui/error-message";
import { useFormCtx } from "./FormContext";

const GRID_CLASSES = "grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 max-w-2xl mx-auto";
const INPUT_CLASSES = "border-none shadow-[0px_4px_4px_0px_#00000040]";
const TITLE_CLASSES = "text-[#94CE29] hover:text-black transition-colors duration-200 text-left font-bold text-lg lg:text-4xl mb-12";

const sanitizeDigitsOnly = (value: string): string => value.replace(/\D/g, "");

export function PersonalDataForm() {
  const { data, setField, errors } = useFormCtx();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField("personal.phone", sanitizeDigitsOnly(e.target.value));
  };

  const handleDpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField("personal.dpi", sanitizeDigitsOnly(e.target.value));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setField("personal.hasSixMonths", checked);
  };

  return (
    <div>
      <h2 className={TITLE_CLASSES}>Completa datos personales</h2>

      <div className={GRID_CLASSES}>
        <Field className="lg:col-span-2">
          <FieldLabel className="text-base font-normal">Nombres</FieldLabel>
          <Input
            type="text"
            value={data.personal.names}
            className={INPUT_CLASSES}
            onChange={(e) => setField("personal.names", e.target.value)}
          />
          <ErrorMessage message={errors["personal.names"]} />
        </Field>

        <Field className="lg:col-span-2">
          <FieldLabel className="text-base font-normal">Apellidos</FieldLabel>
          <Input
            type="text"
            value={data.personal.surnames}
            className={INPUT_CLASSES}
            onChange={(e) => setField("personal.surnames", e.target.value)}
          />
          <ErrorMessage message={errors["personal.surnames"]} />
        </Field>

        <Field>
          <FieldLabel className="text-base font-normal">Apellido de casada</FieldLabel>
          <Input
            type="text"
            value={data.personal.marriedLastName}
            className={INPUT_CLASSES}
            onChange={(e) => setField("personal.marriedLastName", e.target.value)}
          />
          <ErrorMessage message={errors["personal.marriedLastName"]} />
        </Field>

        <Field>
          <FieldLabel className="text-base font-normal">Fecha de nacimiento</FieldLabel>
          <Input
            type="date"
            value={data.personal.birthDate}
            className={INPUT_CLASSES}
            onChange={(e) => setField("personal.birthDate", e.target.value)}
          />
          <ErrorMessage message={errors["personal.birthDate"]} />
        </Field>

        <Field>
          <FieldLabel className="text-base font-normal">Número de teléfono</FieldLabel>
          <Input
            type="tel"
            inputMode="tel"
            pattern="[0-9]*"
            value={data.personal.phone}
            className={INPUT_CLASSES}
            onChange={handlePhoneChange}
          />
          <ErrorMessage message={errors["personal.phone"]} />
        </Field>

        <Field>
          <FieldLabel className="text-base font-normal">No. de DPI</FieldLabel>
          <Input
            type="text"
            value={data.personal.dpi}
            className={INPUT_CLASSES}
            onChange={handleDpiChange}
          />
          <ErrorMessage message={errors["personal.dpi"]} />
        </Field>

        <Field className="lg:col-span-2">
          <FieldLabel className="text-base font-normal">Correo electrónico</FieldLabel>
          <Input
            type="text"
            value={data.personal.email}
            className={INPUT_CLASSES}
            onChange={(e) => setField("personal.email", e.target.value)}
          />
          <ErrorMessage message={errors["personal.email"]} />
        </Field>
      </div>

      <div className="flex flex-col items-center my-20 max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
          <Checkbox
            id="employmentLength"
            className="w-6 h-6"
            checked={!!data.personal.hasSixMonths}
            onCheckedChange={handleCheckboxChange}
          />
          <label htmlFor="employmentLength" className="text-base lg:text-lg">
            Llevo 6 o más meses trabajando en este empleo.
          </label>
        </div>
        <ErrorMessage message={errors["personal.hasSixMonths"]} />
      </div>
    </div>
  );
}
