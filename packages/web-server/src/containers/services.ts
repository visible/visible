import { ContainerModule } from 'inversify';

import {
  I18nI18nextImpl,
  LoggerConsoleImpl,
  StorageFsImpl,
} from '../frameworks/services';
import { TYPES } from '../types';

export const services = new ContainerModule((bind) => {
  bind(TYPES.I18n).to(I18nI18nextImpl);
  bind(TYPES.Logger).to(LoggerConsoleImpl);
  bind(TYPES.Storage).to(StorageFsImpl);
});
