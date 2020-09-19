import classNames from 'classnames';
import React from 'react';

export type InputProps = JSX.IntrinsicElements['input'] & {
  variant: 'input' | 'textbox';
};

export const Input = (props: InputProps) => {
  const { variant, className, ...rest } = props;

  variant;

  return (
    <input
      className={classNames(
        'border-gray-500',
        'bg-gray-100',
        'border',
        'placeholder-gray-600',
        'text-sm',
        'py-2',
        'px-4',
        'w-64',
        'focus:outline-none',
        'focus:shadow-outline',
        'focus:border-primary-500',
        'focus:bg-white',
        'disabled:opacity-75',
        'disabled:cursor-not-allowed',
        'rounded-full',
        className,
      )}
      {...rest}
    />
  );
};

Input.defaultProps = {
  variant: 'input',
};
