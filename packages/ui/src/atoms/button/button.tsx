import { transparentize } from 'polished';
import styled, { css } from '../../styled';

type ButtonAppearance = 'primary' | 'skeleton';

interface ButtonProps {
  /** Appearance of the button */
  appearance: ButtonAppearance;
}

export const Button = styled.button<ButtonProps>`
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
`;
