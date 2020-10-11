# Config

You can configure the settings of rules and plugins of visible through CLI argument or `.visiblerc`.

| key        | type       | description                                |
| :--------- | :--------- | :----------------------------------------- |
| `extends`  | `string[]` | See extends section below                  |
| `plugins`  | `string[]` | See plugins section below                  |
| `driver`   | `string`   | Name of driver to use                      |
| `rules`    | `string[]` | Name of rules to use                       |
| `provider` | `string[]` | Name of providers to use                   |
| `settings` | `Setting`  | Setting object. See Settings section below |

### `extends`

With extends, you can configure file to extend from the name of the module or path. When you extend configuration, you current configuration will inherit all of the configurations on the file.

### `plugins`

With plugins, you can configure plugins to use from the name of the module or path. Make sure that rules will not be applied just by specifying plugins.

## Settings

[execpath]: https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-puppeteerexecutablepath
[sandbox]: https://chromium.googlesource.com/chromium/src/+/master/docs/design/sandbox.md
[prettier]: https://prettier.io

| key                     | type                             | description                                                                                       | default                    |
| :---------------------- | :------------------------------- | :------------------------------------------------------------------------------------------------ | :------------------------- |
| `delay`                 | `number`                         | Milliseconds of delay after opening websites                                                      | `0`                        |
| `format`                | `boolean`                        | Whether format HTML / CSS fetched from the website using [Prettier][prettier]                     | `false`                    |
| `language`              | `string`                         | A language of the browser. You can also control `Accept-Language` with this property.             | `en`                       |
| `userAgent`             | `string`                         | `User-Agent` string. You can pretend as if you're using Firefox or other browser by this property | `null`                     |
| `width`                 | `number`                         | Screen width of the browser                                                                       | `null`                     |
| `height`                | `number`                         | Screen height of the browser                                                                      | `null`                     |
| `executablePath`        | `string`                         | [Executable path][execpath] of puppeteer                                                          | `null`                     |
| `screenshot`            | `'always'\|'only-fail'\|'never'` | Screenshot usage                                                                                  | `only-fail`                |
| `screenshotDir`         | `string`                         | Directory of screenshots                                                                          | `os.tmpdir() + '/visible'` |
| `noSandbox`             | `boolean`                        | Disable Chromium's [sandbox][sandbox] feature                                                     | `false`                    |
| `headless`              | `boolean`                        | Whether use headless mode or render website                                                       | `false`                    |
| `maxReportCountPerRule` | `number`                         | Maximum reports to accept from single rule                                                        | `Infinity`                 |
