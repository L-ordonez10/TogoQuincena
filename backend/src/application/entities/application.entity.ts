import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PersonalEntity } from './personal.entity';
import { UploadsEntity } from './uploads.entity';
import { LegalEntity } from './legal.entity';

export enum EstadoSolicitud {
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
}

@Entity('formulario_solicitudes')
export class ApplicationEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => PersonalEntity, { cascade: true, eager: true })
  @JoinColumn()
  personal: PersonalEntity;

  @OneToOne(() => UploadsEntity, { cascade: true, eager: true, nullable: true })
  @JoinColumn()
  uploads?: UploadsEntity;

  @OneToMany('ReferenceEntity', 'application', {
    cascade: true,
  })
  references: any[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  salary?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  source?: string;

  @OneToOne(() => LegalEntity, { cascade: true, eager: true, nullable: true })
  @JoinColumn()
  legal?: LegalEntity;

  @CreateDateColumn()
  fechaSolicitud: Date;

  @Column({
    type: 'enum',
    enum: EstadoSolicitud,
    default: EstadoSolicitud.PENDIENTE,
  })
  estadoSolicitud: EstadoSolicitud;

  @UpdateDateColumn()
  actualizadoEn: Date;
}
