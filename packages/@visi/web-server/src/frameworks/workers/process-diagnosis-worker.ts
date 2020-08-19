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
      try {
        this.diagnosisController.process(job.name);
      } catch (error) {
        // eslint-disable-next-line
        console.error(JSON.stringify(error, null, 2));
      }
    });
  }
}
