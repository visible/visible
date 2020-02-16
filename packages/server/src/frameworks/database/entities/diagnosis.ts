import {
  Entity,
  ManyToOne,
  OneToMany,
  Index,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
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
    { cascade: true, onDelete: 'SET NULL' },
  )
  reports: ReportORM[];

  @Index()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  readonly createdAt: Date;

  @Index()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  readonly updatedAt: Date;
}
