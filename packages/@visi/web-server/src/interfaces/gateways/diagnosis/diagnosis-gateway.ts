import { validate } from 'class-validator';
import { inject, injectable } from 'inversify';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Connection } from 'typeorm';

import { DiagnosisRepository } from '../../../application/repositories';
import { Diagnosis, Report } from '../../../domain/models';
import { Logger } from '../../../domain/services';
import { TYPES } from '../../../types';
import { DiagnosisDBEntity } from './diagnosis-db-entity';
import { ReportDBEntity } from './report-db-entity';
import { SourceDBEntity } from './source-db-entity';

export interface PublishDiagnosisQueue {
  add(id: string, data: null): Promise<unknown>;
}

export interface ProcessDiagnosisQueue {
  add(id: string, data: null): Promise<unknown>;
}

@injectable()
export class DiagnosisGateway implements DiagnosisRepository {
  private readonly publish$ = new Subject<Diagnosis>();

  constructor(
    @inject(TYPES.Logger)
    private readonly logger: Logger,

    @inject(TYPES.Connection)
    private readonly connection: Connection,

    @inject(TYPES.ProcessDiagnosisQueue)
    private readonly processDiagnosisQueue: ProcessDiagnosisQueue,
  ) {}

  async save(diagnosis: Diagnosis): Promise<Diagnosis> {
    const errors = await validate(diagnosis);
    if (errors.length > 0) throw JSON.stringify(errors[0], null, 2);

    for (const source of diagnosis.sources) {
      await this.connection
        .getRepository(SourceDBEntity)
        .save(SourceDBEntity.fromDomain(source));

      for (const report of source.reports) {
        await this.connection
          .getRepository(ReportDBEntity)
          .save(ReportDBEntity.fromDomain(report));
      }
    }

    await this.connection
      .getRepository(DiagnosisDBEntity)
      .save(DiagnosisDBEntity.fromDomain(diagnosis));

    const [result] = await this.find([diagnosis.id]);
    this.publish$.next(result);
    return result;
  }

  async delete(id: string): Promise<string> {
    await this.connection.getRepository(DiagnosisDBEntity).delete(id);
    return id;
  }

  async queue(diagnosis: Diagnosis): Promise<void> {
    await this.processDiagnosisQueue.add(diagnosis.id, null);
  }

  subscribe(id: string): Observable<Diagnosis> {
    this.logger.debug(`[Repository] Some client has subscribed to ${id}`);
    return this.publish$.pipe(filter((diagnosis) => diagnosis.id === id));
  }

  async find(ids: string[]): Promise<Diagnosis[]> {
    const diagnoses = await this.connection
      .getRepository(DiagnosisDBEntity)
      .findByIds(ids, {
        relations: ['sources', 'sources.reports'],
      });

    if (diagnoses.length === 0) {
      throw new Error('Entry not found');
    }

    return diagnoses.map((diagnosis) => diagnosis.toDomain());
  }

  async findReport(id: string): Promise<Report | undefined> {
    const report = await this.connection
      .getRepository(ReportDBEntity)
      .findOne({ where: { id } });

    return report?.toDomain();
  }
}
