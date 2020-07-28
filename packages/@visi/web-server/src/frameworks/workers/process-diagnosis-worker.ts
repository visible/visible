import { Worker } from 'bullmq';
import { inject, injectable } from 'inversify';

import { DiagnosisController } from '../../interfaces/controllers';

@injectable()
export class ProcessDiagnosisWorker extends Worker {
  constructor(
    @inject(DiagnosisController)
    private readonly diagnosisController: DiagnosisController,
  ) {
    super('ProcessDiagnosis', async (job) => {
      this.diagnosisController.process(job.name);
    });
  }
}
