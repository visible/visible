import { Visible } from '../visible';
import { Browser } from '../browser';
import { ModuleResolver } from '../module-resolver';

const addScriptTag = jest.fn();
const run = jest.fn();
const openURL = jest.fn();
const waitFor = jest.fn();
const setup = jest.fn();
const cleanup = jest.fn();

class MockBrowser implements Browser {
  addScriptTag = addScriptTag;
  run = run;
  openURL = openURL;
  waitFor = waitFor;
  setup = setup;
  cleanup = cleanup;
}

const start = jest.fn();

class MockModuleResolver implements ModuleResolver {
  start = start;
}

const params = {
  url: 'https://neet.love',
  config: {
    settings: {},
  },
};

describe('Visible', () => {
  let visible: Visible;

  beforeAll(() => {
    visible = new Visible(params, new MockBrowser(), new MockModuleResolver());
  });

  it('diagnose', async () => {
    run.mockImplementationOnce(() => Promise.resolve('done!'));

    const result = await visible.diagnose();

    expect(start).toBeCalled();
    expect(setup).toBeCalledWith(params.config.settings);
    expect(openURL).toBeCalledWith(params.url);
    expect(addScriptTag).toBeCalledWith(
      expect.objectContaining({
        path: expect.stringContaining('embed/index.js'),
      }),
    );
    expect(addScriptTag).toBeCalledWith(
      expect.objectContaining({
        content: expect.any(String),
      }),
    );
    expect(waitFor).toBeCalledWith(1000);
    expect(run).toBeCalledWith(expect.stringContaining('runRule'));
    expect(waitFor).toBeCalledWith(1000);
    expect(cleanup).toBeCalled();

    expect(result).toBe('done!');
  });
});
