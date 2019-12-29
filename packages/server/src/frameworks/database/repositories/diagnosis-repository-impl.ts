import { injectable, inject } from 'inversify';
import { Connection } from 'typeorm';
import { DiagnosisRepository } from '../../../application/repositories/diagnosis-repository';
import { DiagnosisORM } from '../entities/diagnosis';
import { Diagnosis, Report } from '../../../enterprise/entities';
import { TYPES } from '../../../types';
import { ReportORM } from '../entities/report';

@injectable()
export class DiagnosisRepositoryImpl implements DiagnosisRepository {
  @inject(TYPES.Connection)
  private connection: Connection;

  private toDomain = (diagnosis: DiagnosisORM) => {
    return new Diagnosis(
      diagnosis.id,
      diagnosis.reports.map(
        report =>
          new Report(
            report.id,
            report.name,
            diagnosis.id,
            report.type,
            report.message,
            report.xpath,
            report.css,
            report.html,
          ),
      ),
      diagnosis.createdAt,
      diagnosis.updatedAt,
    );
  };

  async find(ids: string[]) {
    const diagnosises = await this.connection
      .getRepository(DiagnosisORM)
      .createQueryBuilder('diagnosis')
      .leftJoinAndSelect('diagnosis.reports', 'report')
      .whereInIds(ids)
      .getMany();

    if (!diagnosises.length) throw new Error('Entry not found');

    return diagnosises.map(diagnosis => this.toDomain(diagnosis));
  }

  async create(diagnosis: Diagnosis) {
    const diagnosisEntity = new DiagnosisORM();
    diagnosisEntity.id = diagnosis.id;
    diagnosisEntity.createdAt = diagnosis.createdAt;
    diagnosisEntity.updatedAt = diagnosis.updatedAt;

    diagnosisEntity.reports = diagnosis.reports.map(report => {
      const reportEntity = new ReportORM();
      reportEntity.id = report.id;
      reportEntity.name = report.name;
      reportEntity.type = report.type;
      reportEntity.message = report.message;
      reportEntity.html = report.html;
      reportEntity.css = report.css;
      reportEntity.xpath = report.xpath;
      reportEntity.diagnosis = diagnosisEntity;
      return reportEntity;
    });

    await this.connection
      .getRepository(ReportORM)
      .save(diagnosisEntity.reports);

    const result = await this.connection
      .getRepository(DiagnosisORM)
      .save(diagnosisEntity);

    return this.toDomain(result);
  }

  async delete(id: string) {
    await this.connection.getRepository(DiagnosisORM).delete(id);
    return id;
  }
}
