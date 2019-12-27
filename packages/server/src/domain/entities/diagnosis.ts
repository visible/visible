import { Website, WebsiteAPI } from './website';
import { Report, ReportAPI } from './report';
import { ScoreAPI } from './score';

export interface Diagnosis {
  id: string;
  website: Website;
  reports: Report[];
}

export interface DiagnosisAPI {
  id: string;
  score: ScoreAPI;
  website: WebsiteAPI;
  screenshot: string;
  reports: ReportAPI[];
}
