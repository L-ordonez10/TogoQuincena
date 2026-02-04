"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ErrorMessage } from "@/components/ui/error-message";
import { useFormCtx } from "./FormContext";
import { sanitizeDigits } from "@/lib/utils";

const GRID_CLASSES = "grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 max-w-2xl mx-auto";
const INPUT_CLASSES = "border-none shadow-[0px_4px_4px_0px_#00000040]";
const TITLE_CLASSES = "text-[#94CE29] hover:text-black transition-colors duration-200 text-left font-bold text-lg lg:text-4xl mb-12";
const SUB_TITLE_CLASSES = "md:col-span-2 text-black hover:text-[#97D22A] transition-colors duration-200 font-bold text-lg lg:text-3xl";

export function PersonalDataForm() {
  const { data, setField, errors } = useFormCtx();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField("personal.phone", sanitizeDigits(e.target.value));
  };

  const handlePhoneWorkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField("personal.phoneWork", sanitizeDigits(e.target.value));
  }

  const handleDpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField("personal.dpi", sanitizeDigits(e.target.value));
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

        <Field className="lg:col-span-2">
          <FieldLabel className="text-base font-normal">Género</FieldLabel>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="gender-male"
                className="w-5 h-5"
                checked={data.personal.gender === 'masculino'}
                onCheckedChange={(checked) => {
                  if (checked) setField("personal.gender", 'masculino');
                }}
              />
              <label htmlFor="gender-male" className="text-base cursor-pointer">
                Masculino
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="gender-female"
                className="w-5 h-5"
                checked={data.personal.gender === 'femenino'}
                onCheckedChange={(checked) => {
                  if (checked) setField("personal.gender", 'femenino');
                }}
              />
              <label htmlFor="gender-female" className="text-base cursor-pointer">
                Femenino
              </label>
            </div>
          </div>
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
        <Field className="lg:col-span-2">
          <FieldLabel className="text-base font-normal">Dirección residencial</FieldLabel>
          <Input
            type="text"
            value={data.personal.address}
            className={INPUT_CLASSES}
            onChange={(e) => setField("personal.address", e.target.value)}
          />
          <ErrorMessage message={errors["personal.address"]} />
        </Field>
        <h2 className={SUB_TITLE_CLASSES}>
          Datos laborales
        </h2>
        <Field >
          <FieldLabel className="text-base font-normal">Nombre del trabajo</FieldLabel>
          <Input
            type="text"
            value={data.personal.workName}
            className={INPUT_CLASSES}
            onChange={(e) => setField("personal.workName", e.target.value)}
          />
          <ErrorMessage message={errors["personal.workName"]} />
        </Field>
        <Field>
          <FieldLabel className="text-base font-normal">Teléfono del trabajo</FieldLabel>
          <Input
            type="tel"
            inputMode="tel"
            pattern="[0-9]*"
            value={data.personal.phoneWork}
            className={INPUT_CLASSES}
            onChange={handlePhoneWorkChange}
          />
          <ErrorMessage message={errors["personal.phoneWork"]} />
        </Field>
        <Field className="lg:col-span-2">
          <FieldLabel className="text-base font-normal">Dirección del trabajo</FieldLabel>
          <Input
            type="text"
            value={data.personal.addressWork}
            className={INPUT_CLASSES}
            onChange={(e) => setField("personal.addressWork", e.target.value)}
          />
          <ErrorMessage message={errors["personal.addressWork"]} />
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
