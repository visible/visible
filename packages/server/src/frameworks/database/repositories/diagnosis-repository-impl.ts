import { injectable, inject } from 'inversify';
import { Connection } from 'typeorm';
import { DiagnosisRepository } from '../../../application/repositories/diagnosis-repository';
import { DiagnosisORM } from '../entities/diagnosis';
import { Diagnosis } from '../../../enterprise/entities';
import { TYPES } from '../../../types';

@injectable()
export class DiagnosisRepositoryImpl implements DiagnosisRepository {
  @inject(TYPES.Connection)
  private connection: Connection;

  async find(ids: string[]) {
    const diagnosises = await this.connection
      .getRepository(DiagnosisORM)
      .createQueryBuilder('diagnosis')
      .whereInIds(ids)
      .getMany();

    if (!diagnosises.length) throw new Error('Entry not found');

    return diagnosises.map(diagnosis => diagnosis.toDomain());
  }

  async create(diagnosis: Diagnosis) {
    const result = await this.connection
      .getRepository(DiagnosisORM)
      .save(diagnosis);

    return result;
  }

  async delete(id: string) {
    await this.connection.getRepository(DiagnosisORM).delete(id);
    return id;
  }
}
