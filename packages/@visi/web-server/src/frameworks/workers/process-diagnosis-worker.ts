import { DoneCallback, Job } from 'bull';
import { inject, injectable } from 'inversify';

import { Diagnosis } from '../../domain/models';
import { DiagnosisController } from '../../interfaces/controllers';
import { TYPES } from '../../types';
import { JobData, ProcessDiagnosisJob } from '../jobs';

@injectable()
export class ProcessDiagnosisWorker {
  constructor(
    @inject(TYPES.ProcessDiagnosisJob)
    private readonly processDiagnosis: ProcessDiagnosisJob,

    @inject(DiagnosisController)
    private readonly diagnosisController: DiagnosisController,
  ) {}

  async start() {
    this.processDiagnosis.queue.process(this.process);
    await this.processDiagnosis.queue.isReady();
  }

  process = async (job: Job<JobData>, done: DoneCallback) => {
    await this.diagnosisController.process(
      Diagnosis.from(JSON.parse(job.data)),
    );
    done();
  };
}
