import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { TYPES } from '../../types';
import { Diagnosis } from '../../domain/entities/diagnosis';
import { DiagnosisRepository } from '../../application/repositories/diagnosis-repository';

// naoshite
import { Diagnosis as DiagnosisORM } from '../../frameworks/database/entities/diagnosis';

@injectable()
export class DiagnosticsRepositoryImpl implements DiagnosisRepository {
  @inject(TYPES.DiagnosisORM)
  private db: Repository<DiagnosisORM>;

  async get(id: string) {
    const result = await this.db.findOne(id);
    if (!result) throw new Error('Entry not found');
    return result;
  }

  async getAll(ids: string[]) {
    const result = await this.db.findByIds(ids);
    if (!result) throw new Error('Entity not found');
    return result;
  }

  async create(diagnosis: Diagnosis) {
    const data = new DiagnosisORM();
    data.id = diagnosis.id;
    const result = await this.db.save(data);
    return result;
  }

  async delete(id: string) {
    await this.db.delete(id);
    return id;
  }
}
