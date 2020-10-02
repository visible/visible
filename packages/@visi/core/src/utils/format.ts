import prettier from 'prettier';

import { SourceType } from '../source';

const mapType = (type: SourceType) => {
  if (type === SourceType.HTML) return 'html';
  return 'css';
};

export const format = (type: SourceType, value: string): string => {
  return prettier.format(value, { parser: mapType(type) });
};
