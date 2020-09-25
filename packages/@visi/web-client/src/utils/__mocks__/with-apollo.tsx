import { ComponentType } from 'react';

export const withApollo = () => (fn: ComponentType): ComponentType => fn;
