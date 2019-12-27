import {
  Entity,
  PrimaryColumn,
  Column,
  Index,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Diagnosis } from './diagnosis';

@Entity()
export class Website {
  @PrimaryColumn('uuid')
  id: string;

  @Index()
  @Column('varchar', { length: 255 })
  name: string;

  @Index()
  @Column('varchar', { length: 255 })
  description: string;

  @Index()
  @Column('varchar', { length: 255 })
  domain: string;

  @OneToMany(
    () => Diagnosis,
    diagnosis => diagnosis.website,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn()
  diagnosises: Diagnosis[];
}
