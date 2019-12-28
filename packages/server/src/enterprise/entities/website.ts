import { Diagnosis } from './diagnosis';

export interface Website {
  id: string;
  name: string;
  description: string;
  domain: string;
  diagnosises: Diagnosis[];
}
