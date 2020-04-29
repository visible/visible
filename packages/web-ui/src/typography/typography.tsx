import React from 'react';
import styled from 'styled-components';

export const H1 = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

export const H2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

export const H3 = styled.h3`
  font-size: 21px;
  font-weight: bold;
`;

export const H4 = styled.h4`
  font-size: 18px;
  font-weight: bold;
`;

export const H5 = styled.h5`
  font-size: 16px;
  font-weight: bold;
`;

export const H6 = styled.h6`
  font-size: 14px;
  font-weight: bold;
`;

export const Body = styled.span`
  font-size: 14px;
`;

export interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body';
  children: React.ReactNode;
}

export const Typography = (props: TypographyProps) => {
  const { variant, children, ...rest } = props;

  switch (variant) {
    case 'h1':
      return <H1 {...rest}>{children}</H1>;
    case 'h2':
      return <H2 {...rest}>{children}</H2>;
    case 'h3':
      return <H3 {...rest}>{children}</H3>;
    case 'h4':
      return <H4 {...rest}>{children}</H4>;
    case 'h5':
      return <H5 {...rest}>{children}</H5>;
    case 'h6':
      return <H6 {...rest}>{children}</H6>;
    case 'body':
      return <Body {...rest}>{children}</Body>;
    default:
      return null;
  }
};
