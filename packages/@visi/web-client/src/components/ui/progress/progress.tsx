import classNames from 'classnames';
import React from 'react';

export interface ProgressProps {
  max: number;
  value: number;
}

export const Progress = (props: ProgressProps) => {
  const { max, value } = props;

  const percentage =
    max !== 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div className="inline-flex w-full items-center">
      <div
        className={classNames(
          'rounded-full',
          'h-2',
          'bg-gray-300',
          'flex-grow',
          'mr-2',
        )}
      >
        <div
          aria-hidden
          className={classNames('bg-primary-500', 'rounded-full', 'h-full')}
          style={{ width: `${percentage}%` }}
        />

        <progress max={max} value={value} className={'sr-only'} />
      </div>

      <span aria-hidden className="text-sm text-gray-600">
        {percentage}%
      </span>
    </div>
  );
};
