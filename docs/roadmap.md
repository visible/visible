# i18nの解決方法
- プラグイン側にi18nのラッパーを用いるように強いる？

```ts
import { I18nProvider, Rule } from '@visi/core';

export class MyRule implements Rule extends I18nProvider {
  constructor() {
    // Register i18n keys
    this.registerI18n({...});
  }

  audit() {
    // `t` is available
    this.t;
  }
}
```

- でもCLIとかだとラッパーになってる意味がわからなそう
- と思ったけどlanguage detectorを時前実装しなくていいから楽？
- i18nProviderだとクラス以外から使えないからシングルトンな関数をexportするとか
- 引数はi18nextのリソースの構造そのまま使う？
- namespaceはどうなる？？

受け取る側:

```ts
const registerI18n = () => {
  i18n.addResource({...});
  return i18n.createInstance({ defaultNs: '...' });
}
```

- ついでに `getResources` みたいなのをcoreからexportしてserverでも読めるようにするのが良いかと思ってたけど
- ブラウザにインスタンス引き回すの超だるそう (シリアライズできないから)
- `exposeFunction` するとか...?

```ts
// Server (アクセスのあった言語でインスタンス化)
new Visible({ t });
// Core (オプションが付いてたらそれを使う)
page.exposeFunction('t', t);
// DOM (exposedな関数を使う) (でもwindowをオーバーロードする)
// exposeFunctionしたあとにそれへの参照を new Rule() に渡せばいい？
t('my_key');
```

- VSCodeみたいにグローバルにAPIをエクスポートしまくるとか

```ts
// Node.js で受け取りたいのでこれはアリ
page.exposeFunction('report', report);
// これもアリかもしれん。 fixerとかtとか
page.exposeFunction('getContext', registerPlugin);
// これは微妙かもしれん
page.evaluate(() => {
  window.registerPlugin = () => {...};
  window.initialize     = () => {...};
  window.initialize();
});

// ---------------------
// DOM世界
// ---------------------
registerPlugin({
  config: MyRecommendedConfig,
  rules: [ImgAlt],
});

class ImgAlt {
  constructor() {
    this.context = window.getContext();
  }

  audit() {
    for (const img of $$('img')) {
      if (img) continue;

      report({
        rule: 'img-alt',
        level: 'error',
        message: 'img must have alt attribute',
        content: { html: img.outerHTML, xpath: img.xpath },
      });
    }
  }
}
```

- でもDOMからしか使えないのでconfigとかが解決ダルそう (configをnode.jsから見れないのは地獄)

# A11y の問題とソリューションのグループ化

Axe-core がサポートしている問題を、その修正方法でグループ化した。

**axe-core_rule-descriptions.md at develop · dequelabs_axe-core**
<https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md>

分類していて気づいたけど、それぞれのカテゴリの修正方法は本質的に関連している。 Semantics -> Alternatives -> Linguistics みたいに。 繋がっていないのは Visual くらい。

## Semantics

JSDOM などの静的解析で解決できる問題

- accessKeys
- aria-allowed-attr
- aria-allowed-role
- aria-dupe-role-fallback
- aria-hidden-body
- aria-hidden-focus
- aria-input-field-name
- aria-required-attr
- aria-required-children
- aria-roledescription
- aria-roles
- aria-toggle-field-name
- aria-valid-attr-value
- aria-valid-attr
- autocomplete-valid
- avoid-inline-spacing
- blink
- bypass
- checkboxGroup
- css-orientation-lock
- definition-list
- dlItem
- duplicate-id-active
- duplicate-id-aria
- focus-order-semantics
- form-field-multiple-labels
- frame-tested\*
- frame-title-unique
- heading-order
- hidden-content
- label-content-name-mismatch
- label-title-only
- label (Language?)
- landmark\*
- layout-table
- list
- list-item
- marquee
- meta-refresh
- meta-viewport-large
- meta-viewport
- p-as-heading
- page-has-heading-one
- radio group
- region
- scope-attr-valid
- scrollable-region-focusable
- server-side-image-map
- skip-link
- tab-index
- table-fake-caption
- td-has-header
- td-headers-attr
- td-has-data-cells

## Linguistics

自然言語処理が必要な問題

- document-title
- empty-heading
- frame-title
- html-has-lang
- html-lang-valid
- html-xml-lang-mismatch
- link-name
- table-duplicate-name
- valid-lang

## Alternatives

`alt` 属性のように、何らかの方法で代替になる情報が必要な問題

- area-alt
- button-name
- image-alt
- image-redundant-alt
- input-button-name
- input-image-alt
- audio-caption
- role-img-alt
- object-alt
- video-caption
- video-description

## Visual

コントラスト比などの問題

- color-contrast
- link-in-text-block
