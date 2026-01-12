import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('uploads')
export class UploadsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'json' })
  dpi?: any;

  @Column({ type: 'json' })
  bankStatements?: any;

  @Column({ type: 'json' })
  electricityBill?: any;

  @Column({ type: 'json' })
  selfieWithDpi?: any;
}
