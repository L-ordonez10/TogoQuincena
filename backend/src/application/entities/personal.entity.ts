import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('personal')
export class PersonalEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 150 })
  names: string;

  @Column({ length: 150 })
  surnames: string;

  @Column({ length: 100, nullable: true })
  marriedLastName?: string;

  @Column({ type: 'date' })
  birthDate: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 30 })
  dpi: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 250 })
  address: string;

  @Column({ length: 250 })
  addressWork: string;

  @Column({ length: 20 })
  phoneWork: string;

  @Column({ type: 'boolean', default: false })
  hasSixMonths: boolean;
}
