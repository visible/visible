import classNames from 'classnames';
import React from 'react';

export type InputShape = 'rounded' | 'circle';
export type InputSize = 'small' | 'normal' | 'large';

const mapSize = (size: InputSize) => {
  switch (size) {
    case 'small':
      return ['py-1', 'px-2', 'text-sm'];
    case 'normal':
      return ['py-2', 'px-4', 'text-sm'];
    case 'large':
      return ['py-3', 'px-5', 'text-base'];
  }
};

const mapShape = (shape: InputShape) => {
  switch (shape) {
    case 'circle':
      return 'rounded-full';
    case 'rounded':
      return 'rounded';
  }
};

export type InputProps = Omit<JSX.IntrinsicElements['input'], 'size'> & {
  shape: InputShape;
  size: InputSize;
};

export const Input = ({ shape, size, className, ...rest }: InputProps) => {
  return (
    <input
      className={classNames(
        'border-gray-400',
        'border',
        'placeholder-gray-600',
        'focus:outline-none',
        'focus:shadow-outline',
        'focus:border-primary-500',
        'focus:bg-white',
        'disabled:opacity-75',
        'disabled:cursor-not-allowed',
        'rounded',
        mapSize(size),
        mapShape(shape),
        className,
      )}
      {...rest}
    />
  );
};

Input.defaultProps = {
  shape: 'rounded',
  size: 'normal',
};
