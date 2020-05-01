import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';

import { ReportsRepository } from '../../application/repositories';
import { Report } from '../../domain/models';
import { TYPES } from '../../types';
import { ReportORM } from '../entities';

@injectable()
export class ReportsRepositoryImpl implements ReportsRepository {
  constructor(
    @inject(TYPES.Connection)
    private connection: Connection,
  ) {}

  private findOne(id: string) {
    return this.connection
      .getRepository(ReportORM)
      .findOne(id, {
        relations: ['rule'],
      })
      .then((result) => result?.toDomain());
  }

  async save(report: Report) {
    await this.connection
      .getRepository(ReportORM)
      .save(ReportORM.fromDomain(report));
    const result = await this.findOne(report.id);
    if (!result) throw new Error('Save failed');
    return result;
  }

  async findByDiagnosisId(id: string) {
    const reports = await this.connection.getRepository(ReportORM).find({
      where: {
        diagnosisId: id,
      },
    });

    return reports.map((report) => report.toDomain());
  }
}
