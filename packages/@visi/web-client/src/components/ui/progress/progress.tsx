import classNames from 'classnames';
import React from 'react';

export type ProgressProps = JSX.IntrinsicElements['progress'] & {
  max: number;
  value: number;
  label: string;
};

export const Progress = ({ label, value, max, id, ...rest }: ProgressProps) => {
  const percentage =
    max !== 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div className="inline-flex w-full items-center">
      <div
        role="presentation"
        className={classNames(
          'rounded-full',
          'h-2',
          'bg-gray-100',
          'flex-grow',
          'mr-2',
          'shadow-xs',
        )}
      >
        <div
          className={classNames(
            'bg-primary-500',
            'animate-pulse',
            'transition-all',
            'duration-100',
            'ease-out',
            'rounded-full',
            'h-full',
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <progress
        id={id}
        max={max * 10}
        value={value * 10}
        className={'sr-only'}
        {...rest}
      />

      <span aria-hidden className="text-sm text-gray-600">
        {percentage}%
      </span>
    </div>
  );
};
