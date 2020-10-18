import { inject, injectable } from 'inversify';

import { Diagnosis, Status } from '../../domain/models';
import { SourcePresenter } from './source-presenter';
import { API } from './types';

@injectable()
export class DiagnosisPresenter {
  constructor(
    @inject(SourcePresenter)
    private readonly sourcePresenter: SourcePresenter,
  ) {}

  transformStatus(status: Status): API.Status {
    switch (status) {
      case Status.QUEUED:
        return API.Status.Queued;
      case Status.DONE:
        return API.Status.Done;
      case Status.FAILED:
        return API.Status.Failed;
      case Status.PROCESSING:
        return API.Status.Processing;
      case Status.STARTED:
        return API.Status.Started;
    }
  }

  run(diagnosis: Diagnosis): API.Diagnosis {
    return {
      id: diagnosis.id,
      url: diagnosis.url,
      status: this.transformStatus(diagnosis.status),
      screenshot: diagnosis.screenshot,
      sources: diagnosis.sources.map((source) =>
        this.sourcePresenter.run(source),
      ),
      doneCount: diagnosis.doneCount,
      totalCount: diagnosis.totalCount,
      createdAt: diagnosis.createdAt,
      updatedAt: diagnosis.updatedAt,
    };
  }
}
