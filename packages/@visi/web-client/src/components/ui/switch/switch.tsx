import classNames from 'classnames';
import React, { useState } from 'react';

export interface SwitchProps {
  value: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Switch = (props: SwitchProps) => {
  const { value, disabled, children } = props;
  const [checked, setChecked] = useState(value);

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <label className="inline-flex">
      <button
        role="switch"
        aria-checked={checked}
        onClick={handleCheck}
        disabled={disabled}
        className={classNames(
          'rounded-full',
          'h-6',
          'w-10',
          'shadow-inner',
          'mr-2',
          'relative',
          'transition-colors',
          'ease-in-out',
          'duration-150',
          'outline-none',
          'focus:outline-none',
          'focus:shadow-outline',
          checked ? 'bg-primary-500' : 'bg-gray-500',
        )}
      >
        <div
          aria-hidden
          className={classNames(
            'rounded-full',
            'bg-white',
            'w-4',
            'h-4',
            'shadow-md',
            'absolute',
            'top-0',
            'bottom-0',
            'my-auto',
            'mx-1',
            'transition',
            'duration-150',
            'ease-in-out',
            checked ? 'right-0' : 'right-auto',
          )}
        ></div>
      </button>

      <div className="select-none">{children}</div>
    </label>
  );
};

Switch.defaultProps = {
  value: false,
};
