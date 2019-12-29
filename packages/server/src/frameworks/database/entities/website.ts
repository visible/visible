import { Entity, PrimaryColumn, Column, Index, OneToMany } from 'typeorm';
import { DiagnosisORM } from './diagnosis';

@Entity('website')
export class WebsiteORM {
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
    () => DiagnosisORM,
    diagnosis => diagnosis.website,
    { onDelete: 'SET NULL' },
  )
  diagnosises: DiagnosisORM[];
}
