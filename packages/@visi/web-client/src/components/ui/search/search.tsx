import classNames from 'classnames';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import { Button } from '../button';
import { Input } from '../input';

export type SearchProps = {
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  children: React.ReactNode;
  onChange?(value: string): void;
  onSubmit?(value: string): void;
};

export const Search = (props: SearchProps) => {
  const { children, type, placeholder, onChange, onSubmit, ...rest } = props;
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
      role="search"
      className="inline-flex"
      onSubmit={handleSubmit}
      {...rest}
    >
      <Input
        value={query}
        type={type}
        placeholder={placeholder}
        disabled={rest.disabled}
        required={rest.required}
        onChange={handleChange}
        className={classNames(
          'border-r-0',
          'rounded-tr-none',
          'rounded-br-none',
        )}
      />

      <Button
        variant="primary"
        disabled={rest.disabled}
        className={classNames(
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
