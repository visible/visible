interface DiagnosticConstructorParams {
  id: string;
  score: {
    error: number;
    warn: number;
    ok: number;
  };
}

export class Diagnostic {
  constructor(readonly id: string) {}
}
