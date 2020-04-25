import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';

import { ReportsRepository } from '../../application/repositories';
import { Report } from '../../domain/models';
import { TYPES } from '../../types';
import { DiagnosisORM, ReportORM } from '../entities';
import { PointerRepositoryImpl } from './pointer-repository-impl';

@injectable()
export class ReportsRepositoryImpl implements ReportsRepository {
  @inject(TYPES.Connection)
  private connection: Connection;

  static toDomain(report: ReportORM) {
    return new Report({
      id: report.id,
      rule: report.rule,
      outcome: report.outcome,
      target: report.target,
      message: report.message,
      // たまたまプロパティが合致してるので代入できてしまっている
      pointers: report.pointers,
    });
  }

  static toORM(domain: Report, diagnosis: DiagnosisORM) {
    const entity = new ReportORM();
    entity.id = domain.id;
    entity.outcome = domain.outcome;
    entity.rule = domain.rule;
    entity.target = domain.target;
    entity.message = domain.message;
    entity.diagnosis = diagnosis;
    entity.pointers = domain.pointers?.map(pointer =>
      PointerRepositoryImpl.toORM(pointer, entity),
    );

    return entity;
  }

  async findByDiagnosisId(id: string) {
    const reports = await this.connection
      .getRepository(ReportORM)
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.diagnosis', 'diagnosis')
      .where('diagnosis.id = :id', { id })
      .getMany();

    return reports.map(report => ReportsRepositoryImpl.toDomain(report));
  }
}
