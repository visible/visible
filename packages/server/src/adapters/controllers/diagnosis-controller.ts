import { visible } from '@visi/core';

// import { Website } from '../../domain/entities/website';

import { CreateDiagnosis } from '../../application/use-cases/create-diagnosis';
import { DeleteDiagnosis } from '../../application/use-cases/delete-diagnosis';
import { FindDiagnosis } from '../../application/use-cases/find-diagnosis';

import { DiagnosisSerializer } from '../serializers/diagnosis-serializer';
import { DiagnosisRepository } from '../../application/repositories/diagnosis-repository';
import { DiagnosisInterpreter } from '../interpreters/diagnosis-interpreter';

export class DiagnosisController {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  async find(ids: readonly string[]) {
    return new FindDiagnosis(
      this.diagnosisRepository,
      new DiagnosisSerializer(),
    ).run(ids);
  }

  async create(url: string) {
    const reports = await visible({ url });

    return new CreateDiagnosis(
      this.diagnosisRepository,
      new DiagnosisSerializer(),
      new DiagnosisInterpreter(),
    ).run(reports);
  }

  async delete(id: string) {
    return new DeleteDiagnosis(this.diagnosisRepository).run(id);
  }
}
