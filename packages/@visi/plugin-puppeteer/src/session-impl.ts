import {
  AddScriptParams,
  BaseSession,
  CSSNode,
  HTMLRootNode,
  ScreenshotParams,
  Session,
  Settings,
  Source,
} from '@visi/core';
import { Protocol } from 'devtools-protocol/types/protocol';
import { parseDOM } from 'htmlparser2';
import * as postcss from 'postcss';
import { CDPSession, Page } from 'puppeteer';

import { findNodeByXPath } from './find-node-by-xpath';

export class SessionImpl extends BaseSession implements Session {
  readonly sources = new Map<string, Source>();
  private readonly htmlIdsMap = new Map<string, string>();
  private readonly cssIdsMap = new Map<string, string>();

  constructor(
    private readonly settings: Settings,
    private readonly page: Page,
    private readonly cdp: CDPSession,
  ) {
    super();
  }

  async render(html: string): Promise<void> {
    // Create CDP session
    await this.cdp.send('DOM.enable');
    await this.cdp.send('CSS.enable');
    this.cdp.on('CSS.styleSheetAdded', this.handleStyleSheetAdded);

    // navigate
    await this.page.setContent(html);

    // Parse HTML as an AST and cache
    const content = await this.page.content();
    const ast = parseDOM(content, {
      withEndIndices: true,
      withStartIndices: true,
    });
    const source = new Source({
      url: this.page.url(),
      node: new HTMLRootNode(ast),
    });
    this.htmlIdsMap.set('main', source.id);
    this.sources.set(source.id, source);
  }

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
    const source = new Source({
      url: this.page.url(),
      node: new HTMLRootNode(ast),
    });
    this.htmlIdsMap.set('main', source.id);
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

  async eval<T>(script: string): Promise<T> {
    return this.page.evaluate(script) as Promise<T>;
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

  async findCSS(
    xpath: string,
    propertyName: string,
  ): Promise<[string, postcss.Node] | undefined> {
    // 1. find matching css from the depot using CDP
    const node = await findNodeByXPath(this.cdp, xpath);

    if (node == null) {
      throw new Error(`No matching node found for ${xpath}`);
    }

    const { matchedCSSRules, inherited } = await this.cdp
      .send('CSS.getMatchedStylesForNode', {
        nodeId: node.nodeId,
      })
      .catch(() => {
        return {
          matchedCSSRules: undefined,
          inherited: undefined,
        };
      });

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
    const sourceId = this.cssIdsMap.get(rule.styleSheetId);
    if (sourceId == null) {
      throw new Error(
        `No corresponding source id found for stylesheet ${rule.styleSheetId}`,
      );
    }

    const file = this.sources.get(sourceId);
    if (
      file == null ||
      !(file.node instanceof CSSNode) ||
      file.node.value.type !== 'root'
    ) {
      throw new Error(`No source cached for ${rule.styleSheetId}`);
    }

    const selector = rule.selectorList.selectors[matchingSelectors[0]].text;
    let res: postcss.Declaration | undefined;

    // todo: better searching for the selector
    file.node.value.walkRules(selector, (rule) => {
      res = rule.nodes
        ?.filter((node): node is postcss.Declaration => node.type === 'decl')
        .find((decl) => decl.prop === propertyName);
    });

    if (res == null) {
      return;
    }

    return [sourceId, res];
  }

  private handleStyleSheetAdded = async (
    e: Protocol.CSS.StyleSheetAddedEvent,
  ) => {
    const { styleSheetId, sourceURL } = e.header;

    // StyleSheetHeader doesn't contain the text so we fetch it separately.
    const res = await this.cdp
      .send('CSS.getStyleSheetText', {
        styleSheetId,
      })
      // TODO: fix this error
      .catch(() => undefined);

    if (res == null) return;

    const source = new Source({
      url: sourceURL,
      node: new CSSNode(postcss.parse(res.text)),
    });

    this.sources.set(source.id, source);
    this.cssIdsMap.set(styleSheetId, source.id);
  };
}
