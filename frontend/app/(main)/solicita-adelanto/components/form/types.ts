export interface FormPersonalData {
  names: string;
  surnames: string;
  marriedLastName?: string;
  birthDate?: string;
  phone?: string;
  dpi?: string;
  email?: string;
  hasSixMonths?: boolean;
}

export interface FormUploads {
  dpi?: File | null;
  bankStatements?: File | null;
  electricityBill?: File | null;
  selfieWithDpi?: File | null;
}

export interface FormReference {
  name: string;
  phone: string;
}

export interface FormLegal {
  acceptance: boolean;
  consent: boolean;
}

export interface FormData {
  personal: FormPersonalData;
  uploads: FormUploads;
  personalRefs: FormReference[];
  workRefs: FormReference[];
  salary: number;
  source?: string;
  legal: FormLegal;
}

export type FormErrors = Partial<Record<string, string>>;

export type FormSection = "personal" | "uploads" | "personalRefs" | "workRefs" | "summary";
