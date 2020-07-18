import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Wrapper as $Button } from '../button';
import { Input } from '../input';

export interface SearchProps {
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  submitLabel?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Wrapper = styled.form`
  display: flex;

  ${$Button} {
    flex: 0 0 auto;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  ${Input} {
    flex: 1 1 auto;
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const Search = (props: SearchProps) => {
  const {
    required,
    disabled,
    loading,
    placeholder,
    submitLabel,
    onChange,
    onSubmit,
  } = props;

  const [value, changeValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <Wrapper role="search" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={disabled}
        onChange={handleChange}
      />

      <Button
        appearance="primary"
        type="submit"
        disabled={disabled}
        loading={loading}
      >
        {submitLabel}
      </Button>
    </Wrapper>
  );
};
