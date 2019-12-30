# Configuration (Draft)

Visible のルール、プラグインなどの設定は、CLI 引数及び `.visiblerc.json` で設定することができます。

You can configure the settings of rules and plugins of visible through CLI argument or `.visiblerc.json`.

スキーマは以下のようになっています。

The schema is looked as following:

```json
{
  "extends": [
    "@visi/config-recommended",
  ],
  "plugins": [
    "@visi/plugin-standard"
  ],
  "rules": {
    "@visi/plugin-standard/img-alt": {
      "use": true,
      "level": "error",
      "options": {
        ...
      }
    },
    "@visi/plugin-standard/button-alt": {
      "use": false,
    }
  }
}
```

## `extends`

extends では、モジュール名から継承する設定を設定することができます。設定を継承すると、設定にあるルールが全て引き継がれます。

With `extends`, you can configure file to extend from the name of the module or path. When you extend configuration, you current configuration will inherit all of the configurations on the file.

## `plugins`

plugins では、有効にするプラグインを指定することができます。プラグインを指定したのみではルールは設定されないことに注意してください。

With `plugins`, you can configure plugins to use from the name of the module or path. Make sure that **rules will not be applied just by specifying plugins**.

## `rules`

With `rules`, you can configure which rules to enable, and its detailed options.

| Property  | Type                      | Description                           |
| :-------- | :------------------------ | :------------------------------------ |
| `use`     | `boolean`                 | Whether use this rule or not          |
| `level`   | `"ok" | "error" | "warn"` | The level of this rule to be reported |
| `options` | Depends on the rule       | Option for this rule                  |
