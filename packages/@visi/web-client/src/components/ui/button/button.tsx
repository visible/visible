import classNames from 'classnames';
import React from 'react';

export type ButtonVariant = 'primary' | 'secondary';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  children: React.ReactNode;
  variant: ButtonVariant;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export const Button = ({
  children,
  icon,
  variant,
  disabled,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={classNames(
        'rounded-full',
        'px-4',
        'py-2',
        'text-sm',
        'flex',
        'focus:outline-none',
        'focus:shadow-outline',
        'disabled:cursor-not-allowed',
        'disabled:opacity-75',
        variant === 'primary' && [
          'bg-primary-500',
          'text-white',
          'hover:bg-primary-600',
        ],
        variant === 'secondary' && [
          'border',
          'border-primary-500',
          'text-primary-500',
          'hover:bg-base-200',
        ],
        className,
      )}
      {...rest}
    >
      {icon != null && <div className="mr-2">{icon}</div>}
      <span>{children}</span>
    </button>
  );
};
