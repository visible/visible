import { Repository } from 'typeorm';
import { ReportsRepository } from '../../../application/repositories/reports-repository';
import { Report } from '../entities/report';

export class ReportsRepositoryImpl implements ReportsRepository {
  constructor(private dataMapper: Repository<Report>) {}

  async findByDiagnosisId(id: string) {
    return this.dataMapper
      .createQueryBuilder('report')
      .leftJoin('report.diagnosis', 'diagnosis')
      .where('diagnosis.id = :id', { id })
      .getMany();
  }
}
