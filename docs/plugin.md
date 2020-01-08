# Plugins (Draft)

Guid for developing a Visible plugin.

### TL;DR

```ts
import { Rule, Context, Report } from '@visi/core';

class NoAlt implements Rule {
  static meta = {
    name: 'no-alt',
    description: 'My first rule!',
    url: 'https://exmaple.com/my-rule',
    fixable: true,
    deprecated: false,
  };

  async audit(context: Context): Promise<Report> {
    const elements = Array.from(document.getElementByTagName('IMG'));
    return elements.map(element => this.reportNoAlt(element));
  }

  private reportNoAlt(element: Element) {
    if (element.getAttribute('alt')) {
      return;
    }

    // Report
    return {
      rule: 'no-alt',
      type: 'no-alt/no-alt',
      level: 'ERROR',
      message: 'IMG element must have alt attribute',
      content: {
        html: element.outerHTML,
        xpath: createXPath(element),
      }
    }
  }
}

export default {
  rules: [NoAlt],
}
```

## `Plugin`

Visible plugin is an object resolved as a Node.js module, exporting following names as `default`. The identity of the plugin is determined by the `name` field of `package.json` at its root.

| Property | Type     | Description |
| :------- | :------- | :---------- |
| `rules`  | `Rule[]` | Rules       |

## `Rule`

For reproducing the behaviour of browsers precisely, and to allow rule developers to use DOM APIs without pain, rules are executed on the real browser and then be reported to Node.js main process. And thus, they needs be transpiled to work properly on the browser. Which ECMAScript version you should use, is depending on the version of Visible.

Rule is a class that has following methods / properties.

- `static meta` - Metadata of the rule
- `audit(context: Context): Promise<Report>` - Method to invoke aduit

## `Report`

`Report` is an object to tell main process about a result of the rule, containing an information such as whether the website satisfitied the rule or not. More concrete, following properties should be provided.

| Property  | Type                | Description                                 |
| :-------- | :------------------ | :------------------------------------------ |
| `rule`    | `string`            | Unique name of the rule                     |
| `type`    | `string`            | Unique name of the report                   |
| `level`   | `OK | ERROR | WARN` | Level of seriousness of the report          |
| `message` | `string`            | User-readable explanation of the report     |
| `content` | `ReportContent`     | Content which thrown affected to the report |

### `ReportContent`

| Property | Type     | Description               |
| :------- | :------- | :------------------------ |
| `xpath`  | `string` | XPath for the element     |
| `html`   | `string` | Outer HTML of the element |
| `css`    | `string` | CSS of the element        |