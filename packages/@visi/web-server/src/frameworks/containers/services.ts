import { ContainerModule } from 'inversify';

import { TYPES } from '../../types';
import {
  AnalyzerVisibleImpl,
  I18nI18nextImpl,
  LoggerConsoleImpl,
  LoggerLog4jsImpl,
  StorageFsImpl,
  StorageGoogleCloudStorageImpl,
} from '../services';

export const services = new ContainerModule((bind) => {
  bind(TYPES.I18n).to(I18nI18nextImpl);

  if (process.env.LOGGER === 'console') {
    bind(TYPES.Logger).to(LoggerConsoleImpl);
  } else {
    bind(TYPES.Logger).to(LoggerLog4jsImpl);
  }

  if (process.env.STORAGE === 'google-cloud-storage') {
    bind(TYPES.Storage).to(StorageGoogleCloudStorageImpl);
  } else {
    bind(TYPES.Storage).to(StorageFsImpl);
  }

  bind(TYPES.Analyzer).to(AnalyzerVisibleImpl);
});
