import { injectable, inject } from 'inversify';
import { Connection } from 'typeorm';
import { PubSub } from 'apollo-server-express';
import { DiagnosisRepository } from '../../../application/repositories/diagnosis-repository';
import { DiagnosisORM } from '../entities/diagnosis';
import { Diagnosis, Report } from '../../../enterprise/entities';
import { TYPES } from '../../../types';
import { ReportORM } from '../entities/report';

@injectable()
export class DiagnosisRepositoryImpl implements DiagnosisRepository {
  @inject(TYPES.Connection)
  private connection: Connection;

  @inject(TYPES.PubSub)
  private pubSub: PubSub;

  private toDomain = (diagnosis: DiagnosisORM) => {
    return new Diagnosis(
      diagnosis.id,
      diagnosis.status,
      diagnosis.reports.map(
        report =>
          new Report(
            report.id,
            report.name,
            diagnosis.id,
            report.level,
            report.message,
            report.xpath,
            report.css,
            report.html,
          ),
      ),
      diagnosis.doneRulesCount,
      diagnosis.totalRulesCount,
      diagnosis.createdAt,
      diagnosis.updatedAt,
    );
  };

  private fromDomain = (diagnosis: Diagnosis) => {
    const diagnosisEntity = new DiagnosisORM();

    diagnosisEntity.status = diagnosis.status;
    diagnosisEntity.doneRulesCount = diagnosis.doneRulesCount;
    diagnosisEntity.totalRulesCount = diagnosis.totalRulesCount;

    diagnosisEntity.reports = diagnosis.reports.map(report => {
      const reportEntity = new ReportORM();
      reportEntity.name = report.name;
      reportEntity.level = report.level;
      reportEntity.message = report.message;
      reportEntity.html = report.html;
      reportEntity.css = report.css;
      reportEntity.xpath = report.xpath;
      reportEntity.diagnosis = diagnosisEntity;
      return reportEntity;
    });

    return diagnosisEntity;
  };

  async find(ids: string[]) {
    const diagnoses = await this.connection
      .getRepository(DiagnosisORM)
      .createQueryBuilder('diagnosis')
      .leftJoinAndSelect('diagnosis.reports', 'report')
      .whereInIds(ids)
      .getMany();

    if (!diagnoses.length) throw new Error('Entry not found');

    return diagnoses.map(diagnosis => this.toDomain(diagnosis));
  }

  async create(diagnosis: Diagnosis) {
    const diagnosisEntity = this.fromDomain(diagnosis);

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

  async update(diagnosis: Diagnosis) {
    await this.connection
      .getRepository(DiagnosisORM)
      .update(diagnosis.id, this.fromDomain(diagnosis));

    const [result] = await this.find([diagnosis.id]);
    this.pubSub.publish('DIAGNOSIS', result);
    return result;
  }
}
