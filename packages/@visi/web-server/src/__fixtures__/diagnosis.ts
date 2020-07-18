import { Diagnosis, Status } from '../domain/models';
import { report } from './report';

export const diagnosis = Diagnosis.from({
  id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  status: Status.STARTED,
  url: 'https://exmaple.com',
  screenshot: 'https://example.com',
  reports: [report],
  doneCount: 1,
  totalCount: 1,
  createdAt: new Date('2020-05-17T08:28:59.186Z'),
  updatedAt: new Date('2020-05-17T08:28:59.186Z'),
});

export const minimalDiagnosis = Diagnosis.from({
  id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  status: Status.STARTED,
  url: 'https://exmaple.com',
  screenshot: 'https://example.com',
  reports: [],
  doneCount: 0,
  totalCount: 0,
  createdAt: new Date('2020-05-17T08:28:59.186Z'),
  updatedAt: new Date('2020-05-17T08:28:59.186Z'),
});
