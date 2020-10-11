# Plugins

Plugin must export object that satisfies following interface.

```js
export default {
  rules: [
    /* .. */
  ],
  provider: {
    /* .. */
  },
  driver: {
    /* .. */
  },
};
```

## Rule

[rule-ts]: https://github.com/visible/visible/blob/feature%2Fdocs/packages/%40visi/core/src/rule/rule.ts

Rule must be a object or a constructor that implements [Rule][rule-ts] interface.

### Example

```ts
import { Rule, RuleType, Outcome, Impact, Difficulty } from '@visi/core';

class MyRule implements Rule {
  id = '@visi/plugin-of-mine/my-rule';
  type = RuleType.ATOMIC,
  name = 'My Rule';
  description = 'My 1st rule';

  async create(ctx) {
    await ctx.reportHTML({
      message: 'You have issue here!',
      xpath: '/html/body/h1',
      outcome: Outcome.FAIL,
      impact: Impact.CRITICAL,
      difficulty: Difficulty.EASY,
    });
  }
}
```

[rule-type]: https://www.w3.org/TR/act-rules-format/#rule-type

Rule interface containing the following properties.

| key           | type                                  | description                                                       |
| :------------ | :------------------------------------ | :---------------------------------------------------------------- |
| `id`          | `string`                              | ID of the rule                                                    |
| `type`        | `'atomic'/'composite'`                | [Rule type][rule-type]                                            |
| `name`        | `string`                              | Name of the rule                                                  |
| `description` | `string`                              | Description of the rule                                           |
| `create()`    | `(context: Context) => Promise<void>` | A method for creating reports. See also the context section below |

### Context

Context is a set of utilities for rules to report issues.

[settings]: https://github.com/visible/visible/blob/develop/docs/config.md#settings

| key         | type       | description                                                                          |
| :---------- | :--------- | :----------------------------------------------------------------------------------- |
| `session`   | `Session`  | Session instance, containing `runScript` or `findHTML`                               |
| `settings`  | `Settings` | Current settings. See also [Settings][settings] documentation                        |
| `provider`  | `Provider` | Providers                                                                            |
| `report*()` | `Function` | Method for reporting issues belongs to HTML file. See Report section below. |

### Report

`reportHTML()` and `reportCSS()` accepts following object as an argument.

| key          | type         | description                                          |
| :----------- | :----------- | :--------------------------------------------------- |
| `target`     | `string`     | XPath of node that raised the issue.                 |
| `outcome`    | `Outcome`    | Outcome of report                                    |
| `message`    | `string`     | Message that describes the report                    |
| `impact`     | `Impact`     | Impact of the report                                 |
| `difficulty` | `Difficulty` | Difficulty of the report                             |
| `fix()`      | `Function`   | Method for fixing this issue that mutates AST object |

### Fix

By providing `fix` to the `report*()`'s argument, you can indicate the way to fix the problem.

```ts
await ctx.reportHTML({
  // ...
  fix(node) {
    node.values.attribs.alt = 'foo':
  },
});
```

[node]: https://github.com/visible/visible/blob/develop/packages/%40visi/core/src/source/node.ts

The shape of `node` object is depending on the language of source. See [node.ts][node] for the detail.

## Driver

(working in progress)

## Provider

(working in progress)
