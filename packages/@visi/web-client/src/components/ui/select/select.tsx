import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

export type SelectProps = JSX.IntrinsicElements['select'] & {
  children: React.ReactNode;
  className?: string;
  onOpen?(): void;
  onClose?(): void;
};

export const Select = ({ children, className, ...rest }: SelectProps) => {
  return (
    <div className={classNames('relative', 'text-sm', 'text-gray-700')}>
      <select
        className={classNames(
          'appearance-none',
          'py-1',
          'px-2',
          'border',
          'rounded',
          'text-left',
          'border-gray-400',
          'cursor-pointer',
          className,
        )}
        {...rest}
      >
        {children}
      </select>

      <FontAwesomeIcon
        className="absolute top-0 right-0 bottom-0 m-auto mr-2"
        icon={faChevronDown}
      />
    </div>
  );
};

export type OptionProps = JSX.IntrinsicElements['option'];

Select.Option = (props: OptionProps) => {
  return <option {...props} />;
};
