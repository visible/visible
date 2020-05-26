import DataLoader from 'dataloader';
import { inject, injectable } from 'inversify';
import { map, tap } from 'rxjs/operators';

import {
  CreateDiagnosisUseCase,
  DeleteDiagnosisUseCase,
  FindDiagnosisUseCase,
  ProcessDiagnosisUseCase,
  SubscribeDiagnosisUseCase,
} from '../../application/use-cases';
import { Diagnosis } from '../../domain/models';
import { Logger } from '../../domain/services';
import { TYPES } from '../../types';
import { toAsyncIterator } from '../../utils/to-async-iterator';
import { DiagnosisAPI, DiagnosisPresenter } from '../presenters';

@injectable()
export class DiagnosisController {
  private readonly dataLoader: DataLoader<string, DiagnosisAPI>;

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
  ) {
    this.dataLoader = new DataLoader((keys) => this.find(keys));
  }

  async load(key: string) {
    return this.dataLoader.load(key);
  }

  async find(ids: readonly string[]) {
    const { diagnoses } = await this.findDiagnosis.run({ ids });
    const output = diagnoses.map((diagnosis) =>
      this.diagnosisPresenter.run(diagnosis),
    );
    return output;
  }

  async create(url: string) {
    const { diagnosis } = await this.createDiagnosis.run({ url });
    const output = this.diagnosisPresenter.run(diagnosis);
    return output;
  }

  async delete(id: string) {
    const res = await this.deleteDiagnosis.run({ id });
    return res.id;
  }

  async process(diagnosis: Diagnosis) {
    return this.processDiagnosis.run({ diagnosis });
  }

  subscribe(id: string) {
    const stream$ = this.subscribeDiagnosis.run({ id }).pipe(
      tap(() => this.logger.debug(`got ${id}, publishing...`)),
      map((diagnosis) => this.diagnosisPresenter.run(diagnosis)),
      map((diagnosis) => ({ diagnosis })),
    );

    return toAsyncIterator(stream$);
  }
}
