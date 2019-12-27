import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Diagnosis } from './diagnosis';

@Entity()
export class Report {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  type: 'ok' | 'warn' | 'error';

  @Column('varchar', { length: 255, nullable: true })
  message?: string;

  @ManyToOne(() => Diagnosis)
  diagnosis: Diagnosis;

  @Column('varchar', { length: 255, nullable: true })
  xpath?: string;

  @Column('text', { nullable: true })
  html?: string;

  @Column('text', { nullable: true })
  css?: string;
}
