import { visible } from '@visi/core';

import { Website } from '../../domain/entities/website';

import { GetDiagnosis } from '../../application/use-cases/get-diagnosis';
import { CreateDiagnosis } from '../../application/use-cases/create-diagnosis';
import { DeleteDiagnosis } from '../../application/use-cases/delete-diagnosis';

import { DiagnosisSerializer } from '../serializers/diagnosis-serializer';
import { GetManyDiagnosis } from '../../application/use-cases/get-many-diagnosis';

export class DiagnosisController {
  async get(id: string) {
    const result = await new GetDiagnosis().run(id);
    return new DiagnosisSerializer().serialize(result);
  }

  async getAll(ids: readonly string[]) {
    const result = await new GetManyDiagnosis().run(ids);
    const serializer = new DiagnosisSerializer();
    return result.map(diagnosis => serializer.serialize(diagnosis));
  }

  async create(url: string) {
    const reports = await visible({ url });

    const diagnosis = await new CreateDiagnosis().run({
      id: '1',
      reports: reports.map(report => ({
        id: report.id,
        type: report.type,
        content: report.content,
        message: report.message,
      })),
      website: {} as Website,
    });

    return new DiagnosisSerializer().serialize(diagnosis);
  }

  async delete(id: string) {
    const result = await new DeleteDiagnosis().run(id);
    return result;
  }
}
