import { inject, injectable } from 'inversify';

import { Diagnosis, Status } from '../../domain/models';
import { ReportPresenter } from './report-presenter';
import { DiagnosisAPI, StatusAPI } from './types';

@injectable()
export class DiagnosisPresenter {
  constructor(
    @inject(ReportPresenter)
    private readonly reportPresenter: ReportPresenter,
  ) {}

  transformStatus(status: Status) {
    switch (status) {
      case Status.DONE:
        return StatusAPI.DONE;
      case Status.FAILED:
        return StatusAPI.FAILED;
      case Status.PROCESSING:
        return StatusAPI.PROCESSING;
      case Status.STARTED:
        return StatusAPI.STARTED;
    }
  }

  run(diagnosis: Diagnosis): DiagnosisAPI {
    return {
      id: diagnosis.id,
      url: diagnosis.url,
      status: this.transformStatus(diagnosis.status),
      screenshot: diagnosis.screenshot,
      reports: diagnosis.reports.map((report) =>
        this.reportPresenter.run(report),
      ),
      doneCount: diagnosis.doneCount,
      totalCount: diagnosis.totalCount,
      createdAt: diagnosis.createdAt,
      updatedAt: diagnosis.updatedAt,
    };
  }
}
