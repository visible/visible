import { Source } from '../../shared';

export interface SourceStore {
  getSources(): Map<string, Source>;
  fetchHTMLSource(): Promise<Source | undefined>;
  fetchCSSSource(styleSheetId: string): Promise<Source | undefined>;
}
