import React, { ComponentType } from 'react';

// https://react.i18next.com/misc/testing

const t = (_key: string, defaultValue: string) => defaultValue;
export const useTranslation = (): unknown => ({
  t,
  i18n: { language: 'en' },
});

export const appWithTranslation = (fn: ComponentType): ComponentType => fn;

interface TransProps {
  children?: React.ReactNode;
}

export const Trans = (props: TransProps) => <>{props.children}</>;
