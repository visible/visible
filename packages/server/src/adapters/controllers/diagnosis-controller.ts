import { visible } from '@visi/core/main';
import { inject, injectable } from 'inversify';

import { CreateDiagnosis } from '../../application/use-cases/create-diagnosis';
import { DeleteDiagnosis } from '../../application/use-cases/delete-diagnosis';
import { FindDiagnosis } from '../../application/use-cases/find-diagnosis';
import { DiagnosisInterpreter } from '../interpreters/diagnosis-interpreter';
import { DiagnosisSerializer } from '../serializers/diagnosis-serializer';

@injectable()
export class DiagnosisController {
  @inject(FindDiagnosis)
  private findDiagnosis: FindDiagnosis;

  @inject(CreateDiagnosis)
  private createDiagnosis: CreateDiagnosis;

  @inject(DeleteDiagnosis)
  private deleteDiagnosis: DeleteDiagnosis;

  async find(ids: readonly string[]) {
    const result = await this.findDiagnosis.run(ids);
    const output = new DiagnosisSerializer().transform(result);
    return output;
  }

  async create(url: string) {
    const reports = await visible({
      config: {
        extends: [],
        plugins: ['@visi/plugin-standard'],
        settings: {
          noSandbox: true,
        },
        rules: {},
      },
      url,
    });

    const input = new DiagnosisInterpreter().transform(reports);
    const result = await this.createDiagnosis.run(input);
    const output = new DiagnosisSerializer().transformOne(result);
    return output;
  }

  async delete(id: string) {
    return this.deleteDiagnosis.run(id);
  }
}
