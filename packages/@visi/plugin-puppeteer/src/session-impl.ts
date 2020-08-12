import {
  AddScriptParams,
  CSSSource,
  HTMLSource,
  RunScriptParams,
  ScreenshotParams,
  Session,
  Settings,
  Source,
} from '@visi/core';
import { Protocol } from 'devtools-protocol/types/protocol';
import { Element, Node } from 'domhandler';
import { promises as fs } from 'fs';
import { parseDOM } from 'htmlparser2';
import * as postcss from 'postcss';
import { CDPSession, Page } from 'puppeteer';

import { findASTByXPath } from './find-ast-by-xpath';
import { findNodeByXPath } from './find-node-by-xpath';

export class SessionImpl implements Session {
  readonly sources = new Map<string, Source>();

  constructor(
    private readonly settings: Settings,
    private readonly page: Page,
    private readonly cdp: CDPSession,
  ) {}

  async goto(url: string): Promise<void> {
    // Create CDP session
    await this.cdp.send('DOM.enable');
    await this.cdp.send('CSS.enable');
    this.cdp.on('CSS.styleSheetAdded', this.handleStyleSheetAdded);

    // navigate
    await this.page.goto(url);

    // Parse HTML as an AST and cache
    const content = await this.page.content();
    const ast = parseDOM(content, {
      withEndIndices: true,
      withStartIndices: true,
    });
    const source = new HTMLSource({
      id: 'html',
      url: this.page.url(),
      content: ast,
    });
    this.sources.set(source.id, source);
  }

  getTitle(): Promise<string> {
    return this.page.title();
  }

  async getURL(): Promise<string> {
    return this.page.url();
  }

  async close(): Promise<void> {
    await this.page.close();
  }

  async addScript(params: AddScriptParams): Promise<void> {
    await this.page.addScriptTag(params);
  }

  async runScript<T>(params: string): Promise<T>;
  async runScript<T>(params: RunScriptParams): Promise<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async runScript<T>(params: any): Promise<T> {
    const content = typeof params === 'string' ? params : params.content;

    if (content != null) {
      return this.page.evaluate(content) as Promise<T>;
    }

    if (params.path != null) {
      const code = await fs.readFile(params.path, 'utf-8');
      return this.page.evaluate(code) as Promise<T>;
    }

    throw new Error(`You must provide either content or path`);
  }

  async waitFor(ms: number): Promise<void> {
    await this.page.waitFor(ms);
  }

  async waitForFunction(fn: string): Promise<void> {
    await this.page.waitForFunction(fn);
  }

  async takeScreenshotForPage(params: ScreenshotParams): Promise<string> {
    await this.page.screenshot(params);
    return params.path ?? process.cwd();
  }

  async takeScreenshotForXPath(
    xpath: string,
    params: ScreenshotParams,
  ): Promise<string> {
    const [elementHandle] = await this.page.$x(xpath);

    if (elementHandle == null) {
      throw new Error(`No element found for xpath ${xpath}`);
    }

    await elementHandle.screenshot(params);
    return params.path ?? process.cwd();
  }

  async findHTML(xpath: string): Promise<[string, Node] | undefined> {
    const html = this.sources.get('html');

    if (html == null || !(html instanceof HTMLSource)) {
      throw new Error(`No html source stored`);
    }

    const root = html.content.find(
      (node) => node instanceof Element && node.name === 'html',
    );

    if (root == null) {
      throw new Error(`Root must be set for finding node`);
    }

    const node = findASTByXPath(root, xpath);
    if (node == null) return;

    return ['html', node];
  }

  async findCSS(
    xpath: string,
    propertyName: string,
  ): Promise<[string, postcss.Node] | undefined> {
    // 1. find matching css from the depot using CDP
    const node = await findNodeByXPath(this.cdp, xpath);

    if (node == null) {
      throw new Error(`No matching node found for ${xpath}`);
    }

    const { matchedCSSRules, inherited } = await this.cdp.send(
      'CSS.getMatchedStylesForNode',
      {
        nodeId: node.nodeId,
      },
    );

    const inheritedStyles = inherited
      ?.flatMap((entry) => entry.matchedCSSRules)
      .map((rule) => rule);

    const styles = [matchedCSSRules, inheritedStyles]
      .flat()
      .filter((rule): rule is Protocol.CSS.RuleMatch => rule != null);

    const container = styles
      .filter((style) => style.rule.origin === 'regular')
      .find((style) => {
        const prop = style.rule.style.cssProperties.find((property) => {
          return property.name === propertyName;
        });

        if (prop != null) {
          return true;
        }
      });

    if (container == null) {
      throw new Error(
        `No stylesheet with property ${propertyName} for ${xpath}`,
      );
    }

    const { rule, matchingSelectors } = container;

    if (rule.styleSheetId == null) {
      throw new Error(`Stylesheet id is not available for ${propertyName}`);
    }

    // 2. traverse and find matching node
    const file = this.sources.get(rule.styleSheetId);
    if (!(file instanceof CSSSource)) {
      throw new Error(`Not source cached for ${rule.styleSheetId}`);
    }

    const selector = rule.selectorList.selectors[matchingSelectors[0]].text;
    let res: postcss.Declaration | undefined;

    // todo: better searching for the selector
    file.content.walkRules(selector, (rule) => {
      res = rule.nodes
        ?.filter((node): node is postcss.Declaration => node.type === 'decl')
        .find((decl) => decl.prop === propertyName);
    });

    if (res == null) {
      return;
    }

    return [rule.styleSheetId, res];
  }

  private handleStyleSheetAdded = async (
    e: Protocol.CSS.StyleSheetAddedEvent,
  ) => {
    const { styleSheetId, sourceURL } = e.header;

    // StyleSheetHeader doesn't contain the text so we fetch it separately.
    const res = await this.cdp.send('CSS.getStyleSheetText', {
      styleSheetId,
    });

    const source = new CSSSource({
      id: styleSheetId,
      url: sourceURL,
      content: postcss.parse(res.text),
    });

    this.sources.set(source.id, source);
  };
}