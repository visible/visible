import React, { ComponentType } from 'react';

// https://react.i18next.com/misc/testing

const t = (_key: string, defaultValue: string) => defaultValue;
export const useTranslation = () => ({ t });
export const Trans = React.Fragment;
export const appWithTranslation = (fn: ComponentType) => fn;
