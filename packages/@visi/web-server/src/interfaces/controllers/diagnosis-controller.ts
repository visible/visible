import { inject, injectable } from 'inversify';
import { map, tap } from 'rxjs/operators';

import {
  CreateDiagnosisUseCase,
  DeleteDiagnosisUseCase,
  FindDiagnosisUseCase,
  ProcessDiagnosisUseCase,
  SubscribeDiagnosisUseCase,
} from '../../application/use-cases';
import { Logger } from '../../domain/services';
import { TYPES } from '../../types';
import { toAsyncIterator } from '../../utils/to-async-iterator';
import { DiagnosisAPI, DiagnosisPresenter } from '../presenters';

@injectable()
export class DiagnosisController {
  constructor(
    @inject(TYPES.FindDiagnosisUseCase)
    private readonly findDiagnosis: FindDiagnosisUseCase,

    @inject(TYPES.CreateDiagnosisUseCase)
    private readonly createDiagnosis: CreateDiagnosisUseCase,

    @inject(TYPES.DeleteDiagnosisUseCase)
    private readonly deleteDiagnosis: DeleteDiagnosisUseCase,

    @inject(TYPES.ProcessDiagnosisUseCase)
    private readonly processDiagnosis: ProcessDiagnosisUseCase,

    @inject(TYPES.SubscribeDiagnosisUseCase)
    private readonly subscribeDiagnosis: SubscribeDiagnosisUseCase,

    @inject(DiagnosisPresenter)
    private readonly diagnosisPresenter: DiagnosisPresenter,

    @inject(TYPES.Logger)
    private readonly logger: Logger,
  ) {}

  async find(ids: readonly string[]): Promise<DiagnosisAPI[]> {
    const { diagnoses } = await this.findDiagnosis.run({ ids });
    const output = diagnoses.map((diagnosis) =>
      this.diagnosisPresenter.run(diagnosis),
    );
    return output;
  }

  async create(url: string): Promise<DiagnosisAPI> {
    const { diagnosis } = await this.createDiagnosis.run({ url });
    const output = this.diagnosisPresenter.run(diagnosis);
    return output;
  }

  async delete(id: string): Promise<string> {
    const res = await this.deleteDiagnosis.run({ id });
    return res.id;
  }

  async process(id: string): Promise<void> {
    return this.processDiagnosis.run({ id });
  }

  subscribe(id: string): AsyncIterableIterator<{ diagnosis: DiagnosisAPI }> {
    const stream$ = this.subscribeDiagnosis.run({ id }).pipe(
      tap(() => this.logger.debug(`got ${id}, publishing...`)),
      map((diagnosis) => this.diagnosisPresenter.run(diagnosis)),
      map((diagnosis) => ({ diagnosis })),
    );

    return toAsyncIterator(stream$);
  }
}
