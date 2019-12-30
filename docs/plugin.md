# Plugins (Draft)
Guid for developing a Visible plugin.

## `Plugin`

Visible plugin is an object resolved as a Node.js module, exporting following names as `default`. The identity of the plugin is determined by the `name` field of `package.json` at its root.

| Property | Type     | Description        |
| :------- | :------- | :----------------- |
| `rules`  | `Rule[]` | Rules              |

## `Rule`

For reproducing the behaviour of browsers precisely, rules are executed on the real browser and then be reported to Node.js main process. And thus, they must be transpiled to work properly on the browser. Which ECMAScript version you should use, is depending on the version of Visible.

Rule is a class that has following methods / properties.

- `static meta` - Metadata of the rule
- `audit(context: Context): Promise<Report>` - Method to invoke aduit
- `countAudits(): Promise<number>` - Method to count number of audits, used to estimate the progress.
- ~~event emitter~~

### Code Example
```ts
import { Rule, Context, Report } from '@visi/core';

class NoAlt implements Rule {
  static meta = {
    name: 'no-alt',
    description: 'My first rule!',
    url: 'https://exmaple.com/my-rule',
    deprecated: false,
  };

  async countAudits() {
    // NoAlt only check <img>s so the number of audit
    // is equal to the number of <img>s
    return document.getElemenyByTagName('IMG').length;
  }

  async audit(context: Context): Report {
    const elements = Array.from(document.getElementByTagName('IMG'));

    return elements.map(element => {
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
}
```

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
