import * as Core from '@visi/core';
import { immutableFix } from '@visi/core';
import { createTwoFilesPatch } from 'diff';
import fs from 'fs';
import { inject, injectable } from 'inversify';

import { RuleRepository } from '../../../application/repositories';
import * as App from '../../../domain/models';
import { Progress } from '../../../domain/models';
import { Logger, Storage } from '../../../domain/services';
import { TYPES } from '../../../types';

export interface Translator {
  createLocation(location: Core.Location): App.Location;
  createReport(
    report: Core.Report,
    source: Core.Source,
    sourceId: string,
  ): Promise<App.Report>;
  createSource(source: Core.Source, diagnosisId: string): Promise<App.Source>;
  createProgress(
    progress: Core.Progress,
    diagnosisId: string,
  ): Promise<App.Progress>;
  createWebsite(website: Core.Website): Promise<App.Website>;
}

@injectable()
export class TranslatorImpl implements Translator {
  constructor(
    @inject(TYPES.Storage)
    private readonly storage: Storage,

    @inject(TYPES.RuleRepository)
    private readonly ruleRepository: RuleRepository,

    @inject(TYPES.Logger)
    private readonly logger: Logger,
  ) {}

  createLocation(core: Core.Location): App.Location {
    return App.Location.from({
      startColumn: core.startColumn,
      startLine: core.startLine,
      endColumn: core.endColumn,
      endLine: core.endLine,
    });
  }

  async createReport(
    report: Core.Report,
    source: Core.Source,
  ): Promise<App.Report> {
    const rule = await this.ruleRepository.findByName(report.ruleId);

    if (rule == null) {
      throw new Error(`Rule ${report.ruleId} is not saved`);
    }

    let patched: Core.Source = source;

    try {
      // eslint-disable-next-line
      patched = await immutableFix(source, report);
    } catch (error) {
      this.logger.error(error);
    }

    const diffHunk =
      source.node.text !== patched.node.text
        ? createTwoFilesPatch(
            source.id,
            `patched-${source.id}`,
            source.node.text,
            patched.node.text,
          )
        : undefined;

    const screenshot =
      report.screenshot != null
        ? (await this.storage.create(fs.createReadStream(report.screenshot)))
            .file
        : undefined;

    return App.Report.from({
      id: report.id,
      sourceId: source.id,
      ruleId: rule.id,
      outcome: report.outcome,
      target: report.target,
      message: report.message,
      screenshot,
      diffHunk,
      location: report.location && this.createLocation(report.location),
    });
  }

  async createSource(
    source: Core.Source,
    diagnosisId: string,
  ): Promise<App.Source> {
    return App.Source.from({
      id: source.id,
      diagnosisId,
      content: source.node.text,
      url: source.url,
      reports: await Promise.all(
        source.reports.map((report) => this.createReport(report, source)),
      ),
    });
  }

  async createProgress(
    core: Core.Progress,
    diagnosisId: string,
  ): Promise<App.Progress> {
    return Progress.from({
      doneCount: core.doneCount,
      totalCount: core.totalCount,
      sources: await Promise.all(
        [...core.sources.values()].map((source) =>
          this.createSource(source, diagnosisId),
        ),
      ),
    });
  }

  async createWebsite(website: Core.Website): Promise<App.Website> {
    const screenshot = (
      await this.storage.create(fs.createReadStream(website.screenshot))
    ).file;

    return App.Website.from({
      url: website.url,
      title: website.title,
      screenshot,
    });
  }
}
