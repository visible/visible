import classNames from 'classnames';
import React from 'react';

export interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => {
  return (
    <hr
      className={classNames(
        'block',
        'my-8',
        'border',
        'bt-2',
        'border-gray-300',
        'w-full',
        className,
      )}
    />
  );
};
