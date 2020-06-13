import { Source } from '../source';

describe('Source', () => {
  it('accepts valid entity', () => {
    expect(() => {
      Source.from({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        pointerId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        content: '<html></html>',
        title: 'index.html',
        url: 'https://example.com',
      });
    }).not.toThrow();
  });

  it('accepts null for title and url', () => {
    expect(() => {
      Source.from({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        pointerId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        content: '<html></html>',
      });
    }).not.toThrow();
  });

  it('does not accept non-UUID id', () => {
    expect(() => {
      Source.from({
        id: '123123',
        pointerId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        content: '<html></html>',
        title: 'index.html',
        url: 'https://example.com',
      });
    }).toThrow();
  });

  it('does not accept empty string', () => {
    expect(() => {
      Source.from({
        id: '123123',
        pointerId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        content: '<html></html>',
        title: '',
        url: 'https://example.com',
      });
    }).toThrow();
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
