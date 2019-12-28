import { Repository } from 'typeorm';
import { ReportsRepository } from '../../../application/repositories/reports-repository';
import { ReportORM } from '../entities/report';

export class ReportsRepositoryImpl implements ReportsRepository {
  constructor(private repository: Repository<ReportORM>) {}

  async findByDiagnosisId(id: string) {
    return this.repository
      .createQueryBuilder('report')
      .leftJoin('report.diagnosis', 'diagnosis')
      .where('diagnosis.id = :id', { id })
      .getMany()
      .then(reports => reports.map(report => report.toDomain()));
  }
}
