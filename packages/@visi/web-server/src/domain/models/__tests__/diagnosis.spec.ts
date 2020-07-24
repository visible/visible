import { Diagnosis, Status } from '../diagnosis';

describe('Diagnosis', () => {
  it('accepts valid entity', () => {
    expect(() => {
      Diagnosis.from({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        status: Status.STARTED,
        url: 'https://exmaple.com',
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
      Diagnosis.from({
        id: '123123',
        status: Status.STARTED,
        url: 'https://exmaple.com',
        screenshot: 'https://example.com',
        reports: [],
        doneCount: 1,
        totalCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }).toThrow();
  });

  test.todo('does not accept non-URL string as a screenshot');
  // it('does not accept non-URL string as a screenshot', () => {
  //   expect(() => {
  //     Diagnosis.from({
  //       id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  //       status: Status.STARTED,
  //       url: 'https://exmaple.com',
  //       screenshot: 'foo',
  //       reports: [],
  //       doneCount: 1,
  //       totalCount: 1,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     });
  //   }).toThrow();
  // });

  // it('can be updated by using copy', () => {
  //   const diagnosis = Diagnosis.from({
  //     id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  //     status: Status.STARTED,
  //     url: 'https://exmaple.com',
  //     screenshot: 'https://exmaple.com',
  //     reports: [],
  //     doneCount: 1,
  //     totalCount: 1,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });

  //   const newDiagnosis = diagnosis.copy({ doneCount: 2 });
  //   expect(newDiagnosis.doneCount).toBe(2);
  // });
});
