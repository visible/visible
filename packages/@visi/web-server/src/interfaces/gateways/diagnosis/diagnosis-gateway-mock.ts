import { injectable, unmanaged } from 'inversify';
import { Observable, Subject } from 'rxjs';

import { report } from '../../../__fixtures__/report';
import { DiagnosisRepository } from '../../../application/repositories';
import { Diagnosis, Report } from '../../../domain/models';

@injectable()
export class DiagnosisGatewayMock implements DiagnosisRepository {
  private readonly update$ = new Subject<Diagnosis>();

  constructor(
    @unmanaged()
    private readonly diagnoses = new Map<string, Diagnosis>(),
  ) {}

  async find(ids: string[]): Promise<Diagnosis[]> {
    return ids
      .map((id) => this.diagnoses.get(id))
      .filter((value): value is Diagnosis => value != null);
  }

  async save(diagnosis: Diagnosis): Promise<Diagnosis> {
    this.diagnoses.set(diagnosis.id, diagnosis);
    const result = this.diagnoses.get(diagnosis.id);
    if (!result) throw new Error('No entry found');
    this.update$.next(result);
    return result;
  }

  async delete(id: string): Promise<string> {
    this.diagnoses.delete(id);
    return id;
  }

  async queue(): Promise<void> {
    return;
  }

  subscribe(): Observable<Diagnosis> {
    return this.update$;
  }

  async findReport(_id: string): Promise<Report> {
    return report;
  }
}
