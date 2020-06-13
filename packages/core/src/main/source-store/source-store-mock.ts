import { SourceStore } from './source-store';

export const getSources = jest.fn();
export const fetchHTMLSource = jest.fn();
export const fetchCSSSource = jest.fn();

export class SourceStoreMock implements SourceStore {
  getSources = getSources;
  fetchHTMLSource = fetchHTMLSource;
  fetchCSSSource = fetchCSSSource;
}
