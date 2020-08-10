import { Driver } from '../driver';
import { Provider } from '../provider';
import { Rule } from '../rule';
import { Settings } from '../settings';
import { Capturer } from './capturer';
import { Validator } from './validator';

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

  get diagnosisProgress$() {
    return this.validator.progress$;
  }

  diagnose(url: string) {
    return this.validator.diagnose(url);
  }

  capture(url: string) {
    return this.capturer.capture(url);
  }
}
