import { validate, ValidationError } from 'class-validator';

import { Source } from '../source';

describe('Source', () => {
  it('accepts valid entity', async () => {
    const error = await validate(
      Source.from({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        pointerId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        content: '<html></html>',
        title: 'index.html',
        url: 'https://example.com',
      }),
    );

    expect(error.length).toBe(0);
  });

  it('accepts null for title and url', async () => {
    const error = await validate(
      Source.from({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        pointerId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        content: '<html></html>',
      }),
    );

    expect(error.length).toBe(0);
  });

  it('does not accept non-UUID id', async () => {
    const error = await validate(
      Source.from({
        id: '123123',
        pointerId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        content: '<html></html>',
        title: 'index.html',
        url: 'https://example.com',
      }),
    );

    expect(error[0]).toBeInstanceOf(ValidationError);
  });

  it('does not accept empty string', async () => {
    const error = await validate(
      Source.from({
        id: '123123',
        pointerId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        content: '<html></html>',
        title: '',
        url: 'https://example.com',
      }),
    );

    expect(error[0]).toBeInstanceOf(ValidationError);
  });

  test.todo('does not accept invalid URL');
  // it('does not accept invalid URL', () => {
  //   expect(() => {
  //     Source.from({
  //       id: '123123',
  //       pointerId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  //       content: '<html></html>',
  //       title: 'title',
  //       url: 'foo',
  //     });
  //   }).toThrow();
  // });

  test.todo('invalid pointerId');
});
