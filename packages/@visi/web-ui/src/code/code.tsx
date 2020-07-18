import React from 'react';
import Prism, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
// Type declaration for CJS is not supported
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export interface CodeProps extends SyntaxHighlighterProps {
  children: string;
}

export const Code = (props: CodeProps) => {
  const { children, ...rest } = props;
  return <Prism {...rest}>{children}</Prism>;
};
