import { Visible } from '@visi/core';
import Bull from 'bull';
import { inject, injectable } from 'inversify';
import { finalize } from 'rxjs/operators';
import { Connection } from 'typeorm';

import { DiagnosisRepository } from '../../application/repositories';
import { Diagnosis } from '../../domain/models';
import { TYPES } from '../../types';
import { DiagnosisORM } from '../entities/diagnosis';
import { ReportORM } from '../entities/report';
import { ReportsRepositoryImpl } from './reports-repository-impl';

const options: Bull.QueueOptions = {
  redis: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
};

@injectable()
export class DiagnosisRepositoryImpl implements DiagnosisRepository {
  private readonly bull = new Bull<Diagnosis>('diagnosis', options);

  @inject(TYPES.Connection)
  private readonly connection: Connection;

  constructor() {
    this.bull.process(this.handleProcess);
  }

  static toDomain(diagnosis: DiagnosisORM) {
    return new Diagnosis({
      id: diagnosis.id,
      status: diagnosis.status,
      screenshot: diagnosis.screenshot,
      url: diagnosis.url,
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
    entity.url = domain.url;
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

  async update(diagnosis: Diagnosis) {
    const entity = DiagnosisRepositoryImpl.toORM(diagnosis);
    await this.connection.getRepository(ReportORM).save(entity.reports);
    await this.connection.getRepository(DiagnosisORM).update(entity.id, entity);
    const [result] = await this.find([entity.id]);
    return result;
  }

  async delete(id: string) {
    await this.connection.getRepository(DiagnosisORM).delete(id);
    return id;
  }

  async queue(diagnosis: Diagnosis) {
    await this.bull.add(diagnosis);
  }

  private async handleProcess(
    job: Bull.Job<Diagnosis>,
    done: Bull.DoneCallback,
  ) {
    const visible = await Visible.init({});
    await visible.open(job.data.url);
    const diagnosis$ = visible.diagnose();

    diagnosis$.pipe(finalize(() => done())).subscribe(progress => {
      const percentage = (progress.doneCount / progress.totalCount) * 100;
      job.progress(percentage);
    });
  }
}
