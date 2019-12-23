import React from 'react';
import { Prism } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeProps {
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
