import * as uuid from 'uuid';

import { Node } from './node';
import { Report } from './report';

export interface SourceConstructorParams {
  id?: string;
  url?: string;
  reports?: Report[];
  node: Node;
}

export class Source {
  readonly id: string;
  readonly node: Node;
  readonly url?: string;
  readonly reports: Report[];

  constructor(params: SourceConstructorParams) {
    this.id = params.id ?? uuid.v4();
    this.node = params.node;
    this.url = params.url;
    this.reports = params.reports ?? [];
  }

  clone(): Source {
    return new Source({
      id: this.id,
      node: this.node.clone(),
      url: this.url,
      reports: this.reports.map((report) => report.clone()),
    });
  }

  addReport(report: Report): void {
    // Mutable :(
    this.reports.push(report);
  }

  async applyAllPatches(): Promise<void> {
    for (const report of this.reports) {
      await report.fix();
    }
  }
}
