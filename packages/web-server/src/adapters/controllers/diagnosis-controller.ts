import { inject, injectable } from 'inversify';

import {
  CreateDiagnosisUseCase,
  DeleteDiagnosisUseCase,
  FindDiagnosisUseCase,
} from '../../application/use-cases';
import { TYPES } from '../../types';
import { transformDiagnosis } from '../serializers/serializers';

@injectable()
export class DiagnosisController {
  @inject(TYPES.FindDiagnosisUseCase)
  private findDiagnosis: FindDiagnosisUseCase;

  @inject(TYPES.CreateDiagnosisUseCase)
  private createDiagnosis: CreateDiagnosisUseCase;

  @inject(TYPES.DeleteDiagnosisUseCase)
  private deleteDiagnosis: DeleteDiagnosisUseCase;

  async find(ids: readonly string[]) {
    const { diagnoses } = await this.findDiagnosis.run({ ids });
    const output = diagnoses.map((diagnosis) => transformDiagnosis(diagnosis));
    return output;
  }

  async create(url: string) {
    const { diagnosis } = await this.createDiagnosis.run({ url });
    const output = transformDiagnosis(diagnosis);
    return output;
  }

  async delete(id: string) {
    const res = await this.deleteDiagnosis.run({ id });
    return res.id;
  }
}
