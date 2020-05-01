import { inject, injectable } from 'inversify';
import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Connection } from 'typeorm';

import { DiagnosisRepository } from '../../application/repositories';
import { Diagnosis } from '../../domain/models';
import { Logger } from '../../domain/services';
import { TYPES } from '../../types';
import { DiagnosisORM } from '../entities';
import { ProcessDiagnosisJob, PublishDiagnosisJob } from '../jobs';

@injectable()
export class DiagnosisRepositoryImpl implements DiagnosisRepository {
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
      const diagnosis = Diagnosis.from(job.data);
      this.publish$.next(diagnosis);
      done();
    });
  }

  async find(ids: string[]) {
    const diagnoses = await this.connection
      .getRepository(DiagnosisORM)
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
      .getRepository(DiagnosisORM)
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
    await this.connection
      .getRepository(DiagnosisORM)
      .save(DiagnosisORM.fromDomain(diagnosis));
    const result = await this.findOne(diagnosis.id);
    if (result == null) throw new Error('Save failed');
    return result;
  }

  async delete(id: string) {
    await this.connection.getRepository(DiagnosisORM).delete(id);
    return id;
  }

  async queue(diagnosis: Diagnosis) {
    await this.processDiagnosis.queue.add(diagnosis.toJSON());
  }

  subscribe(id: string) {
    return this.publish$.pipe(
      tap((v) => this.logger.debug(v)),
      filter((diagnosis) => diagnosis.id === id),
    );
  }

  async publish(diagnosis: Diagnosis) {
    await this.publishDiagnosis.queue.add(diagnosis.toJSON());
  }
}
