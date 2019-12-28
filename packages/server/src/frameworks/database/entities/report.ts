import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Report, ReportType } from '../../../enterprise/entities';
import { DiagnosisORM } from './diagnosis';

@Entity('report')
export class ReportORM {
  toDomain = () => {
    return new Report(
      this.id,
      this.name,
      this.diagnosis.id,
      this.type,
      this.message,
      this.xpath,
      this.css,
      this.html,
    );
  };

  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  type: ReportType;

  @Column('varchar', { length: 255, nullable: true })
  message?: string;

  @ManyToOne(() => DiagnosisORM)
  diagnosis: DiagnosisORM;

  @Column('varchar', { length: 255, nullable: true })
  xpath?: string;

  @Column('text', { nullable: true })
  html?: string;

  @Column('text', { nullable: true })
  css?: string;
}
