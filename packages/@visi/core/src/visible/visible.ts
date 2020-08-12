import { Observable } from 'rxjs';

import { Driver } from '../driver';
import { Provider } from '../provider';
import { Progress, Rule } from '../rule';
import { Settings } from '../settings';
import { Source } from '../source';
import { Capturer } from './capturer';
import { Validator } from './validator';
import { Website } from './website';

// Facade
export class Visible {
  private readonly validator: Validator;
  private readonly capturer: Capturer;

  constructor(
    settings: Settings,
    driver: Driver,
    rules: Rule[],
    provider: Provider,
  ) {
    this.validator = new Validator(settings, driver, rules, provider);
    this.capturer = new Capturer(settings, driver);
  }

  get diagnosisProgress$(): Observable<Progress> {
    return this.validator.progress$;
  }

  diagnose(url: string): Promise<Source[]> {
    return this.validator.diagnose(url);
  }

  capture(url: string): Promise<Website> {
    return this.capturer.capture(url);
  }
}