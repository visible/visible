import classNames from 'classnames';
import React from 'react';

export type ImageVariant = 'shadow' | 'none';

export type ImageProps = JSX.IntrinsicElements['img'] & {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  variant: ImageVariant;
};

export const Image = ({
  alt,
  src,
  variant,
  width,
  height,
  className,
  ...rest
}: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width, height }}
      className={classNames(
        variant === 'shadow' && ['rounded', 'shadow-lg'],
        'object-contain',
        className,
      )}
      {...rest}
    />
  );
};

Image.defaultProps = {
  variant: 'none',
};
