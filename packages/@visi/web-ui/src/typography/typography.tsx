import React from 'react';
import styled from 'styled-components';

import { Theme } from '../theme';
import { createHelpers } from '../utils';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body';

const { shouldForwardProp, select } = createHelpers([
  'fontStyle',
  'color',
  'variant',
  'textTransform',
]);

interface WrapperProps {
  fontStyle: 'bold' | 'italic' | 'normal';
  color: keyof Theme['foreground'];
  variant: TypographyVariant;
  textTransform: 'none' | 'uppercase';
}

const isHeading = (variant: TypographyVariant) => variant.startsWith('h');

const mapVariantToFontSize = (variant: TypographyVariant): string => {
  return {
    h1: '28px',
    h2: '24px',
    h3: '21px',
    h4: '18px',
    h5: '16px',
    h6: '14px',
    body: '14px',
  }[variant];
};

const Wrapper = styled('p').withConfig({
  shouldForwardProp,
})<WrapperProps>`
  margin: 0;
  /* margin-bottom: ${(p) => (isHeading(p.variant) ? '1em' : '0')}; */
  color: ${(p) => p.theme.foreground[p.color]};
  font-size: ${(p) => mapVariantToFontSize(p.variant)};
  font-style: ${select.fontStyle};
  text-transform: ${select.textTransform};
  line-height: 1.6;
`;

export interface TypographyProps extends WrapperProps {
  children: React.ReactNode;
}

export const Typography = (props: TypographyProps) => {
  const { children, ...rest } = props;

  return (
    <Wrapper as={rest.variant !== 'body' ? rest.variant : 'p'} {...rest}>
      {children}
    </Wrapper>
  );
};

Typography.defaultProps = {
  variant: 'body',
  fontStyle: 'normal',
  color: 'normal',
  textTransform: 'none',
};
