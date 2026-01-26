import { z } from 'zod';

// Personal Data Schema
export const personalDataSchema = z.object({
  names: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  surnames: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  marriedLastName: z.string().optional(),
  birthDate: z.string().optional(),
  phone: z.string().regex(/^\d{8,15}$/, 'El teléfono debe tener entre 8 y 15 dígitos'),
  dpi: z.string().regex(/^\d{13}$/, 'El DPI debe tener exactamente 13 dígitos'),
  email: z.string().email('El email no es válido'),
  address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  workName: z.string().min(2, 'El nombre de la empresa debe tener al menos 2 caracteres'),
  addressWork: z.string().min(5, 'La dirección de trabajo debe tener al menos 5 caracteres'),
  phoneWork: z.string().regex(/^\d{8,15}$/, 'El teléfono debe tener entre 8 y 15 dígitos'),
  hasSixMonths: z.boolean().optional(),
});

// Reference Schema
export const referenceSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  phone: z.string().regex(/^\d{8,15}$/, 'El teléfono debe tener entre 8 y 15 dígitos'),
});

// Legal Schema
export const legalSchema = z.object({
  acceptance: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar la Cláusula de Aceptación',
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar la Cláusula de Consentimiento',
  }),
});

// Complete Form Data Schema
export const formDataSchema = z.object({
  personal: personalDataSchema,
  personalRefs: z.array(referenceSchema).length(2, 'Debes proporcionar exactamente 2 referencias personales'),
  workRefs: z.array(referenceSchema).length(2, 'Debes proporcionar exactamente 2 referencias de trabajo'),
  salary: z.number().min(3000, 'El salario debe ser al menos Q3,000'),
  amountRequested: z.number().min(100, 'El monto debe ser al menos Q100'),
  source: z.string().min(5, 'Por favor cuéntanos cómo nos conociste (mínimo 5 caracteres)').optional(),
  legal: legalSchema,
});

// Type inference
export type PersonalDataInput = z.infer<typeof personalDataSchema>;
export type ReferenceInput = z.infer<typeof referenceSchema>;
export type LegalInput = z.infer<typeof legalSchema>;
export type FormDataInput = z.infer<typeof formDataSchema>;
