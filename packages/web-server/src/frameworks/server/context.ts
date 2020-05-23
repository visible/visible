import { inject, injectable } from 'inversify';

import { DiagnosisController } from '../../interfaces/controllers';

@injectable()
export class Context {
  constructor(
    @inject(DiagnosisController)
    readonly diagnosisController: DiagnosisController,
  ) {}
}
