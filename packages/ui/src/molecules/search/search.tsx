import React, { useState } from 'react';
import { Input } from '../../atoms/input';
import { Button } from '../../atoms/button';
import styled from '../../styled';

interface SearchProps {
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  submitLabel?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Wrapper = styled.form`
  display: flex;

  ${Button} {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  ${Input} {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const Search = (props: SearchProps) => {
  const {
    required,
    disabled,
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

      <Button appearance="primary" type="submit" disabled={disabled}>
        {submitLabel}
      </Button>
    </Wrapper>
  );
};
