"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { FormData, FormErrors, FormSection } from "./types";
import { validateSection as validateSectionFn, validateAll as validateAllFn } from "./validation";

interface FormContextValue {
  data: FormData;
  errors: FormErrors;
  setField: (path: string, value: unknown) => void;
  validateSection: (section: FormSection) => boolean;
  validateAll: () => boolean;
  reset: () => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useFormCtx = () => {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error("useFormCtx must be used within FormProvider");
  }
  return ctx;
};

const createEmptyReference = () => ({ name: "", phone: "" });

const INITIAL_DATA: FormData = {
  personal: {
    names: "",
    surnames: "",
    marriedLastName: "",
    birthDate: "",
    phone: "",
    dpi: "",
    email: "",
    hasSixMonths: false,
  },
  uploads: {
    dpi: null,
    bankStatements: null,
    electricityBill: null,
    selfieWithDpi: null,
  },
  personalRefs: [createEmptyReference(), createEmptyReference()],
  workRefs: [createEmptyReference(), createEmptyReference()],
  salary: 0,
  source: "",
  legal: { acceptance: false, consent: false },
};

const setNestedValue = (obj: FormData, path: string, value: unknown): FormData => {
  const parts = path.split(".");
  const clone = structuredClone(obj) as any;
  let cursor: any = clone;

  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    cursor[key] = cursor[key] ?? {};
    cursor = cursor[key];
  }

  cursor[parts[parts.length - 1]] = value;
  return clone as FormData;
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});

  const setField = useCallback((path: string, value: unknown) => {
    setData((prev) => setNestedValue(prev, path, value));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[path];
      return next;
    });
  }, []);

  const validateSection = useCallback((section: FormSection): boolean => {
    const sectionErrors = validateSectionFn(section, data);
    setErrors((prev) => ({ ...prev, ...sectionErrors }));
    return Object.keys(sectionErrors).length === 0;
  }, [data]);

  const validateAll = useCallback((): boolean => {
    const allErrors = validateAllFn(data);
    setErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  }, [data]);

  const reset = useCallback(() => {
    setData(INITIAL_DATA);
    setErrors({});
  }, []);

  return (
    <FormContext.Provider value={{ data, errors, setField, validateSection, validateAll, reset }}>
      {children}
    </FormContext.Provider>
  );
};