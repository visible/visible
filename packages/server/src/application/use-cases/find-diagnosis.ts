import { DiagnosisRepository } from '../repositories/diagnosis-repository';
import { DiagnosisOutput } from '../outputs/diagnosis-output';

export class FindDiagnosis {
  constructor(
    private diagnosisRepository: DiagnosisRepository,
    private diagnosisOutput: DiagnosisOutput,
  ) {}

  async run(ids: readonly string[]) {
    const data = await this.diagnosisRepository.find(ids);
    const output = this.diagnosisOutput.transform(data);
    return output;
  }
}
