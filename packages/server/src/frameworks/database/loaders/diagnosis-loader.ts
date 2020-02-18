import DataLoader from 'dataloader';
import { inject, injectable } from 'inversify';

import { DiagnosisController } from '../../../adapters/controllers/diagnosis-controller';
import { DiagnosisAPI } from '../../../adapters/serializers/diagnosis-serializer';

export interface DiagnosisLoader {
  load(id: string): Promise<DiagnosisAPI>;
  loadMany(id: string[]): Promise<(DiagnosisAPI | Error)[]>;
}

@injectable()
export class DiagnosisLoaderImpl implements DiagnosisLoader {
  private loader: DataLoader<string, DiagnosisAPI>;

  constructor(
    @inject(DiagnosisController)
    diagnosisController: DiagnosisController,
  ) {
    this.loader = new DataLoader((ids: readonly string[]) => {
      return diagnosisController.find(ids);
    });
  }

  load = (id: string) => this.loader.load(id);
  loadMany = (ids: string[]) => this.loader.loadMany(ids);
}
