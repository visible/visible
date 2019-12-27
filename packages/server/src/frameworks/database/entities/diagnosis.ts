import { Entity, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Report } from './report';
import { Website } from './website';

@Entity()
export class Diagnosis {
  @PrimaryColumn('text')
  id: string;

  @ManyToOne(() => Website)
  website: Website;

  @ManyToOne(() => Report)
  @JoinColumn()
  reports: Report[];
}
