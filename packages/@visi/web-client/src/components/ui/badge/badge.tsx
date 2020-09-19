import classNames from 'classnames';
import React from 'react';

export type BadgeVariant = 'red' | 'green' | 'grey' | 'purple' | 'yellow';

export interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({
  children,
  variant,
  className: _className,
}: BadgeProps) => {
  const wrapper = classNames('inline-flex', 'items-center', _className);
  const text = classNames('text-sm', 'text-gray-800', 'leading-none');
  const dot = classNames(
    'w-2',
    'h-2',
    'm-1',
    'mr-2',
    'rounded-full',
    `bg-${variant}-600`,
  );

  return (
    <div className={wrapper}>
      <div role="presentation" className={dot} />
      <span className={text}>{children}</span>
    </div>
  );
};
