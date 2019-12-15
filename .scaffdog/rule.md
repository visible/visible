---
name: 'rule'
description: 'Generates rule on @visi/core'
message: 'Type the name for your rule e.g. `image-alt`'
root: './packages/core/src/rules'
ignore: []
---

# `{{ input | kebab }}/{{ input | kebab }}.ts`

```ts
import { Rule } from '../../domain/rule';
import { Report } from '../../domain/report';

export const {{ input | camel }}: Rule = async ({ page }) => {
  const elements = page.$('*');
  const reports: Report[] = [];
  return reports;
}

```

# `{{ input | kebab }}/{{ input | kebab }}.spec.ts`

```ts
import { {{ input | camel }} } from './{{ input | kebab }}';

describe('{{ input | kebab }}', () => {
  it('works ok', async () => {
    const [report] = await {{ input | camel }}({ page });
    expect(report).toEqual({});
  });
});

```

# `{{ input | kebab }}/index.ts

```ts
export * from './{{ input | kebab }}';

```
