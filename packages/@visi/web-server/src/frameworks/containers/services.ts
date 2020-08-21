import { ContainerModule } from 'inversify';

import { TYPES } from '../../types';
import {
  AnalyzerVisibleImpl,
  I18nI18nextImpl,
  LoggerConsoleImpl,
  StorageFsImpl,
} from '../services';

export const services = new ContainerModule((bind) => {
  bind(TYPES.I18n).to(I18nI18nextImpl);
  bind(TYPES.Logger).to(LoggerConsoleImpl);
  bind(TYPES.Storage).to(StorageFsImpl);
  bind(TYPES.Analyzer).to(AnalyzerVisibleImpl);
});
