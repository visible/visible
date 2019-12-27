import {
  Entity,
  PrimaryColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Diagnosis } from './diagnosis';

@Entity()
export class Website {
  @PrimaryColumn('uuid')
  id: string;

  @Index()
  @Column('varchar')
  name: string;

  @Index()
  @Column('varchar')
  description: string;

  @Index()
  @Column('varchar')
  domain: string;

  @ManyToOne(() => Diagnosis)
  @JoinColumn()
  diagnosises: Diagnosis[];
}
