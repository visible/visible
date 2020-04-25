import i18nextDefault, { i18n } from 'i18next';
import { LanguageDetector } from 'i18next-express-middleware';
import Backend from 'i18next-node-fs-backend';
import { injectable } from 'inversify';

import { I18n } from '../domain/services/i18n';

@injectable()
export class I18nImpl implements I18n {
  private readonly i18next: i18n;

  constructor() {
    this.i18next = i18nextDefault.createInstance();
    this.i18next
      .use(Backend)
      .use(LanguageDetector)
      .init({
        fallbackLng: 'en',
        defaultNS: 'web-server',
        backend: {
          loadPath: '/frameworks/locale/{{lng}}.json',
        },
      });
  }

  t(key: string, defaultValue: string) {
    return this.i18next.t(key, defaultValue);
  }

  getI18nextInstance() {
    return this.i18next;
  }
}
