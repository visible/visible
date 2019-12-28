import { DiagnosisRepository } from '../repositories/diagnosis-repository';
import { DiagnosisOutput } from '../outputs/diagnosis-output';
import { DiagnosisInput } from '../inputs/diagnosis-input';

export class CreateDiagnosis<T> {
  constructor(
    private diagnosisRepository: DiagnosisRepository,
    private diagnosisOutput: DiagnosisOutput,
    private diagnosisInput: DiagnosisInput<T>,
  ) {}

  async run(input: T) {
    const diagnosis = this.diagnosisInput.transform(input);
    const data = await this.diagnosisRepository.create(diagnosis);
    const output = this.diagnosisOutput.transformOne(data);
    return output;
  }
}
