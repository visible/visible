import { JSDOM } from 'jsdom';
import { HTMLDiagnosiser } from './html-diagnosiser';

type Resource = string;

export type Diagnostic = {
  /** Internal ID of the report */
  id: string;
  /** Whether or not there is an issue */
  issue: boolean;
  /** Line of the resource where an issue occured */
  line: number;
  /** Column of the resource where an issue occured */
  column: number;
  /** Fixture for the issue */
  fixtrue?: Resource;
};

export class Visible {
  private async parseHTML(html: string) {
    const globals = new JSDOM(html);
    return globals;
  }

  private diagnosisHTML(html: JSDOM) {
    return new HTMLDiagnosiser(html, []).diagnosis();
  }

  async diagnosis(resource: Resource): Promise<Diagnostic[]> {
    if (typeof resource === 'string') {
      const html = await this.parseHTML(resource);
      return this.diagnosisHTML(html);
    }

    return [];
  }
}
