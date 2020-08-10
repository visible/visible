import React from 'react';
import Prism, { SyntaxHighlighterProps } from 'react-syntax-highlighter';

export interface CodeProps extends SyntaxHighlighterProps {
  children: string;
}

export const Code = (props: CodeProps) => {
  const { children, ...rest } = props;
  return <Prism {...rest}>{children}</Prism>;
};
