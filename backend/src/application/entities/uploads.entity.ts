import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('uploads')
export class UploadsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'json', nullable: true })
  dpi?: any;

  @Column({ type: 'json', nullable: true })
  bankStatements?: any[];

  @Column({ type: 'json', nullable: true })
  electricityBill?: any;

  @Column({ type: 'json', nullable: true })
  selfieWithDpi?: any;
}
