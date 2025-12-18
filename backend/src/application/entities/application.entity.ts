import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum EstadoSolicitud {
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
}

@Entity('formulario_solicitudes')
export class ApplicationEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  primerNombre: string;

  @Column({ length: 100, nullable: true })
  segundoNombre?: string;

  @Column({ length: 100, nullable: true })
  tercerNombre?: string;

  @Column({ length: 100 })
  primerApellido: string;

  @Column({ length: 100, nullable: true })
  segundoApellido?: string;

  @Column({ length: 100, nullable: true })
  apellidoPorMatrimonio?: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({ length: 20 })
  telefono: string;

  @Column({ length: 20 })
  dpi: string;

  @Column({ length: 150, nullable: true })
  correoElectronico?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salarioMensual?: number;

  // Adjuntos: rutas o URLs relativas dentro del servidor
  @Column({ length: 255, nullable: true })
  adjuntoDpi?: string;

  @Column({ length: 255, nullable: true })
  adjuntoEstadoCuenta?: string;

  @Column({ length: 255, nullable: true })
  adjuntoReciboServicio?: string;

  @Column({ length: 255, nullable: true })
  adjuntoFotografia?: string;

  // Referencias personales
  @Column({ length: 100, nullable: true })
  referenciaPersonal1Nombre?: string;

  @Column({ length: 20, nullable: true })
  referenciaPersonal1Telefono?: string;

  @Column({ length: 100, nullable: true })
  referenciaPersonal2Nombre?: string;

  @Column({ length: 20, nullable: true })
  referenciaPersonal2Telefono?: string;

  // Referencias laborales
  @Column({ length: 100, nullable: true })
  referenciaLaboral1Nombre?: string;

  @Column({ length: 20, nullable: true })
  referenciaLaboral1Telefono?: string;

  @Column({ length: 100, nullable: true })
  referenciaLaboral2Nombre?: string;

  @Column({ length: 20, nullable: true })
  referenciaLaboral2Telefono?: string;

  // Información adicional
  @Column({ length: 255, nullable: true })
  medioEnterado?: string;

  // Checkboxes / consentimientos
  @Column({ type: 'boolean', default: false })
  trabajoMasDeSeisMeses: boolean;

  @Column({ type: 'boolean', default: false })
  aceptaClausulaAceptacion: boolean;

  @Column({ type: 'boolean', default: false })
  aceptaClausulaConsentimiento: boolean;

  @CreateDateColumn()
  fechaSolicitud: Date;

  @Column({ type: 'varchar', length: 20, default: EstadoSolicitud.PENDIENTE })
  estadoSolicitud: EstadoSolicitud;

  @UpdateDateColumn()
  actualizadoEn: Date;
}
