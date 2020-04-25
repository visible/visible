enum RuleType {
  ATOMIC = 'atomic',
  COMPOSITE = 'composite',
}

export class Rule {
  constructor(
    readonly id: string,
    readonly type: RuleType,
    readonly description: string,
  ) {}
}
