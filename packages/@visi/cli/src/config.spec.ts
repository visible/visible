import { ConfigLoader } from './config';

describe('config', () => {
  it('creates instance', async () => {
    const config = await ConfigLoader.init({
      driver: 'foo',
      plugins: ['bar', 'bal'],
      settings: {
        width: 123,
      },
    });

    expect(config.driver).toBe('foo');
    expect(config.plugins).toEqual(['@visi/plugin-puppeteer', 'bar', 'bal']);
    expect(config.settings.width).toBe(123);
  });

  it('merges configs', async () => {
    const config = await ConfigLoader.init({
      extends: ['./__fixtures__/config.json'],
    });

    expect(config.driver).toBe('@visi/fake-driver');
  });
});
