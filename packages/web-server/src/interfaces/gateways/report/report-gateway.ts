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

  private findOne(id: string) {
    return this.connection
      .getRepository(ReportTable)
      .findOne(id, {
        relations: ['rule'],
      })
      .then((result) => result?.toDomain());
  }

  async save(report: Report) {
    await this.connection
      .getRepository(ReportTable)
      .save(ReportTable.fromDomain(report));
    const result = await this.findOne(report.id);
    if (!result) throw new Error('Save failed');
    return result;
  }

  async findByDiagnosisId(id: string) {
    const reports = await this.connection.getRepository(ReportTable).find({
      where: {
        diagnosisId: id,
      },
    });

    return reports.map((report) => report.toDomain());
  }
}
