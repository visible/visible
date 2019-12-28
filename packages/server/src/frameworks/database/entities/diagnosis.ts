import {
  Entity,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Index,
  Column,
} from 'typeorm';
import { Diagnosis } from '../../../enterprise/entities';
import { ReportORM } from './report';
import { WebsiteORM } from './website';

@Entity('diagnosis')
export class DiagnosisORM {
  toDomain = () => {
    return new Diagnosis(
      this.id,
      this.reports.map(report => report.toDomain()),
      new Date(this.createdAt),
      new Date(this.updatedAt),
    );
  };

  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => WebsiteORM)
  website: WebsiteORM;

  @OneToMany(
    () => ReportORM,
    report => report.diagnosis,
    { cascade: true, onDelete: 'SET NULL' },
  )
  @JoinColumn()
  reports: ReportORM[];

  @Index()
  @Column('timestamp')
  createdAt: Date;

  @Index()
  @Column('timestamp')
  updatedAt: Date;
}
