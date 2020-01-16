import React from 'react';
import Prism from 'react-syntax-highlighter/dist/esm/prism';

// Type declaration for CJS is not supported
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore

import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface CodeProps {
  children: string;
  language: string;
}

export const Code = (props: CodeProps) => {
  const { children, language } = props;

  return (
    <Prism language={language} theme={dark}>
      {children}
    </Prism>
  );
};
