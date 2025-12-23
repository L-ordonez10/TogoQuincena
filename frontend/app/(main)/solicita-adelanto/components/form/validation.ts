import { FormData, FormErrors, FormSection } from "./types";
import {
  isValidEmail,
  isValidPhone,
  isValidDPI,
  sanitizeInput,
} from "@/lib/security";

const MINIMUM_AGE = 18;

const validateAge = (birthDate: string): boolean => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age >= MINIMUM_AGE;
};

const validatePersonal = (data: FormData, errors: FormErrors): void => {
  if (!data.personal.names || !sanitizeInput(data.personal.names)) {
    errors["personal.names"] = "Requerido";
  }

  if (!data.personal.surnames || !sanitizeInput(data.personal.surnames)) {
    errors["personal.surnames"] = "Requerido";
  }

  if (!data.personal.birthDate) {
    errors["personal.birthDate"] = "Requerido";
  } else if (!validateAge(data.personal.birthDate)) {
    errors["personal.birthDate"] = "Debes ser mayor de edad";
  }

  if (!data.personal.phone) {
    errors["personal.phone"] = "Requerido";
  } else if (!isValidPhone(data.personal.phone)) {
    errors["personal.phone"] = "Teléfono inválido (8-15 dígitos)";
  }

  if (!data.personal.dpi) {
    errors["personal.dpi"] = "Requerido";
  } else if (!isValidDPI(data.personal.dpi)) {
    errors["personal.dpi"] = "DPI inválido (13 dígitos)";
  }
  
  if (!data.personal.email) {
    errors["personal.email"] = "Requerido";
  } else if (!isValidEmail(data.personal.email)) {
    errors["personal.email"] = "Email inválido";
  }
};

const validateUploads = (data: FormData, errors: FormErrors): void => {
  if (!data.uploads.dpi) {
    errors["uploads.dpi"] = "DPI requerido";
  }

  if (!data.uploads.bankStatements) {
    errors["uploads.bankStatements"] = "Estado de cuenta requerido";
  }

  if (!data.uploads.electricityBill) {
    errors["uploads.electricityBill"] = "Recibo requerido";
  }

  if (!data.uploads.selfieWithDpi) {
    errors["uploads.selfieWithDpi"] = "Selfie con DPI requerida";
  }
};

const validateReferences = (
  references: FormData["personalRefs"],
  prefix: "personalRefs" | "workRefs",
  errors: FormErrors
): void => {
  references.forEach((ref, index) => {
    if (!ref.name || !sanitizeInput(ref.name)) {
      errors[`${prefix}.${index}.name`] = "Requerido";
    }

    if (!ref.phone) {
      errors[`${prefix}.${index}.phone`] = "Requerido";
    } else if (!isValidPhone(ref.phone)) {
      errors[`${prefix}.${index}.phone`] = "Teléfono inválido";
    }
  });
};

const validateSummary = (data: FormData, errors: FormErrors): void => {
  if (!data.salary || data.salary <= 0) {
    errors["salary"] = "Salario inválido";
  }

  if (data.salary && data.salary > 1000000) {
    errors["salary"] = "Salario excede el límite permitido";
  }

  if (!data.source || !sanitizeInput(data.source)) {
    errors["source"] = "Fuente requerida";
  }

  if (!data.legal.acceptance) {
    errors["legal.acceptance"] = "Acepta la cláusula";
  }

  if (!data.legal.consent) {
    errors["legal.consent"] = "Acepta el consentimiento";
  }
};

export const validateSection = (
  section: FormSection,
  data: FormData
): FormErrors => {
  const errors: FormErrors = {};

  switch (section) {
    case "personal":
      validatePersonal(data, errors);
      break;
    case "uploads":
      validateUploads(data, errors);
      break;
    case "personalRefs":
      validateReferences(data.personalRefs, "personalRefs", errors);
      break;
    case "workRefs":
      validateReferences(data.workRefs, "workRefs", errors);
      break;
    case "summary":
      validateSummary(data, errors);
      break;
  }

  return errors;
};

export const validateAll = (data: FormData): FormErrors => {
  const sections: FormSection[] = [
    "personal",
    "uploads",
    "personalRefs",
    "workRefs",
    "summary",
  ];

  return sections.reduce((allErrors, section) => {
    const sectionErrors = validateSection(section, data);
    return { ...allErrors, ...sectionErrors };
  }, {} as FormErrors);
};
