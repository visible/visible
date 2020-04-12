import { Browser } from '../browser';
import { Visible } from '../visible';

const addScriptTag = jest.fn().mockResolvedValue(undefined);
const run = jest.fn().mockResolvedValue(undefined);
const openURL = jest.fn().mockResolvedValue(undefined);
const waitFor = jest.fn().mockResolvedValue(undefined);
const setup = jest.fn().mockResolvedValue(undefined);
const cleanup = jest.fn().mockResolvedValue(undefined);
const serveModule = jest.fn().mockResolvedValue(undefined);
const declare = jest.fn().mockResolvedValue(undefined);

class MockBrowser implements Browser {
  addScriptTag = addScriptTag;
  run = run;
  openURL = openURL;
  waitFor = waitFor;
  setup = setup;
  declare = declare;
  cleanup = cleanup;
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
    run.mockImplementation(async (name: string) => {
      if (name === '__VISIBLE_EMBED__.listRules()') {
        return ['foo', 'bar'];
      }

      if (name.match(/__VISIBLE_EMBED__.processRule/)) {
        return [];
      }
    });

    const result = await visible.diagnose().toPromise();
    expect(run).toHaveBeenCalledWith('__VISIBLE_EMBED__.listRules()');
    expect(run).toHaveBeenCalledWith(
      '__VISIBLE_EMBED__.processRule(JSON.parse(\'"foo"\'))',
    );
    expect(run).toHaveBeenCalledWith(
      '__VISIBLE_EMBED__.processRule(JSON.parse(\'"bar"\'))',
    );
    expect(result).toEqual({ reports: [], totalCount: 2, doneCount: 2 });
  });
});
