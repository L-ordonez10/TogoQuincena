import { EstadoSolicitud } from '../entities/application.entity';

export class CreateApplicationDto {
  personal: {
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

  uploads?: {
    dpi?: any;
    bankStatements?: any;
    electricityBill?: any;
    selfieWithDpi?: any;
  };

  personalRefs?: { name: string; phone: string }[];
  workRefs?: { name: string; phone: string }[];

  salary?: string;
  source?: string;

  legal?: { acceptance: boolean; consent: boolean };

  estadoSolicitud?: EstadoSolicitud;
}
