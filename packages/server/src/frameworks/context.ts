import DataLoader from 'dataloader';
import { PartialDeep } from 'type-fest';
import { DiagnosisController } from '../adapters/controllers/diagnosis-controller';
import { DiagnosisAPI } from '../domain/entities/diagnosis';

export interface Context {
  loaders: {
    diagnosis: DataLoader<string, PartialDeep<DiagnosisAPI>>;
  };
}

export const createContext = (): Context => ({
  loaders: {
    diagnosis: new DataLoader((ids: readonly string[]) =>
      new DiagnosisController().getAll(ids),
    ),
  },
});
