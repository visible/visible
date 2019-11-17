import { JSDOM } from "jsdom";
import { Diagnostic } from './visible';

type Rule = {
  matcher: (html: JSDOM) => Promise<Diagnostic>;
}

export class HTMLDiagnosiser {
  constructor (private html: JSDOM, private rules: Rule[]) {
  }

  async diagnosis() {
    const diagnostics: Diagnostic[] = [];

    for (const rule of this.rules) {
      const report = await rule.matcher(this.html);
      diagnostics.push(report);
    }

    return diagnostics;
  }
}
