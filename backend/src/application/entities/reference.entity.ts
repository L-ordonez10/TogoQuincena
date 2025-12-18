import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum ReferenceKind {
  PERSONAL = 'personal',
  WORK = 'work',
}

@Entity('referencias')
export class ReferenceEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 50 })
  phone: string;

  @Column({
    type: 'enum',
    enum: ReferenceKind,
  })
  kind: ReferenceKind;

  @ManyToOne('ApplicationEntity', 'references', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'application_id' })
  application: any;
}
