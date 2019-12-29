import { injectable, unmanaged } from 'inversify';
import { DiagnosisRepository } from '../../../application/repositories/diagnosis-repository';
import { Diagnosis } from '../../../enterprise/entities';

@injectable()
export class DiagnosisRepositoryInMemoryImpl implements DiagnosisRepository {
  constructor(
    @unmanaged()
    private diagnosis = new Map<string, Diagnosis>(),
  ) {}

  async find(ids: string[]) {
    return ids
      .map(id => this.diagnosis.get(id))
      .filter((v): v is Diagnosis => !!v);
  }

  async create(diagnosis: Diagnosis) {
    this.diagnosis.set(diagnosis.id, diagnosis);
    const result = this.diagnosis.get(diagnosis.id);
    if (!result) throw new Error('No entry found');
    return result;
  }

  async delete(id: string) {
    this.diagnosis.delete(id);
    return id;
  }
}
