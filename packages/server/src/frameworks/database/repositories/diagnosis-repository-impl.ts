import { Repository } from 'typeorm';
import { DiagnosisRepository } from '../../../application/repositories/diagnosis-repository';
import { DiagnosisORM } from '../entities/diagnosis';
import { Diagnosis } from '../../../enterprise/entities';

export class DiagnosisRepositoryImpl implements DiagnosisRepository {
  constructor(private repository: Repository<DiagnosisORM>) {}

  async find(ids: string[]) {
    const diagnosises = await this.repository
      .createQueryBuilder('diagnosis')
      .whereInIds(ids)
      .getMany();

    if (!diagnosises.length) throw new Error('Entry not found');

    return diagnosises.map(diagnosis => diagnosis.toDomain());
  }

  async create(diagnosis: Diagnosis) {
    const result = await this.repository.save(diagnosis);
    return result;
  }

  async delete(id: string) {
    await this.repository.delete(id);
    return id;
  }
}
