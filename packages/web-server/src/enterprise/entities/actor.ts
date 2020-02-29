import { Website } from './website';

export abstract class Actor {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly websites: Website[],
  ) {}
}
