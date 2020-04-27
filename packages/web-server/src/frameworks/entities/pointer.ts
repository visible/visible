import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Location } from '../../domain/models/location';
import { ReportORM } from './report';
import { SourceORM } from './source';

export abstract class PointerORM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: true })
  screenshot?: string;

  @Column('json', { nullable: true })
  location?: Location;

  @ManyToOne(() => SourceORM, { nullable: true })
  @JoinColumn()
  source?: SourceORM;

  @ManyToOne(() => ReportORM, { cascade: true })
  @JoinColumn()
  report: ReportORM;
}
