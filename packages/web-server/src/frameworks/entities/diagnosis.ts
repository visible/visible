import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Status } from '../../domain/models';
import { ReportORM } from './report';

@Entity('diagnosis')
export class DiagnosisORM {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @OneToMany(
    () => ReportORM,
    report => report.diagnosis,
    { onDelete: 'SET NULL' },
  )
  reports: ReportORM[];

  @Column('varchar', { length: 255 })
  status: Status;

  @Column('varchar', { length: 255 })
  screenshot: string;

  @Column('int')
  doneCount: number;

  @Column('int')
  totalCount: number;

  @Index()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  readonly createdAt: Date;

  @Index()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  readonly updatedAt: Date;
}
