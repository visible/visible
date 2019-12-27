import { Repository } from 'typeorm';
import { Diagnosis } from '../../enterprise/entities/diagnosis';
import { DiagnosisRepository } from '../../application/repositories/diagnosis-repository';

export class DiagnosticsRepositoryImpl implements DiagnosisRepository {
  constructor(private dataMapper: Repository<Diagnosis>) {}

  async get(id: string) {
    const result = await this.dataMapper.findOne(id);
    if (!result) throw new Error('Entry not found');
    return result;
  }

  async getAll(ids: string[]) {
    const result = await this.dataMapper.findByIds(ids);
    if (!result.length) throw new Error('Entity not found');
    return result;
  }

  async create(diagnosis: Diagnosis) {
    const entity = this.dataMapper.create(diagnosis);
    const result = await this.dataMapper.save(entity);
    return result;
  }

  async delete(id: string) {
    await this.dataMapper.delete(id);
    return id;
  }
}
