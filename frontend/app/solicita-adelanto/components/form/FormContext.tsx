"use client"

import React, { createContext, useContext, useState } from 'react';

type Personal = {
  firstName: string;
  secondName?: string;
  thirdName?: string;
  lastName: string;
  secondLastName?: string;
  marriedLastName?: string;
  birthDate?: string;
  phone?: string;
  dpi?: string;
  email?: string;
  hasSixMonths?: boolean;
};

type Uploads = {
  dpi?: File | null;
  bankStatements?: File | null;
  electricityBill?: File | null;
  selfieWithDpi?: File | null;
};

type Reference = { name: string; phone: string };
type Legal = { acceptance: boolean; consent: boolean };

type FormData = {
  personal: Personal;
  uploads: Uploads;
  personalRefs: Reference[];
  workRefs: Reference[];
  salary: number;
  source?: string;
  legal: Legal;
};

type FormErrors = Partial<Record<string, string>>;

type FormContextValue = {
  data: FormData;
  errors: FormErrors;
  setField: (path: string, value: unknown) => void;
  validateSection: (section: string) => boolean;
  validateAll: () => boolean;
  reset: () => void;
};

const FormContext = createContext<FormContextValue | null>(null);

export const useFormCtx = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('FormContext not found');
  return ctx;
};

const initialData: FormData = {
  personal: { firstName: '', lastName: '', email: '', hasSixMonths: false },
  uploads: {},
  personalRefs: [{ name: '', phone: '' }, { name: '', phone: '' }],
  workRefs: [{ name: '', phone: '' }, { name: '', phone: '' }],
  salary: 0,
  source: '',
  legal: { acceptance: false, consent: false },
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});

  const setField = (path: string, value: unknown) => {
    setData(prev => {
      const parts = path.split('.');
      const clone: any = structuredClone(prev);
      let cursor = clone;
      for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        cursor[key] = cursor[key] ?? {};
        cursor = cursor[key];
      }
      cursor[parts[parts.length - 1]] = value;
      return clone;
    });
    setErrors(prev => {
      const next = { ...prev };
      delete next[path];
      return next;
    });
  };

  const validateSection = (section: string) => {
    const nextErrors: FormErrors = {};
    // Ejemplos de validación por sección
    if (section === 'personal') {
      if (!data.personal.firstName) nextErrors['personal.firstName'] = 'Requerido';
      if (!data.personal.lastName) nextErrors['personal.lastName'] = 'Requerido';
      if (!data.personal.birthDate) nextErrors['personal.birthDate'] = 'Requerido';
      if (data.personal.birthDate) {
        const birth = new Date(data.personal.birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          age--;
        }
        if (age < 18) {
          nextErrors['personal.birthDate'] = 'Debes ser mayor de edad';
        }
      }
      if (!data.personal.phone || !/^\d+$/.test(data.personal.phone)) nextErrors['personal.phone'] = 'Teléfono inválido';
      if (!data.personal.phone) nextErrors['personal.phone'] = 'Requerido';
      if (!data.personal.dpi) nextErrors['personal.dpi'] = 'Requerido';
      if (!data.personal.dpi || !/^\d+$/.test(data.personal.dpi)) nextErrors['personal.dpi'] = 'DPI inválido';
      if (!data.personal.email || !/^\S+@\S+\.\S+$/.test(data.personal.email))
        nextErrors['personal.email'] = 'Email inválido';
      if (data.personal.hasSixMonths === false) {
        nextErrors['personal.hasSixMonths'] = 'Debes tener al menos 6 meses en tu empleo actual';
      }
      // edad ≥ 25 si hay fecha, etc.
    }
    if (section === 'uploads') {
      if (!data.uploads.dpi) nextErrors['uploads.dpi'] = 'DPI requerido';
      if (!data.uploads.electricityBill) nextErrors['uploads.electricityBill'] = 'Recibo requerido';
    }
    if (section === 'personalRefs') {
      data.personalRefs.forEach((r, i) => {
        if (!r.name) nextErrors[`personalRefs.${i}.name`] = 'Requerido';
        if (!r.phone) nextErrors[`personalRefs.${i}.phone`] = 'Requerido';
      });
    }
    if (section === 'workRefs') {
      data.workRefs.forEach((r, i) => {
        if (!r.name) nextErrors[`workRefs.${i}.name`] = 'Requerido';
        if (!r.phone) nextErrors[`workRefs.${i}.phone`] = 'Requerido';
      });
    }
    if (section === 'summary') {
      if (!data.salary || data.salary <= 0) nextErrors['salary'] = 'Salario inválido';
      if (!data.source) nextErrors['source'] = 'Fuente requerida';
      if (!data.legal.acceptance) nextErrors['legal.acceptance'] = 'Acepta la cláusula';
      if (!data.legal.consent) nextErrors['legal.consent'] = 'Acepta el consentimiento';
    }
    setErrors(prev => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const validateAll = () => {
    const sections = ['personal', 'uploads', 'personalRefs', 'workRefs', 'summary'];
    setErrors({});
    let allOk = true;
    for (const s of sections) {
      const ok = validateSection(s);
      if (!ok) allOk = false;
    }
    return allOk;
  };

  const reset = () => {
    setData(initialData);
    setErrors({});
  };

  return (
    <FormContext.Provider value={{ data, errors, setField, validateSection, validateAll, reset }}>
      {children}
    </FormContext.Provider>
  );
};