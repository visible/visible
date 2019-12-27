import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Content } from './content';
import { Diagnosis } from './diagnosis';

@Entity()
export class Report {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  type: 'ok' | 'warn' | 'error';

  @OneToOne(() => Content, { onDelete: 'SET NULL' })
  @JoinColumn()
  content: Content;

  @Column('varchar')
  message: string;

  @ManyToOne(() => Diagnosis)
  diagnosis: Diagnosis;
}
