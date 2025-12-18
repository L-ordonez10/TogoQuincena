import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('personal')
export class PersonalEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100, nullable: true })
  secondName?: string;

  @Column({ length: 100, nullable: true })
  thirdName?: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 100, nullable: true })
  secondLastName?: string;

  @Column({ length: 100, nullable: true })
  marriedLastName?: string;

  @Column({ type: 'date', nullable: true })
  birthDate?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 30, nullable: true })
  dpi?: string;

  @Column({ length: 150, nullable: true })
  email?: string;

  @Column({ type: 'boolean', default: false })
  hasSixMonths: boolean;
}
