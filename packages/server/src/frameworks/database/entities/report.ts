import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportLevel } from '../../../enterprise/entities';
import { DiagnosisORM } from './diagnosis';

@Entity('report')
export class ReportORM {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  level: ReportLevel;

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
