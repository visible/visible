---
name: 'rule'
description: 'Generates rule on @visi/core'
message: 'Type the name for your rule e.g. `image-alt`'
root: './packages/'
ignore: []
---

# `{{ input | kebab }}/{{ input | kebab }}.ts`

```ts
import { BaseRule, Rule } from '@visi/core/main';

export class {{ input | camel }} extends BaseRule implements Rule {
  static meta = {
    name: '{{ input | kebab }}',
    description: '',
  };

  async audit() {
    const reports: Report[] = [];
    return reports;
  };
}
```

# `{{ input | kebab }}/{{ input | kebab }}.spec.ts`

```ts
import { {{ input | camel }} } from './{{ input | kebab }}';

describe('{{ input | camel }}', () => {
  const {{ input | pascal }} = new {{ input | camel }}();

  it('works ok', async () => {
    const [report] = await {{ input | pascal }}.audit();
    expect(report).toEqual({});
  });
});

```

# `{{ input | kebab }}/index.ts

```ts
export * from './{{ input | kebab }}';

```
