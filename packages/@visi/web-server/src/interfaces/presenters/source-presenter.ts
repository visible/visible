import { inject, injectable } from 'inversify';

import { Source } from '../../domain/models';
import { ReportPresenter } from './report-presenter';
import { API } from './types';

@injectable()
export class SourcePresenter {
  constructor(
    @inject(ReportPresenter)
    private readonly reportPresenter: ReportPresenter,
  ) {}

  run(source: Source): API.Source {
    return {
      id: source.id,
      content: source.content,
      reports: source.reports.map((report) => this.reportPresenter.run(report)),
      url: source.url,
    };
  }
}
