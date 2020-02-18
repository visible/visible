import { Browser } from '../browser';
import { Visible } from '../visible';

const addScriptTag = jest.fn();
const run = jest.fn();
const openURL = jest.fn();
const waitFor = jest.fn();
const setup = jest.fn();
const cleanup = jest.fn();
const exposeFunction = jest.fn();
const serveModule = jest.fn();

class MockBrowser implements Browser {
  addScriptTag = addScriptTag;
  run = run;
  openURL = openURL;
  waitFor = waitFor;
  setup = setup;
  cleanup = cleanup;
  exposeFunction = exposeFunction;
  serveModule = serveModule;
}

const params = {
  url: 'https://neet.love',
  config: {
    settings: {},
  },
};

describe('Visible', () => {
  let visible: Visible;

  beforeAll(async () => {
    visible = await Visible.init(params, new MockBrowser());
  });

  it('diagnose', async () => {
    run.mockImplementationOnce(() => Promise.resolve('done!'));

    const result = await visible.diagnose();

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
