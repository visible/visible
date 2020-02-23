import { BaseRule } from '../base-rule';

const fakeConfig = {
  extends: ['@visi/plugin-standard'],
  settings: {
    headless: false,
  },
};

describe('BaseRule', () => {
  beforeAll(() => {
    window.__VISIBLE_CONFIG__ = fakeConfig;
  });

  it('initializes properly', () => {
    let config;

    new (class A extends BaseRule {
      constructor() {
        super();
        config = this.context.config;
      }
    })();

    expect(config).toEqual(fakeConfig);
  });
});
