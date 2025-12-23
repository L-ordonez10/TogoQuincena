export type EstadoSolicitud = "PENDIENTE" | "APROBADO" | "RECHAZADO";
export type ReferenceKind = "personal" | "work";

export interface Personal {
  id: number;
  names: string;
  surnames: string;
  marriedLastName: string | null;
  birthDate: string;
  phone: string;
  dpi: string;
  email: string;
  hasSixMonths: boolean;
}

export interface Uploads {
  id: number;
  dpi: string;
  bankStatements: string;
  electricityBill: string;
  selfieWithDpi: string;
}

export interface Reference {
  id: number;
  name: string;
  phone: string;
  kind: ReferenceKind;
}

export interface Legal {
  id: number;
  acceptance: boolean;
  consent: boolean;
}

export interface Solicitud {
  id: number;
  personal: Personal;
  uploads: Uploads;
  references: Reference[];
  salary: string;
  source: string;
  legal: Legal;
  fechaSolicitud: string;
  estadoSolicitud: EstadoSolicitud;
  actualizadoEn: string;
}

export interface MetaData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SolicitudResponse {
  solicitudes: Solicitud[];
  meta: MetaData;
}
