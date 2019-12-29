import uuid from 'uuid';
import {
  Report as CoreReport,
  ReportLevel as CoreReportLevel,
} from '@visi/core';
import { Report, ReportType } from '../../enterprise/entities';
import { CreateDiagnosisInput } from '../../application/use-cases/create-diagnosis';

export class DiagnosisInterpreter {
  transformType = (level: CoreReportLevel) => {
    switch (level) {
      case CoreReportLevel.OK:
        return ReportType.OK;
      case CoreReportLevel.WARN:
        return ReportType.WARN;
      case CoreReportLevel.ERROR:
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
