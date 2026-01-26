"use client";

import { useCallback } from 'react';
import { isValidEmail, isValidPhone, isValidDPI } from '@/lib/security/sanitize';
import type { FormData } from '@/(main)/solicita-adelanto/components/form/types';

type ValidationErrors = Record<string, string>;

export function useFormValidation() {
  const validateSection = useCallback((section: keyof FormData, data: FormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    switch (section) {
      case 'personal':
        if (!data.personal.names || data.personal.names.trim().length < 2) {
          errors['personal.names'] = 'El nombre debe tener al menos 2 caracteres.';
        }
        if (!data.personal.surnames || data.personal.surnames.trim().length < 2) {
          errors['personal.surnames'] = 'El apellido debe tener al menos 2 caracteres.';
        }
        if (!data.personal.email || !isValidEmail(data.personal.email)) {
          errors['personal.email'] = 'El email no es válido.';
        }
        if (!data.personal.phone || !isValidPhone(data.personal.phone)) {
          errors['personal.phone'] = 'El teléfono debe tener entre 8 y 15 dígitos.';
        }
        if (!data.personal.phoneWork || !isValidPhone(data.personal.phoneWork)) {
          errors['personal.phoneWork'] = 'El teléfono de trabajo debe tener entre 8 y 15 dígitos.';
        }
        if (!data.personal.dpi || !isValidDPI(data.personal.dpi)) {
          errors['personal.dpi'] = 'El DPI debe tener exactamente 13 dígitos.';
        }
        if (!data.personal.address || data.personal.address.trim().length < 5) {
          errors['personal.address'] = 'La dirección debe tener al menos 5 caracteres.';
        }
        if (!data.personal.addressWork || data.personal.addressWork.trim().length < 5) {
          errors['personal.addressWork'] = 'La dirección de trabajo debe tener al menos 5 caracteres.';
        }
        if (!data.personal.workName || data.personal.workName.trim().length < 2) {
          errors['personal.workName'] = 'El nombre de la empresa debe tener al menos 2 caracteres.';
        }
        break;

      case 'personalRefs':
        data.personalRefs.forEach((ref, i) => {
          if (!ref.name || ref.name.trim().length < 3) {
            errors[`personalRefs.${i}.name`] = 'El nombre debe tener al menos 3 caracteres.';
          }
          if (!ref.phone || !isValidPhone(ref.phone)) {
            errors[`personalRefs.${i}.phone`] = 'El teléfono debe tener entre 8 y 15 dígitos.';
          }
        });
        break;

      case 'workRefs':
        data.workRefs.forEach((ref, i) => {
          if (!ref.name || ref.name.trim().length < 3) {
            errors[`workRefs.${i}.name`] = 'El nombre debe tener al menos 3 caracteres.';
          }
          if (!ref.phone || !isValidPhone(ref.phone)) {
            errors[`workRefs.${i}.phone`] = 'El teléfono debe tener entre 8 y 15 dígitos.';
          }
        });
        break;

      case 'uploads':
        if (!data.uploads.dpi) {
          errors['uploads.dpi'] = 'Por favor adjunta tu DPI.';
        }
        if (!data.uploads.bankStatements) {
          errors['uploads.bankStatements'] = 'Por favor adjunta tus estados de cuenta.';
        }
        if (!data.uploads.electricityBill) {
          errors['uploads.electricityBill'] = 'Por favor adjunta tu recibo de luz.';
        }
        if (!data.uploads.selfieWithDpi) {
          errors['uploads.selfieWithDpi'] = 'Por favor adjunta tu selfie con DPI.';
        }
        break;

      case 'salary':
        if (!data.salary || data.salary < 3000) {
          errors['salary'] = 'El salario debe ser al menos Q3,000.';
        }
        break;

      case 'amountRequested':
        if (!data.amountRequested || data.amountRequested < 100) {
          errors['amountRequested'] = 'El monto debe ser al menos Q100.';
        }
        break;

      case 'source':
        if (!data.source || data.source.trim().length < 5) {
          errors['source'] = 'Por favor cuéntanos cómo nos conociste (mínimo 5 caracteres).';
        }
        break;

      case 'legal':
        if (!data.legal.acceptance) {
          errors['legal.acceptance'] = 'Debes aceptar la Cláusula de Aceptación.';
        }
        if (!data.legal.consent) {
          errors['legal.consent'] = 'Debes aceptar la Cláusula de Consentimiento.';
        }
        break;
    }

    return errors;
  }, []);

  const validateAllSections = useCallback((data: FormData): ValidationErrors => {
    const allErrors: ValidationErrors = {};
    const sections: Array<keyof FormData> = [
      'personal',
      'personalRefs',
      'workRefs',
      'uploads',
      'salary',
      'amountRequested',
      'source',
      'legal',
    ];

    sections.forEach((section) => {
      const sectionErrors = validateSection(section, data);
      Object.assign(allErrors, sectionErrors);
    });

    return allErrors;
  }, [validateSection]);

  return {
    validateSection,
    validateAllSections,
  };
}
