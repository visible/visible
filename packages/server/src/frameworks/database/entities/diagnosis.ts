import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  Index,
  Column,
  JoinColumn,
} from 'typeorm';
import { ReportORM } from './report';
import { WebsiteORM } from './website';

@Entity('diagnosis')
export class DiagnosisORM {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => WebsiteORM)
  @JoinColumn()
  website: WebsiteORM;

  @OneToMany(
    () => ReportORM,
    report => report.diagnosis,
    { onDelete: 'SET NULL' },
  )
  reports: ReportORM[];

  @Index()
  @Column('timestamp')
  createdAt: Date;

  @Index()
  @Column('timestamp')
  updatedAt: Date;
}
