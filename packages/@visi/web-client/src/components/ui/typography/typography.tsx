import classNames from 'classnames';
import React from 'react';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'code';

export type TypographyFontStyle = 'italic' | 'normal';
export type TypographyFontWeight = 'bold' | 'normal';
export type TypographyAlign = 'center';
export type TypographyFontSize =
  | '6xl'
  | '5xl'
  | '4xl'
  | '3xl'
  | '2xl'
  | 'xl'
  | 'lg'
  | 'base'
  | 'sm'
  | 'xs';
export type TypographyColor = 'wash' | 'normal' | 'invert';

export interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  color?: TypographyColor;
  fontStyle?: TypographyFontStyle;
  fontWeight?: TypographyFontWeight;
  fontSize?: TypographyFontSize;
  align?: TypographyAlign;
  className?: string;
}

const mapFontSizeToClassName = (fontSize: TypographyFontSize) => {
  switch (fontSize) {
    case '6xl':
      return 'text-6xl';
    case '5xl':
      return 'text-5xl';
    case '4xl':
      return 'text-4xl';
    case '3xl':
      return 'text-3xl';
    case '2xl':
      return 'text-2xl';
    case 'xl':
      return 'text-xl';
    case 'lg':
      return 'text-lg';
    case 'sm':
      return 'text-sm';
    case 'xs':
      return 'text-xs';
    case 'base':
    default:
      return 'text-base';
  }
};

const mapAlign = (align: TypographyAlign) => {
  switch (align) {
    case 'center':
      return 'text-center';
  }
};

const inferFontSizeFromVariant = (
  variant: TypographyVariant,
): TypographyFontSize => {
  switch (variant) {
    case 'h1':
      return '6xl';
    case 'h2':
      return '5xl';
    case 'h3':
      return '4xl';
    case 'h4':
      return '3xl';
    case 'h5':
      return '2xl';
    case 'h6':
      return 'xl';
    case 'code':
      return 'sm';
    case 'p':
    default:
      return 'base';
  }
};

const mapColorPropToClassName = (color: TypographyColor) => {
  switch (color) {
    case 'wash':
      return 'text-gray-700';
    case 'invert':
      return 'text-white';
    case 'normal':
    default:
      return 'text-black';
  }
};

const isHeading = (variant: TypographyVariant) => /^h/.test(variant);

export const Typography = (props: TypographyProps) => {
  const {
    color,
    variant,
    fontSize,
    fontStyle,
    fontWeight,
    children,
    align,
    className: _class,
  } = props;

  const className = classNames(
    {
      italic: fontStyle === 'italic',
      'font-bold': isHeading(variant) || fontWeight === 'bold',
      'font-mono': variant === 'code',
    },
    variant === 'code' && [
      'rounded',
      'bg-gray-300',
      'p-1',
      // 'mx-2',
      'text-indigo-900',
    ],
    mapFontSizeToClassName(fontSize ?? inferFontSizeFromVariant(variant)),
    color && mapColorPropToClassName(color),
    align && mapAlign(align),
    _class,
  );

  return React.createElement(variant, { className }, children);
};

Typography.defaultProps = {
  variant: 'p',
};
