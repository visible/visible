import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Diagnosis } from './diagnosis';

@Entity()
export class Report {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 4 })
  type: 'ok' | 'warn' | 'error';

  @Column('varchar', { length: 255 })
  message: string;

  @ManyToOne(() => Diagnosis)
  diagnosis: Diagnosis;

  @Column('text')
  html: string;

  @Column('varchar', { length: 255 })
  xpath: string;

  @Column('text')
  css: string;
}
