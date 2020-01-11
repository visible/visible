import uuid from 'uuid';
import {
  Report as CoreReport,
  ReportLevel as CoreReportLevel,
} from '@visi/core/main';
import { Report, ReportLevel } from '../../enterprise/entities';
import { CreateDiagnosisInput } from '../../application/use-cases/create-diagnosis';

export class DiagnosisInterpreter {
  transformType = (level: CoreReportLevel) => {
    switch (level) {
      case 'ok':
        return ReportLevel.OK;
      case 'warn':
        return ReportLevel.WARN;
      case 'error':
      default:
        return ReportLevel.ERROR;
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
