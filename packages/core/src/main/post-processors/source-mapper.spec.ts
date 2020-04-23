import cssReport from '../../__fixtures__/css-property-report.json';
import htmlReport from '../../__fixtures__/html-report.json';
import { Report } from '../../shared';
import {
  DriverMock,
  getHTMLContent,
  getURL,
  lookupStyleSheetURLById,
} from '../driver/driver-mock';
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
    sourceMapper = new SourceMapper({}, new DriverMock());
  });

  it('map source code for HTML', async () => {
    getHTMLContent.mockResolvedValue('');
    getURL.mockImplementation(() => 'https://example.com');
    (findASTByXPath as jest.Mock).mockImplementation(() => ({
      startIndex: 0,
      endIndex: 0,
    }));

    const report = await sourceMapper.run(htmlReport as Report);

    if (report.outcome !== 'fail') {
      throw new Error();
    }

    expect(report.sources[0]?.pointer.url).toBe('https://example.com');
    expect(report.sources[0]?.pointer.location).toEqual({
      startLine: 1,
      endLine: 1,
      startColumn: 0,
      endColumn: 0,
    });
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
    lookupStyleSheetURLById.mockImplementation(() => 'https://example.com');

    const report = await sourceMapper.run(cssReport as Report);

    if (report.outcome !== 'fail') {
      throw new Error();
    }

    expect(report.sources[0].pointer.url).toBe('https://example.com');
    expect(report.sources[0].pointer.location).toEqual({
      startColumn: 1,
      startLine: 1,
      endColumn: 1,
      endLine: 1,
    });
  });

  test.todo('return original report when node not found');
  test.todo('return original report when stylesheet not found');
});
