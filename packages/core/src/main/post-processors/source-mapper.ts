import { CDPSession } from 'puppeteer';

import { CSSPropertyPointer, HTMLPointer, Pointer, Report } from '../../shared';
import { SourceStore } from '../source-store/source-store';
import { convertIndicesToLocation } from '../utils/convert-indices-to-location';
import { findASTByXPath } from '../utils/find-ast-by-xpath';
import { findNodeByXPath } from '../utils/find-node-by-xpath';
import { findRuleAndPropertyByName } from '../utils/find-rule-and-property-by-name';
import { PostProcessor, PostProcessorContext } from './post-processor';

export class SourceMapper implements PostProcessor {
  private readonly sourceStore: SourceStore;
  private readonly cdp: CDPSession;

  constructor(context: PostProcessorContext) {
    this.sourceStore = context.sourceStore;
    this.cdp = context.cdp;
  }

  private async handleHTML(pointer: HTMLPointer): Promise<HTMLPointer> {
    const source = await this.sourceStore.fetchHTMLSource();

    if (source == null) {
      throw new Error('fetchHTMLSource returned null');
    }

    const node = findASTByXPath(source.content, pointer.xpath);

    if (node == null || node.startIndex == null || node.endIndex == null) {
      return pointer;
    }

    return {
      ...pointer,
      sourceId: source.id,
      location: convertIndicesToLocation(
        source.content,
        node.startIndex,
        node.endIndex,
      ),
    };
  }

  private async handleCSSProperty(
    pointer: CSSPropertyPointer,
  ): Promise<CSSPropertyPointer> {
    const { xpath, propertyName } = pointer;
    const node = await findNodeByXPath(this.cdp, xpath);

    if (node == null) {
      throw new Error(`No node found for Xpath ${xpath}`);
    }

    const { style, property } = await findRuleAndPropertyByName(
      this.cdp,
      propertyName,
      node,
    );

    // Inline css?
    if (style.styleSheetId == null || property.range == null) {
      return pointer;
    }

    const { range } = property;
    const source = await this.sourceStore.fetchCSSSource(style.styleSheetId);

    return {
      ...pointer,
      sourceId: source?.id,
      location: {
        // CDP returns 0-index range
        startLine: range.startLine + 1,
        startColumn: range.startColumn + 1,
        endLine: range.endLine + 1,
        endColumn: range.endColumn + 1,
      },
    };
  }

  private handleSource(pointer: Pointer) {
    switch (pointer.type) {
      case 'html':
        return this.handleHTML(pointer);
      case 'css-property':
        return this.handleCSSProperty(pointer);
      default:
        throw new Error('Unsupported source type');
    }
  }

  async run(report: Report): Promise<Report> {
    if (report.outcome === 'inapplicable') {
      return report;
    }

    const pointers: Pointer[] = [];

    for (const pointer of report.pointers) {
      try {
        const result = await this.handleSource(pointer);
        pointers.push(result);
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
        pointers.push(pointer);
      }
    }

    return { ...report, pointers };
  }
}
