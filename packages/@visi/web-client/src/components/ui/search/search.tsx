import classNames from 'classnames';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import { Button } from '../button';
import { Input } from '../input';

export type SearchSize = 'normal' | 'large';

export type SearchProps = {
  id: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  size?: SearchSize;
  type?: string;
  role?: string;
  children: React.ReactNode;
  onChange?(value: string): void;
  onSubmit?(value: string): void;
};

export const Search = ({
  id,
  className,
  children,
  type,
  size,
  placeholder,
  role,
  onChange,
  onSubmit,
  ...rest
}: SearchProps) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.currentTarget.value);
    onChange?.(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(query);
  };

  return (
    <form
      role={role}
      className={classNames('inline-flex', className)}
      onSubmit={handleSubmit}
    >
      <Input
        id={id}
        value={query}
        size={size}
        type={type}
        placeholder={placeholder}
        disabled={rest.disabled}
        required={rest.required}
        onChange={handleChange}
        shape="circle"
        className={classNames(
          'flex-1',
          'border-r-0',
          'rounded-tr-none',
          'rounded-br-none',
        )}
        {...rest}
      />

      <Button
        variant="primary"
        disabled={rest.disabled}
        size={size}
        className={classNames(
          'flex-shrink-0',
          'border-l-0',
          'rounded-tl-none',
          'rounded-bl-none',
        )}
      >
        {children}
      </Button>
    </form>
  );
};
