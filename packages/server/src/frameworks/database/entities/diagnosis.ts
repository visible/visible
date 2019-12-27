import {
  Entity,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
} from 'typeorm';
import { Report } from './report';
import { Website } from './website';

@Entity()
export class Diagnosis {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Website)
  website: Website;

  @OneToMany(
    () => Report,
    report => report.diagnosis,
    { cascade: true, onDelete: 'SET NULL' },
  )
  @JoinColumn()
  reports: Report[];

  @Index()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  readonly createdAt: Date;

  @Index()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  readonly updatedAt: Date;
}
