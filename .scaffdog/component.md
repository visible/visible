---
name: 'component'
description: 'Generates @visi/web-ui component'
message: 'Type the name of your component'
root: packages/@visi
output: '**/*'
ignore: []
---

# `{{ input | kebab }}/index.tsx`

```tsx
export * from './{{ input | kebab }}';

```

# `{{ input | kebab }}/{{ input | kebab }}.tsx`

```tsx
import React from 'react';

export const {{ input | pascal }} = () => {
  return null;
};

```

# `{{ input | kebab }}/{{ input | kebab }}.stories.tsx`

```tsx
import React from 'react';
import { {{ input | pascal }} } from '.';

export default {
  title: '{{ input | pascal }}',
  component: {{ input | pascal }},
};

export const normal = () => <{{ input | pascal }} />;

```

# `{{ input | kebab }}/{{ input | kebab }}.spec.tsx`

```tsx
import React from 'react';
import { render } from '@testing-library/react';
import { {{ input | pascal }} } from '.';

describe('{{ input | pascal }}', () => {
  it('matches snapshot', () => {
    const { container } = render(<{{ input | pascal }} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

```
