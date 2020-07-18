import { transparentize } from 'polished';
import React, { PropsWithChildren } from 'react';
import { Loader } from 'react-feather';
import styled, { css, keyframes } from 'styled-components';

export type ButtonAppearance = 'primary' | 'skeleton';

export interface ButtonProps {
  /** Appearance of the button */
  appearance: ButtonAppearance;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.button<ButtonProps>`
  box-sizing: border-box;
  padding: 8px 14px;
  transition: 0.15s ease-in;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  ${({ appearance }) =>
    appearance === 'primary' &&
    css`
      background-color: ${({ theme }) => theme.highlight.normal};
      box-shadow: 0 1.5px 3px
        ${({ theme }) => transparentize(0.8, theme.highlight.normal)};
      color: white;
    `};

  ${({ appearance }) =>
    appearance === 'skeleton' &&
    css`
      border: 1px solid ${({ theme }) => theme.highlight.normal};
      color: ${({ theme }) => theme.highlight.normal};
    `};

  &:hover&:not(:disabled) {
    transition: 0.15s ease-out;
    opacity: 0.8;
  }

  &:focus {
    transition: 0.15s ease-out;
    outline: none;
    box-shadow: 0 0 0 3px
      ${({ theme }) => transparentize(0.6, theme.highlight.normal)};
  }

  &:active {
    opacity: 1 !important;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & > svg {
    animation: ${spin} 1s infinite linear;
  }
`;

export const Button = (
  props: PropsWithChildren<
    ButtonProps & { loading?: boolean } & React.ButtonHTMLAttributes<
        HTMLButtonElement
      >
  >,
) => {
  const { children, loading, ...rest } = props;

  return (
    <Wrapper {...rest}>{loading ? <Loader size={14} /> : children}</Wrapper>
  );
};
