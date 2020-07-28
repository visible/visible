import { validate, ValidationError } from 'class-validator';

import { Diagnosis, Status } from '../diagnosis';

describe('Diagnosis', () => {
  it('accepts valid entity', async () => {
    const err = await validate(
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
      }),
    );

    expect(err.length).toBe(0);
  });

  it('does not accept non-UUID id', async () => {
    const error = await validate(
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
      }),
    );

    expect(error.length).toBe(1);
    expect(error[0]).toBeInstanceOf(ValidationError);
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
