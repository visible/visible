import { Protocol } from 'devtools-protocol/types/protocol';
import { CDPSession, Page } from 'puppeteer';

import { Source } from '../../shared';
import { SourceStore } from './source-store';

export class SourceStoreImpl implements SourceStore {
  private sources = new Map<string, Source>();

  constructor(private readonly page: Page, private readonly cdp: CDPSession) {
    cdp.on('CSS.styleSheetAdded', this.handleStyleSheetAdded);
  }

  private handleStyleSheetAdded = async (
    e: Protocol.CSS.StyleSheetAddedEvent,
  ) => {
    const { styleSheetId, sourceURL, title } = e.header;
    const sourceId = `css-${styleSheetId}`;

    try {
      // StyleSheetHeader doesn't contain the text so we fetch it separately.
      const res = await this.cdp.send('CSS.getStyleSheetText', {
        styleSheetId,
      });

      this.sources.set(sourceId, {
        id: sourceId,
        url: sourceURL,
        title,
        content: res.text,
      });
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };

  getSources() {
    return this.sources;
  }

  async fetchHTMLSource() {
    const url = this.page.url();
    const sourceId = `html-${url}`;

    const cache = this.sources.get(sourceId);
    if (cache) return cache;

    const title = await this.page.title();
    const content = await this.page.content();

    this.sources.set(sourceId, {
      id: sourceId,
      url,
      title,
      content,
    });

    return this.sources.get(sourceId);
  }

  async fetchCSSSource(styleSheetId: string) {
    const sourceId = `css-${styleSheetId}`;

    const cache = this.sources.get(sourceId);
    if (cache) return cache;

    const { text } = await this.cdp.send('CSS.getStyleSheetText', {
      styleSheetId,
    });

    this.sources.set(sourceId, {
      id: sourceId,
      content: text,
    });

    return this.sources.get(sourceId);
  }
}
