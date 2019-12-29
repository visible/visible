import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ReportType } from '../../../enterprise/entities';
import { DiagnosisORM } from './diagnosis';

@Entity('report')
export class ReportORM {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  type: ReportType;

  @Column('varchar', { length: 255, nullable: true })
  message?: string;

  @ManyToOne(() => DiagnosisORM)
  @JoinColumn()
  diagnosis: DiagnosisORM;

  @Column('varchar', { length: 255, nullable: true })
  xpath?: string;

  @Column('text', { nullable: true })
  html?: string;

  @Column('text', { nullable: true })
  css?: string;
}
