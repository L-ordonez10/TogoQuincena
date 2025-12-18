import { EstadoSolicitud } from '../entities/application.entity';

export class CreateApplicationDto {
  primerNombre: string;
  segundoNombre?: string;
  tercerNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  apellidoPorMatrimonio?: string;
  fechaNacimiento: Date;
  telefono: string;
  dpi: string;
  correoElectronico?: string;
  salarioMensual?: number;

  referenciaPersonal1Nombre?: string;
  referenciaPersonal1Telefono?: string;
  referenciaPersonal2Nombre?: string;
  referenciaPersonal2Telefono?: string;

  referenciaLaboral1Nombre?: string;
  referenciaLaboral1Telefono?: string;
  referenciaLaboral2Nombre?: string;
  referenciaLaboral2Telefono?: string;

  medioEnterado?: string;

  trabajoMasDeSeisMeses: boolean;
  aceptaClausulaAceptacion: boolean;
  aceptaClausulaConsentimiento: boolean;

  estadoSolicitud?: EstadoSolicitud;
}
