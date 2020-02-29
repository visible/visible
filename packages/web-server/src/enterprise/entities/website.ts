import { Diagnosis } from './diagnosis';

export class Website {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly domain: string,
    readonly diagnoses: Diagnosis[],
  ) {}
}
