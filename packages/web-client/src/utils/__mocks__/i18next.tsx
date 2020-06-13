import React, { ComponentType } from 'react';

// https://react.i18next.com/misc/testing

const t = (_key: string, defaultValue: string) => defaultValue;
export const useTranslation = () => ({ t });
export const appWithTranslation = (fn: ComponentType) => fn;

interface TransProps {
  children?: React.ReactNode;
}

export const Trans = (props: TransProps) => <>{props.children}</>;
