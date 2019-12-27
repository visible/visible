import { Diagnosis, DiagnosisAPI } from './diagnosis';

export interface Website {
  id: string;
  name: string;
  description: string;
  domain: string;
  diagnosises: Diagnosis[];
}

export interface WebsiteAPI {
  id: string;
  name: string;
  description: string;
  domain: string;
  diagnosises: DiagnosisAPI[];
}
