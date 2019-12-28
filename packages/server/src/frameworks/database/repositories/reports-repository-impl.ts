import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';
import { ReportsRepository } from '../../../application/repositories/reports-repository';
import { ReportORM } from '../entities/report';
import { TYPES } from '../../../types';

@injectable()
export class ReportsRepositoryImpl implements ReportsRepository {
  @inject(TYPES.Connection)
  private connection: Connection;

  async findByDiagnosisId(id: string) {
    const reports = await this.connection
      .getRepository(ReportORM)
      .createQueryBuilder('report')
      .leftJoin('report.diagnosis', 'diagnosis')
      .where('diagnosis.id = :id', { id })
      .getMany();

    return reports.map(report => report.toDomain());
  }
}
