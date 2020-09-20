import { Source } from '../domain/models';
import { report } from './report';

export const source = Source.from({
  id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  diagnosisId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  content: '<html></html>',
  url: 'https://example.com',
  reports: [report],
});
