import {
  Report as CoreReport,
  ReportLevel as CoreReportLevel,
} from '@visi/core/main';
import uuid from 'uuid';

import { CreateDiagnosisInput } from '../../application/use-cases/create-diagnosis';
import { Report, ReportType } from '../../enterprise/entities';

export class DiagnosisInterpreter {
  transformType = (level: CoreReportLevel) => {
    switch (level) {
      case 'ok':
        return ReportType.OK;
      case 'warn':
        return ReportType.WARN;
      case 'error':
      default:
        return ReportType.ERROR;
    }
  };

  transform(reports: CoreReport[]): CreateDiagnosisInput {
    const id = uuid();

    return {
      reports: reports.map(
        report =>
          new Report(
            uuid(),
            report.type,
            id,
            this.transformType(report.level),
            report.message,
            report.content?.xpath,
            report.content?.style,
            report.content?.html,
          ),
      ),
    };
  }
}