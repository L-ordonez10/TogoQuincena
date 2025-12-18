import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('legales')
export class LegalEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'boolean', default: false })
  acceptance: boolean;

  @Column({ type: 'boolean', default: false })
  consent: boolean;
}
