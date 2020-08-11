import * as Core from '@visi/core';
import fs from 'fs';
import { inject, injectable } from 'inversify';
import * as uuid from 'uuid';

import {
  CSSPointer,
  HTMLPointer,
  Location,
  Outcome,
  Report,
  Rule,
  RuleType,
  Source,
} from '../domain/models';
import { Logger, Storage } from '../domain/services';
import { TYPES } from '../types';
import { RuleRepository } from './repositories';

/**
 * Translator that coverts core entity to domain model
 */
@injectable()
export class Translator {
  constructor(
    @inject(TYPES.Storage)
    private readonly storage: Storage,

    @inject(TYPES.Logger)
    private readonly logger: Logger,

    @inject(TYPES.RuleRepository)
    private readonly ruleRepository: RuleRepository,
  ) {}

  async createLocation(location: Core.Location): Promise<Location> {
    return Location.from({
      startLine: location.startLine,
      startColumn: location.startColumn,
      endLine: location.endLine,
      endColumn: location.endColumn,
    });
  }

  async createSource(source: Core.Source, pointerId: string): Promise<Source> {
    return Source.from({
      id: uuid.v4(),
      pointerId,
      content: source.content,
      url: source.url,
      title: source.title?.length ? source.title : undefined,
    });
  }

  async createHTMLPointer(
    pointer: Core.HTMLPointer,
    reportId: string,
    sourceMapper: Map<string, Core.Source>,
  ): Promise<HTMLPointer> {
    const id = uuid.v4();

    const file = pointer.screenshot
      ? await this.storage
          .create(fs.createReadStream(pointer.screenshot))
          .then(({ file }) => file)
      : undefined;

    const coreSource =
      pointer.sourceId != null ? sourceMapper.get(pointer.sourceId) : undefined;
    const source = coreSource && (await this.createSource(coreSource, id));

    const location =
      pointer.location != null
        ? await this.createLocation(pointer.location)
        : undefined;

    return HTMLPointer.from({
      id,
      reportId,
      screenshot: file,
      xpath: pointer.xpath,
      source,
      location,
    });
  }

  async createCSSPointer(
    pointer: Core.CSSPropertyPointer,
    reportId: string,
    sourceMapper: Map<string, Core.Source>,
  ): Promise<CSSPointer> {
    const id = uuid.v4();

    const file = pointer.screenshot
      ? await this.storage
          .create(fs.createReadStream(pointer.screenshot))
          .then(({ file }) => file)
      : undefined;

    this.logger.info(`Pointer ${id} -> Source ${pointer.sourceId}`);

    const coreSource =
      pointer.sourceId != null ? sourceMapper.get(pointer.sourceId) : undefined;

    this.logger.info(`Core::Source ${coreSource?.url}`);
    const source = coreSource && (await this.createSource(coreSource, id));

    const location =
      pointer.location != null
        ? await this.createLocation(pointer.location)
        : undefined;

    return CSSPointer.from({
      id,
      reportId,
      screenshot: file,
      xpath: pointer.xpath,
      propertyName: pointer.propertyName,
      source,
      location,
    });
  }

  async createReport(
    report: Core.Report,
    diagnosisId: string,
    sourceMapper: Map<string, Core.Source>,
  ): Promise<Report> {
    const id = uuid.v4();

    return Report.from({
      id,
      diagnosisId,
      outcome: this.createOutcome(report.outcome),
      rule: await this.createRule(report.rule),
      target: report.outcome !== 'inapplicable' ? report.target : undefined,
      message: report.outcome === 'fail' ? report.message : undefined,
      pointers:
        report.outcome !== 'inapplicable'
          ? await this.createPointer(report.pointers, id, sourceMapper)
          : undefined,
    });
  }

  private createOutcome(outcome: Core.Report['outcome']) {
    switch (outcome) {
      case 'inapplicable':
        return Outcome.INAPPLICABLE;
      case 'fail':
        return Outcome.FAIL;
      case 'passed':
        return Outcome.PASSED;
    }
  }

  private createRuleType(ruleType: Core.RuleType) {
    switch (ruleType) {
      case 'atomic':
        return RuleType.ATOMIC;
      case 'composite':
        return RuleType.COMPOSITE;
    }
  }

  private async createRule(rule: Core.RuleMetadata) {
    const existingRule = await this.ruleRepository.findByName(rule.id);

    this.logger.info(
      `Rule with name ${rule.id} was ${existingRule ? 'found' : 'not found'}`,
    );
    if (existingRule != null) {
      return existingRule;
    }

    return Rule.from({
      id: uuid.v4(),
      name: rule.id,
      type: this.createRuleType(rule.type),
      description: rule.description,
    });
  }

  private createPointer(
    pointers: Core.Pointer[],
    reportId: string,
    sourceMapper: Map<string, Core.Source>,
  ) {
    return Promise.all(
      pointers.map((pointer) => {
        if (pointer.type === 'html') {
          return this.createHTMLPointer(pointer, reportId, sourceMapper);
        }

        if (pointer.type === 'css-property') {
          return this.createCSSPointer(pointer, reportId, sourceMapper);
        }

        throw new TypeError(`Unknown pointer type ${pointer}`);
      }),
    );
  }
}
