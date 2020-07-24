import { validateOrReject } from 'class-validator';
import { inject, injectable } from 'inversify';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Connection } from 'typeorm';

import { DiagnosisRepository } from '../../../application/repositories';
import { Diagnosis } from '../../../domain/models';
import { Logger } from '../../../domain/services';
// eslint-disable-next-line
import { ProcessDiagnosisJob, PublishDiagnosisJob } from '../../../frameworks/jobs';
import { TYPES } from '../../../types';
import { DiagnosisTable } from './diagnosis-table';

@injectable()
export class DiagnosisGateway implements DiagnosisRepository {
  private readonly publish$: Subject<Diagnosis>;

  constructor(
    @inject(TYPES.Logger)
    private readonly logger: Logger,

    @inject(TYPES.Connection)
    private readonly connection: Connection,

    @inject(TYPES.PublishDiagnosisJob)
    private readonly publishDiagnosis: PublishDiagnosisJob,

    @inject(TYPES.ProcessDiagnosisJob)
    private readonly processDiagnosis: ProcessDiagnosisJob,
  ) {
    this.publish$ = new Subject<Diagnosis>();
    this.publishDiagnosis.queue.process((job, done) => {
      const diagnosis = Diagnosis.from(JSON.parse(job.data));
      this.publish$.next(diagnosis);
      done();
    });
  }

  async find(ids: string[]) {
    const diagnoses = await this.connection
      .getRepository(DiagnosisTable)
      .findByIds(ids, {
        relations: [
          'reports',
          'reports.rule',
          'reports.pointers',
          'reports.pointers.source',
        ],
      });

    this.logger.debug(diagnoses);
    this.logger.debug(diagnoses.length);
    if (!diagnoses.length) throw new Error('Entry not found');

    return diagnoses.map((diagnosis) => diagnosis.toDomain());
  }

  private async findOne(id: string) {
    return this.connection
      .getRepository(DiagnosisTable)
      .findOne(id, {
        relations: [
          'reports',
          'reports.rule',
          'reports.pointers',
          'reports.pointers.source',
        ],
      })
      .then((result) => result?.toDomain());
  }

  async save(diagnosis: Diagnosis) {
    await validateOrReject(diagnosis);
    await this.connection
      .getRepository(DiagnosisTable)
      .save(DiagnosisTable.fromDomain(diagnosis));
    const result = await this.findOne(diagnosis.id);
    if (result == null) throw new Error('Save failed');
    return result;
  }

  async delete(id: string) {
    await this.connection.getRepository(DiagnosisTable).delete(id);
    return id;
  }

  async queue(diagnosis: Diagnosis) {
    await this.processDiagnosis.queue.add(diagnosis.toJSON());
  }

  subscribe(id: string) {
    this.logger.debug(`[Repository] Some client has subscribed to ${id}`);
    return this.publish$.pipe(filter((diagnosis) => diagnosis.id === id));
  }

  async publish(diagnosis: Diagnosis) {
    this.logger.debug(`[Repository] Publishing ${diagnosis.id}`);
    await this.publishDiagnosis.queue.add(diagnosis.toJSON());
  }
}
