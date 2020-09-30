import { BaseSession, HTMLRootNode, Session, Source } from '@visi/core';
import { parseDOM } from 'htmlparser2';
import { JSDOM } from 'jsdom';

const HTML_ID = 'main';

export class SessionJsdomImpl extends BaseSession implements Session {
  readonly sources = new Map<string, Source>();
  private domWindow!: JSDOM;
  private url!: string;

  async render(_html: string): Promise<void> {
    this.url = 'https://localhost';
    this.domWindow = new JSDOM(_html, {
      resources: 'usable',
      runScripts: 'dangerously',
    });

    const html = this.domWindow.serialize();
    const node = parseDOM(html, {
      withEndIndices: true,
      withStartIndices: true,
    });
    this.sources.set(
      HTML_ID,
      new Source({
        url: this.url,
        node: new HTMLRootNode(node),
      }),
    );
  }

  async goto(url: string): Promise<void> {
    this.url = url;
    this.domWindow = await JSDOM.fromURL(url, {
      resources: 'usable',
      runScripts: 'dangerously',
    });

    const html = this.domWindow.serialize();
    const node = parseDOM(html, {
      withEndIndices: true,
      withStartIndices: true,
    });
    this.sources.set(
      HTML_ID,
      new Source({
        url,
        node: new HTMLRootNode(node),
      }),
    );
  }

  async getTitle(): Promise<string> {
    return (
      this.domWindow.window.document.querySelector('title')?.textContent ??
      'Untitled'
    );
  }

  async getURL(): Promise<string> {
    return this.url;
  }

  async close(): Promise<void> {
    return this.domWindow.window.close();
  }

  async eval<T>(script: string): Promise<T> {
    return this.domWindow.window.eval(script) as T;
  }

  async takeScreenshotForPage(): Promise<string> {
    // eslint-disable-next-line
    console.warn('unimplemented');
    return '/';
  }

  async takeScreenshotForXPath(): Promise<string> {
    // eslint-disable-next-line
    console.warn('unimplemented');
    return '/';
  }

  async findCSS(_xpath: string, _propertyName: string): Promise<undefined> {
    throw new Error('stub');
  }
}
