import classNames from 'classnames';
import React from 'react';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'normal' | 'large';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  children: React.ReactNode;
  variant: ButtonVariant;
  size: ButtonSize;
  icon?: React.ReactNode;
  href?: string;
  disabled?: boolean;
  onClick?(): void;
};

export const Button = ({
  children,
  size,
  icon,
  variant,
  href,
  disabled,
  className,
  onClick,
  ...rest
}: ButtonProps) => {
  const _class = classNames(
    'flex',
    'rounded-full',
    'transition-all',
    'font-semibold',
    'duration-200',
    'ease-in',
    'shadow',
    'hover:shadow-md',
    'focus:outline-none',
    'focus:shadow-outline',
    'disabled:cursor-not-allowed',
    'disabled:opacity-75',
    size === 'normal' && ['px-4', 'py-2', 'text-sm'],
    size === 'large' && ['px-5', 'py-3', 'text-base'],
    variant === 'primary' && [
      'bg-primary-500',
      'text-white',
      'hover:bg-primary-600',
      'active:bg-primary-700',
    ],
    variant === 'secondary' && [
      'border',
      'bg-white',
      'border-primary-500',
      'text-primary-500',
      'hover:bg-base-200',
      'active:bg-base-300',
    ],
    className,
  );

  const elm = href != null ? 'a' : 'button';
  const linkProps = { href, target: '_blank', rel: 'noreferrer' };

  return React.createElement(
    elm,
    {
      disabled,
      className: _class,
      onClick: () => onClick?.(),
      ...linkProps,
      ...rest,
    },
    icon != null && <div className="mr-2">{icon}</div>,
    <span>{children}</span>,
  );
};

Button.defaultProps = {
  variant: 'secondary',
  size: 'normal',
};
