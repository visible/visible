import { HTMLPointer, Location, Source } from '../domain/models';

const source = Source.from({
  id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  pointerId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  content: '<html></html>',
  title: 'index.html',
  url: 'https://example.com',
});

const location = Location.from({
  startColumn: 1,
  startLine: 1,
  endColumn: 1,
  endLine: 1,
});

export const pointer = HTMLPointer.from({
  id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  reportId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  xpath: '/html/body',
  screenshot: 'https://example.com',
  source,
  location,
});
