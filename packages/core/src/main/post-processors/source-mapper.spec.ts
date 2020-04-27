import cssReport from '../../__fixtures__/css-property-report.json';
import htmlReport from '../../__fixtures__/html-report.json';
import { Report } from '../../shared';
import { context } from '../post-processors/post-processor-context-mock';
import {
  fetchCSSSource,
  fetchHTMLSource,
} from '../source-store/source-store-mock';
import { findASTByXPath } from '../utils/find-ast-by-xpath';
import { findNodeByXPath } from '../utils/find-node-by-xpath';
import { findRuleAndPropertyByName } from '../utils/find-rule-and-property-by-name';
import { SourceMapper } from './source-mapper';

jest.mock('../utils/find-ast-by-xpath', () => ({
  findASTByXPath: jest.fn(),
}));

jest.mock('../utils/find-node-by-xpath', () => ({
  findNodeByXPath: jest.fn(),
}));

jest.mock('../utils/find-rule-and-property-by-name', () => ({
  findRuleAndPropertyByName: jest.fn(),
}));

describe('SourceMapper', () => {
  let sourceMapper: SourceMapper;

  beforeEach(() => {
    sourceMapper = new SourceMapper(context);
  });

  it('map source code for HTML', async () => {
    fetchHTMLSource.mockResolvedValue({
      id: 'html-foo',
      content: '',
    });

    (findASTByXPath as jest.Mock).mockImplementation(() => ({
      startIndex: 0,
      endIndex: 0,
    }));

    const report = await sourceMapper.run(htmlReport as Report);

    if (report.outcome !== 'fail') {
      throw new Error();
    }

    expect(report.pointers[0]?.sourceId).toBe('html-foo');
  });

  it('map source code for CSS', async () => {
    (findNodeByXPath as jest.Mock).mockResolvedValue({});
    (findRuleAndPropertyByName as jest.Mock).mockImplementation(() => ({
      style: {
        styleSheetId: '123',
      },
      property: {
        range: {
          startColumn: 0,
          startLine: 0,
          endColumn: 0,
          endLine: 0,
        },
      },
    }));
    (fetchCSSSource as jest.Mock).mockImplementation(() => ({
      id: 'css-foo',
    }));

    const report = await sourceMapper.run(cssReport as Report);

    if (report.outcome !== 'fail') {
      throw new Error();
    }

    expect(report.pointers[0].sourceId).toBe('css-foo');
  });

  test.todo('return original report when node not found');
  test.todo('return original report when stylesheet not found');
});
