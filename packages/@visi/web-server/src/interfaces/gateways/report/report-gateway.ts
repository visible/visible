import { validateOrReject } from 'class-validator';
import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';

import { ReportRepository } from '../../../application/repositories';
import { Report } from '../../../domain/models';
import { TYPES } from '../../../types';
import { ReportTable } from './report-table';

@injectable()
export class ReportGateway implements ReportRepository {
  constructor(
    @inject(TYPES.Connection)
    private connection: Connection,
  ) {}

  async save(report: Report): Promise<Report> {
    await validateOrReject(report);
    await this.connection
      .getRepository(ReportTable)
      .save(ReportTable.fromDomain(report));
    const result = await this.findOne(report.id);
    if (!result) throw new Error('Save failed');
    return result;
  }

  async findByDiagnosisId(id: string): Promise<Report[]> {
    const reports = await this.connection.getRepository(ReportTable).find({
      where: {
        diagnosisId: id,
      },
    });

    return reports.map((report) => report.toDomain());
  }

  private findOne(id: string) {
    return this.connection
      .getRepository(ReportTable)
      .findOne(id, {
        relations: ['rule'],
      })
      .then((result) => result?.toDomain());
  }
}
