import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Status } from '../../domain/models';
import { ReportORM } from './report';

@Entity('diagnosis')
export class DiagnosisORM {
  @PrimaryColumn('uuid')
  id: string;

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
  createdAt: Date;

  @Index()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
