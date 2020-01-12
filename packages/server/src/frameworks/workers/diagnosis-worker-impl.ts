import { visible } from '@visi/core/main';
import Bull, { Job } from 'bull';
import { inject } from 'inversify';
import uuid from 'uuid';
import { Diagnosis, DiagnosisStatus, Report } from '../../enterprise/entities';
import { DiagnosisWorker } from '../../application/workers/diagnosis-worker';
import { DiagnosisRepository } from '../../application/repositories/diagnosis-repository';
import { DiagnosisInterpreter } from '../../adapters/interpreters/diagnosis-interpreter';
import { TYPES } from '../../types';

interface QueueInput {
  diagnosis: Diagnosis;
}

const MAX_CHILD = 10;

export class DiagnosisWorkerImpl implements DiagnosisWorker {
  private queue: Bull.Queue<QueueInput>;

  @inject(TYPES.DiagnosisRepository)
  private diagnosisRepository: DiagnosisRepository;

  constructor() {
    this.queue = new Bull<QueueInput>(name, {
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });

    this.queue.process(MAX_CHILD, this.process);
  }

  async append(diagnosis: Diagnosis) {
    this.queue.add({ diagnosis });
    return;
  }

  async process(job: Job<QueueInput>) {
    const result = await visible({
      url: '',
      config: {
        extends: [],
        plugins: ['@visi/plugin-standard'],
        rules: {},
      },
    });

    const diagnosis = new Diagnosis(
      job.data.diagnosis.id,
      DiagnosisStatus.DONE,
      result.map(
        report =>
          new Report(
            uuid(),
            report.type,
            job.data.diagnosis.id,
            new DiagnosisInterpreter().transformType(report.level),
            report.message,
            report.content?.xpath,
            report.content?.style,
            report.content?.html,
          ),
      ),
      1,
      1,
      job.data.diagnosis.createdAt,
      new Date(),
    );

    this.diagnosisRepository.update(diagnosis);
  }
}
