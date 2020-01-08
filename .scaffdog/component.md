---
name: 'component'
description: 'Generates @visi/ui component'
message: 'Type the name of your component'
root: './packages/'
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
import { storiesOf } from '@storybook/react';
import { {{ input | pascal }} } from '.';

storiesOf('{{ input | pascal }}', module)
  .add('Normal', () => <{{ input | pascal }} />);

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
