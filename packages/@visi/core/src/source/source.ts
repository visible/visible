import * as uuid from 'uuid';

import { Node } from './node';
import { Report } from './report';

export enum SourceType {
  HTML = 'HTML',
  CSS = 'CSS',
}

export interface SourceConstructorParams {
  id?: string;
  url?: string;
  type: SourceType;
  reports?: Report[];
  node: Node;
}

export class Source {
  readonly id: string;
  readonly node: Node;
  readonly type: SourceType;
  readonly url?: string;
  readonly reports: Report[];

  constructor(params: SourceConstructorParams) {
    this.id = params.id ?? uuid.v4();
    this.node = params.node;
    this.type = params.type;
    this.url = params.url;
    this.reports = params.reports ?? [];
  }

  clone(): Source {
    return new Source({
      id: this.id,
      node: this.node.clone(),
      type: this.type,
      url: this.url,
      reports: this.reports.map((report) => report.clone()),
    });
  }

  addReport(report: Report): void {
    // Mutable :(
    this.reports.push(report);
  }

  select(xpath: string): Report | undefined {
    return this.reports.find((report) => report.target === xpath);
  }

  async applyAllPatches(): Promise<void> {
    for (const report of this.reports) {
      await report.fix();
    }
  }
}
