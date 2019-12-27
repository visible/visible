import uuid from 'uuid';
import { visible } from '@visi/core';

// import { Website } from '../../domain/entities/website';

import { CreateDiagnosis } from '../../application/use-cases/create-diagnosis';
import { DeleteDiagnosis } from '../../application/use-cases/delete-diagnosis';
import { FindDiagnosis } from '../../application/use-cases/find-diagnosis';

import { DiagnosisSerializer } from '../serializers/diagnosis-serializer';
import { DiagnosisRepository } from '../../application/repositories/diagnosis-repository';

export class DiagnosisController {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  async find(ids: readonly string[]) {
    const diagnosises = await new FindDiagnosis(this.diagnosisRepository).run(
      ids,
    );
    return new DiagnosisSerializer().serialize(diagnosises);
  }

  async create(url: string) {
    const reports = await visible({ url });

    const diagnosis = await new CreateDiagnosis(this.diagnosisRepository).run({
      id: uuid(),
      reports: reports.map(report => ({
        id: uuid(),
        name: report.id,
        type: report.type,
        message: report.message,
        xpath: report.content && report.content.xpath,
        html: report.content && report.content.html,
        css: report.content && report.content.style,
      })),
      // website: {} as Website,
    });

    return new DiagnosisSerializer().serializeOne(diagnosis);
  }

  async delete(id: string) {
    const result = await new DeleteDiagnosis(this.diagnosisRepository).run(id);
    return result;
  }
}
