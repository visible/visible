import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';

import { ReportsRepository } from '../../../application/repositories/reports-repository';
import { Report } from '../../../enterprise/entities';
import { TYPES } from '../../../types';
import { ReportORM } from '../entities/report';

@injectable()
export class ReportsRepositoryImpl implements ReportsRepository {
  @inject(TYPES.Connection)
  private connection: Connection;

  private toDomain = (report: ReportORM) => {
    return new Report(
      report.id,
      report.name,
      report.diagnosis.id,
      report.type,
      report.message,
      report.xpath,
      report.css,
      report.html,
    );
  };

  async findByDiagnosisId(id: string) {
    const reports = await this.connection
      .getRepository(ReportORM)
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.diagnosis', 'diagnosis')
      .where('diagnosis.id = :id', { id })
      .getMany();

    return reports.map(report => this.toDomain(report));
  }
}