import classNames from 'classnames';
import React from 'react';

export interface TagProps {
  children: React.ReactNode;
}

export const Tag = (props: TagProps) => {
  const { children } = props;

  return (
    <span
      className={classNames(
        'bg-primary-300',
        'text-primary-500',
        'px-2',
        'py-1',
        'rounded',
        'text-xs',
        'whitespace-no-wrap',
      )}
    >
      {children}
    </span>
  );
};
