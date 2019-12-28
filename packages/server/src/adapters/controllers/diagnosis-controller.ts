import { visible } from '@visi/core';
import { injectable, inject } from 'inversify';

import { DiagnosisRepository } from '../../application/repositories/diagnosis-repository';
import { CreateDiagnosis } from '../../application/use-cases/create-diagnosis';
import { DeleteDiagnosis } from '../../application/use-cases/delete-diagnosis';
import { FindDiagnosis } from '../../application/use-cases/find-diagnosis';

import { DiagnosisInterpreter } from '../interpreters/diagnosis-interpreter';
import { DiagnosisSerializer } from '../serializers/diagnosis-serializer';
import { TYPES } from '../../types';

@injectable()
export class DiagnosisController {
  @inject(TYPES.DiagnosisRepository)
  private diagnosisRepository: DiagnosisRepository;

  async find(ids: readonly string[]) {
    const result = await new FindDiagnosis(this.diagnosisRepository).run(ids);
    const output = new DiagnosisSerializer().transform(result);
    return output;
  }

  async create(url: string) {
    const reports = await visible({ url });
    const input = new DiagnosisInterpreter().transform(reports);
    const result = await new CreateDiagnosis(this.diagnosisRepository).run(
      input,
    );
    const output = new DiagnosisSerializer().transformOne(result);
    return output;
  }

  async delete(id: string) {
    return new DeleteDiagnosis(this.diagnosisRepository).run(id);
  }
}
