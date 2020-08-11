export const $$ = (query: string): Element[] =>
  Array.from(document.querySelectorAll(query));
