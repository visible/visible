# A11yの問題とソリューションのグループ化
Axe-coreがサポートしている問題を、その修正方法でグループ化した。

**axe-core_rule-descriptions.md at develop · dequelabs_axe-core**
<https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md>

分類していて気づいたけど、それぞれのカテゴリの修正方法は本質的に関連している。 Semantics -> Alternatives -> Linguisticsみたいに。 繋がっていないのはVisualくらい。

## Semantics
JSDOMなどの静的解析で解決できる問題
- accesskeys
- aria-allowed-attr
- aria-allowed-role
- aria-dpub-role-fallback
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
- checkboxgroup
- css-orientation-lock
- definition-list
- dlitem
- duplicate-id-active
- duplicate-id-aria
- focus-order-semantics
- form-field-multiple-labels
- frame-tested*
- frame-title-unique
- heading-order
- hidden-content
- label-content-name-mismatch
- label-title-only
- label (Language?)
- landmark*
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
