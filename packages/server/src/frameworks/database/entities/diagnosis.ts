import {
  Entity,
  ManyToOne,
  OneToMany,
  Index,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { DiagnosisStatus } from '../../../enterprise/entities';
import { ReportORM } from './report';
import { WebsiteORM } from './website';

@Entity('diagnosis')
export class DiagnosisORM {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => WebsiteORM)
  @JoinColumn()
  website: WebsiteORM;

  @OneToMany(
    () => ReportORM,
    report => report.diagnosis,
    { onDelete: 'SET NULL' },
  )
  reports: ReportORM[];

  @Column('varchar', { length: 225 })
  status: DiagnosisStatus;

  @Column('int')
  doneRulesCount: number;

  @Column('int')
  totalRulesCount: number;

  @Index()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  readonly createdAt: Date;

  @Index()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  readonly updatedAt: Date;
}
