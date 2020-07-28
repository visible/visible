import { Queue } from 'bullmq';
import { injectable } from 'inversify';

import { ProcessDiagnosisQueue } from '../../interfaces/gateways';

@injectable()
export class ProcessDiagnosisQueueImpl extends Queue
  implements ProcessDiagnosisQueue {
  constructor() {
    super('ProcessDiagnosis');
  }
}
