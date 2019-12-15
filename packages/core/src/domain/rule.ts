import { Report } from './report';
import { Context } from './context';

export type Rule = (context: Context) => Promise<Report[]>;
