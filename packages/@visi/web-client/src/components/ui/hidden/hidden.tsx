import React from 'react';

export interface HiddenProps {
  children: React.ReactNode;
}

export const Hidden = (props: HiddenProps) => {
  const { children } = props;
  return <div className="sr-only">{children}</div>;
};
