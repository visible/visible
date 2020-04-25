import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';

import { DiagnosisRepository } from '../../application/repositories';
import { Diagnosis } from '../../domain/models';
import { TYPES } from '../../types';
import { DiagnosisORM } from '../entities/diagnosis';
import { ReportORM } from '../entities/report';
import { ReportsRepositoryImpl } from './reports-repository-impl';

@injectable()
export class DiagnosisRepositoryImpl implements DiagnosisRepository {
  @inject(TYPES.Connection)
  private connection: Connection;

  static toDomain(diagnosis: DiagnosisORM) {
    return new Diagnosis({
      id: diagnosis.id,
      status: diagnosis.status,
      screenshot: diagnosis.screenshot,
      doneCount: diagnosis.doneCount,
      totalCount: diagnosis.totalCount,
      reports: diagnosis.reports.map(report =>
        ReportsRepositoryImpl.toDomain(report),
      ),
      createdAt: diagnosis.createdAt,
      updatedAt: diagnosis.updatedAt,
    });
  }

  static toORM(domain: Diagnosis) {
    const entity = new DiagnosisORM();
    entity.id = domain.id;
    entity.reports = domain.reports.map(report =>
      ReportsRepositoryImpl.toORM(report, entity),
    );
    entity.status = domain.status;
    entity.screenshot = domain.screenshot;
    entity.doneCount = domain.doneCount;
    entity.totalCount = domain.totalCount;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }

  async find(ids: string[]) {
    const diagnoses = await this.connection
      .getRepository(DiagnosisORM)
      .createQueryBuilder('diagnosis')
      .leftJoinAndSelect('diagnosis.reports', 'report')
      .whereInIds(ids)
      .getMany();

    if (!diagnoses.length) throw new Error('Entry not found');

    return diagnoses.map(diagnosis =>
      DiagnosisRepositoryImpl.toDomain(diagnosis),
    );
  }

  async create(diagnosis: Diagnosis) {
    const entity = DiagnosisRepositoryImpl.toORM(diagnosis);
    await this.connection.getRepository(ReportORM).save(entity.reports);
    const result = await this.connection
      .getRepository(DiagnosisORM)
      .save(entity);

    return DiagnosisRepositoryImpl.toDomain(result);
  }

  async delete(id: string) {
    await this.connection.getRepository(DiagnosisORM).delete(id);
    return id;
  }
}
