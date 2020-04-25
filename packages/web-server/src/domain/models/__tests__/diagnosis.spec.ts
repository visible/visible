import { Diagnosis, Status } from '../diagnosis';

describe('Diagnosis', () => {
  it('accepts valid entity', () => {
    expect(() => {
      new Diagnosis({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        status: Status.STARTED,
        screenshot: 'https://example.com',
        reports: [],
        doneCount: 1,
        totalCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }).not.toThrow();
  });

  it('does not accept non-UUID id', () => {
    expect(() => {
      new Diagnosis({
        id: '123123',
        status: Status.STARTED,
        screenshot: 'https://example.com',
        reports: [],
        doneCount: 1,
        totalCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }).toThrow();
  });

  it('does not accept non-URL string as a screenshot', () => {
    expect(() => {
      new Diagnosis({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        status: Status.STARTED,
        screenshot: 'foo',
        reports: [],
        doneCount: 1,
        totalCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }).toThrow();
  });
});
