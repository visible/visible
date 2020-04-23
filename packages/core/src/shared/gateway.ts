import { Report } from './report';

export type ListRules = () => Promise<string[]>;
export type ProcessRule = (id: string) => Promise<Report[]>;
export type LoadPlugins = (host?: string) => Promise<void>;
export type OnReady = () => Promise<void>;
