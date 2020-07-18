import { injectable } from 'inversify';

import { I18n } from '../../../domain/services/i18n';

@injectable()
export class I18nMock implements I18n {
  t(_key: string, defaultValue: string) {
    return defaultValue;
  }
}
