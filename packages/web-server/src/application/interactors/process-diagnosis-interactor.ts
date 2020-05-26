import * as Core from '@visi/core';
import { inject, injectable } from 'inversify';
import path from 'path';
import { catchError, tap } from 'rxjs/operators';

import { Diagnosis, Status } from '../../domain/models';
import { Logger } from '../../domain/services';
import { TYPES } from '../../types';
import {
  DiagnosisRepository,
  PointerRepository,
  ReportRepository,
  RuleRepository,
  SourceRepository,
} from '../repositories';
import { Translator } from '../translator';
import {
  ProcessDiagnosisRequest,
  ProcessDiagnosisResponse,
  ProcessDiagnosisUseCase,
} from '../use-cases';

@injectable()
export class ProcessDiagnosisInteractor implements ProcessDiagnosisUseCase {
  constructor(
    @inject(TYPES.Logger)
    private readonly logger: Logger,

    @inject(TYPES.DiagnosisRepository)
    private readonly diagnosisRepository: DiagnosisRepository,

    @inject(TYPES.RuleRepository)
    private readonly ruleRepository: RuleRepository,

    @inject(TYPES.ReportRepository)
    private readonly reportsRepository: ReportRepository,

    @inject(TYPES.PointerRepository)
    private readonly pointersRepository: PointerRepository,

    @inject(TYPES.SourceRepository)
    private readonly sourceRepository: SourceRepository,

    @inject(Translator)
    private readonly translator: Translator,
  ) {}

  private async handleProgress(
    progress: Core.Progress,
    baseDiagnosis: Diagnosis,
    visible: Core.Visible,
  ) {
    this.logger.info(
      `Diagnosing in progress ${progress.doneCount}/${progress.totalCount}`,
    );

    // Update
    const report = await this.translator.createReport(
      progress.report,
      baseDiagnosis.id,
      visible.getSources(),
    );
    const diagnosis = baseDiagnosis
      .copy({
        updatedAt: new Date(),
        status: Status.PROCESSING,
        doneCount: progress.doneCount,
        totalCount: progress.totalCount,
      })
      .map({
        reports: (reports) => reports.concat(report),
      });

    // Save
    await this.diagnosisRepository.save(diagnosis);
    await this.reportsRepository.save(report);
    await this.ruleRepository.save(report.rule);
    for (const pointer of report.pointers ?? []) {
      if (pointer.source) {
        await this.sourceRepository.save(pointer.source);
      }
      await this.pointersRepository.save(pointer);
    }
    await this.diagnosisRepository.publish(diagnosis);
    return diagnosis;
  }

  private async handleComplete(baseDiagnosis: Diagnosis) {
    const diagnosis = baseDiagnosis.copy({
      status: Status.DONE,
      updatedAt: new Date(),
    });
    await this.diagnosisRepository.save(diagnosis);
  }

  private async handleError(baseDiagnosis: Diagnosis) {
    const diagnosis = baseDiagnosis.copy({
      status: Status.FAILED,
      updatedAt: new Date(),
    });
    await this.diagnosisRepository.save(diagnosis);
  }

  async run({
    diagnosis,
  }: ProcessDiagnosisRequest): Promise<ProcessDiagnosisResponse> {
    this.logger.info(`Processing diagnosis`, diagnosis);

    const visible = await Core.Visible.init({
      plugins: ['@visi/plugin-standard'],
      settings: {
        screenshot: 'only-fail',
        screenshotDir: path.join(process.cwd(), 'tmp'),
      },
    });

    await visible.open(diagnosis.url);
    await visible
      .diagnose()
      .pipe(
        tap(async (progress) => {
          diagnosis = await this.handleProgress(progress, diagnosis, visible);
        }),
        catchError(async (error) => {
          await this.handleError(diagnosis);
          throw error;
        }),
      )
      .toPromise();

    await this.handleComplete(diagnosis);
    await visible.close();

    return;
  }
}
